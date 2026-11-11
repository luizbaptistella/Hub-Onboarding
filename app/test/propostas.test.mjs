import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../src/server.mjs';
import { loadHub } from '../../mcp-server/src/hub.mjs';
import { handoffDir } from '../../mcp-server/src/handoff-path.mjs';
import { buildProposal, createGithubStore, createLocalStore, prBody, proposalPath } from '../src/propostas.mjs';

let server, base, handoff, saved, markup;
const store = { mode: 'teste', save: async (p) => { saved.push(p); return { mode: 'teste', id: p.id }; } };

before(async () => {
  handoff = await loadHub(handoffDir);
  server = await createApp({ proposalStore: store });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
  markup = await (await fetch(`${base}/api/screens/BIO-01/markup?variant=liv-tutorial`)).json();
});
after(() => server.close());

const valid = () => ({
  screen: 'BIO-01',
  variant: 'liv-tutorial',
  base: { markupSha256: markup.sha256 },
  motivo: 'Botão secundário porque a ação principal é ler o tutorial.',
  escopo: 'tela',
  autor: 'Teste',
  changes: [
    { kind: 'prop', instance: 3, prop: 'variant', after: 'secondary' },
    { kind: 'texto', selector: '#liv-tutorial > div:nth-of-type(2) > div:nth-of-type(2) h1', instance: null, before: 'Ache um lugar bem claro e com fundo simples.', after: 'Procure um lugar bem iluminado.' },
  ],
});

const post = (body, headers = { origin: base }) => fetch(`${base}/api/propostas`, {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body),
});

test('marcação traz hash e variantes; config indica o modo de gravação', async () => {
  assert.match(markup.sha256, /^[0-9a-f]{64}$/);
  assert.ok(markup.variants.some((v) => v.id === 'liv-tutorial--passo-2'));
  const cfg = await (await fetch(`${base}/api/propostas/config`)).json();
  assert.deepEqual(cfg, { enabled: true, mode: 'teste' });
});

test('proposta válida é normalizada e salva', async () => {
  saved = [];
  const r = await post(valid());
  assert.equal(r.status, 201);
  const p = saved[0];
  assert.match(p.id, /^PROP-\d{8}-\d{6}-bio-01-[0-9a-f]{4}$/);
  assert.equal(p.variant.file, 'handoff/BIO-01-tutorial-da-captura/screen.html');
  assert.deepEqual(p.changes[0], {
    kind: 'prop', prop: 'variant', before: 'primary', after: 'secondary',
    target: { selector: '#liv-tutorial > div:nth-of-type(2) > div:nth-of-type(5) > button:nth-of-type(1)', instance: 3, component: 'Button' },
  });
  assert.equal(p.changes[1].kind, 'texto');
});

test('recusa: origem, motivo, opção fora do DS, tela alterada, JSON e escopo', async () => {
  saved = [];
  assert.equal((await post(valid(), {})).status, 403);
  assert.equal((await post(valid(), { origin: 'https://exemplo.invalid' })).status, 403);
  assert.equal((await post({ ...valid(), motivo: 'curto' })).status, 400);
  assert.equal((await post({ ...valid(), escopo: 'tudo' })).status, 400);
  const fora = valid();
  fora.changes = [{ kind: 'prop', instance: 3, prop: 'variant', after: 'roxo' }];
  const r = await post(fora);
  assert.equal(r.status, 400);
  assert.match((await r.json()).error, /não é uma opção/);
  assert.equal((await post({ ...valid(), base: { markupSha256: '0'.repeat(64) } })).status, 409);
  assert.equal((await post('{nope')).status, 400);
  assert.equal((await post({ ...valid(), changes: [{ kind: 'css', selector: 'x' }] })).status, 400);
  assert.equal(saved.length, 0);
  // Continua sendo a única escrita: outras rotas seguem só leitura.
  assert.equal((await fetch(`${base}/api/screens`, { method: 'POST', headers: { origin: base } })).status, 405);
});

test('sem armazenamento configurado, salvar responde 503', async () => {
  const off = await createApp({ proposalStore: null });
  await new Promise((r) => off.listen(0, '127.0.0.1', r));
  const b = `http://127.0.0.1:${off.address().port}`;
  const r = await fetch(`${b}/api/propostas`, { method: 'POST', headers: { origin: b }, body: '{}' });
  assert.equal(r.status, 503);
  assert.deepEqual(await (await fetch(`${b}/api/propostas/config`)).json(), { enabled: false, mode: null });
  off.close();
});

test('corpo do PR: tabela, checklist e menções neutralizadas', async () => {
  const p = await buildProposal(handoff, { ...valid(), motivo: 'Pedido do @time-design | revisar' });
  const body = prBody(p);
  assert.match(body, /\| 1 \| `Button` \| prop `variant` \| primary \| secondary \|/);
  assert.match(body, /Histórico de alterações/);
  assert.doesNotMatch(body, /@time-design/);
  assert.ok(body.includes(proposalPath(p)));
});

test('loja local grava o arquivo; loja GitHub cria branch, arquivo e PR', async () => {
  const p = await buildProposal(handoff, valid());
  const dir = await mkdtemp(path.join(tmpdir(), 'propostas-'));
  try {
    const r = await createLocalStore(dir).save(p);
    assert.equal(JSON.parse(await readFile(path.join(dir, r.path), 'utf8')).id, p.id);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }

  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push(`${init.method} ${url.replace('https://api.github.com/repos/dono/repo', '')}`);
    const data = init.method === 'GET' ? { object: { sha: 'abc' } } : init.method === 'POST' && url.endsWith('/pulls') ? { html_url: 'https://github.com/dono/repo/pull/7', number: 7 } : {};
    return new Response(JSON.stringify(data), { status: 201 });
  };
  const r = await createGithubStore({ token: 't', repo: 'dono/repo', fetchImpl }).save(p);
  assert.equal(r.number, 7);
  assert.deepEqual(calls.map((c) => c.split(' ')[0]), ['GET', 'POST', 'PUT', 'POST']);
  assert.match(calls[2], /handoff\/BIO-01-tutorial-da-captura\/propostas\/PROP-/);
});
