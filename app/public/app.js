// Interface do hub. Conteúdo sempre via textContent (nada de innerHTML com dados do handoff).
const view = document.getElementById('view');
const qInput = document.getElementById('q');
const laneSelect = document.getElementById('lane');

const api = async (path) => {
  const r = await fetch(path, { headers: { accept: 'application/json' } });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body.error || `Erro ${r.status}`);
  return body;
};

const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c != null) node.append(c.nodeType ? c : document.createTextNode(String(c)));
  return node;
};

const statusBadge = (s) => el('span', { class: /lacuna|proposta|sem-figma/.test(s) ? 'badge warn' : 'badge' }, s);

async function loadLanes() {
  const info = await api('/api/info');
  for (const l of info.lanes) laneSelect.append(el('option', { value: l.id }, l.title));
}

async function renderList() {
  const query = qInput.value.trim();
  const lane = laneSelect.value;
  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (lane) params.set('lane', lane);
  const { total, screens } = await api(`/api/screens?${params}`);
  const groups = new Map();
  for (const s of screens) {
    if (!groups.has(s.lane)) groups.set(s.lane, []);
    groups.get(s.lane).push(s);
  }
  const children = [
    el('h1', {}, 'Telas do fluxo'),
    el('p', { class: 'sub' }, `${total} itens · telas, decisões e lacunas`),
  ];
  if (query.length >= 2) children.push(await searchBlock(query));
  for (const [laneId, items] of groups) {
    children.push(el('div', { class: 'lane' }, laneId));
    children.push(el('div', { class: 'cards' }, items.map((s) => el('a', { class: 'card', href: `#/tela/${encodeURIComponent(s.code)}` },
      el('div', { class: 'code' }, s.code), el('div', { class: 'name' }, s.name), statusBadge(s.status)))));
  }
  view.replaceChildren(...children);
}

async function searchBlock(query) {
  const { total, hits } = await api(`/api/search?q=${encodeURIComponent(query)}&limit=30`);
  return el('section', {}, el('div', { class: 'lane' }, `Texto no handoff · ${total} resultado(s)`),
    hits.map((h) => el('div', { class: 'hit' }, el('div', { class: 'code' }, `${h.file}:${h.line}`), el('div', {}, h.text))));
}

async function renderScreen(code) {
  view.replaceChildren(el('p', { class: 'muted' }, 'Carregando…'));
  let data;
  try {
    data = await api(`/api/screens/${encodeURIComponent(code)}`);
  } catch (err) {
    view.replaceChildren(el('a', { class: 'back', href: '#/' }, '← Todas as telas'), el('p', { class: 'error' }, err.message));
    return;
  }
  const { node, spec } = data;
  const tabs = {
    spec: () => el('pre', {}, spec ?? 'Esta tela não tem spec.md.'),
    componentes: async () => el('pre', {}, JSON.stringify(await api(`/api/screens/${encodeURIComponent(code)}/components`), null, 2)),
    fluxo: async () => flowView(await api(`/api/flow/${encodeURIComponent(code)}`)),
    marcacao: async () => markupView(code),
  };
  const labels = { spec: 'Spec', componentes: 'Componentes', fluxo: 'Fluxo', marcacao: 'Marcação' };
  const content = el('div', {});
  const buttons = Object.keys(tabs).map((key) => el('button', { role: 'tab', 'aria-selected': 'false', 'data-tab': key }, labels[key]));
  const select = async (key) => {
    buttons.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === key)));
    content.replaceChildren(el('p', { class: 'muted' }, 'Carregando…'));
    try {
      content.replaceChildren(await tabs[key]());
    } catch (err) {
      content.replaceChildren(el('p', { class: 'error' }, err.message));
    }
  };
  buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.tab)));
  view.replaceChildren(
    el('a', { class: 'back', href: '#/' }, '← Todas as telas'),
    el('h1', {}, `${node.code} · ${node.name}`),
    el('p', { class: 'sub' }, statusBadge(node.status), ' ', node.lane, node.figma ? ` · Figma ${node.figma}` : ''),
    el('div', { class: 'tabs', role: 'tablist' }, buttons),
    content,
  );
  select(node.spec ? 'spec' : 'fluxo');
}

