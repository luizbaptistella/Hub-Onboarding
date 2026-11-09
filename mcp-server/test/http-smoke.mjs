// Smoke do modo HTTP: sobe o servidor com token e chama uma ferramenta via cliente oficial.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8791;
const TOKEN = 'smoke-token-123';
const proc = spawn(process.execPath, [path.resolve(here, '../src/http.mjs')], {
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', MCP_TOKEN: TOKEN },
  stdio: ['ignore', 'ignore', 'inherit'],
});
await new Promise((r) => setTimeout(r, 800));
try {
  const noAuth = await fetch(`http://127.0.0.1:${PORT}/mcp`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  console.log('sem token ->', noAuth.status);
  const bad = await fetch(`http://127.0.0.1:${PORT}/mcp`, { method: 'POST', headers: { authorization: 'Bearer errado' }, body: '{}' });
  console.log('token errado ->', bad.status);
  const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${PORT}/mcp`), {
    requestInit: { headers: { authorization: `Bearer ${TOKEN}` } },
  });
  const client = new Client({ name: 'smoke', version: '0.0.0' });
  await client.connect(transport);
  const r = await client.callTool({ name: 'hub_get_flow', arguments: { code: 'CAD-02' } });
  console.log('hub_get_flow CAD-02 ->', r.isError ? 'erro' : 'ok', r.content[0].text.slice(0, 120).replace(/\n/g, ' '));
  await client.close();
} finally {
  proc.kill();
  await once(proc, 'exit').catch(() => {});
}
