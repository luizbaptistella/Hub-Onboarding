// Visão do Design System no hub: tokens, componentes e regras. Lê os arquivos do repositório
// (design-system/, ds/ e handoff/) na inicialização do servidor; nada é copiado.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const TOKENS_FILE = 'design-system/tokens-onboarding.css';
const RULES_FILE = 'design-system/DESIGN-SYSTEM.md';
const BUNDLE_FILE = 'ds/bundle.js';
const MAX_EXAMPLES = 12;

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
const COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i;

// Agrupamento da barra lateral dos componentes (organização nossa, não vem do DS).
const COMPONENT_CATEGORIES = [
  ['Ações', ['Button', 'TextLink', 'SocialButton', 'ActionRow']],
  ['Formulário', ['TextField', 'Select', 'Checkbox', 'OTPInput', 'OptionCard', 'DocumentOption']],
  ['Navegação', ['AppHeader', 'Tabs', 'JourneyStepper', 'ProfileMenu']],
  ['Conteúdo', ['PageHeading', 'ContactRow', 'List', 'ListItem', 'Badge', 'Image', 'ResultHero', 'DividerText', 'LegalFooter', 'Tutorial']],
  ['Feedback', ['Alert', 'Toast', 'LoadingState', 'StatusScreen', 'RedirectCountdown', 'ResendPrompt']],
  ['Biometria', ['FaceCapture']],
];
const CATEGORY_INDEX = new Map(COMPONENT_CATEGORIES.flatMap(([cat, names], i) => names.map((n) => [n, { cat, i }])));

// hubRoot = palmeiras-hub/ (dono de design-system/ e ds/); handoffDir = pasta handoff/.
export async function loadDesignSystem({ hubRoot, handoffDir, decisions }) {
  const [tokensCss, rulesMd, readme, bundleJs] = await Promise.all([
    readText(path.join(hubRoot, TOKENS_FILE)),
    readText(path.join(hubRoot, RULES_FILE)),
    readText(path.join(handoffDir, 'README.md')),
    readText(path.join(hubRoot, BUNDLE_FILE)),
  ]);
  return {
    tokens: parseTokens(tokensCss),
    rules: parseRules({ rulesMd, readme, decisions }),
    bundleComponents: parseBundleManifest(bundleJs),
    handoffDir,
  };
}

export async function getComponents(ds, componentDocs) {
  const instances = await loadInstances(ds.handoffDir);
  const items = [];
  for (const name of componentDocs) {
    const md = await readText(path.join(ds.handoffDir, 'componentes', `${name}.md`));
    const uses = md.match(/Usado em (\d+) telas?, (\d+) instâncias?\./);
    const insts = instances.get(name) ?? [];
    const cat = CATEGORY_INDEX.get(name);
    const sections = parseSections(md);
    const examples = examplesOf(insts);
    items.push({
      name,
      category: cat?.cat ?? 'Outros',
      screens: uses ? Number(uses[1]) : null,
      instances: uses ? Number(uses[2]) : null,
      inBundle: ds.bundleComponents.has(name),
      jsx: insts[0]?.jsx ?? examplesFromJsx(sections, name)[0]?.jsx ?? null,
      // Sem estados nos components.json (ex.: ActionRow), usa os JSX da ficha como exemplos.
      examples: examples.length ? examples : examplesFromJsx(sections, name),
      intro: blocksOf(introLines(md)),
      sections,
    });
  }
  items.sort((a, b) => (CATEGORY_INDEX.get(a.name)?.i ?? 99) - (CATEGORY_INDEX.get(b.name)?.i ?? 99) || a.name.localeCompare(b.name));
  return { total: items.length, categories: COMPONENT_CATEGORIES.map(([c]) => c), items };
}

