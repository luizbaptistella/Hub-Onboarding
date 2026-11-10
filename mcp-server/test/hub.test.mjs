import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as hub from '../src/hub.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const handoffDir = path.join(root, 'handoff');

test('carrega o flow e indexa telas, ligações e decisões', async () => {
  const h = await hub.loadHub(handoffDir);
  assert.equal(h.nodes.length, 110);
  assert.equal(h.edges.length, 264);
  assert.ok(h.componentDocs.length >= 30);
});

test('spec, componentes e marcação de uma tela', async () => {
  const h = await hub.loadHub(handoffDir);
  const spec = await hub.getScreenSpec(h, 'ajd-02');
  assert.match(spec.spec, /AJD-02/);
  const comps = await hub.getScreenComponents(h, 'AJD-02');
  assert.equal(JSON.parse(comps.raw).screen, 'AJD-02');
  const markup = await hub.getScreenMarkup(h, 'AJD-02');
  assert.match(markup.html, /ajuda/i);
});

test('código inexistente e variante inexistente', async () => {
  const h = await hub.loadHub(handoffDir);
  assert.equal(await hub.getScreenSpec(h, 'XXX-99'), null);
  const r = await hub.getScreenMarkup(h, 'AJD-02', 'nao-existe');
  assert.ok(r.error);
});

test('fluxo traz entradas, saídas e decisões', async () => {
  const h = await hub.loadHub(handoffDir);
  const f = hub.getFlow(h, 'CAD-02');
  assert.ok(f.outgoing.length > 0);
  assert.ok(f.decisions.some((d) => d.id === 'DEC-01'));
});

test('busca ignora acentos e maiúsculas', async () => {
  const h = await hub.loadHub(handoffDir);
  const hits = await hub.search(h, 'endereco');
  assert.ok(hits.length > 0);
  assert.equal((await hub.search(h, 'zzqqxxyy')).length, 0);
});

test('documentos gerais só aceitam nomes da lista', async () => {
  const h = await hub.loadHub(handoffDir);
  assert.equal(await hub.getGeneralDoc(h, '../flow'), null);
  assert.ok((await hub.getGeneralDoc(h, 'dados')).text.length > 0);
  assert.equal(await hub.getComponentDoc(h, '../../etc/passwd'), null);
});

test('cliente MCP via stdio: lista ferramentas e chama duas delas', async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/stdio.mjs')],
    stderr: 'ignore',
  });
  const client = new Client({ name: 'test', version: '0.0.0' });
  await client.connect(transport);
  try {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    assert.deepEqual(names, ['hub_get_decision', 'hub_get_doc', 'hub_get_flow', 'hub_get_screen', 'hub_get_screen_components', 'hub_get_screen_markup', 'hub_info', 'hub_list_screens', 'hub_search']);
    assert.ok(tools.every((t) => t.annotations?.readOnlyHint === true));

    const list = await client.callTool({ name: 'hub_list_screens', arguments: { lane: 'cadastro' } });
    const payload = JSON.parse(list.content[0].text);
    assert.ok(payload.total > 0);

    const missing = await client.callTool({ name: 'hub_get_screen', arguments: { code: 'NOPE-1' } });
    assert.equal(missing.isError, true);
  } finally {
    await client.close();
  }
});
