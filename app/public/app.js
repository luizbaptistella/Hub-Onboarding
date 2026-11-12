// Interface do hub. Conteúdo sempre via textContent (nada de innerHTML com dados do handoff).
import { mountEditor } from './editor.js';
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

// Versionamento: o que está em validação (PRs e branches fora da main). Recarrega a cada minuto no servidor.
let pendingPromise = null;
const loadPending = (force = false) => {
  if (force || !pendingPromise) {
    pendingPromise = api('/api/validacao').catch((err) => ({ items: [], merged: [], byCode: {}, error: err.message }));
    pendingPromise.then((p) => {
      const badge = document.getElementById('pending-count');
      if (!badge) return;
      badge.textContent = String(p.items.length);
      badge.hidden = !p.items.length;
    });
  }
  return pendingPromise;
};

const dateFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const fmtDate = (iso) => (iso ? dateFmt.format(new Date(iso)) : '');
const daysAgo = (iso) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000) : null);
const ageLabel = (iso) => {
  const d = daysAgo(iso);
  if (d === null) return '';
  return d === 0 ? 'hoje' : d === 1 ? 'há 1 dia' : `há ${d} dias`;
};
const extLink = (href, text) => (href ? el('a', { href, target: '_blank', rel: 'noopener noreferrer' }, text) : el('span', {}, text));
const pendingLabel = (p) => (p.kind === 'pr' ? `PR #${p.number}` : `branch ${p.branch}`);
const reviewBadge = (refs) => el('span', { class: 'badge review', title: refs.map(pendingLabel).join(', ') }, 'Em validação');
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
    el('h1', { class: 'hero-title' }, 'Ellena Hub'),
    el('p', { class: 'hero-sub' }, 'Telas, decisões, componentes e ligações do fluxo de onboarding, em um só lugar.'),
    el('div', { class: 'stats' },
      stat(info.screens, 'telas'),
      stat(info.edges, 'ligações'),
      stat(info.decisions, 'decisões'),
      stat(info.componentDocs, 'componentes')),
    el('nav', { class: 'tiles', 'aria-label': 'Atalhos' },
      el('a', { class: 'tile', href: '/hub/' }, 'Fluxograma'),
      el('a', { class: 'tile', href: '#/validacao' }, 'Em validação'),
      el('a', { class: 'tile', href: '#/ds' }, 'Design System'),
      el('a', { class: 'tile', href: '#/docs' }, 'Documentação')));
}

