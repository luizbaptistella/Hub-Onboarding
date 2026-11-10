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

let hubInfo = null;
const laneTitles = new Map();

async function loadLanes() {
  hubInfo = await api('/api/info');
  for (const l of hubInfo.lanes) {
    laneTitles.set(l.id, l.title);
    laneSelect.append(el('option', { value: l.id }, l.title));
  }
}

const stat = (value, label) => el('div', { class: 'stat' }, el('div', { class: 'stat-value' }, String(value)), el('div', { class: 'stat-label' }, label));

function heroView(info) {
  return el('section', { class: 'hero' },
    el('p', { class: 'eyebrow' }, 'Handoff · Onboarding'),
    el('h1', { class: 'hero-title' }, 'Palmeiras Hub'),
    el('p', { class: 'hero-sub' }, 'Telas, decisões, componentes e ligações do fluxo de onboarding, em um só lugar.'),
    el('div', { class: 'stats' },
      stat(info.screens, 'telas'),
      stat(info.edges, 'ligações'),
      stat(info.decisions, 'decisões'),
      stat(info.componentDocs, 'componentes')),
    el('nav', { class: 'tiles', 'aria-label': 'Atalhos' },
      el('a', { class: 'tile', href: '/hub/' }, 'Fluxograma'),
      el('a', { class: 'tile', href: '#/ds' }, 'Design System'),
      el('a', { class: 'tile', href: '#/docs' }, 'Documentação')));
}

