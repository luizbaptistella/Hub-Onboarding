// Rotas da API JSON. Usa o mesmo núcleo de leitura do servidor MCP, então UI, API e Claude leem a mesma fonte.
import * as hub from '../../mcp-server/src/hub.mjs';

const json = (status, body) => ({ status, type: 'application/json; charset=utf-8', body: JSON.stringify(body) });
const notFound = (what) => json(404, { error: `${what} não encontrado` });

export async function handleApi(handoff, pathname, searchParams) {
  const parts = pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [head, ...rest] = parts;

  if (head === 'info' && !rest.length) return json(200, await hub.hubStats(handoff));

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
