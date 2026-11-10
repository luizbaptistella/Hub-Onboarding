// Endpoint MCP (Streamable HTTP) com autenticação por token Bearer. Usado pelo modo HTTP standalone
// (src/http.mjs) e montado dentro da app web do hub em /mcp (app/src/server.mjs).
import { timingSafeEqual } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createHubServer } from './server.mjs';

const MAX_BODY = 1_000_000;

// Sem token, o endpoint responde 404: um deploy sem MCP_TOKEN nunca expõe o handoff por aqui.
export function createMcpEndpoint(handoff, { token = '' } = {}) {
  const enabled = token.length > 0;

  function authorized(req) {
    const header = req.headers.authorization ?? '';
    const given = Buffer.from(header.startsWith('Bearer ') ? header.slice(7) : '');
    const expected = Buffer.from(token);
    return given.length === expected.length && timingSafeEqual(given, expected);
  }

  // Responde direto no `res`. Sem estado de sessão: cada requisição sobe um servidor MCP leve e o descarta.
  return async function handleMcp(req, res) {
    if (!enabled) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
      return;
    }
    if (!authorized(req)) {
      res.writeHead(401, { 'www-authenticate': 'Bearer', 'content-type': 'text/plain; charset=utf-8' }).end('unauthorized');
      return;
    }
    try {
      const body = req.method === 'POST' ? await readJsonBody(req) : undefined;
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
      if (!res.headersSent) res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: status === 500 ? 'erro interno' : err.message }, id: null }));
    }
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
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
