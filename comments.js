// Comentários no hub (estilo Figma): pins no fluxo (nó ou fundo do mapa) e na tela (coordenadas em 375×812).
// Os comentários ficam na coleção "comentarios" do db do artefato, para o time e para o Claude
// (que lê com ArtifactData). Sem o db (abertura local), guardam no navegador só para teste.
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var COL = "comentarios", LS = "palmeiras-comentarios-v1";
  var S = { on: false, items: [], db: null, user: null, me: null, names: {}, local: false, scope: "tudo", filter: "abertos", screen: null, pop: null };

  function newId() { return "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function now() { return new Date().toISOString(); }
  function when(iso) { try { return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } }
  function round(v) { return Math.round(v * 10) / 10; }
  function byCriado(a, b) { return (a.criado || "") < (b.criado || "") ? -1 : (a.criado || "") > (b.criado || "") ? 1 : 0; }
  function cap(n) {
    try { return window.claude && window.claude.use ? window.claude.use(n).catch(function () { return null; }) : Promise.resolve(null); }
    catch (e) { return Promise.resolve(null); }
  }
  function meId() { return S.me || (S.local ? "local" : "anon"); }
  function nameOf(id) {
    if (id === "claude") return "Claude";
    if (id === meId()) return "Você";
    return S.names[id] || "Alguém";
  }
  function screenOn(code) {
    return $$(".node").some(function (n) { return n.dataset.code === code && !/is-(gap|dec)/.test(n.className); });
  }
  function ctxLabel(c) {
    if (c.alvo === "tela") return "Tela " + c.tela + " · " + Math.round(c.x) + ", " + Math.round(c.y);
    return c.ancora === "canvas" ? "Fluxo · fundo do mapa" : "Fluxo · " + c.tela;
  }
  function notice(msg) {
    var t = $("#cm-toast");
    if (!t) { t = document.createElement("div"); t.id = "cm-toast"; t.className = "cm-toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 3200);
  }

  // ── Dados ──────────────────────────────────────
  function readLocal() { try { return JSON.parse(localStorage.getItem(LS) || "[]"); } catch (e) { return []; } }
  function writeLocal() { try { localStorage.setItem(LS, JSON.stringify(S.items)); } catch (e) {} }

  function load() {
    return Promise.all([cap("db"), cap("user")]).then(function (r) {
      S.db = r[0]; S.user = r[1];
      if (!S.db) { S.local = true; S.items = readLocal(); render(); return; }
      var idP = S.user ? S.user.id().catch(function () { return null; }) : Promise.resolve(null);
      return idP.then(function (id) {
        S.me = id;
        S.db.collection(COL).onSnapshot(function (snap) {
          S.items = snap.docs.map(function (d) { var o = d.data() || {}; o.id = d.id; return o; });
          resolveNames(); render();
        }, function () { notice("Não foi possível carregar os comentários agora."); });
      });
    });
  }
  function resolveNames() {
    if (!S.user) return;
    var ids = {};
    S.items.forEach(function (c) {
      if (c.autor && c.autor !== "claude") ids[c.autor] = 1;
      (c.respostas || []).forEach(function (r) { if (r.autor && r.autor !== "claude") ids[r.autor] = 1; });
    });
    var list = Object.keys(ids).filter(function (i) { return !(i in S.names); });
    if (!list.length) return;
    S.user.profiles(list).then(function (ps) {
      list.forEach(function (i) { S.names[i] = (ps[i] && ps[i].name) || "Alguém"; });
      render();
    }).catch(function () {});
  }
  function create(c) {
    c.id = newId();
    S.items.push(c);
    if (S.local) { writeLocal(); render(); return; }
    var data = Object.assign({}, c); delete data.id;
    render();
    S.db.collection(COL).doc(c.id).set(data).catch(function () { notice("Não foi possível salvar o comentário. Tente de novo."); });
  }
  function patch(c, f) {
    Object.assign(c, f);
    if (S.local) { writeLocal(); render(); return; }
    render();
    S.db.collection(COL).doc(c.id).update(f).catch(function () { notice("Não foi possível salvar a alteração."); });
  }
  function remove(c) {
    S.items = S.items.filter(function (i) { return i.id !== c.id; });
    if (S.local) { writeLocal(); render(); return; }
    render();
    S.db.collection(COL).doc(c.id).delete().catch(function () { notice("Não foi possível excluir o comentário."); });
  }

  // ── Numeração e filtros ────────────────────────
  function numbers() {
    var g = {}, m = {};
    S.items.slice().sort(byCriado).forEach(function (c) {
      var k = c.alvo + ":" + (c.tela || "");
      g[k] = (g[k] || 0) + 1; m[c.id] = g[k];
    });
    return m;
  }
  function visible(c) {
    if (S.filter !== "todos" && c.status === "resolvido") return false;
    return true;
  }

  // ── Modo comentário ────────────────────────────
  function setMode(on) {
    S.on = on;
    document.body.classList.toggle("cm-on", on);
    $$(".cm-chip").forEach(function (b) { b.setAttribute("aria-pressed", String(on)); });
    var o = $(".cm-ovl"); if (o) o.classList.toggle("on", on);
    if (on) notice("Modo comentário: clique numa tela do fluxo, no fundo do mapa ou na tela aberta. Tecla C para sair.");
  }

  // ── Popover (novo comentário e conversa) ───────
  function closePop() { if (S.pop) { S.pop.remove(); S.pop = null; } }
  function openPop(cx, cy, html, bind) {
    closePop();
    var p = document.createElement("div");
    p.className = "cm-pop"; p.innerHTML = html;
    document.body.appendChild(p); S.pop = p;
    var w = Math.min(320, window.innerWidth - 24);
    var left = Math.min(Math.max(12, cx + 14), window.innerWidth - w - 12);
    var top = Math.min(Math.max(12, cy + 14), Math.max(12, window.innerHeight - 320));
    p.style.width = w + "px"; p.style.left = left + "px"; p.style.top = top + "px";
    p.querySelector("[data-close]").onclick = closePop;
    bind(p);
    var ta = p.querySelector("textarea"); if (ta) ta.focus();
  }
  function openNew(ctx) {
    openPop(ctx.cx, ctx.cy,
      '<div class="cm-h"><b>Novo comentário</b><button class="cm-x" data-close aria-label="Fechar">×</button></div>' +
      '<p class="cm-ctx">' + esc(ctxLabel(ctx)) + '</p>' +
      '<textarea rows="3" placeholder="Escreva o comentário…"></textarea>' +
      '<div class="cm-row"><span class="grow"></span><button class="cm-btn" data-cancel>Cancelar</button><button class="cm-btn pri" data-send>Comentar</button></div>',
      function (p) {
        p.querySelector("[data-cancel]").onclick = closePop;
        p.querySelector("[data-send]").onclick = function () {
          var t = p.querySelector("textarea").value.trim();
          if (!t) return;
          closePop();
          create({ alvo: ctx.alvo, tela: ctx.tela || "", ancora: ctx.ancora, x: round(ctx.x), y: round(ctx.y),
            status: "aberto", texto: t, autor: meId(), criado: now(), respostas: [] });
        };
      });
  }
  function openThreadById(id, cx, cy) {
    var c = S.items.filter(function (i) { return i.id === id; })[0];
    if (c) openThread(c, cx, cy);
  }
  function openThread(c, cx, cy) {
    var nums = numbers(), mine = c.autor === meId();
    var msgs = [{ autor: c.autor, texto: c.texto, criado: c.criado }].concat(c.respostas || []);
    var html = '<div class="cm-h"><b>#' + (nums[c.id] || "") + ' · ' + esc(ctxLabel(c)) + '</b><button class="cm-x" data-close aria-label="Fechar">×</button></div>' +
      '<div class="cm-thread">' + msgs.map(function (m) {
        return '<div class="cm-msg"><div><b>' + esc(nameOf(m.autor)) + '</b> <span class="cm-when">' + esc(when(m.criado)) + '</span></div><p>' + esc(m.texto) + '</p></div>';
      }).join("") + '</div>' +
      '<textarea rows="2" placeholder="Responder…"></textarea>' +
      '<div class="cm-row"><button class="cm-btn" data-status>' + (c.status === "resolvido" ? "Reabrir" : "Resolver") + '</button>' +
      (mine ? '<button class="cm-btn danger" data-del>Excluir</button>' : '') +
      '<span class="grow"></span><button class="cm-btn pri" data-reply>Responder</button></div>';
    openPop(cx, cy, html, function (p) {
      p.querySelector("[data-reply]").onclick = function () {
        var t = p.querySelector("textarea").value.trim();
        if (!t) return;
        patch(c, { respostas: (c.respostas || []).concat([{ autor: meId(), texto: t, criado: now() }]) });
        openThread(c, cx, cy);
      };
      p.querySelector("[data-status]").onclick = function () {
        patch(c, { status: c.status === "resolvido" ? "aberto" : "resolvido" });
        closePop();
      };
      var d = p.querySelector("[data-del]");
      if (d) d.onclick = function () { if (window.confirm("Excluir este comentário e as respostas?")) { remove(c); closePop(); } };
    });
  }

  // ── Pins no fluxo (dentro do mundo, com o zoom) ─
  function nodeEl(code) { return $$(".node").filter(function (n) { return n.dataset.code === code; })[0]; }
  function flowPos(c) {
    if (c.ancora === "canvas") return { x: c.x, y: c.y };
    var el = nodeEl(c.tela);
    return el ? { x: el.offsetLeft + c.x, y: el.offsetTop + c.y } : null;
  }
  function renderFlowPins() {
    var world = $("#world"); if (!world) return;
    $$(".cm-pin.flow", world).forEach(function (p) { p.remove(); });
    var nums = numbers();
    S.items.filter(function (c) { return c.alvo === "fluxo" && visible(c); }).forEach(function (c) {
      var p = flowPos(c); if (!p) return;
      var b = document.createElement("button");
      b.className = "cm-pin flow" + (c.status === "resolvido" ? " done" : "");
      b.dataset.id = c.id; b.style.left = p.x + "px"; b.style.top = p.y + "px";
      b.textContent = String(nums[c.id]);
      b.setAttribute("aria-label", "Comentário " + nums[c.id] + " · " + ctxLabel(c));
      b.onclick = function (e) { e.stopPropagation(); openThread(c, e.clientX, e.clientY); };
      world.appendChild(b);
    });
  }

  // ── Pins na tela (overlay sobre o dispositivo, em %) ─
  function ensureOverlay() {
    var dev = $("#v-device"); if (!dev) return null;
    var o = $(".cm-ovl", dev);
    if (!o) {
      o = document.createElement("div"); o.className = "cm-ovl" + (S.on ? " on" : "");
      o.addEventListener("click", function (e) {
        if (!S.on || e.target !== o) return;
        e.stopPropagation(); e.preventDefault();
        var r = dev.getBoundingClientRect();
        openNew({ alvo: "tela", tela: S.screen, ancora: "tela", x: (e.clientX - r.left) / r.width * 375, y: (e.clientY - r.top) / r.height * 812,
          cx: e.clientX, cy: e.clientY });
      });
      dev.appendChild(o);
    }
    return o;
  }
  function renderTelaPins() {
    var o = ensureOverlay(); if (!o) return;
    o.innerHTML = "";
    if (!S.screen) return;
    var nums = numbers();
    S.items.filter(function (c) { return c.alvo === "tela" && c.tela === S.screen && visible(c); }).forEach(function (c) {
      var b = document.createElement("button");
      b.className = "cm-pin tela" + (c.status === "resolvido" ? " done" : "");
      b.dataset.id = c.id;
      b.style.left = (c.x / 375 * 100) + "%"; b.style.top = (c.y / 812 * 100) + "%";
      b.textContent = String(nums[c.id]);
      b.setAttribute("aria-label", "Comentário " + nums[c.id] + " na tela " + c.tela);
      b.onclick = function (e) { e.stopPropagation(); openThread(c, e.clientX, e.clientY); };
      o.appendChild(b);
    });
  }

  // ── Painel de comentários ──────────────────────
  function openPane(scope) {
    var panel = $("#panel");
    S.scope = scope || "tudo";
    if (S.scope === "tela" && !S.screen) S.scope = "tudo";
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    var hasScreen = S.screen && S.scope === "tela";
    $("#tabs").hidden = !hasScreen && !S.screen;
    $$("#tabs [role=tab]").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.tab === "coment")); });
    $$(".p-body", panel).forEach(function (p) { p.hidden = p.dataset.pane !== "coment"; });
    if (S.scope === "tudo") { $("#p-code").textContent = "COMENTÁRIOS"; $("#p-name").textContent = "Todos os comentários"; $("#p-sub").innerHTML = ""; }
    renderPane();
  }
  function renderPane() {
    var box = $("#cm-list"); if (!box) return;
    var nums = numbers();
    $$("#cm-scope [data-scope]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.scope === S.scope)); b.disabled = b.dataset.scope === "tela" && !S.screen; });
    $$("#cm-filter [data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === S.filter)); });
    $("#cm-note").textContent = S.local ? "Comentários salvos só neste navegador (versão local). No link publicado ficam para o time e para o Claude." : "";
    var list = S.items.filter(function (c) {
      if (S.scope === "tela" && !(c.tela === S.screen)) return false;
      return visible(c);
    }).sort(byCriado).reverse();
    box.innerHTML = list.length ? list.map(function (c) {
      return '<article class="cm-item' + (c.status === "resolvido" ? " done" : "") + '" data-id="' + esc(c.id) + '">' +
        '<div class="cm-h2"><span class="cm-num">' + nums[c.id] + '</span><b>' + esc(ctxLabel(c)) + '</b></div>' +
        '<p>' + esc(c.texto) + '</p>' +
        '<small>' + esc(nameOf(c.autor)) + ' · ' + esc(when(c.criado)) + ' · ' + ((c.respostas || []).length) + ' resposta(s) · ' + (c.status === "resolvido" ? "resolvido" : "aberto") + '</small></article>';
    }).join("") : '<p class="cm-empty">Nenhum comentário ' + (S.filter === "abertos" ? "em aberto" : "") + ' aqui. Clique em <b>Comentar</b> e depois na tela ou no fluxo.</p>';
    $$(".cm-item", box).forEach(function (el) {
      el.onclick = function () {
        var c = S.items.filter(function (i) { return i.id === el.dataset.id; })[0];
        var r = el.getBoundingClientRect();
        if (c) openThread(c, r.right - 40, r.top + 8);
      };
    });
    var open = S.items.filter(function (c) { return c.status !== "resolvido"; }).length;
    var cnt = $("#cm-count"); if (cnt) cnt.textContent = open ? String(open) : "";
    var pc = $("#c-coment"); if (pc) pc.textContent = open ? String(open) : "";
  }
  function exportMd() {
    var lines = ["# Comentários em aberto · Palmeiras Onboarding", "", "Fonte: " + location.href, ""];
    var nums = numbers();
    S.items.filter(function (c) { return c.status !== "resolvido"; }).sort(byCriado).forEach(function (c) {
      lines.push("- #" + nums[c.id] + " **" + ctxLabel(c) + "** (" + nameOf(c.autor) + ", " + when(c.criado) + "): " + c.texto);
      (c.respostas || []).forEach(function (r) { lines.push("  - " + nameOf(r.autor) + ": " + r.texto); });
    });
    if (lines.length === 4) lines.push("Nenhum comentário em aberto.");
    return lines.join("\n");
  }
  function copyMd() {
    var text = exportMd();
    var done = function () { notice("Comentários em aberto copiados. Cole no chat com o Claude."); };
    try { navigator.clipboard.writeText(text).then(done, function () { notice("Não foi possível copiar."); }); }
    catch (e) { notice("Não foi possível copiar."); }
  }

  function render() { renderFlowPins(); renderTelaPins(); renderPane(); }

  // ── Interface inserida no hub ──────────────────
  function injectUI() {
    var grp = $('.group[aria-label="Exibição"]');
    if (grp) {
      grp.insertAdjacentHTML("beforeend",
        '<button class="chip cm-chip" id="cm-toggle" aria-pressed="false">Comentar</button>' +
        '<button class="chip" id="cm-open">Comentários <span id="cm-count" class="cm-count"></span></button>');
      $("#cm-toggle").onclick = function () { setMode(!S.on); };
      $("#cm-open").onclick = function () { openPane("tudo"); };
    }
    var tabs = $("#tabs");
    tabs.insertAdjacentHTML("beforeend", '<button role="tab" data-tab="coment" aria-selected="false">Comentários<span class="count" id="c-coment"></span></button>');
    $('#tabs [data-tab="coment"]').onclick = function () { openPane(S.screen ? "tela" : "tudo"); };

    var panel = $("#panel");
    var sec = document.createElement("section");
    sec.className = "p-body"; sec.setAttribute("data-pane", "coment"); sec.hidden = true;
    sec.innerHTML = '<div class="cm-pane">' +
      '<div class="cm-tools">' +
        '<div class="cm-seg" id="cm-scope"><button data-scope="tela">Esta tela</button><button data-scope="tudo">Todos</button></div>' +
        '<div class="cm-seg" id="cm-filter"><button data-filter="abertos">Em aberto</button><button data-filter="todos">Todos</button></div>' +
        '<button class="cm-btn" id="cm-copy">Copiar para o Claude</button>' +
      '</div>' +
      '<p class="cm-note" id="cm-note"></p>' +
      '<div class="cm-list" id="cm-list"></div>' +
    '</div>';
    panel.appendChild(sec);
    $$("#cm-scope [data-scope]").forEach(function (b) { b.onclick = function () { S.scope = b.dataset.scope; renderPane(); }; });
    $$("#cm-filter [data-filter]").forEach(function (b) { b.onclick = function () { S.filter = b.dataset.filter; render(); }; });
    $("#cm-copy").onclick = copyMd;

    // Botão "Comentar" também dentro da aba Tela
    var tools = $("#v-tools");
    if (tools) {
      var ensureChip = function () {
        if (!$(".cm-chip-t", tools)) {
          var b = document.createElement("button");
          b.className = "chip cm-chip cm-chip-t"; b.setAttribute("aria-pressed", String(S.on)); b.textContent = "Comentar";
          b.onclick = function () { setMode(!S.on); };
          tools.appendChild(b);
        }
      };
      ensureChip();
      new MutationObserver(function () { ensureChip(); render(); }).observe(tools, { childList: true });
    }

    document.addEventListener("keydown", function (e) {
      if (e.target.closest && e.target.closest("input, textarea")) return;
      if (e.key === "Escape") { if (S.pop) closePop(); else if (S.on) setMode(false); }
      if ((e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey && !e.altKey && !S.pop) setMode(!S.on);
    });

    // Cliques no mapa com o modo ligado: criam ou abrem pins (fase de captura, antes da seleção de nó)
    var stage = $("#stage"), downAt = null;
    stage.addEventListener("pointerdown", function (e) { downAt = { x: e.clientX, y: e.clientY }; }, true);
    stage.addEventListener("click", function (e) {
      if (!S.on) return;
      if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 4) return;
      if (e.target.closest(".legend")) return;
      e.stopPropagation(); e.preventDefault();
      var pin = e.target.closest(".cm-pin");
      if (pin && pin.dataset.id) { openThreadById(pin.dataset.id, e.clientX, e.clientY); return; }
      var node = e.target.closest(".node");
      if (node) {
        var r = node.getBoundingClientRect(), k = r.width / node.offsetWidth;
        openNew({ alvo: "fluxo", tela: node.dataset.code, ancora: "no", x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k, cx: e.clientX, cy: e.clientY });
        return;
      }
      var w = $("#world"), wr = w.getBoundingClientRect(), kk = wr.width / w.offsetWidth;
      openNew({ alvo: "fluxo", tela: "", ancora: "canvas", x: (e.clientX - wr.left) / kk, y: (e.clientY - wr.top) / kk, cx: e.clientX, cy: e.clientY });
    }, true);

    // Acompanha a tela selecionada no painel do hub
    var pc = $("#p-code");
    var sync = function () {
      var code = (pc.textContent || "").trim();
      S.screen = screenOn(code) ? code : null;
      renderTelaPins();
      renderPane();
    };
    new MutationObserver(sync).observe(pc, { childList: true, characterData: true, subtree: true });
  }

  function init() {
    injectUI();
    load();
    // Os pins do fluxo precisam dos nós, que chegam depois do fetch do flow.json
    var t = setInterval(function () { if ($(".node")) { clearInterval(t); render(); } }, 250);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