async function renderList() {
  const query = qInput.value.trim();
  const lane = laneSelect.value;
  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (lane) params.set('lane', lane);
  const [{ total, screens }, info, pending] = await Promise.all([api(`/api/screens?${params}`), hubInfo ?? api('/api/info'), loadPending()]);
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
      const refs = pending.byCode?.[s.code];
      return el('a', { class: refs ? 'card card-review' : warn ? 'card card-warn' : 'card', href: `#/tela/${encodeURIComponent(s.code)}` },
        el('div', { class: 'card-top' }, el('span', { class: 'code' }, s.code),
          el('span', { class: 'card-badges' }, refs ? reviewBadge(refs) : null, statusBadge(s.status))),
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
  const refs = (await loadPending()).byCode?.[node.code] ?? null;
  const tabs = {
    telas: async () => markupView(code),
    spec: () => el('pre', {}, spec ?? 'Esta tela não tem spec.md.'),
    componentes: async () => el('pre', {}, JSON.stringify(await api(`/api/screens/${encodeURIComponent(code)}/components`), null, 2)),
    fluxo: async () => flowView(await api(`/api/flow/${encodeURIComponent(code)}`)),
    historico: async () => historyView(await api(`/api/screens/${encodeURIComponent(code)}/historico`), refs),
  };
  const labels = { telas: 'Telas', spec: 'Spec', componentes: 'Componentes', fluxo: 'Fluxo', historico: 'Histórico' };
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
  // Atalho para o modo de edição a partir de qualquer aba: abre a aba Telas e liga a edição.
  const startEdit = async () => {
    if (!content.firstChild?.startEdit) await select('telas');
    content.firstChild?.startEdit?.();
  };
  const canEdit = (node.variants ?? []).length > 0;
  view.replaceChildren(...[
    el('a', { class: 'back', href: '#/' }, '← Todas as telas'),
    el('div', { class: 'screen-head' },
      el('h1', {}, `${node.code} · ${node.name}`),
      canEdit ? el('button', { type: 'button', class: 'btn primary', onclick: startEdit }, '✎ Editar tela') : null),
    el('p', { class: 'sub status-line' }, statusBadge(node.status), refs ? reviewBadge(refs) : null, ` ${node.lane}${node.figma ? ` · Figma ${node.figma}` : ''}`),
    refs ? el('p', { class: 'pending-note' }, 'Esta tela tem mudanças fora da main, aguardando validação: ',
      refs.flatMap((r, i) => [i ? ', ' : null, extLink(r.url, pendingLabel(r))]), '.') : null,
    el('div', { class: 'tabs', role: 'tablist' }, buttons),
    content,
  ].filter(Boolean));
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

function whyBlock(c) {
  if (!c.why) return el('div', { class: 'tl-why empty' }, 'Sem motivo registrado. Use o trailer “Motivo:” no commit ou no PR.');
  return el('div', { class: 'tl-why' }, el('strong', {}, 'Por quê'), c.why, c.details ? `\n\n${c.details}` : null);
}

function historyView(h, refs) {
  const intro = el('p', { class: 'muted' },
    h.source === 'github' ? 'Commits da main, lidos do GitHub.' : h.source === 'git' ? 'Commits da main, lidos do git.' : '',
    ' ● alterou a pasta da tela · ○ citou a tela na mensagem.');
  const pendingBox = refs ? el('p', { class: 'pending-note' }, 'Ainda não aparece aqui o que está em validação: ',
    refs.flatMap((r, i) => [i ? ', ' : null, extLink(r.url, pendingLabel(r))]), '.') : null;
  if (h.source === 'indisponivel') return el('div', {}, el('p', { class: 'error' }, h.note));
  if (!h.commits.length) return el('div', {}, pendingBox, el('p', { class: 'muted' }, 'Nenhuma mudança registrada para esta tela.'));
  return el('div', {}, pendingBox, intro, el('ol', { class: 'timeline' }, h.commits.map((c) => el('li', { class: c.touched ? '' : 'mention' },
    el('div', { class: 'tl-date' }, fmtDate(c.date)),
    el('p', { class: 'tl-title' }, c.title),
    whyBlock(c),
    el('div', { class: 'tl-meta' },
      el('span', {}, c.author),
      extLink(c.url, c.short),
      c.pr ? extLink(c.prUrl, `PR #${c.pr}`) : null,
      c.ref ? el('span', {}, `Ref: ${c.ref}`) : null)))));
}

async function renderPending() {
  view.replaceChildren(el('p', { class: 'muted' }, 'Carregando…'));
  const p = await loadPending(true);
  const head = [
    el('a', { class: 'back', href: '#/' }, '← Todas as telas'),
    el('h1', {}, 'Em validação'),
    el('p', { class: 'sub' }, `Telas e fluxos com mudanças que ainda não estão na ${p.main ?? 'main'}.`),
  ];
  if (p.error) return view.replaceChildren(...head, el('p', { class: 'error' }, p.error));
  const notes = [p.warning, p.note].filter(Boolean).map((t) => el('p', { class: 'pending-note' }, t));
  const chip = (code, soft) => el('a', { class: soft ? 'chip soft' : 'chip', href: `#/tela/${encodeURIComponent(code)}`, title: soft ? 'Citada no texto, sem arquivo alterado' : null }, code);
  const card = (it) => {
    const age = daysAgo(it.createdAt);
    return el('article', { class: 'pr-card' },
      el('div', { class: 'pr-head' },
        el('h2', { class: 'pr-title' }, extLink(it.url, it.title || it.branch)),
        el('span', { class: age !== null && age >= 7 ? 'pr-age stale' : 'pr-age', title: it.createdAt ? `Aberto em ${fmtDate(it.createdAt)}` : null }, ageLabel(it.createdAt))),
      el('div', { class: 'tl-meta' },
        el('span', { class: 'status-line' }, el('span', { class: 'badge review' }, it.kind === 'pr' ? (it.draft ? `Rascunho · PR #${it.number}` : `PR #${it.number}`) : 'Branch sem PR')),
        el('span', {}, it.author),
        el('span', {}, `branch ${it.branch}`),
        it.localOnly ? el('span', {}, 'só nesta máquina (não enviada)') : null,
        it.updatedAt ? el('span', {}, `atualizado ${ageLabel(it.updatedAt)}`) : null),
      whyBlock(it),
      it.codes.length || it.mentioned?.length || it.flowChanged
        ? el('div', { class: 'chips' }, it.codes.map((c) => chip(c)), (it.mentioned ?? []).map((c) => chip(c, true)), it.flowChanged ? el('span', { class: 'chip soft' }, 'altera o fluxo (flow.json)') : null)
        : el('p', { class: 'muted' }, 'Não altera telas do handoff.'));
  };
  view.replaceChildren(...[...head, ...notes,
    p.items.length ? el('div', { class: 'pr-list' }, p.items.map(card)) : el('p', { class: 'pending-note' }, 'Nada aguardando validação. Tudo o que existe está na main.'),
    p.merged?.length ? el('section', {},
      el('h2', { class: 'lane' }, 'Branches já mescladas · podem ser apagadas'),
      el('ul', { class: 'merged-list' }, p.merged.map((m) => el('li', {}, extLink(m.url, m.branch), m.pr ? ` · entrou pelo PR #${m.pr}` : ' · conteúdo já está na main', m.localOnly ? ' · só nesta máquina' : null)))) : null,
    el('p', { class: 'muted' }, `Verificado em ${fmtDate(p.checkedAt)}.`)].filter(Boolean));
}

// Rola até o elemento descontando o cabeçalho fixo (que fica alto em janelas estreitas).
const reveal = (node) => {
  const top = node.getBoundingClientRect().top + scrollY - (document.querySelector('.top')?.offsetHeight ?? 0) - 12;
  window.scrollTo({ top, behavior: 'smooth' });
};

async function markupView(code, variantId) {
  const enc = encodeURIComponent(code);
  const q = variantId ? `?variant=${encodeURIComponent(variantId)}` : '';
  const data = await api(`/api/screens/${enc}/markup${q}`);
  // sandbox com allow-same-origin, sem allow-scripts: a marcação não executa script (a CSP do documento também bloqueia).
  // Sem allow-same-origin, a origem vira opaca e o navegador não envia o cookie de login (SameSite=Strict),
  // então a rota /documento responde 401 e o iframe fica em branco.
  // O documento vem de uma rota própria, com o CSS embutido e CSP que permite os estilos.
  // A mesma origem também deixa o modo de edição (editor.js) ler e alterar a prévia sem rodar script dentro dela.
  const frame = el('iframe', { class: 'preview telas', sandbox: 'allow-same-origin', title: `Tela ${code}`, src: `/api/screens/${enc}/documento?variant=${encodeURIComponent(data.variant.id)}` });
  const loaded = new Promise((resolve) => frame.addEventListener('load', resolve, { once: true }));
  const stage = el('div', { class: 'stage' }, frame);
  const layout = el('div', { class: 'editor-layout' }, stage);
  const notice = el('div', { role: 'status' });
  const root = el('div', {});

  const variantSelect = data.variants.length > 1
    ? el('select', { 'aria-label': 'Variante da tela', onchange: (e) => swap(e.target.value) }, data.variants.map((v) => el('option', { value: v.id }, v.label)))
    : null;
  if (variantSelect) variantSelect.value = data.variant.id;
  let editor = null;
  const editBtn = el('button', { type: 'button', class: 'btn', onclick: toggleEdit }, 'Editar tela');

  async function swap(id) {
    if (editor?.dirty && !confirm('Trocar de variante descarta as alterações não salvas. Continuar?')) { variantSelect.value = data.variant.id; return; }
    editor?.destroy();
    root.replaceWith(await markupView(code, id));
  }

  async function toggleEdit() {
    if (editor) {
      if (editor.dirty && !confirm('Sair do modo de edição descarta as alterações não salvas. Continuar?')) return;
      editor.destroy();
      editor = null;
      layout.classList.remove('editing');
      editBtn.textContent = 'Editar tela';
      return;
    }
    editBtn.disabled = true;
    try {
      await loaded;
      const [components, config] = await Promise.all([
        api(`/api/screens/${enc}/components`).catch(() => null),
        api('/api/propostas/config').catch(() => ({ enabled: false })),
      ]);
      notice.replaceChildren(el('p', { class: 'ed-banner' },
        el('strong', {}, 'Modo de edição ativo. '),
        'Clique num elemento da prévia para editar. O painel de edição fica ao lado da tela (abaixo dela em janelas estreitas). Nada muda no código até a proposta ser salva e incorporada.'));
      editor = mountEditor({ frame, stage, markup: data, code, components, config, el, onSaved: (r) => {
        editor.destroy();
        editor = null;
        layout.classList.remove('editing');
        editBtn.textContent = 'Editar tela';
        frame.contentWindow.location.reload();
        notice.replaceChildren(el('p', { class: 'ok' }, 'Proposta enviada. ',
          r.url ? el('a', { href: r.url, target: '_blank', rel: 'noopener' }, `Ver PR #${r.number} no GitHub`) : `Arquivo salvo em ${r.path}.`));
        notice.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } });
      layout.append(editor.panel);
      layout.classList.add('editing');
      editBtn.textContent = 'Sair da edição';
      reveal(notice);
    } catch (err) {
      notice.replaceChildren(el('p', { class: 'error' }, `Não foi possível abrir o modo de edição: ${err.message}`));
    } finally {
      editBtn.disabled = false;
    }
  }

  root.append(...[
    el('div', { class: 'preview-bar' }, variantSelect, data.truncated ? null : editBtn),
    data.truncated ? el('p', { class: 'muted' }, 'Marcação cortada: arquivo maior que o limite. A edição fica desligada para esta tela.') : null,
    notice,
    layout].filter(Boolean));
  root.startEdit = () => (editor ? reveal(notice) : data.truncated ? null : toggleEdit());
  return root;
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
const DS_TABS = [['tokens', 'Tokens'], ['componentes', 'Componentes'], ['regras', 'Regras'], ['backoffice', 'Backoffice']];
// Cor só vai para o estilo se for um valor de cor válido; o resto do texto nunca vira HTML.
const COLOR_VALUE = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i;

// Tema de cor do DS (Palmeiras ou Flamengo, claro ou escuro): vale para os tokens e para as prévias. Fica no navegador.
const DS_THEME_KEY = 'ds-tema';
let dsTheme = (() => { try { return localStorage.getItem(DS_THEME_KEY) || 'palmeiras'; } catch { return 'palmeiras'; } })();
function setDsTheme(id) {
  dsTheme = id;
  try { localStorage.setItem(DS_THEME_KEY, id); } catch { /* sem armazenamento: a escolha vale só nesta página */ }
}
// Cópia dos tokens com o valor resolvido do tema escolhido.
function tokensForTheme(tokens) {
  const values = tokens.themes?.find((t) => t.id === dsTheme)?.values ?? {};
  return { ...tokens, groups: tokens.groups.map((g) => ({ ...g, items: g.items.map((t) => {
    const v = values[t.name.slice(2)];
    return v && v !== t.resolved ? { ...t, resolved: v } : t;
  }) })) };
}
function themeBar(tokens, onPick) {
  return el('div', { class: 'ds-themes', role: 'group', 'aria-label': 'Tema de cor do design system' },
    (tokens.themes ?? []).map((t) => el('button', { type: 'button', 'aria-pressed': String(t.id === dsTheme), onclick: () => onPick(t.id) }, t.name)));
}

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
      const h = await w.dsRender(items, { ...opts, theme: dsTheme });
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

const PALMEIRAS_RULE_LABELS = { conventions: 'Convenções do handoff', attention: 'Pontos de atenção do DS', decisions: 'Decisões do fluxo' };

function rulesView(rules, labels = PALMEIRAS_RULE_LABELS) {
  const none = el('p', { class: 'muted' }, 'Nenhuma.');
  return el('div', { class: 'ds-body' },
    rulesSection(labels.conventions, rules.conventions.length
      ? el('ul', { class: 'plain' }, rules.conventions.map((t) => el('li', { 'data-search': t.toLowerCase() }, t)))
      : none),
    rulesSection(labels.attention, rules.attention.length
      ? rules.attention.map((a) => el('div', { class: 'rule', 'data-search': `${a.title} ${a.body}`.toLowerCase() },
        el('span', { class: 'rule-n' }, String(a.n)),
        el('div', {}, a.title ? el('strong', {}, a.title) : null, el('div', { class: 'muted' }, a.body))))
      : none),
    rulesSection(labels.decisions, rules.decisions.length
      ? rules.decisions.map((d) => el('div', { class: 'rule', 'data-search': `${d.id} ${d.text}`.toLowerCase() },
        el('code', { class: 'rule-n code' }, d.id), el('div', {}, d.text)))
      : none));
}

// ── Design System do backoffice: snapshot em design-system-backoffice/ (tokens, componentes e regras) ──

let boData = null;
const loadBackoffice = async () => (boData ??= await api('/api/design-system/backoffice'));
// Tema de cor do DS do backoffice. Próprio, para não misturar com o tema do DS Palmeiras.
let boTheme = 'dark';
const BO_RULE_LABELS = { conventions: 'Fundamentos de conteúdo', attention: 'Ressalvas do DS', decisions: 'Adições e adaptações' };

function tokensForBackofficeTheme(tokens) {
  const values = tokens.themes?.find((t) => t.id === boTheme)?.values ?? {};
  return { ...tokens, groups: tokens.groups.map((g) => ({ ...g, items: g.items.map((t) => {
    const v = values[t.name.slice(2)];
    return v && v !== t.resolved ? { ...t, resolved: v } : t;
  }) })) };
}

// Componentes do bundle, por pasta. Sem prévia: o manifesto não traz as props de uso (o bundle é consultado pelo nome).
function backofficeComponentsView(components) {
  return el('div', { class: 'ds-body' }, components.categories.map((cat) => {
    const items = components.items.filter((i) => i.category === cat);
    return el('details', { class: 'ds-group', open: true },
      el('summary', {}, el('span', {}, cat), el('span', { class: 'count' }, String(items.length))),
      el('div', { class: 'bo-comps' }, items.map((i) => el('div', { class: 'bo-comp', 'data-search': `${i.name} ${i.file ?? ''}`.toLowerCase() },
        el('code', {}, i.name), el('span', { class: 'muted small' }, i.file ?? '')))));
  }));
}

async function renderBackofficeDs() {
  let bo;
  try {
    bo = await loadBackoffice();
  } catch (err) {
    view.replaceChildren(el('p', { class: 'error' }, err.message));
    return;
  }
  const filter = el('input', { type: 'search', class: 'ds-filter', placeholder: 'Filtrar tokens, componentes e regras', 'aria-label': 'Filtrar' });
  const body = el('div', {},
    el('h2', { class: 'lane' }, `Tokens · ${bo.tokens.total}`),
    tokensView(tokensForBackofficeTheme(bo.tokens)),
    el('h2', { class: 'lane' }, `Componentes · ${bo.components.total}`),
    backofficeComponentsView(bo.components),
    el('h2', { class: 'lane' }, 'Regras'),
    rulesView(bo.rules, BO_RULE_LABELS));
  filter.addEventListener('input', () => filterItems(body, filter.value.trim().toLowerCase(), '.ds-group'));
  view.replaceChildren(
    el('h1', {}, 'Design System'),
    el('p', { class: 'sub' }, `Backoffice · ${bo.title}`),
    el('nav', { class: 'tabs' }, DS_TABS.map(([key, label]) => el('a', { href: `#/ds/${key}`, 'aria-current': key === 'backoffice' ? 'page' : null }, label))),
    el('div', { class: 'ds-themes', role: 'group', 'aria-label': 'Tema de cor do design system do backoffice' },
      (bo.tokens.themes ?? []).map((t) => el('button', { type: 'button', 'aria-pressed': String(t.id === boTheme), onclick: () => { boTheme = t.id; renderBackofficeDs(); } }, t.name))),
    filter,
    body,
  );
}

async function renderDesignSystem(tab, componentName, mode) {
  view.replaceChildren(el('p', { class: 'muted' }, 'Carregando…'));
  if (tab === 'backoffice') return renderBackofficeDs();
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
  else body.append(tokensView(tokensForTheme(ds.tokens)));

  view.replaceChildren(...[
    el('h1', {}, 'Design System'),
    el('p', { class: 'sub' }, `Palmeiras · Onboarding${ds.tokens.version ? ` · DS publicado ${ds.tokens.version}` : ''}`),
    el('nav', { class: 'tabs' }, DS_TABS.map(([key, label]) => el('a', { href: `#/ds/${key}`, 'aria-current': key === current ? 'page' : null },
      label, counts[key] == null ? null : el('span', { class: 'count' }, String(counts[key]))))),
    themeBar(ds.tokens, (id) => { setDsTheme(id); renderDesignSystem(tab, componentName, mode); }),
    current === 'tokens' ? filter : null,
    body,
  ].filter(Boolean));
}

function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const m = hash.match(/^\/tela\/(.+)$/);
  if (m) return renderScreen(m[1]);
  if (hash === '/docs') return renderDocs();
  if (hash === '/validacao') return renderPending();
  const ds = hash.match(/^\/ds(?:\/(tokens|componentes|regras|backoffice))?(?:\/([^/]+))?(?:\/(docs))?$/);
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
