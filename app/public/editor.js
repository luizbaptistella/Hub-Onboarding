// Modo de edição da prévia de uma tela. A marcação continua num iframe sem scripts; esta página lê e altera
// o DOM dele (mesma origem) só para mostrar a prévia. Nada vai para o código: ao salvar, as alterações viram
// uma proposta (POST /api/propostas) que é revisada e incorporada depois, como descrito em handoff/PROPOSTAS.md.

const AUTHOR_KEY = 'ellena-hub:autor';
const storage = {
  get(k) { try { return localStorage.getItem(k) ?? ''; } catch { return ''; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sem armazenamento: só não lembra o nome */ } },
};

// Caminho CSS no mesmo estilo dos seletores do components.json: a partir do ancestral com id, tag:nth-of-type(n).
function cssPath(node) {
  const parts = [];
  let cur = node;
  while (cur && cur.nodeType === 1 && cur.tagName !== 'BODY') {
    if (cur.id) { parts.unshift(`#${CSS.escape(cur.id)}`); break; }
    const tag = cur.tagName.toLowerCase();
    let n = 1;
    for (let s = cur.previousElementSibling; s; s = s.previousElementSibling) if (s.tagName === cur.tagName) n++;
    parts.unshift(`${tag}:nth-of-type(${n})`);
    cur = cur.parentElement;
  }
  return parts.join(' > ');
}

// Texto editável: elemento sem filhos (só texto) ou com exatamente um nó de texto próprio. Ícones (ligaduras) ficam de fora.
function textTarget(node) {
  if (!node || node.closest('.po-icon, .material-symbols-outlined, svg')) return null;
  const own = [...node.childNodes].filter((c) => c.nodeType === 3 && c.data.trim());
  if (!node.children.length && own.length) return { get: () => node.textContent, set: (v) => { node.textContent = v; } };
  if (own.length === 1) return { get: () => own[0].data, set: (v) => { own[0].data = v; } };
  return null;
}

function describe(node) {
  const cls = [...node.classList].slice(0, 2).map((c) => `.${c}`).join('');
  return `${node.tagName.toLowerCase()}${cls}`;
}

