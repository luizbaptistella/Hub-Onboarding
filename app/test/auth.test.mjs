import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../src/server.mjs';

const PASSWORD = 'senha-de-teste-123';
let server, base;
before(async () => {
  server = await createApp({ password: PASSWORD, secure: false });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const noRedirect = { redirect: 'manual' };
const login = (pw) => fetch(`${base}/login`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ password: pw }),
  ...noRedirect,
});
const cookieOf = (res) => res.headers.get('set-cookie')?.split(';')[0];

test('sem sessão: página vai para o login e API responde 401', async () => {
  const page = await fetch(`${base}/`, noRedirect);
  assert.equal(page.status, 303);
  assert.equal(page.headers.get('location'), '/login');
  assert.equal((await fetch(`${base}/api/info`)).status, 401);
  assert.equal((await fetch(`${base}/login`)).status, 200);
  assert.equal((await fetch(`${base}/styles.css`)).status, 200);
  assert.equal((await fetch(`${base}/login.js`)).status, 200);
});

test('senha errada não cria sessão', async () => {
  const res = await login('errada');
  assert.equal(res.status, 303);
  assert.match(res.headers.get('location'), /erro=senha/);
  assert.equal(res.headers.get('set-cookie'), null);
});

test('senha certa cria cookie HttpOnly e libera a API', async () => {
  const res = await login(PASSWORD);
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/');
  const setCookie = res.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  const api = await fetch(`${base}/api/info`, { headers: { cookie: cookieOf(res) } });
  assert.equal(api.status, 200);
});

test('cookie adulterado é recusado', async () => {
  const res = await login(PASSWORD);
  const [exp, sig] = cookieOf(res).split('=')[1].split('.');
  const forged = `hub_session=${exp}.${sig.slice(0, -1)}${sig.endsWith('0') ? '1' : '0'}`;
  assert.equal((await fetch(`${base}/api/info`, { headers: { cookie: forged } })).status, 401);
});

test('logout limpa o cookie', async () => {
  const res = await fetch(`${base}/logout`, { method: 'POST', ...noRedirect });
  assert.match(res.headers.get('set-cookie'), /Max-Age=0/);
});

test('limite de tentativas bloqueia após 10 erros', async () => {
  let last;
  for (let i = 0; i < 11; i++) last = await login('x' + i);
  assert.match(last.headers.get('location'), /bloqueado/);
});

test('recusa subir fora do localhost sem senha', () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const r = spawnSync(process.execPath, [path.resolve(here, '../src/server.mjs')], {
    env: { ...process.env, HOST: '0.0.0.0', APP_PASSWORD: '' },
    encoding: 'utf8',
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /APP_PASSWORD/);
});