function flowView(flow) {
  const list = (items, render) => items.length ? el('ul', { class: 'edges' }, items.map(render)) : el('p', { class: 'muted' }, 'Nenhuma.');
  return el('div', { class: 'cols' },
    el('section', {}, el('h2', { class: 'lane' }, 'Entradas'), list(flow.incoming, (e) => el('li', {}, el('strong', {}, `${e.from} · ${e.fromName}`), el('div', { class: 'muted' }, `${e.trigger ?? ''}${e.cond ? ` — ${e.cond}` : ''}`)))),
    el('section', {}, el('h2', { class: 'lane' }, 'Saídas'), list(flow.outgoing, (e) => el('li', {}, el('strong', {}, `${e.to} · ${e.toName}`), el('div', { class: 'muted' }, `${e.trigger ?? ''}${e.cond ? ` — ${e.cond}` : ''}`)))),
    flow.decisions.length ? el('section', { class: 'wide' }, el('h2', { class: 'lane' }, 'Decisões'), flow.decisions.map((d) => el('p', {}, el('strong', {}, d.id), ` ${d.text}`))) : null,
  );
}

async function markupView(code) {
  const data = await api(`/api/screens/${encodeURIComponent(code)}/markup`);
  // sandbox sem permissões: a marcação de referência não executa script nem acessa a origem.
  const frame = el('iframe', { class: 'preview', sandbox: '', title: `Marcação de ${code}` });
  frame.srcdoc = data.html;
  return el('div', {}, data.truncated ? el('p', { class: 'muted' }, 'Marcação cortada: arquivo maior que o limite.') : null, frame);
}

const GENERAL_DOC_LABELS = {
  index: 'Índice de telas',
  readme: 'Como ler o handoff',
  dados: 'Dados compartilhados',
  componentes: 'Inventário de componentes × telas',
  'componentes-estrangeiro': 'Componentes do fluxo de estrangeiro',
};

async function renderDocs() {
  const { general, components } = await api('/api/docs');
  const docBox = el('pre', { class: 'docbox' }, 'Escolha um documento acima.');
  const load = async (name, label) => {
    docBox.textContent = `Carregando ${label}…`;
    try {
      const doc = await api(`/api/docs/${encodeURIComponent(name)}`);
      docBox.textContent = doc.text;
    } catch (err) {
      docBox.textContent = err.message;
    }
  };
  const btn = (name, label) => el('button', { type: 'button', class: 'docbtn', onclick: () => load(name, label) }, label);
  view.replaceChildren(
    el('a', { class: 'back', href: '#/' }, '← Todas as telas'),
    el('h1', {}, 'Documentação do handoff'),
    el('p', { class: 'sub' }, 'Documentos gerais e documentação de cada componente. Para ver a documentação completa de uma tela, abra a tela pela lista.'),
    el('div', { class: 'lane' }, 'Documentos gerais'),
    el('div', { class: 'docbtns' }, general.map((n) => btn(n, GENERAL_DOC_LABELS[n] ?? n))),
    el('div', { class: 'lane' }, `Componentes (${components.length})`),
    el('div', { class: 'docbtns' }, components.map((c) => btn(`componente:${c}`, c))),
    docBox,
  );
}

// ── Design System: tokens, componentes e regras (dados de /api/design-system) ──

let dsData = null;
const loadDs = async () => (dsData ??= await api('/api/design-system'));
const DS_TABS = [['tokens', 'Tokens'], ['componentes', 'Componentes'], ['regras', 'Regras']];
// Cor só vai para o estilo se for um valor de cor válido; o resto do texto nunca vira HTML.
const COLOR_VALUE = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i;

