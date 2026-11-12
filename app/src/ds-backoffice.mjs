// DS do backoffice (Ellena) no hub. É um snapshot do artefato "[P - ELL] Backoffice" copiado para
// design-system-backoffice/ (tokens/, bundle.js, README.md, design-system.json). Lido na inicialização do servidor.
// Não é o DS Palmeiras · Onboarding: tem tokens em HSL (colors.css) e hex (ds-tokens.css) e outro manifesto de componentes.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'design-system-backoffice';

// Arquivos de tokens na ordem em que aparecem, com o título do grupo na tela.
const TOKEN_FILES = [
  ['tokens/colors.css', 'Cores · semânticas (HSL)'],
  ['tokens/ds-tokens.css', 'Cores · nativas --ds-* (hex)'],
  ['tokens/brand.css', 'Marca · site Ellena'],
  ['tokens/typography.css', 'Tipografia · escala'],
  ['tokens/spacing.css', 'Espaçamento, raio e layout'],
  ['tokens/effects.css', 'Sombras e efeitos'],
  ['tokens/motion.css', 'Movimento · durações e curvas'],
];

const THEMES = [
  { id: 'dark', name: 'Escuro' },
  { id: 'light', name: 'Claro' },
];

// Pastas de componentes do bundle (components/<pasta>/...) e o nome que aparece na tela.
const COMPONENT_GROUPS = {
  backoffice: 'Backoffice',
  core: 'Base',
  data: 'Dados',
  feedback: 'Feedback',
  forms: 'Formulários',
  layout: 'Layout',
  navigation: 'Navegação',
  overlays: 'Sobreposições',
  patterns: 'Padrões',
};

const COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i;
// Triplet HSL do colors.css: "198.6 38.9% 37.3%" (sem hsl()). Vira hsl(...) para o navegador.
const HSL_TRIPLET_RE = /^-?[\d.]+\s+[\d.]+%\s+[\d.]+%$/;

// hubRoot = ellena-hub/
export async function loadBackofficeDs({ hubRoot }) {
  const base = path.join(hubRoot, DIR);
  const [title, readme, bundleJs, ...css] = await Promise.all([
    readJsonTitle(path.join(base, 'design-system.json')),
    readText(path.join(base, 'README.md')),
    readText(path.join(base, 'bundle.js')),
    ...TOKEN_FILES.map(([file]) => readText(path.join(base, file))),
  ]);
  return {
    title,
    tokens: parseBackofficeTokens(TOKEN_FILES.map(([, group], i) => ({ group, css: css[i] }))),
    components: parseBackofficeComponents(bundleJs),
    rules: parseBackofficeRules(readme),
  };
}

async function readText(file) {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return '';
  }
}

async function readJsonTitle(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8')).title ?? 'Design System';
  } catch {
    return 'Design System';
  }
}

// ── Tokens ─────────────────────────────────────────────────────────────

// Blocos "seletor { declarações }" de um CSS. Comentários saem antes; @keyframes aninhados são ignorados.
function cssBlocks(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: m[1].split(',').map((s) => s.trim()),
    decls: [...m[2].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((d) => [d[1], d[2].trim()]),
  }));
}

const isDarkSelector = (s) => s === ':root' || s === '.dark' || s === '[data-theme="dark"]';
const isLightSelector = (s) => s === '[data-theme="light"]' || s === '.light';

// Resolve var(--nome) (inclusive dentro de hsl(...)) contra o mapa do tema; limite de profundidade evita laços.
function resolveValue(value, map, depth = 0) {
  if (depth > 8) return value;
  return value.replace(/var\(--([a-z0-9-]+)(?:,[^)]*)?\)/gi, (m, name) => (map.has(name) ? resolveValue(map.get(name), map, depth + 1) : m));
}

const asCss = (v) => (HSL_TRIPLET_RE.test(v) ? `hsl(${v})` : v);

