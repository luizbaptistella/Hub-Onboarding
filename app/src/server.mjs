// Servidor HTTP da aplicação: login compartilhado, interface em public/ e API em /api. Só leitura.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadHub } from '../../mcp-server/src/hub.mjs';
import { handoffDir } from '../../mcp-server/src/handoff-path.mjs';
import { handleApi } from './api.mjs';
import { createAuth } from './auth.mjs';
import { loadDesignSystem, getComponents, buildDesignSystemPayload } from './ds.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, '../public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
// Assets sem dados do handoff ficam públicos para a tela de login carregar.
const PUBLIC_ASSETS = new Set(['/styles.css', '/app.js', '/login.js']);
const LOOPBACK = new Set(['127.0.0.1', 'localhost', '::1']);
// Raiz do hub (palmeiras-hub/) servida em /hub/. Pastas internas e do servidor ficam fora.
const hubRoot = path.resolve(here, '../..');
const DENIED_HUB_DIRS = new Set(['app', 'mcp-server', 'node_modules']);
const HUB_TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
};
// As páginas do protótipo usam scripts e estilos inline. Por isso /hub/ tem política própria, mais aberta que a da app,
// mas ainda restrita a origem própria e bloqueia objetos, iframes externos e envio de dados para outros domínios.
const HUB_HEADERS = {
  'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-src 'self' blob:; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'",
};

const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
  'content-security-policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
};

export async function createApp({ password = process.env.APP_PASSWORD, secure = process.env.COOKIE_SECURE === '1' } = {}) {
  const handoff = await loadHub(handoffDir);
  const ds = await loadDesignSystem({ hubRoot, handoffDir: handoff.dir, decisions: handoff.decisions });
  const designSystem = buildDesignSystemPayload(ds, await getComponents(ds, handoff.componentDocs));
  const auth = createAuth({ password });

  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const p = url.pathname;

      if (p === '/login' && req.method === 'GET') return sendFile(res, 'login.html');

      if (p === '/login' && req.method === 'POST') {
        const ip = clientIp(req);
        const form = new URLSearchParams(await readBody(req, 4096));
        const result = auth.checkPassword(ip, form.get('password'));
        if (result.locked) return redirect(res, '/login?erro=bloqueado');
        if (!result.ok) return redirect(res, '/login?erro=senha');
        res.setHeader('set-cookie', auth.issueCookie({ secure }));
        return redirect(res, '/');
      }

      if (p === '/logout' && req.method === 'POST') {
        res.setHeader('set-cookie', auth.clearCookie({ secure }));
        return redirect(res, '/login');
      }

      if (req.method !== 'GET') return send(res, { status: 405, type: 'text/plain', body: 'method not allowed' });

      if (p === '/healthz') return send(res, { status: 200, type: 'application/json', body: JSON.stringify({ ok: true }) });

      const authed = !auth.enabled || auth.hasSession(req);
      if (!authed) {
        if (PUBLIC_ASSETS.has(p)) return sendFile(res, p.slice(1));
        if (p.startsWith('/api')) return send(res, { status: 401, type: 'application/json', body: JSON.stringify({ error: 'não autenticado' }) });
        return redirect(res, '/login');
      }

      if (p.startsWith('/api')) {
        return send(res, await handleApi(handoff, p, url.searchParams, { designSystem }));
      }

      if (p === '/hub') return redirect(res, '/hub/');
      if (p.startsWith('/hub/')) return sendHubFile(res, decodeURIComponent(p.slice('/hub/'.length)) || 'index.html');

      return sendFile(res, p === '/' ? 'index.html' : p.slice(1));
    } catch (err) {
      if (err.status === 413) return send(res, { status: 413, type: 'text/plain', body: 'payload grande' });
      return send(res, { status: 500, type: 'application/json', body: JSON.stringify({ error: 'erro interno' }) });
    }
  });

  // Páginas do hub (fluxograma em /hub/, protótipo, handoff). Só autenticado; a pasta da app e o código do servidor ficam de fora.
  async function sendHubFile(res, rel) {
    const clean = path.posix.normalize(rel).replace(/^\/+/, '');
    const segments = clean.split('/');
    const denied = segments.some((s) => s.startsWith('.') || DENIED_HUB_DIRS.has(s));
    const ext = path.posix.extname(clean).toLowerCase();
    if (denied || clean.startsWith('..') || !HUB_TYPES[ext]) return send(res, { status: 404, type: 'text/plain', body: 'not found' });
    const file = path.resolve(hubRoot, clean);
    if (!file.startsWith(hubRoot + path.sep)) return send(res, { status: 404, type: 'text/plain', body: 'not found' });
    const body = await readFile(file).catch(() => null);
    if (!body) return send(res, { status: 404, type: 'text/plain', body: 'not found' });
    return send(res, { status: 200, type: HUB_TYPES[ext], body, headers: HUB_HEADERS });
  }

  async function sendFile(res, rel) {
    const file = path.resolve(publicDir, rel);
    if (!file.startsWith(publicDir + path.sep)) return send(res, { status: 404, type: 'text/plain', body: 'not found' });
    const body = await readFile(file).catch(() => null);
    if (!body) return send(res, { status: 404, type: 'text/plain', body: 'not found' });
    return send(res, { status: 200, type: TYPES[path.extname(file)] ?? 'application/octet-stream', body });
  }
}

function readBody(req, max) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > max) {
        reject(Object.assign(new Error('grande'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Atrás de proxy (Render, Fly etc.), o IP real vem em X-Forwarded-For. Só confie nele com TRUST_PROXY=1.
function clientIp(req) {
  if (process.env.TRUST_PROXY === '1') {
    const first = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim();
    if (first) return first;
  }
  return req.socket.remoteAddress ?? 'desconhecido';
}

function redirect(res, location) {
  res.writeHead(303, { location, ...SECURITY_HEADERS });
  res.end();
}

function send(res, { status, type, body, headers = {} }) {
  res.writeHead(status, { 'content-type': type, ...SECURITY_HEADERS, 'cache-control': type.startsWith('text/html') || type.startsWith('application/json') ? 'no-store' : 'public, max-age=300', ...headers });
  res.end(body);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const HOST = process.env.HOST ?? '127.0.0.1';
  const PORT = Number(process.env.PORT ?? 8800);
  if (!LOOPBACK.has(HOST) && !process.env.APP_PASSWORD) {
    console.error('Recuso subir em HOST não local sem APP_PASSWORD. Defina a senha do time ou use HOST=127.0.0.1.');
    process.exit(1);
  }
  const app = await createApp();
  app.listen(PORT, HOST, () => console.log(`Palmeiras Hub em http://${HOST}:${PORT} · login ${process.env.APP_PASSWORD ? 'ativo' : 'desligado (local)'}`));
}
