(function () {
  // Validação facial: roteiro das telas liv-*. Usa window.palmeirasGo (navegação de app.js) e reage quando uma tela liv-* aparece.
  var $ = function (sel) { return document.querySelector(sel); };
  var MAX_ATTEMPTS = 3, LOCK_SECONDS = 300, REDIRECT_SECONDS = 10;
  // Sequência do giro. Passos com `check` esperam a decisão (botões de demonstração no menu).
  var FACE = [
    { state: 'progress', dir: 'left', title: 'Gire seu rosto para a esquerda' },
    { state: 'success', title: 'Perfeito!', hold: 900 },
    { state: 'progress', dir: 'right', title: 'Gire seu rosto para a direita' },
    { state: 'success', title: 'Muito bom!', hold: 900 },
    { state: 'idle', title: 'Olhe para frente e enquadre seu rosto', hold: 1200 },
    { state: 'frame', title: 'Encaixe seu rosto dentro da moldura e olhe diretamente para câmera do seu celular', check: true }
  ];
  var FRAME_INDEX = 5;
  var WARN = ['Aproxime-se um pouco da câmera.', 'Afaste-se um pouco da câmera.', 'Enquadre seu rosto no centro da moldura.'];
  var TUT_TITLES = ['Ache um lugar bem claro e com fundo simples.', 'Tire óculos, boné ou o que cobrir seu rosto.', 'Vista uma roupa apropriada.'];
  var CAPTURE_SCREENS = { 'liv-face': 1, 'liv-validating': 1 };

  // mode: 'face' (giro), 'countdown' (contagem depois de aprovar) ou 'warn' (avisos depois de reprovar).
  // paused: o que retomar quando o celular voltar para a vertical.
  var st = { tut: 0, faceIdx: 0, prog: 0, attempts: 0, warn: 0, count: 3, lock: LOCK_SECONDS, landscape: false,
    timers: [], screen: null, mode: 'face', paused: null, drawn: null, redirect: REDIRECT_SECONDS };

  function later(ms, fn) { var t = setTimeout(fn, ms); st.timers.push(t); return t; }
  function every(ms, fn) { var t = setInterval(fn, ms); st.timers.push(t); return t; }
  function clearAll() { st.timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); st.timers = []; }
  function mmss(s) { var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' + r : r); }
  function go(id) { if (window.palmeirasGo) window.palmeirasGo(id); }
  function say(id, text) { var el = $(id); if (el) el.textContent = text; }

  function setDemo() {
    var ok = st.screen === 'liv-face' && FACE[st.faceIdx] && FACE[st.faceIdx].check && !st.landscape && st.mode === 'face';
    $('#lv-approve').disabled = !ok;
    $('#lv-reject').disabled = !ok;
    $('#lv-unlock').disabled = st.screen !== 'liv-lock';
    $('#lv-attempts').textContent = Math.min(st.attempts, MAX_ATTEMPTS) + ' de ' + MAX_ATTEMPTS;
    $('#lv-rotate').textContent = st.landscape ? 'Voltar para vertical' : 'Girar para horizontal';
    $('#lv-orient').hidden = !(st.landscape && CAPTURE_SCREENS[st.screen]);
  }

  // ── Tutorial ──────────────────────────────────────
  function renderTutorial(announce) {
    document.querySelectorAll('#liv-tutorial [data-tut]').forEach(function (el) { el.hidden = Number(el.dataset.tut) !== st.tut; });
    document.querySelectorAll('#liv-tutorial .lv-tut-dots span').forEach(function (d, i) { d.className = i === st.tut ? 'on' : ''; });
    // Anúncio da troca, como no Tutorial do DS: "Etapa 2 de 3, …"
    say('#liv-tut-step', announce ? 'Etapa ' + (st.tut + 1) + ' de 3, ' + TUT_TITLES[st.tut] : '');
    startFill();
  }
  // Botão de preenchimento: aria-disabled enquanto a barra enche (3 s), depois libera. Recomeça a cada passo.
  var fillTimer = null;
  function startFill() {
    var b = $('#liv-tut-next');
    clearTimeout(fillTimer);
    b.setAttribute('aria-disabled', 'true');
    b.classList.remove('is-filling'); void b.offsetWidth; b.classList.add('is-filling');
    fillTimer = setTimeout(function () { b.removeAttribute('aria-disabled'); b.classList.remove('is-filling'); }, 3000);
  }
  function tutNext() {
    if ($('#liv-tut-next').getAttribute('aria-disabled') === 'true') return;
    if (st.tut < TUT_TITLES.length - 1) { st.tut++; renderTutorial(true); } else { go('liv-face'); }
  }
  function tutBack() {
    if (st.tut > 0) { st.tut--; renderTutorial(true); } else { go('documento'); }
  }

  // ── Captura facial ────────────────────────────────
  // Recria o círculo só quando o estado muda; no progresso, só atualiza o traço (assim a transição do CSS funciona).
  function drawCircle(state, opts) {
    var c = $('#lv-circle');
    var key = state + ':' + (opts.dir || '');
    if (state === 'progress' && st.drawn === key) {
      var arc = c.querySelector('circle');
      if (arc) arc.setAttribute('stroke-dasharray', (opts.arc * 50) + ' 100');
      c.querySelector('.lv-arc').style.visibility = opts.arc > 0 ? 'visible' : 'hidden';
      return;
    }
    if (state === 'countdown' && st.drawn === key) { c.querySelector('.lv-count').textContent = st.count; return; }
    st.drawn = key;
    c.dataset.state = state;
    var html = '';
    if (state === 'progress') {
      html += '<svg class="lv-arc lv-arc-' + (opts.dir || 'left') + '" viewBox="0 0 100 100" aria-hidden="true" style="visibility:' + (opts.arc > 0 ? 'visible' : 'hidden') + '"><circle cx="50" cy="50" r="48" pathLength="100" stroke-dasharray="' + (opts.arc * 50) + ' 100"></circle></svg>';
    }
    if (state === 'success' || state === 'countdown') html += '<div class="lv-ring lv-ring-success" aria-hidden="true"></div>';
    if (state === 'warning') html += '<div class="lv-ring lv-ring-warning" aria-hidden="true"></div>';
    if (state === 'frame') html += '<div class="lv-oval" aria-hidden="true"></div>';
    if (state === 'countdown') html += '<div class="lv-count-wrap" aria-hidden="true"><span class="lv-count">' + st.count + '</span></div>';
    c.innerHTML = html;
  }
  function setTitle(text, tone) {
    var t = $('#lv-title');
    t.textContent = text;
    t.className = 'po-heading-title lv-face-title' + (tone === 'neutral' ? ' po-heading-neutral' : '');
  }

  function runFace() {
    clearAll();
    st.mode = 'face';
    setDemo();
    var cur = FACE[st.faceIdx];
    if (!cur) return;
    setTitle(cur.title, cur.state === 'success' ? 'brand' : 'neutral');
    if (cur.check) { drawCircle('frame', {}); setDemo(); return; }
    if (cur.state === 'progress') {
      st.prog = 0;
      drawCircle('progress', { arc: 0, dir: cur.dir });
      every(100, function () {
        st.prog = Math.min(1, st.prog + 0.1);
        drawCircle('progress', { arc: st.prog, dir: cur.dir });
        if (st.prog >= 1) { clearAll(); later(500, function () { st.faceIdx++; runFace(); }); }
      });
      return;
    }
    drawCircle(cur.state, {});
    later(cur.hold || 1000, function () { st.faceIdx++; runFace(); });
  }

  // Contagem 3, 2, 1. Retoma do número em que parou.
  function countdownTick() {
    clearAll();
    st.mode = 'countdown';
    setTitle('Excelente! Vamos tirar sua foto.', 'brand');
    drawCircle('countdown', {});
    say('#lv-live', 'Foto em ' + st.count);
    setDemo();
    later(900, function () {
      if (st.count > 1) { st.count--; countdownTick(); }
      else { say('#lv-live', ''); go('liv-validating'); }
    });
  }
  function approve() { st.count = 3; countdownTick(); }

  // Avisos depois de reprovar. Retoma no aviso em que parou.
  function warnStep() {
    clearAll();
    st.mode = 'warn';
    setDemo();
    if (st.warn >= WARN.length) { st.faceIdx = FRAME_INDEX; runFace(); return; }
    setTitle(WARN[st.warn], 'neutral');
    drawCircle('warning', {});
    later(1400, function () { st.warn++; warnStep(); });
  }
  function reject() {
    st.attempts++;
    if (st.attempts >= MAX_ATTEMPTS) { go('liv-lock'); return; }
    st.warn = 0;
    warnStep();
  }

  // O que a tela de captura faria agora, para pausar e retomar ao girar.
  function currentStep() {
    if (st.screen === 'liv-validating') return enterValidating;
    if (st.screen !== 'liv-face') return null;
    return st.mode === 'countdown' ? countdownTick : st.mode === 'warn' ? warnStep : runFace;
  }
  function rotate() {
    st.landscape = !st.landscape;
    if (st.landscape) { st.paused = currentStep(); clearAll(); }
    else if (st.paused) { var resume = st.paused; st.paused = null; resume(); }
    setDemo();
  }

  // ── Validação, bloqueio, conclusão ────────────────
  function enterValidating() {
    clearAll();
    later(2000, function () { go('liv-review'); });
  }
  function enterLock() {
    clearAll();
    st.lock = LOCK_SECONDS;
    var paint = function () { say('#lv-lock-text', 'Você excedeu o limite de ' + MAX_ATTEMPTS + ' tentativas. Tente novamente em ' + mmss(st.lock) + '.'); };
    paint();
    every(1000, function () {
      st.lock = Math.max(0, st.lock - 1);
      paint();
      if (st.lock <= 0) { clearAll(); st.attempts = 0; go('liv-error'); }
    });
  }
  // Redirecionamento de 10 s com "Continuar agora". Não conta com a aba oculta.
  function paintRedirect() {
    say('#lv-done-count', String(st.redirect));
  }
  // A próxima etapa vem do backend; no protótipo, a validação de benefícios ainda não existe e o fluxo segue para a área logada.
  function finishRedirect() {
    clearAll();
    go('area-cadastro-detalhe');
  }
  function enterDone() {
    clearAll();
    st.redirect = REDIRECT_SECONDS;
    $('#lv-done-actions').hidden = false;
    say('#lv-done-text', 'Redirecionando para a próxima etapa...');
    paintRedirect();
    say('#lv-done-live', '');
    later(100, function () { say('#lv-done-live', 'Redirecionando para a próxima etapa em ' + REDIRECT_SECONDS + ' segundos. '); });
    every(1000, function () {
      if (document.hidden) return;
      st.redirect = Math.max(0, st.redirect - 1);
      paintRedirect();
      if (st.redirect <= 0) finishRedirect();
    });
  }

  // ── Entrada e saída de cada tela ──────────────────
  function enter(id) {
    st.screen = id;
    clearAll();
    st.paused = null;
    if (id === 'liv-tutorial') { st.tut = 0; st.attempts = 0; renderTutorial(false); }
    if (id === 'liv-face') { st.faceIdx = 0; st.count = 3; st.drawn = null; say('#lv-live', ''); }
    if (id === 'liv-lock') enterLock();
    if (id === 'liv-done') enterDone();
    if (CAPTURE_SCREENS[id]) {
      var start = id === 'liv-face' ? runFace : enterValidating;
      if (st.landscape) st.paused = start; else start();
    }
    setDemo();
  }
  function leave(id) {
    if (st.screen !== id) return;
    clearAll();
    st.paused = null;
    st.screen = null;
    setDemo();
  }

  function attach() {
    var sections = document.querySelectorAll('[id^="liv-"][data-screen]');
    sections.forEach(function (section) {
      new MutationObserver(function () {
        if (!section.hidden) enter(section.id); else leave(section.id);
      }).observe(section, { attributes: true, attributeFilter: ['hidden'] });
    });

    $('#liv-tut-next').addEventListener('click', tutNext);
    $('#liv-tut-back').addEventListener('click', tutBack);
    $('#liv-face-back').addEventListener('click', function () { go('liv-tutorial'); });
    $('#lv-approve').addEventListener('click', approve);
    $('#lv-reject').addEventListener('click', reject);
    $('#lv-rotate').addEventListener('click', rotate);
    $('#lv-unlock').addEventListener('click', function () { st.lock = 1; });
    $('#lv-done-now').addEventListener('click', finishRedirect);
    $('#lv-support-btn').addEventListener('click', function () {
      var panel = $('#lv-support'), open = panel.hidden;
      panel.hidden = !open;
      this.setAttribute('aria-expanded', String(open));
    });

    // A primeira tela pode já ser uma liv-* (link com #liv-face): o app.js mostrou antes deste script observar.
    sections.forEach(function (section) { if (!section.hidden) enter(section.id); });
    setDemo();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach); else attach();
})();
