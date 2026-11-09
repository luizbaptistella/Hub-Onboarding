import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.mjs';

const PASSWORD = 'senha-hub-static-123';
let server, base, cookie;
before(async () => {
  server = await createApp({ password: PASSWORD, secure: false });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
  const res = await fetch(`${base}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ password: PASSWORD }),
    redirect: 'manual',
  });
  cookie = res.headers.get('set-cookie').split(';')[0];
});
after(() => server.close());

const authed = (path) => fetch(`${base}${path}`, { headers: { cookie }, redirect: 'manual' });

test('/hub exige login', async () => {
  const res = await fetch(`${base}/hub/`, { redirect: 'manual' });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/login');
});

test('/hub serve o fluxograma e o protótipo com sessão', async () => {
  const index = await authed('/hub/');
  assert.equal(index.status, 200);
  assert.match(index.headers.get('content-type'), /text\/html/);
  assert.match(index.headers.get('content-security-policy'), /script-src 'self' 'unsafe-inline'/);
  assert.equal((await authed('/hub/prototipo.html')).status, 200);
  assert.equal((await authed('/hub/handoff/flow.json')).status, 200);
  assert.equal((await authed('/hub/handoff/CAD-02-codigo-por-sms/spec.md')).status, 200);
  assert.equal((await authed('/hub')).status, 303);
});

test('/hub não expõe código do servidor, dotfiles nem tipos fora da lista', async () => {
  assert.equal((await authed('/hub/app/src/server.mjs')).status, 404);
  assert.equal((await authed('/hub/mcp-server/src/hub.mjs')).status, 404);
  assert.equal((await authed('/hub/render.yaml')).status, 404);
  assert.equal((await authed('/hub/.gitignore')).status, 404);
  assert.equal((await authed('/hub/..%2Fpackage.json')).status, 404);
  assert.equal((await authed('/hub/%2e%2e/%2e%2e/app/package.json')).status, 404);
});

test('API de documentos lista docs gerais e de componentes', async () => {
  const res = await authed('/api/docs');
  const body = await res.json();
  assert.ok(body.general.includes('readme'));
  assert.ok(body.components.length >= 30);
  const comp = await (await authed('/api/docs/componente:Button')).json();
  assert.match(comp.text, /Button/);
});