// Esconde os itens que não contêm o texto (e os grupos que ficam vazios).
function filterItems(root, q, groupSelector) {
  const items = root.querySelectorAll('[data-search]');
  for (const item of items) item.hidden = Boolean(q) && !item.dataset.search.includes(q);
  if (groupSelector) {
    for (const g of root.querySelectorAll(groupSelector)) g.hidden = Boolean(q) && !g.querySelector('[data-search]:not([hidden])');
  }
}

function swatchGrid(items) {
  return el('div', { class: 'swatches' }, items.map((t) => {
    const chip = el('span', { class: 'swatch', 'aria-hidden': 'true' });
    if (COLOR_VALUE.test(t.resolved)) chip.style.background = t.resolved;
    return el('div', { class: 'swatch-item', 'data-search': `${t.name} ${t.value} ${t.resolved}`.toLowerCase() },
      chip,
      el('div', { class: 'swatch-text' }, el('code', {}, t.name), el('div', { class: 'muted small' }, t.alias ? `→ ${t.alias}` : t.value)));
  }));
}

function tokenTable(items) {
  return el('div', { class: 'tbl-wrap' }, el('table', { class: 'ds-table' },
    el('thead', {}, el('tr', {}, el('th', {}, 'Token'), el('th', {}, 'Valor'), el('th', {}, 'Resolvido'))),
    el('tbody', {}, items.map((t) => {
      const chip = el('span', { class: 'chip-sm', 'aria-hidden': 'true' });
      if (t.isColor && COLOR_VALUE.test(t.resolved)) chip.style.background = t.resolved;
      return el('tr', { 'data-search': `${t.name} ${t.value} ${t.resolved}`.toLowerCase() },
        el('td', {}, t.isColor ? chip : null, el('code', {}, t.name)),
        el('td', {}, el('code', {}, t.value)),
        el('td', {}, t.resolved !== t.value ? el('code', {}, t.resolved) : el('span', { class: 'muted' }, '—')));
    }))));
}

function tokensView(tokens) {
  return el('div', { class: 'ds-body' }, tokens.groups.map((g) => el('details', { class: 'ds-group', open: true },
    el('summary', {}, el('span', {}, g.title), el('span', { class: 'count' }, String(g.items.length))),
    g.items.every((t) => t.isColor) ? swatchGrid(g.items) : tokenTable(g.items))));
}

function propsTable({ columns, rows }) {
  return el('div', { class: 'tbl-wrap' }, el('table', { class: 'ds-table' },
    el('thead', {}, el('tr', {}, columns.map((c) => el('th', {}, c)))),
    el('tbody', {}, rows.map((r) => el('tr', {}, columns.map((_, i) => el('td', {}, r[i] || '—')))))));
}

function componentCard(c) {
  const usage = c.instances == null ? 'sem uso mapeado' : `${c.screens} tela(s) · ${c.instances} instância(s)`;
  const fullText = el('pre', {}, 'Carregando…');
  let loaded = false;
  const full = el('details', { class: 'ds-full' }, el('summary', {}, 'Ficha completa'), fullText);
  full.addEventListener('toggle', async () => {
    if (!full.open || loaded) return;
    loaded = true;
    try {
      fullText.textContent = (await api(`/api/docs/${encodeURIComponent(`componente:${c.name}`)}`)).text;
    } catch (err) {
      fullText.textContent = err.message;
    }
  });
  return el('details', { class: 'ds-cmp', 'data-search': c.name.toLowerCase() },
    el('summary', {}, el('code', { class: 'code' }, c.name), el('span', { class: 'badge' }, usage)),
    c.props.rows.length ? propsTable(c.props) : el('p', { class: 'muted' }, 'Esta ficha não tem tabela de props. Veja a ficha completa abaixo.'),
    full);
}

function componentsView(components) {
  return el('div', { class: 'ds-body' }, components.items.map(componentCard));
}

