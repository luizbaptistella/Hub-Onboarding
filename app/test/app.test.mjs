import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.mjs';

let server, base;
before(async () => {
  server = await createApp();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test('página inicial e assets', async () => {
  const html = await (await fetch(base + '/')).text();
  assert.match(html, /Palmeiras Hub/);
  const js = await fetch(base + '/app.js');
  assert.equal(js.status, 200);
  assert.match(js.headers.get('content-security-policy'), /script-src 'self'/);
});

test('API: info, telas, detalhe, componentes, marcação, fluxo', async () => {
  const info = await (await fetch(base + '/api/info')).json();
  assert.equal(info.screens, 113);
  const list = await (await fetch(base + '/api/screens?lane=cadastro')).json();
  assert.ok(list.total > 0);
  const screen = await (await fetch(base + '/api/screens/CAD-02')).json();
  assert.match(screen.spec, /CAD-02/);
  const comps = await (await fetch(base + '/api/screens/AJD-02/components')).json();
  assert.equal(comps.screen, 'AJD-02');
  const markup = await (await fetch(base + '/api/screens/AJD-02/markup')).json();
  assert.ok(markup.html.length > 0);
  const flow = await (await fetch(base + '/api/flow/CAD-02')).json();
  assert.ok(flow.outgoing.length > 0);
});

test('API: busca, decisão e documento', async () => {
  const s = await (await fetch(base + '/api/search?q=endereco')).json();
  assert.ok(s.total > 0);
  assert.equal((await fetch(base + '/api/search?q=a')).status, 400);
  assert.equal((await fetch(base + '/api/decisions/DEC-01')).status, 200);
  assert.equal((await fetch(base + '/api/docs/dados')).status, 200);
  assert.equal((await fetch(base + '/api/docs/..%2Fflow')).status, 404);
});

test('erros e segurança: 404, traversal e método', async () => {
  assert.equal((await fetch(base + '/api/screens/XXX-99')).status, 404);
  assert.equal((await fetch(base + '/../mcp-server/package.json')).status, 404);
  assert.equal((await fetch(base + '/%2e%2e/package.json')).status, 404);
  assert.equal((await fetch(base + '/api/screens', { method: 'POST' })).status, 405);
});