export function mountEditor({ frame, stage, markup, code, components, config, el, onSaved }) {
  const doc = frame.contentDocument;
  const instances = (components?.instances ?? [])
    .map((inst) => { try { return { inst, root: doc.querySelector(inst.selector) }; } catch { return { inst, root: null }; } })
    .filter((x) => x.root);
  const changes = new Map();
  let selected = null;

  const hoverBox = el('div', { class: 'ed-box ed-hover', hidden: true });
  const selBox = el('div', { class: 'ed-box ed-sel', hidden: true });
  const overlay = el('div', { class: 'ed-overlay', 'aria-hidden': 'true' }, hoverBox, selBox);
  stage.append(overlay);

  const panelBody = el('div', { class: 'ed-body' });
  const changeList = el('ol', { class: 'ed-changes' });
  const changeCount = el('span', { class: 'ed-count' }, '0');
  const saveBtn = el('button', { type: 'button', class: 'btn primary', disabled: true, onclick: openSave }, 'Salvar proposta…');
  const panel = el('aside', { class: 'ed-panel', 'aria-label': 'Edição da tela' },
    el('p', { class: 'ed-hint' }, 'Clique num elemento da tela para editar. Esc tira a seleção.'),
    panelBody,
    el('div', { class: 'ed-section' },
      el('h3', {}, 'Alterações ', changeCount),
      changeList,
      config.enabled ? null : el('p', { class: 'muted small' }, 'Salvar propostas não está configurado neste servidor.'),
      saveBtn));

  // Posição do elemento do iframe dentro do palco (o iframe fica no canto do palco, com borda).
  const place = (box, node) => {
    if (!node) { box.hidden = true; return; }
    const r = node.getBoundingClientRect();
    Object.assign(box.style, { left: `${frame.offsetLeft + frame.clientLeft + r.left}px`, top: `${frame.offsetTop + frame.clientTop + r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
    box.hidden = false;
  };
  const pick = (e) => {
    const f = frame.getBoundingClientRect();
    const node = doc.elementFromPoint(e.clientX - f.left - frame.clientLeft, e.clientY - f.top - frame.clientTop);
    return node && node !== doc.documentElement && node !== doc.body ? node : null;
  };
  overlay.addEventListener('mousemove', (e) => place(hoverBox, pick(e)));
  overlay.addEventListener('mouseleave', () => { hoverBox.hidden = true; });
  overlay.addEventListener('click', (e) => select(pick(e)));
  overlay.addEventListener('wheel', (e) => { frame.contentWindow.scrollBy(e.deltaX, e.deltaY); place(selBox, selected); }, { passive: true });
  const onKey = (e) => { if (e.key === 'Escape' && !document.querySelector('dialog[open]')) select(null); };
  document.addEventListener('keydown', onKey);
  const onUnload = (e) => { if (changes.size) e.preventDefault(); };
  window.addEventListener('beforeunload', onUnload);

  const instanceOf = (node) => {
    let best = null;
    for (const x of instances) if (x.root.contains(node) && (!best || best.root.contains(x.root))) best = x;
    return best;
  };

  function select(node) {
    selected = node;
    place(selBox, node);
    renderPanel();
  }

  function renderPanel() {
    if (!selected) { panelBody.replaceChildren(); return; }
    const owner = instanceOf(selected);
    const parts = [];
    parts.push(el('div', { class: 'ed-section' },
      el('div', { class: 'ed-crumb' },
        owner ? el('span', { class: 'ed-tag ds' }, owner.inst.component) : el('span', { class: 'ed-tag' }, 'fora de componente do DS'),
        el('code', {}, describe(selected))),
      selected.parentElement && selected.parentElement !== doc.body
        ? el('button', { type: 'button', class: 'linkbtn', onclick: () => select(selected.parentElement) }, '↑ Selecionar o elemento pai')
        : null));

    const text = textTarget(selected);
    if (text) {
      const selector = cssPath(selected);
      const key = `texto|${selector}`;
      const area = el('textarea', { rows: 3, 'aria-label': 'Texto do elemento' });
      area.value = text.get();
      area.addEventListener('input', () => {
        const prev = changes.get(key);
        const before = prev ? prev.before : text.get();
        text.set(area.value);
        if (area.value === before) changes.delete(key);
        else changes.set(key, { kind: 'texto', selector, instance: owner?.inst.id ?? null, before, after: area.value, label: `Texto de ${owner ? owner.inst.component : describe(selected)}`, revert: () => text.set(before) });
        place(selBox, selected);
        renderChanges();
      });
      parts.push(el('div', { class: 'ed-section' }, el('h3', {}, 'Texto'), area));
    } else if (!owner) {
      parts.push(el('p', { class: 'muted small' }, 'Este elemento não tem texto próprio nem é um componente do DS. Selecione um elemento de dentro ou o pai.'));
    }

    if (owner?.inst.propOptions && Object.keys(owner.inst.propOptions).length) {
      const rows = Object.entries(owner.inst.propOptions).map(([prop, opt]) => {
        const key = `prop|${owner.inst.id}|${prop}`;
        const used = opt.used == null ? '' : String(opt.used);
        const current = changes.get(key)?.after ?? used;
        const sel = el('select', { 'aria-label': prop },
          used === '' ? el('option', { value: '' }, '(padrão)') : null,
          opt.options.map((o) => el('option', { value: o }, o)));
        sel.value = current;
        sel.addEventListener('change', () => {
          const shown = changes.get(key)?.after ?? used;
          const previewed = previewProp(owner.root, prop, shown, sel.value);
          if (sel.value === used) changes.delete(key);
          else {
            const prevPreview = changes.get(key)?.previewed ?? true;
            changes.set(key, { kind: 'prop', instance: owner.inst.id, selector: owner.inst.selector, prop, before: used || null, after: sel.value, previewed: previewed && prevPreview, label: `${owner.inst.component} · ${prop}`, revert: () => previewProp(owner.root, prop, changes.get(key)?.after ?? sel.value, used) });
          }
          place(selBox, selected);
          renderChanges();
        });
        return el('label', { class: 'ed-prop' }, el('span', {}, prop), sel);
      });
      parts.push(el('div', { class: 'ed-section' },
        el('h3', {}, `Propriedades de ${owner.inst.component}`),
        el('p', { class: 'muted small' }, 'Só as opções que o DS oferece para este componente.'),
        rows));
    }
    panelBody.replaceChildren(...parts);
  }

  function renderChanges() {
    changeCount.textContent = String(changes.size);
    saveBtn.disabled = !changes.size || !config.enabled;
    changeList.replaceChildren(...[...changes.entries()].map(([key, c]) => el('li', {},
      el('div', { class: 'ed-change-label' }, c.label),
      el('div', { class: 'ed-change-diff' },
        el('del', {}, c.before ?? '(padrão)'), ' → ', el('ins', {}, c.after)),
      c.kind === 'prop' && !c.previewed ? el('div', { class: 'muted small' }, 'Sem prévia visual: a troca aparece depois de incorporada.') : null,
      el('button', { type: 'button', class: 'linkbtn', onclick: () => { c.revert(); changes.delete(key); renderChanges(); renderPanel(); place(selBox, selected); } }, 'Desfazer'))));
    if (!changes.size) changeList.append(el('li', { class: 'muted small' }, 'Nenhuma alteração ainda.'));
  }

  function openSave() {
    const motivo = el('textarea', { rows: 4, required: true, minlength: 10, maxlength: 2000, name: 'motivo' });
    const autor = el('input', { type: 'text', maxlength: 80, name: 'autor', autocomplete: 'name' });
    autor.value = storage.get(AUTHOR_KEY);
    const escopo = (value, label, checked) => el('label', { class: 'ed-radio' }, el('input', { type: 'radio', name: 'escopo', value, required: true, checked }), label);
    const status = el('p', { class: 'ed-status', role: 'status' });
    const submit = el('button', { type: 'submit', class: 'btn primary' }, 'Enviar proposta');
    const dialog = el('dialog', { class: 'ed-dialog' });
    const form = el('form', { method: 'dialog' },
      el('h2', {}, `Proposta para ${code}`),
      el('p', { class: 'muted small' }, `${changes.size} alteração(ões) na variante “${markup.variant.label}”. Nada muda no código até a proposta ser revisada e incorporada.`),
      el('label', { class: 'ed-field' }, el('span', {}, 'Por que fazer essa alteração? (obrigatório)'), motivo),
      el('fieldset', { class: 'ed-field' }, el('legend', {}, 'Vale para'),
        escopo('tela', 'Só esta tela', true),
        escopo('padrao', 'O padrão: outras telas que usam o mesmo componente ou padrão', false)),
      el('label', { class: 'ed-field' }, el('span', {}, 'Seu nome'), autor),
      status,
      el('div', { class: 'ed-actions' },
        el('button', { type: 'button', class: 'btn', onclick: () => dialog.close() }, 'Cancelar'),
        submit));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      submit.disabled = true;
      status.textContent = 'Enviando…';
      storage.set(AUTHOR_KEY, autor.value.trim());
      try {
        const r = await fetch('/api/propostas', {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            screen: code,
            variant: markup.variant.id,
            base: { markupSha256: markup.sha256 },
            motivo: motivo.value,
            escopo: form.elements.escopo.value,
            autor: autor.value.trim(),
            changes: [...changes.values()].map(({ kind, selector, instance, prop, before, after }) => ({ kind, selector, instance, prop, before, after })),
          }),
        });
        const body = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(body.error || `Erro ${r.status}`);
        changes.clear();
        dialog.close();
        onSaved(body);
      } catch (err) {
        status.textContent = err.message;
        submit.disabled = false;
      }
    });
    dialog.append(form);
    dialog.addEventListener('close', () => dialog.remove());
    document.body.append(dialog);
    dialog.showModal();
    motivo.focus();
  }

  renderChanges();
  return {
    panel,
    get dirty() { return changes.size > 0; },
    destroy() {
      for (const c of changes.values()) c.revert();
      changes.clear();
      overlay.remove();
      panel.remove();
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeunload', onUnload);
    },
  };
}

// Prévia de troca de prop: troca o sufixo da classe do componente (po-btn-primary → po-btn-secondary).
// Booleanos conhecidos mexem no atributo. Sem correspondência, a troca fica registrada sem prévia.
function previewProp(root, prop, from, to) {
  if (prop === 'disabled') {
    const on = to === 'true';
    root.toggleAttribute('disabled', on);
    root.setAttribute('aria-disabled', String(on));
    return true;
  }
  if (!from || !to) return false;
  let hit = false;
  for (const c of [...root.classList]) {
    if (c.endsWith(`-${from}`)) {
      root.classList.replace(c, `${c.slice(0, -from.length)}${to}`);
      hit = true;
    }
  }
  return hit;
}
