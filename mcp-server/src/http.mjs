// Modo HTTP standalone: sobe só o endpoint MCP, para quem quer rodar fora da app web.
// Fora de localhost, exige MCP_TOKEN (o mesmo endpoint é usado em app/src/server.mjs, em /mcp).
import { createServer } from 'node:http';
import { createMcpEndpoint } from './endpoint.mjs';
import { loadHub } from './hub.mjs';
import { handoffDir } from './handoff-path.mjs';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = Number(process.env.PORT ?? 8790);
const TOKEN = process.env.MCP_TOKEN ?? '';
const LOOPBACK = new Set(['127.0.0.1', 'localhost', '::1']);

if (!LOOPBACK.has(HOST) && !TOKEN) {
  console.error('Recuso subir em HOST não local sem MCP_TOKEN. Defina MCP_TOKEN ou use HOST=127.0.0.1.');
  process.exit(1);
}

const handoff = await loadHub(handoffDir);
const handleMcp = createMcpEndpoint(handoff, { token: TOKEN });

const httpServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: true, screens: handoff.nodes.length }));
    return;
  }
  if (req.url !== '/mcp') {
    res.writeHead(404).end('not found');
    return;
  }
  return handleMcp(req, res);
});

httpServer.listen(PORT, HOST, () => {
  console.error(`[palmeiras-hub] http em http://${HOST}:${PORT}/mcp · auth ${TOKEN ? 'ativa' : 'desligada (local)'} · ${handoff.nodes.length} nós`);
});
