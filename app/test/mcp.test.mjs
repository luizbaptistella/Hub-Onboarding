import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.mjs';

const TOKEN = 'token-mcp-teste-123';
const PASSWORD = 'senha-mcp-teste-123';
const MCP_HEADERS = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' };

let server, base;
before(async () => {
  server = await createApp({ password: PASSWORD, secure: false, mcpToken: TOKEN });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

// Lê a resposta JSON-RPC, que pode vir como JSON puro ou como um evento SSE.
async function rpc(body, token = TOKEN) {
  const headers = { ...MCP_HEADERS, ...(token ? { authorization: `Bearer ${token}` } : {}) };
  const res = await fetch(`${base}/mcp`, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await res.text();
  if ((res.headers.get('content-type') ?? '').includes('text/event-stream')) {
    const line = text.split('\n').find((l) => l.startsWith('data: '));
    return { status: res.status, json: line ? JSON.parse(line.slice(6)) : null };
  }
  return { status: res.status, json: text.startsWith('{') ? JSON.parse(text) : null };
}

test('/mcp exige o token de máquina, não o cookie de login', async () => {
  assert.equal((await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, '')).status, 401);
  assert.equal((await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, 'errado')).status, 401);
  // Cookie de sessão da app não serve para o MCP.
  const res = await fetch(`${base}/mcp`, { method: 'POST', headers: { ...MCP_HEADERS, cookie: 'hub_session=qualquer' }, body: '{}' });
  assert.equal(res.status, 401);
});

test('/mcp responde initialize, lista ferramentas e chama hub_info com o token', async () => {
  const init = await rpc({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'teste', version: '0.0.0' } },
  });
  assert.equal(init.status, 200);
  assert.equal(init.json.result.serverInfo.name, 'palmeiras-hub');

  const tools = await rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  const names = tools.json.result.tools.map((t) => t.name);
  for (const name of ['hub_list_screens', 'hub_get_screen', 'hub_search', 'hub_info']) assert.ok(names.includes(name), name);

  const call = await rpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'hub_info', arguments: {} } });
  assert.equal(call.json.result.isError, undefined);
  assert.match(call.json.result.content[0].text, /115/);
});

test('/mcp rejeita método não suportado sem derrubar o servidor', async () => {
  const res = await fetch(`${base}/mcp`, { method: 'PUT', headers: { authorization: `Bearer ${TOKEN}` } });
  assert.ok([404, 405].includes(res.status), `status ${res.status}`);
  assert.equal((await rpc({ jsonrpc: '2.0', id: 4, method: 'ping' })).status, 200);
});

test('/mcp fica desligado sem MCP_TOKEN', async () => {
  const off = await createApp({ password: PASSWORD, secure: false, mcpToken: '' });
  await new Promise((r) => off.listen(0, '127.0.0.1', r));
  try {
    const url = `http://127.0.0.1:${off.address().port}/mcp`;
    const res = await fetch(url, { method: 'POST', headers: { ...MCP_HEADERS, authorization: 'Bearer ' }, body: '{}' });
    assert.equal(res.status, 404);
  } finally {
    off.close();
  }
});