function rulesSection(title, content) {
  return el('section', { class: 'ds-section' }, el('h2', { class: 'lane' }, title), content);
}

function rulesView(rules) {
  const none = el('p', { class: 'muted' }, 'Nenhuma.');
  return el('div', { class: 'ds-body' },
    rulesSection('Convenções do handoff', rules.conventions.length
      ? el('ul', { class: 'plain' }, rules.conventions.map((t) => el('li', { 'data-search': t.toLowerCase() }, t)))
      : none),
    rulesSection('Pontos de atenção do DS', rules.attention.length
      ? rules.attention.map((a) => el('div', { class: 'rule', 'data-search': `${a.title} ${a.body}`.toLowerCase() },
        el('span', { class: 'rule-n' }, String(a.n)),
        el('div', {}, a.title ? el('strong', {}, a.title) : null, el('div', { class: 'muted' }, a.body))))
      : none),
    rulesSection('Decisões do fluxo', rules.decisions.length
      ? rules.decisions.map((d) => el('div', { class: 'rule', 'data-search': `${d.id} ${d.text}`.toLowerCase() },
        el('code', { class: 'rule-n code' }, d.id), el('div', {}, d.text)))
      : none));
}

async function renderDesignSystem(tab) {
  view.replaceChildren(el('p', { class: 'muted' }, 'Carregando…'));
  let ds;
  try {
    ds = await loadDs();
  } catch (err) {
    view.replaceChildren(el('p', { class: 'error' }, err.message));
    return;
  }
  const counts = {
    tokens: ds.tokens.total,
    componentes: ds.components.total,
    regras: ds.rules.conventions.length + ds.rules.attention.length + ds.rules.decisions.length,
  };
  const current = DS_TABS.some(([key]) => key === tab) ? tab : 'tokens';
  const body = el('div', {});
  const filterable = current !== 'regras';
  const filter = el('input', { type: 'search', class: 'ds-filter', placeholder: current === 'tokens' ? 'Filtrar tokens por nome ou valor' : 'Filtrar componentes por nome', 'aria-label': 'Filtrar' });
  filter.addEventListener('input', () => filterItems(body, filter.value.trim().toLowerCase(), current === 'tokens' ? '.ds-group' : null));

  const content = { tokens: () => tokensView(ds.tokens), componentes: () => componentsView(ds.components), regras: () => rulesView(ds.rules) }[current]();
  body.append(content);
  view.replaceChildren(...[
    el('h1', {}, 'Design System'),
    el('p', { class: 'sub' }, `Palmeiras · Onboarding${ds.tokens.version ? ` · DS publicado ${ds.tokens.version}` : ''}`),
    el('nav', { class: 'tabs' }, DS_TABS.map(([key, label]) => el('a', { href: `#/ds/${key}`, 'aria-current': key === current ? 'page' : null },
      label, el('span', { class: 'count' }, String(counts[key]))))),
    filterable ? filter : null,
    body,
  ].filter(Boolean));
}

function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const m = hash.match(/^\/tela\/(.+)$/);
  if (m) return renderScreen(m[1]);
  if (hash === '/docs') return renderDocs();
  const ds = hash.match(/^\/ds(?:\/(tokens|componentes|regras))?$/);
  if (ds) return renderDesignSystem(ds[1] ?? 'tokens');
  return renderList();
}

// A busca e o filtro de raia só redesenham a lista de telas; em qualquer outra página não mexem na tela.
const onList = () => ['', '#', '#/'].includes(location.hash);
let timer;
qInput.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { if (onList()) renderList(); }, 250); });
laneSelect.addEventListener('change', () => { if (onList()) renderList(); });
window.addEventListener('hashchange', route);

loadLanes().then(route).catch((err) => { view.replaceChildren(el('p', { class: 'error' }, `Não foi possível carregar o hub: ${err.message}`)); });
