// Rotas da API JSON. Usa o mesmo núcleo de leitura do servidor MCP, então UI, API e Claude leem a mesma fonte.
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as hub from '../../mcp-server/src/hub.mjs';

const json = (status, body) => ({ status, type: 'application/json; charset=utf-8', body: JSON.stringify(body) });
const notFound = (what) => json(404, { error: `${what} não encontrado` });

// Raiz do hub (palmeiras-hub/), onde moram os CSS do DS e do protótipo referenciados pela marcação.
const hubRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DENIED_DIRS = new Set(['app', 'mcp-server', 'node_modules']);
// A marcação é um documento próprio (aberto como iframe). Sem script, e com estilos inline e fontes do Google.
const MARKUP_HEADERS = {
  'content-security-policy': "default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
};

// Os <link rel="stylesheet"> da marcação são relativos ao arquivo HTML. Embutimos o CSS local no documento,
// porque o iframe é sandboxed (origem opaca, sem cookies do login) e não consegue buscar esses arquivos.
async function inlineLocalStyles(html, markupFile) {
  let out = html;
  for (const tag of html.match(/<link\b[^>]*>/g) ?? []) {
    const href = tag.match(/\bhref="([^"]+)"/)?.[1];
    if (!href || !/\brel="stylesheet"/.test(tag) || /^(https?:|\/\/|data:)/.test(href)) continue;
    const file = path.resolve(path.dirname(markupFile), href.split('?')[0]);
    const segments = path.relative(hubRoot, file).split(path.sep);
    if (!file.startsWith(hubRoot + path.sep) || path.extname(file) !== '.css') continue;
    if (segments.some((s) => s.startsWith('.') || DENIED_DIRS.has(s))) continue;
    const css = await readFile(file, 'utf8').catch(() => null);
    if (css !== null) out = out.replace(tag, () => `<style>\n${css}\n</style>`);
  }
  return out;
}

// Imagens relativas (logo, bandeira, miniaturas) também não resolvem no documento. Embutimos como data: URI,
// porque o iframe não envia cookies e o CSP só libera data: para imagens.
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const MAX_INLINE_IMAGE_BYTES = 400_000;
async function inlineLocalImages(html, markupFile) {
  let out = html;
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!src || /^(https?:|\/\/|data:)/.test(src)) continue;
    const file = path.resolve(path.dirname(markupFile), src.split('?')[0]);
    const segments = path.relative(hubRoot, file).split(path.sep);
    if (!file.startsWith(hubRoot + path.sep) || !MIME[path.extname(file).toLowerCase()]) continue;
    if (segments.some((s) => s.startsWith('.') || DENIED_DIRS.has(s))) continue;
    const bytes = await readFile(file).catch(() => null);
    if (bytes === null || bytes.length > MAX_INLINE_IMAGE_BYTES) continue;
    const uri = `data:${MIME[path.extname(file).toLowerCase()]};base64,${bytes.toString('base64')}`;
    out = out.replace(tag, () => tag.replace(`src="${src}"`, `src="${uri}"`));
  }
  return out;
}

export async function handleApi(handoff, pathname, searchParams, { designSystem, versioning } = {}) {
  const parts = pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [head, ...rest] = parts;

  if (head === 'info' && !rest.length) return json(200, await hub.hubStats(handoff));

  if (head === 'design-system' && !rest.length) return json(200, designSystem);

  if (head === 'validacao' && !rest.length) {
    if (!versioning) return notFound('Versionamento');
    return json(200, await versioning.pending());
  }

  if (head === 'screens' && !rest.length) {
    const rows = hub.listScreens(handoff, {
      lane: searchParams.get('lane') || undefined,
      status: searchParams.get('status') || undefined,
      query: searchParams.get('query') || undefined,
    });
    return json(200, { total: rows.length, screens: rows });
  }

  if (head === 'screens' && rest.length >= 1) {
    const code = rest[0];
    const sub = rest[1];
    if (!sub) {
      const r = await hub.getScreenSpec(handoff, code);
      if (!r) return notFound(`Tela ${code}`);
      return json(200, { node: r.node, spec: r.spec, variants: r.node.variants ?? [] });
    }
    if (sub === 'historico') {
      if (!versioning) return notFound('Versionamento');
      const r = await versioning.history(code);
      return r ? json(200, r) : notFound(`Tela ${code}`);
    }
    if (sub === 'components') {
      const r = await hub.getScreenComponents(handoff, code);
      if (!r) return notFound(`Tela ${code}`);
      if (r.raw === null) return notFound(`components.json de ${code}`);
      return json(200, JSON.parse(r.raw));
    }
    if (sub === 'markup') {
      const r = await hub.getScreenMarkup(handoff, code, searchParams.get('variant') || undefined);
      if (!r) return notFound(`Tela ${code}`);
      if (r.error) return json(404, { error: r.error, variants: r.variants });
      return json(200, { variant: r.variant, html: r.html, truncated: r.truncated });
    }
    if (sub === 'documento') {
      const r = await hub.getScreenMarkup(handoff, code, searchParams.get('variant') || undefined);
      if (!r) return notFound(`Tela ${code}`);
      if (r.error) return json(404, { error: r.error, variants: r.variants });
      const file = path.join(handoff.dir, r.variant.file.replace(/^handoff\//, ''));
      const body = await inlineLocalImages(await inlineLocalStyles(r.html, file), file);
      return { status: 200, type: 'text/html; charset=utf-8', body, headers: MARKUP_HEADERS };
    }
    return notFound(`Recurso ${sub}`);
  }

  if (head === 'flow' && rest.length === 1) {
    const r = hub.getFlow(handoff, rest[0]);
    return r ? json(200, r) : notFound(`Tela ${rest[0]}`);
  }

  if (head === 'docs' && !rest.length) {
    return json(200, {
      general: ['index', 'readme', 'dados', 'componentes', 'componentes-estrangeiro'],
      components: handoff.componentDocs.slice().sort(),
    });
  }

  if (head === 'decisions') {
    const r = hub.getDecision(handoff, rest[0]);
    return r ? json(200, r) : notFound(`Decisão ${rest[0]}`);
  }

  if (head === 'search') {
    const q = searchParams.get('q') ?? '';
    if (q.trim().length < 2) return json(400, { error: 'Informe pelo menos 2 caracteres em q' });
    const limit = Math.min(Number(searchParams.get('limit') ?? 20) || 20, 100);
    const hits = await hub.search(handoff, q, limit);
    return json(200, { query: q, total: hits.length, hits });
  }

  if (head === 'docs' && rest.length === 1) {
    const r = await hub.getGeneralDoc(handoff, rest[0]);
    if (!r) return notFound(`Documento ${rest[0]}`);
    if (r.text === null) return notFound(`Arquivo do documento ${rest[0]}`);
    return json(200, { name: r.name, text: r.text });
  }

  return notFound(`Rota ${pathname}`);
}
