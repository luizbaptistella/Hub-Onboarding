// Leitura do handoff do Palmeiras · Onboarding. Nada é copiado: o servidor lê a pasta handoff/ do repositório.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const MAX_MARKUP_CHARS = 120_000;

export async function loadHub(handoffDir) {
  const dir = path.resolve(handoffDir);
  const flow = JSON.parse(await readFile(path.join(dir, 'flow.json'), 'utf8'));
  const nodes = flow.nodes;
  const byCode = new Map(nodes.map((n) => [n.code, n]));
  const componentDocs = await listComponentDocs(dir);
  return {
    dir,
    flow,
    nodes,
    byCode,
    edges: flow.edges,
    decisions: flow.decisions ?? {},
    lanes: flow.lanes,
    componentDocs,
    _searchIndex: null,
  };
}

async function listComponentDocs(dir) {
  const compDir = path.join(dir, 'componentes');
  try {
    const files = await readdir(compDir);
    return files.filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
  } catch {
    return [];
  }
}

export function normalizeCode(code) {
  return String(code ?? '').trim().toUpperCase();
}

export function getNode(hub, code) {
  return hub.byCode.get(normalizeCode(code)) ?? null;
}

export function listScreens(hub, { lane, status, query } = {}) {
  const q = query ? foldText(query) : null;
  return hub.nodes
    .filter((n) => !lane || n.lane === lane)
    .filter((n) => !status || foldText(n.status).includes(foldText(status)))
    .filter((n) => !q || foldText(`${n.code} ${n.name} ${n.proto ?? ''}`).includes(q))
    .map((n) => ({
      code: n.code,
      type: n.type,
      name: n.name,
      lane: n.lane,
      status: n.status,
      figma: n.figma ?? null,
      folder: n.folder ?? null,
      variants: (n.variants ?? []).length,
      hasSpec: Boolean(n.folder),
    }));
}

async function readIfExists(file) {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return null;
  }
}

function folderOf(hub, node) {
  if (!node.folder) return null;
  return path.join(hub.dir, node.folder);
}

export async function getScreenSpec(hub, code) {
  const node = getNode(hub, code);
  if (!node) return null;
  const spec = await readIfExists(path.join(hub.dir, node.spec ? node.spec.replace(/^handoff\//, '') : `${node.folder}/spec.md`));
  if (spec === null) return { node, spec: null };
  return { node, spec };
}

export async function getScreenComponents(hub, code) {
  const node = getNode(hub, code);
  if (!node) return null;
  const rel = node.components ? node.components.replace(/^handoff\//, '') : `${node.folder}/components.json`;
  const raw = await readIfExists(path.join(hub.dir, rel));
  return { node, raw };
}

export async function getScreenMarkup(hub, code, variant) {
  const node = getNode(hub, code);
  if (!node) return null;
  const variants = node.variants ?? [];
  const chosen = variant
    ? variants.find((v) => v.id === variant || v.label === variant)
    : variants[0];
  if (!chosen) return { node, error: variant ? `Variante "${variant}" não existe nesta tela.` : 'Tela sem marcação.', variants };
  const html = await readIfExists(path.join(hub.dir, chosen.file.replace(/^handoff\//, '')));
  if (html === null) return { node, error: `Arquivo não encontrado: ${chosen.file}`, variants };
  const truncated = html.length > MAX_MARKUP_CHARS;
  return { node, variant: chosen, html: truncated ? html.slice(0, MAX_MARKUP_CHARS) : html, truncated, variants };
}

export function getFlow(hub, code) {
  const node = getNode(hub, code);
  if (!node) return null;
  const c = node.code;
  const name = (x) => hub.byCode.get(x)?.name ?? x;
  const incoming = hub.edges.filter((e) => e.dst === c).map((e) => ({ id: e.id, from: e.src, fromName: name(e.src), kind: e.kind, trigger: e.trigger, cond: e.cond ?? null }));
  const outgoing = hub.edges.filter((e) => e.src === c).map((e) => ({ id: e.id, to: e.dst, toName: name(e.dst), kind: e.kind, trigger: e.trigger, cond: e.cond ?? null }));
  const decisionIds = Object.keys(hub.decisions).filter((id) => hub.decisions[id].includes(c));
  return {
    code: c,
    name: node.name,
    lane: node.lane,
    status: node.status,
    incoming,
    outgoing,
    decisions: decisionIds.map((id) => ({ id, text: hub.decisions[id] })),
    kinds: hub.flow.kinds,
  };
}

export function getDecision(hub, id) {
  if (!id) return hub.decisions;
  const key = String(id).trim().toUpperCase();
  return hub.decisions[key] ? { id: key, text: hub.decisions[key] } : null;
}

// Documentos gerais do handoff: só nomes da lista permitida (sem caminho livre).
const GENERAL_DOCS = {
  index: 'INDEX.md',
  readme: 'README.md',
  dados: 'dados.md',
  componentes: 'componentes.md',
  'componentes-estrangeiro': 'componentes-estrangeiro.md',
};

export async function getGeneralDoc(hub, name) {
  const key = String(name ?? '').trim().toLowerCase();
  if (key.startsWith('componente:')) return getComponentDoc(hub, key.slice('componente:'.length));
  const file = GENERAL_DOCS[key];
  if (!file) return null;
  return { name: key, text: await readIfExists(path.join(hub.dir, file)) };
}

export async function getComponentDoc(hub, componentName) {
  const name = String(componentName ?? '').trim();
  const match = hub.componentDocs.find((d) => d.toLowerCase() === name.toLowerCase());
  if (!match) return null;
  return { name: match, text: await readIfExists(path.join(hub.dir, 'componentes', `${match}.md`)) };
}

// Busca simples por linhas em specs, components.json, documentos gerais e componentes.
export async function search(hub, query, limit = 20) {
  const q = foldText(String(query ?? '')).trim();
  if (!q) return [];
  const index = await buildSearchIndex(hub);
  const hits = [];
  for (const doc of index) {
    const lines = doc.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (foldText(lines[i]).includes(q)) {
        hits.push({ file: doc.file, screen: doc.screen ?? null, line: i + 1, text: lines[i].trim().slice(0, 300) });
        if (hits.length >= limit) return hits;
      }
    }
  }
  return hits;
}

async function buildSearchIndex(hub) {
  if (hub._searchIndex) return hub._searchIndex;
  const docs = [];
  for (const f of Object.values(GENERAL_DOCS)) {
    const text = await readIfExists(path.join(hub.dir, f));
    if (text) docs.push({ file: f, text });
  }
  for (const n of hub.nodes) {
    if (!n.folder) continue;
    const folder = folderOf(hub, n);
    for (const f of ['spec.md', 'components.json']) {
      const text = await readIfExists(path.join(folder, f));
      if (text) docs.push({ file: `${n.folder}/${f}`, screen: n.code, text });
    }
  }
  for (const c of hub.componentDocs) {
    const text = await readIfExists(path.join(hub.dir, 'componentes', `${c}.md`));
    if (text) docs.push({ file: `componentes/${c}.md`, text });
  }
  hub._searchIndex = docs;
  return docs;
}

export function foldText(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export async function hubStats(hub) {
  const s = await stat(hub.dir).catch(() => null);
  return {
    handoffDir: hub.dir,
    exists: Boolean(s),
    screens: hub.nodes.length,
    edges: hub.edges.length,
    decisions: Object.keys(hub.decisions).length,
    componentDocs: hub.componentDocs.length,
    lanes: hub.lanes.map((l) => ({ id: l.id, title: l.title })),
    artifact: hub.flow.artifact,
    figmaFile: hub.flow.figmaFile,
  };
}