// css: [{ group, css }] na ordem dos arquivos. Cada nome aparece só uma vez (vale o primeiro arquivo).
export function parseBackofficeTokens(files) {
  const seen = new Set();
  const dark = new Map(); // nome → valor cru do tema escuro (base)
  const light = new Map(); // nome → valor cru do tema claro (sobrescreve o escuro)
  const groups = [];

  for (const { group, css } of files) {
    const items = [];
    const fileDark = new Map();
    const fileLight = new Map();
    for (const block of cssBlocks(css)) {
      for (const [name, value] of block.decls) {
        if (block.selectors.some(isDarkSelector)) fileDark.set(name, value);
        if (block.selectors.some(isLightSelector)) fileLight.set(name, value);
      }
    }
    for (const [name, value] of fileDark) {
      if (!seen.has(name)) {
        dark.set(name, value);
        items.push({ name, dark: value });
      }
      seen.add(name);
    }
    for (const [name, value] of fileLight) if (!light.has(name)) light.set(name, value);
    if (items.length) groups.push({ group, items });
  }

  // Valores por tema. O claro usa o próprio valor quando redefine e o escuro quando não.
  const themeMaps = {
    dark,
    light: new Map([...dark, ...[...light].filter(([k]) => dark.has(k))]),
  };
  const resolvedByTheme = Object.fromEntries(THEMES.map((t) => [t.id, new Map([...themeMaps[t.id]].map(([k, v]) => [k, asCss(resolveValue(v, themeMaps[t.id]))]))]));

  const outGroups = groups.map(({ group, items }, i) => ({
    id: `g${i + 1}`,
    title: group,
    items: items.map((t) => {
      const resolved = resolvedByTheme.dark.get(t.name) ?? t.dark;
      const alias = t.dark.match(/^var\(--([a-z0-9-]+)/i)?.[1] ?? null;
      return {
        name: `--${t.name}`,
        value: t.dark,
        resolved,
        alias,
        isColor: COLOR_RE.test(resolved),
      };
    }),
  }));

  const total = outGroups.reduce((n, g) => n + g.items.length, 0);
  const themes = THEMES.map((t) => ({
    id: t.id,
    name: t.name,
    values: Object.fromEntries([...resolvedByTheme[t.id]]),
  }));
  return { total, version: null, groups: outGroups, themes };
}

// ── Componentes ────────────────────────────────────────────────────────

// Manifesto do bundle: /* @ds-bundle: {...} */ na primeira linha, com nome e arquivo de cada componente.
export function parseBackofficeComponents(js) {
  const m = js.match(/@ds-bundle:\s*(\{.*?\})\s*\*\//s);
  let list = [];
  if (m) {
    try {
      list = JSON.parse(m[1]).components ?? [];
    } catch {
      list = [];
    }
  }
  const items = list.map((c) => {
    const folder = c.sourcePath?.split('/')[1] ?? 'outros';
    return { name: c.name, category: COMPONENT_GROUPS[folder] ?? 'Outros', file: c.sourcePath ?? null };
  });
  const categories = [...new Set([...Object.values(COMPONENT_GROUPS), 'Outros'])].filter((c) => items.some((i) => i.category === c));
  return { total: items.length, categories, items };
}

// ── Regras ─────────────────────────────────────────────────────────────

const plain = (s) => s.replace(/`/g, '').replace(/\*\*/g, '').trim();

// Itens "- " de uma seção do README (até o próximo título do mesmo nível ou superior). Linhas de continuação entram no item.
function bulletsUnder(md, heading) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start < 0) return [];
  const level = heading.match(/^#+/)[0].length;
  const items = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const h = line.match(/^(#+)\s/);
    if (h && h[1].length <= level) break;
    if (/^\s*-\s+/.test(line)) items.push(line.replace(/^\s*-\s+/, ''));
    else if (items.length && line.trim()) items[items.length - 1] += ` ${line.trim()}`;
  }
  return items;
}

export function parseBackofficeRules(md) {
  const attention = bulletsUnder(md, '## Caveats').map((text, i) => {
    const t = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
    return t ? { n: i + 1, title: plain(t[1]), body: plain(t[2]) } : { n: i + 1, title: '', body: plain(text) };
  });
  const additions = bulletsUnder(md, '### Intentional additions').map((text, i) => ({ id: `A${i + 1}`, text: plain(text) }));
  const adaptations = bulletsUnder(md, '### Intentional omissions / adaptations').map((text, i) => ({ id: `O${i + 1}`, text: plain(text) }));
  return {
    conventions: bulletsUnder(md, '## CONTENT FUNDAMENTALS').map(plain),
    attention,
    decisions: [...additions, ...adaptations],
  };
}

export function buildBackofficePayload(ds) {
  return {
    title: ds.title,
    sources: { tokens: `${DIR}/tokens/`, bundle: `${DIR}/bundle.js`, rules: `${DIR}/README.md` },
    tokens: ds.tokens,
    components: ds.components,
    rules: ds.rules,
  };
}
