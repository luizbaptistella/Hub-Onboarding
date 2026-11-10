// Visão do Design System no hub: tokens, componentes e regras. Lê os arquivos do repositório
// (design-system/ e handoff/) a cada inicialização do servidor; nada é copiado.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const TOKENS_FILE = 'design-system/tokens-onboarding.css';
const RULES_FILE = 'design-system/DESIGN-SYSTEM.md';

// Grupos na ordem em que aparecem. O prefixo do nome do token (ex.: --green-800) define o grupo.
const TOKEN_GROUPS = [
  ['green', 'Paleta · verde'],
  ['gold', 'Paleta · dourado'],
  ['gray', 'Paleta · cinza'],
  ['neutral', 'Paleta · neutro'],
  ['blue', 'Paleta · azul'],
  ['red', 'Paleta · vermelho'],
  ['amber', 'Paleta · âmbar'],
  ['black', 'Paleta · preto'],
  ['brand', 'Cores · marca'],
  ['accent', 'Cores · destaque'],
  ['text', 'Cores · texto'],
  ['bg', 'Cores · fundo'],
  ['border', 'Cores · borda'],
  ['line', 'Cores · linha'],
  ['icon', 'Cores · ícone'],
  ['status', 'Cores · status'],
  ['font', 'Tipografia · famílias e pesos'],
  ['type', 'Tipografia · estilos'],
  ['size', 'Tamanhos'],
  ['space', 'Espaçamento'],
  ['radius', 'Raio'],
  ['shadow', 'Sombra'],
  ['camera', 'Específicos · câmera'],
  ['carousel', 'Específicos · carrossel'],
  ['journey', 'Específicos · jornada'],
];
const GROUP_TITLES = new Map(TOKEN_GROUPS);
const COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i;

// hubRoot = palmeiras-hub/ (dono de design-system/); handoffDir = pasta handoff/ (componentes e README).
export async function loadDesignSystem({ hubRoot, handoffDir, decisions }) {
  const [tokensCss, rulesMd, readme] = await Promise.all([
    readText(path.join(hubRoot, TOKENS_FILE)),
    readText(path.join(hubRoot, RULES_FILE)),
    readText(path.join(handoffDir, 'README.md')),
  ]);
  return {
    tokens: parseTokens(tokensCss),
    rules: parseRules({ rulesMd, readme, decisions }),
    componentDocsDir: path.join(handoffDir, 'componentes'),
  };
}

export async function getComponents(ds, componentDocs) {
  const items = [];
  for (const name of componentDocs) {
    const md = await readText(path.join(ds.componentDocsDir, `${name}.md`));
    const uses = md.match(/Usado em (\d+) telas?, (\d+) instâncias?\./);
    items.push({
      name,
      screens: uses ? Number(uses[1]) : null,
      instances: uses ? Number(uses[2]) : null,
      props: parseProps(md),
    });
  }
  items.sort((a, b) => (b.instances ?? 0) - (a.instances ?? 0) || a.name.localeCompare(b.name));
  return { total: items.length, items };
}

export function buildDesignSystemPayload(ds, components) {
  return {
    sources: { tokens: TOKENS_FILE, components: 'handoff/componentes/', rules: [RULES_FILE, 'handoff/README.md'] },
    tokens: ds.tokens,
    components,
    rules: ds.rules,
  };
}

async function readText(file) {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return '';
  }
}

// ── Tokens ─────────────────────────────────────────────────────────────

export function parseTokens(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const raw = new Map();
  for (const m of clean.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) raw.set(m[1], m[2].trim());

  const resolve = (value, depth = 0) => {
    const ref = value.match(/^var\(--([a-z0-9-]+)\)$/i);
    if (ref && raw.has(ref[1]) && depth < 8) return resolve(raw.get(ref[1]), depth + 1);
    return value;
  };

  const groups = new Map(TOKEN_GROUPS.map(([id]) => [id, []]));
  const other = [];
  for (const [name, value] of raw) {
    const prefix = name.split('-')[0];
    const token = {
      name: `--${name}`,
      value,
      resolved: resolve(value),
      alias: value.match(/^var\(--([a-z0-9-]+)/i)?.[1] ?? null,
    };
    token.isColor = COLOR_RE.test(token.resolved);
    (groups.get(prefix) ?? other).push(token);
  }

  const out = [];
  for (const [id, title] of TOKEN_GROUPS) {
    const items = groups.get(id);
    if (items.length) out.push({ id, title, items });
  }
  if (other.length) out.push({ id: 'outros', title: 'Outros', items: other });
  const version = css.match(/DS publicado (v\d+ \([^)]*\))/)?.[1] ?? null;
  return { total: raw.size, version, groups: out };
}

// ── Componentes ────────────────────────────────────────────────────────

// Lê a tabela da seção "## Props" como { columns, rows }, mantendo as colunas do próprio cabeçalho.
export function parseProps(md) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => /^## Props\s*$/.test(l));
  if (start < 0) return { columns: [], rows: [] };
  const table = [];
  for (let i = start + 1; i < lines.length && !/^## /.test(lines[i]); i++) {
    if (/^\s*\|/.test(lines[i])) table.push(lines[i]);
  }
  if (table.length < 2) return { columns: [], rows: [] };
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => plain(c));
  const [header, , ...rows] = table; // a segunda linha é o separador |---|
  return { columns: cells(header), rows: rows.map(cells) };
}

// ── Regras ─────────────────────────────────────────────────────────────

export function parseRules({ rulesMd, readme, decisions }) {
  return {
    conventions: bulletsUnder(readme, '## Convenções'),
    attention: numberedUnder(rulesMd, '## Pontos de atenção'),
    decisions: Object.entries(decisions ?? {})
      .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
      .map(([id, text]) => ({ id, text })),
  };
}

function sectionLines(md, heading) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.trim().startsWith(heading));
  if (start < 0) return [];
  const body = [];
  for (let i = start + 1; i < lines.length && !/^## /.test(lines[i]); i++) body.push(lines[i]);
  return body;
}

const plain = (s) => s.replace(/`/g, '').replace(/\*\*/g, '').trim();

function bulletsUnder(md, heading) {
  return sectionLines(md, heading).filter((l) => /^\s*-\s+/.test(l)).map((l) => plain(l.replace(/^\s*-\s+/, '')));
}

function numberedUnder(md, heading) {
  const items = [];
  for (const line of sectionLines(md, heading)) {
    const m = line.match(/^(\d+)\.\s+(.*)$/);
    if (m) {
      items.push({ n: Number(m[1]), text: m[2] });
    } else if (items.length && line.trim()) {
      items[items.length - 1].text += ` ${line.trim()}`;
    }
  }
  return items.map(({ n, text }) => {
    const t = text.match(/^\*\*(.+?)\*\*\s*(?:[—–-]\s*)?(.*)$/);
    return t ? { n, title: plain(t[1]), body: plain(t[2]) } : { n, title: '', body: plain(text) };
  });
}