async function renderList() {
  const query = qInput.value.trim();
  const lane = laneSelect.value;
  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (lane) params.set('lane', lane);
  const [{ total, screens }, info] = await Promise.all([api(`/api/screens?${params}`), hubInfo ?? api('/api/info')]);
  hubInfo = info;
  const groups = new Map();
  for (const s of screens) {
    if (!groups.has(s.lane)) groups.set(s.lane, []);
    groups.get(s.lane).push(s);
  }
  const children = [heroView(info)];
  const filtered = query || lane;
  children.push(el('p', { class: 'list-meta' }, filtered ? `${total} resultado(s) no filtro atual` : `${total} itens no fluxo`));
  if (query.length >= 2) children.push(await searchBlock(query));
  for (const [laneId, items] of groups) {
    children.push(el('div', { class: 'lane-head' },
      el('h2', {}, laneTitles.get(laneId) ?? laneId),
      el('span', { class: 'lane-count' }, String(items.length))));
    children.push(el('div', { class: 'cards' }, items.map((s) => {
      const warn = /lacuna|proposta|sem-figma/.test(s.status);
      return el('a', { class: warn ? 'card card-warn' : 'card', href: `#/tela/${encodeURIComponent(s.code)}` },
        el('div', { class: 'card-top' }, el('span', { class: 'code' }, s.code), statusBadge(s.status)),
        el('div', { class: 'name' }, s.name));
    })));
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
    telas: async () => markupView(code),
    spec: () => el('pre', {}, spec ?? 'Esta tela não tem spec.md.'),
    componentes: async () => el('pre', {}, JSON.stringify(await api(`/api/screens/${encodeURIComponent(code)}/components`), null, 2)),
    fluxo: async () => flowView(await api(`/api/flow/${encodeURIComponent(code)}`)),
  };
  const labels = { telas: 'Telas', spec: 'Spec', componentes: 'Componentes', fluxo: 'Fluxo' };
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
  // sandbox com allow-same-origin, sem allow-scripts: a marcação não executa script (a CSP do documento também bloqueia).
  // Sem allow-same-origin, a origem vira opaca e o navegador não envia o cookie de login (SameSite=Strict),
  // então a rota /documento responde 401 e o iframe fica em branco.
  // O documento vem de uma rota própria, com o CSS embutido e CSP que permite os estilos.
  const frame = el('iframe', { class: 'preview telas', sandbox: 'allow-same-origin', title: `Tela ${code}`, src: `/api/screens/${encodeURIComponent(code)}/documento` });
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

// Monta o ds-render.html (React + bundle do DS) num iframe. Resolve com a altura do conteúdo.
function mountRender(frame, items, opts) {
  return new Promise((resolve, reject) => {
    frame.addEventListener('load', async () => {
      const w = frame.contentWindow;
      for (let t = 0; t < 50 && !(w && w.dsReady); t++) await new Promise((r) => setTimeout(r, 100));
      if (!w || !w.dsReady) return reject(new Error('DS não carregou'));
      const h = await w.dsRender(items, opts);
      frame.style.height = `${h + 4}px`;
      resolve(h);
    }, { once: true });
    frame.src = '/hub/ds-render.html';
  });
}

const noPreview = () => el('span', { class: 'sb-nopreview' }, 'sem prévia');

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

// ── Componentes: barra lateral com miniaturas + canvas/documentação (estilo Storybook) ──

const usageOf = (c) => (c.instances == null ? 'sem uso mapeado' : `${c.screens} tela(s) · ${c.instances} instância(s)`);

// Miniatura: primeiro exemplo do componente, reduzido por CSS. Carrega só quando entra na tela.
function thumb(c) {
  const ex = c.examples[0];
  if (!c.inBundle || !ex) return el('span', { class: 'sb-thumb' }, noPreview());
  const frame = el('iframe', { class: 'sb-frame', title: `Miniatura de ${c.name}`, tabindex: '-1', 'aria-hidden': 'true', loading: 'lazy' });
  mountRender(frame, [{ key: 0, label: '', component: c.name, props: ex.props, width: 300 }], { captions: false })
    .catch(() => frame.replaceWith(noPreview()));
  return el('span', { class: 'sb-thumb' }, frame);
}

function sidebar(components, selected, mode) {
  const suffix = mode === 'docs' ? '/docs' : '';
  const search = el('input', { type: 'search', class: 'sb-search', placeholder: 'Buscar componente', 'aria-label': 'Buscar componente' });
  const list = el('nav', { class: 'sb-list', 'aria-label': 'Componentes do DS' });
  for (const cat of components.categories) {
    const items = components.items.filter((c) => c.category === cat);
    if (!items.length) continue;
    list.append(el('div', { class: 'sb-group' }, el('div', { class: 'sb-cat' }, cat),
      items.map((c) => el('a', {
        class: 'sb-item',
        href: `#/ds/componentes/${encodeURIComponent(c.name)}${suffix}`,
        'data-search': c.name.toLowerCase(),
        'aria-current': c.name === selected.name ? 'page' : null,
      }, thumb(c), el('span', { class: 'sb-name' }, c.name)))));
  }
  search.addEventListener('input', () => filterItems(list, search.value.trim().toLowerCase(), '.sb-group'));
  return el('aside', { class: 'sb-side' }, search, list);
}

function canvasView(c) {
  if (!c.inBundle) return el('p', { class: 'muted' }, 'Este componente não está no bundle do DS. Veja a documentação.');
  if (!c.examples.length) return el('p', { class: 'muted' }, 'Sem exemplos renderizáveis. Veja a documentação.');
  const width = Math.max(260, Math.min(343, (view.clientWidth || 375) - 48));
  const frame = el('iframe', { class: 'ds-frame', title: `Canvas de ${c.name}` });
  mountRender(frame, c.examples.map((ex, i) => ({ key: i, label: ex.label, component: c.name, props: ex.props, width })), { captions: true })
    .catch(() => frame.replaceWith(el('p', { class: 'muted' }, 'Prévia indisponível: o React ou o bundle do DS não carregou.')));
  return el('div', { class: 'sb-canvas' }, frame);
}

function docBlock(b) {
  if (b.type === 'table') {
    return el('div', { class: 'tbl-wrap' }, el('table', { class: 'ds-table' },
      el('thead', {}, el('tr', {}, b.columns.map((c) => el('th', {}, c)))),
      el('tbody', {}, b.rows.map((r) => el('tr', {}, b.columns.map((_, i) => el('td', {}, r[i] || '—')))))));
  }
  if (b.type === 'list') return el('ul', { class: 'plain' }, b.items.map((t) => el('li', {}, t)));
  return el('p', { class: 'muted' }, b.text);
}

function docsView(c) {
  return el('div', { class: 'sb-docs' },
    c.intro.map(docBlock),
    c.sections.map((s) => rulesSection(s.title, s.blocks.map(docBlock))));
}

function componentsStory(components, name, mode) {
  const selected = components.items.find((c) => c.name === name) ?? components.items[0];
  const head = el('header', { class: 'sb-head' },
    el('div', {}, el('h2', { class: 'sb-title' }, selected.name), el('p', { class: 'sub' }, `${selected.category} · ${usageOf(selected)}`)),
    selected.jsx ? el('code', { class: 'sb-jsx' }, selected.jsx) : null);
  const modes = el('nav', { class: 'tabs' }, [['Canvas', ''], ['Documentação', '/docs']].map(([label, suffix]) => el('a', {
    href: `#/ds/componentes/${encodeURIComponent(selected.name)}${suffix}`,
    'aria-current': (suffix === '/docs') === (mode === 'docs') ? 'page' : null,
  }, label)));
  return el('div', { class: 'sb' },
    sidebar(components, selected, mode),
    el('section', { class: 'sb-main' }, head, modes, mode === 'docs' ? docsView(selected) : canvasView(selected)));
}

// ── Regras ─────────────────────────────────────────────────────────────

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

async function renderDesignSystem(tab, componentName, mode) {
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
  const filter = el('input', { type: 'search', class: 'ds-filter', placeholder: 'Filtrar tokens por nome ou valor', 'aria-label': 'Filtrar tokens' });
  filter.addEventListener('input', () => filterItems(body, filter.value.trim().toLowerCase(), '.ds-group'));

  if (current === 'componentes') body.append(componentsStory(ds.components, componentName, mode === 'docs' ? 'docs' : 'canvas'));
  else if (current === 'regras') body.append(rulesView(ds.rules));
  else body.append(tokensView(ds.tokens));

  view.replaceChildren(...[
    el('h1', {}, 'Design System'),
    el('p', { class: 'sub' }, `Palmeiras · Onboarding${ds.tokens.version ? ` · DS publicado ${ds.tokens.version}` : ''}`),
    el('nav', { class: 'tabs' }, DS_TABS.map(([key, label]) => el('a', { href: `#/ds/${key}`, 'aria-current': key === current ? 'page' : null },
      label, el('span', { class: 'count' }, String(counts[key]))))),
    current === 'tokens' ? filter : null,
    body,
  ].filter(Boolean));
}

function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const m = hash.match(/^\/tela\/(.+)$/);
  if (m) return renderScreen(m[1]);
  if (hash === '/docs') return renderDocs();
  const ds = hash.match(/^\/ds(?:\/(tokens|componentes|regras))?(?:\/([^/]+))?(?:\/(docs))?$/);
  if (ds) return renderDesignSystem(ds[1] ?? 'tokens', ds[2], ds[3]);
  return renderList();
}

// A busca e o filtro de raia só redesenham a lista de telas; em qualquer outra página não mexem na tela.
const onList = () => ['', '#', '#/'].includes(location.hash);
let timer;
qInput.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { if (onList()) renderList(); }, 250); });
laneSelect.addEventListener('change', () => { if (onList()) renderList(); });
window.addEventListener('hashchange', route);

loadLanes().then(route).catch((err) => { view.replaceChildren(el('p', { class: 'error' }, `Não foi possível carregar o hub: ${err.message}`)); });