export function buildDesignSystemPayload(ds, components) {
  return {
    sources: { tokens: TOKENS_FILE, bundle: BUNDLE_FILE, components: 'handoff/componentes/', rules: [RULES_FILE, 'handoff/README.md'] },
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

const plain = (s) => s.replace(/`/g, '').replace(/\*\*/g, '').trim();

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

// Nomes exportados pelo bundle do DS, lidos do manifesto da primeira linha (/* @ds-bundle: {...} */).
export function parseBundleManifest(js) {
  const m = js.match(/@ds-bundle:\s*(\{.*?\})\s*\*\//s);
  if (!m) return new Set();
  try {
    return new Set(JSON.parse(m[1]).components.map((c) => c.name));
  } catch {
    return new Set();
  }
}

// Instâncias de cada componente nos components.json das telas: JSX e estados com as props reais.
async function loadInstances(handoffDir) {
  const map = new Map();
  let dirs = [];
  try {
    dirs = await readdir(handoffDir, { withFileTypes: true });
  } catch {
    return map;
  }
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    let json;
    try {
      json = JSON.parse(await readFile(path.join(handoffDir, d.name, 'components.json'), 'utf8'));
    } catch {
      continue;
    }
    for (const inst of json.instances ?? []) {
      if (!inst.component) continue;
      if (!map.has(inst.component)) map.set(inst.component, []);
      map.get(inst.component).push({ screen: json.screen ?? d.name, jsx: inst.jsx ?? null, states: inst.renderStates ?? [] });
    }
  }
  return map;
}

// Exemplos renderizáveis: estados únicos (por props) das instâncias, a começar pela primeira tela.
export function examplesOf(insts) {
  const seen = new Set();
  const out = [];
  for (const inst of insts) {
    for (const st of inst.states) {
      const props = st.props ?? {};
      const key = JSON.stringify(props);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ label: `${inst.screen} · ${st.label ?? 'estado'}`, props });
      if (out.length >= MAX_EXAMPLES) return out;
    }
  }
  return out;
}

// Exemplos a partir do JSX da tabela "Instâncias no fluxo" da ficha, quando o components.json não traz estados.
export function examplesFromJsx(sections, name) {
  const seen = new Set();
  const out = [];
  const table = sections.find((s) => s.title.startsWith('Instâncias'))?.blocks.find((b) => b.type === 'table' && b.columns.includes('JSX'));
  if (!table) return out;
  const jsxAt = table.columns.indexOf('JSX');
  for (const row of table.rows) {
    const parsed = parseJsx(row[jsxAt] ?? '');
    if (!parsed || parsed.component !== name) continue;
    const key = JSON.stringify(parsed.props);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ label: `${row[0]} · instância ${row[1]}`, props: parsed.props, jsx: row[jsxAt] });
    if (out.length >= MAX_EXAMPLES) break;
  }
  return out;
}

// Lê um JSX simples, como <SocialButton provider="google" layout="icon" /> ou <DividerText>texto</DividerText>.
export function parseJsx(jsx) {
  const m = jsx.trim().match(/^<([A-Z]\w*)([^>]*?)\/?>(?:([^<]*)<\/\1>)?/);
  if (!m) return null;
  const props = {};
  for (const [, key, str, expr] of m[2].matchAll(/([\w-]+)(?:=(?:"([^"]*)"|\{([^}]*)\}))?/g)) {
    if (str !== undefined) props[key] = str;
    else if (expr !== undefined) {
      const v = expr.trim();
      if (v === 'true' || v === 'false') props[key] = v === 'true';
      else if (/^-?\d+(\.\d+)?$/.test(v)) props[key] = Number(v);
    } else props[key] = true;
  }
  if (m[3] && m[3].trim()) props.children = m[3].trim();
  return { component: m[1], props };
}

// Quebra a ficha (md) em seções com blocos: tabela, lista ou texto. Preserva a ordem do arquivo.
export function parseSections(md) {
  const sections = [];
  let cur = null;
  for (const line of md.split('\n')) {
    const h = line.match(/^## (.+?)\s*$/);
    if (h) {
      cur = { title: plain(h[1]), lines: [] };
      sections.push(cur);
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  return sections.map((s) => ({ title: s.title, blocks: blocksOf(s.lines) })).filter((s) => s.blocks.length);
}

// Texto antes da primeira seção "## " (sem o título "# ").
function introLines(md) {
  const lines = md.split('\n');
  const end = lines.findIndex((l) => /^## /.test(l));
  return lines.slice(0, end < 0 ? lines.length : end).filter((l) => !/^# /.test(l));
}

function blocksOf(lines) {
  const blocks = [];
  const isTable = (l) => /^\s*\|/.test(l);
  const isBullet = (l) => /^\s*[-*]\s+/.test(l);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (isTable(line)) {
      const table = [];
      while (i < lines.length && isTable(lines[i])) table.push(lines[i++]);
      if (table.length >= 2) {
        const cells = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => plain(c));
        const [header, , ...rows] = table; // a segunda linha é o separador |---|
        blocks.push({ type: 'table', columns: cells(header), rows: rows.map(cells) });
      }
    } else if (isBullet(line)) {
      const items = [];
      while (i < lines.length && isBullet(lines[i])) items.push(plain(lines[i++].replace(/^\s*[-*]\s+/, '')));
      blocks.push({ type: 'list', items });
    } else if (line.trim()) {
      const para = [];
      while (i < lines.length && lines[i].trim() && !isTable(lines[i]) && !isBullet(lines[i])) para.push(lines[i++]);
      blocks.push({ type: 'text', text: plain(para.join(' ')) });
    } else {
      i++;
    }
  }
  return blocks;
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
