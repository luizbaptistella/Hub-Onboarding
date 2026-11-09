// Transporte Streamable HTTP: o servidor roda num host do time e as pessoas conectam por URL.
// Sem estado de sessão (cada requisição é independente). Exige token em MCP_TOKEN fora de localhost.
import { createServer } from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createHubServer } from './server.mjs';
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

function authorized(req) {
  if (!TOKEN) return true;
  const header = req.headers.authorization ?? '';
  const given = Buffer.from(header.startsWith('Bearer ') ? header.slice(7) : '');
  const expected = Buffer.from(TOKEN);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 1_000_000) {
        reject(Object.assign(new Error('payload grande demais'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      try {
        resolve(raw ? JSON.parse(raw) : undefined);
      } catch {
        reject(Object.assign(new Error('JSON inválido'), { status: 400 }));
      }
    });
    req.on('error', reject);
  });
}

const httpServer = createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: true, screens: handoff.nodes.length }));
    return;
  }
  if (req.url !== '/mcp') {
    res.writeHead(404).end('not found');
    return;
  }
  if (!authorized(req)) {
    res.writeHead(401, { 'www-authenticate': 'Bearer' }).end('unauthorized');
    return;
  }
  try {
    const body = req.method === 'POST' ? await readBody(req) : undefined;
    const server = createHubServer(handoff);
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on('close', () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, body);
  } catch (err) {
    const status = err.status ?? 500;
    if (!res.headersSent) res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: err.message }, id: null }));
  }
});

httpServer.listen(PORT, HOST, () => {
  console.error(`[palmeiras-hub] http em http://${HOST}:${PORT}/mcp · auth ${TOKEN ? 'ativa' : 'desligada (local)'} · ${handoff.nodes.length} nós`);
});
