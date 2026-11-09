(function () {
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // Dados que atravessam as telas (protótipo: ficam só em memória)
  var state = { phone: "(11) 98765-5432", email: "joao.silva@email.com", emailEdited: false };
  var DEMO_CODE = "123456";

  // ── Navegação entre telas ─────────────────────────
  var onEnter = {};
  function go(id) {
    $$("[data-screen]").forEach(function (s) { s.hidden = s.id !== id; });
    $$(".proto-nav [data-go]").forEach(function (b) {
      if (b.dataset.go === id) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    history.replaceState(null, "", "#" + id);
    if (onEnter[id]) onEnter[id]();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]");
    if (t) { e.preventDefault(); go(t.dataset.go); }
  });

  // ── Dados exibidos sempre mascarados ──────────────
  function maskPhone(v) { var d = v.replace(/\D/g, ""); return "(" + d.slice(0, 2) + ") " + d[2] + "****-" + d.slice(-4); }
  function maskEmail(v) { var p = v.split("@"); return p[0].slice(0, 4) + "****@" + p[1]; }
  function renderContacts() {
    $$('[data-bind="phone"]').forEach(function (el) { el.textContent = maskPhone(state.phone); });
    $$('[data-bind="email"]').forEach(function (el) { el.textContent = maskEmail(state.email); });
  }

  // ── Máscaras ──────────────────────────────────────
  var MASKS = {
    cpf: function (d) { d = d.slice(0, 11); return d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2"); },
    data: function (d) { d = d.slice(0, 8); return d.replace(/^(\d{2})(\d)/, "$1/$2").replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); },
    celular: function (d) { d = d.slice(0, 11); if (!d) return ""; if (d.length <= 2) return "(" + d; var r = "(" + d.slice(0, 2) + ") " + d.slice(2, 7); if (d.length > 7) r += "-" + d.slice(7); return r; },
    cep: function (d) { d = d.slice(0, 8); return d.replace(/^(\d{5})(\d)/, "$1-$2"); }
  };
  $$("[data-mask]").forEach(function (input) {
    input.addEventListener("input", function () { input.value = MASKS[input.dataset.mask](input.value.replace(/\D/g, "")); });
  });

  // ── Validação ─────────────────────────────────────
  function cpfValido(v) {
    var d = v.replace(/\D/g, "");
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var s = 0;
      for (var i = 0; i < t; i++) s += +d[i] * (t + 1 - i);
      if (((s * 10) % 11) % 10 !== +d[t]) return false;
    }
    return true;
  }
  function dataValida(v) {
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
    if (!m) return false;
    var dt = new Date(+m[3], +m[2] - 1, +m[1]);
    return dt.getDate() === +m[1] && dt.getMonth() === +m[2] - 1 && dt < new Date() && +m[3] > 1900;
  }
  function celularValido(v) { return /^\(\d{2}\) 9\d{4}-\d{4}$/.test(v); }
  function emailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  // Texto do celular vem do Figma; os de CPF, data e e-mail ainda não foram lidos (DESIGN-SYSTEM.md) e são provisórios.
  var RULES = {
    cpf: [cpfValido, "CPF inválido. Use o formato 000.000.000-00."],
    nascimento: [dataValida, "Data de nascimento inválida. Use o formato DD/MM/AAAA."],
    celular: [celularValido, "Número de celular inválido. Use o formato (XX) XXXXX-XXXX."],
    email: [emailValido, "E-mail inválido. Use o formato nome@exemplo.com."]
  };



  // ── Login: botão desabilitado até os campos serem preenchidos (anotação do Figma) ──
  var loginForm = $("#login-form");
  clearOnInput(loginForm);
  // Entrar: CPF válido + senha leva à área logada (protótipo: qualquer senha serve).
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Botão sempre ativo (política do DS): valida ao enviar.
    var cpf = $("#login-cpf"), senha = $("#login-senha");
    var okCpf = cpfValido(cpf.value), okSenha = Boolean(senha.value);
    setFieldError(cpf, okCpf ? null : RULES.cpf[1]);
    setFieldError(senha, okSenha ? null : "Informe sua senha.");
    if (!okCpf) { cpf.focus(); return; }
    if (!okSenha) { senha.focus(); return; }
    loginForm.reset();
    go("area-cadastro-detalhe");
  });


  // ── Cadastro 1/4 ──────────────────────────────────
  var cad = $("#cadastro-form");
  var cadInputs = $$(".po-input", cad);
  clearOnInput(cad);
  cad.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    cadInputs.forEach(function (input) {
      var rule = RULES[input.name];
      var ok = rule[0](input.value.trim());
      setFieldError(input, ok ? null : rule[1]);
      if (!ok && !firstBad) firstBad = input;
    });
    setFieldError(cad.termos, cad.termos.checked ? null : "Para continuar, aceite os Termos de Uso.");
    if (!cad.termos.checked && !firstBad) firstBad = cad.termos;
    if (firstBad) { firstBad.focus(); return; }
    state.phone = cad.celular.value;
    state.email = cad.email.value.trim();
    state.emailEdited = false;
    renderContacts();
    otp.sms.reset();
    otp.email.reset();
    go("otp-sms");
  });

  // Tabs Brasileiro / Estrangeiro (o formulário de Estrangeiro ainda não foi desenhado)
  $$(".po-tab", cad).forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$(".po-tab", cad).forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); t.classList.toggle("po-tab-active", t === tab); });
    });
  });

  // ── OTPInput: 6 células (3 – 3), valida ao completar ──
  var ALERTS = {
    wrong: ["Código incorreto", "O código que você inseriu está incorreto, verifique e tente novamente."],
    locked: ["Excesso de tentativas.", "Você excedeu o limite de 3 tentativas. Tente novamente em 30 minutos."]
  };
  var SUCCESS = {
    sms: ["Celular verificado", "Validação de celular concluída com sucesso."],
    email: ["E-mail verificado", "Validação de e-mail concluída com sucesso."]
  };
  var MAX_ATTEMPTS = 3;
  var RESEND_SECONDS = 30;

  function setupOtp(root, channel, onSuccess) {
    root.innerHTML =
      '<div class="po-otp"><div class="po-otp-row" role="group" aria-label="Código de verificação"></div>' +
      '<p class="po-otp-msg" hidden></p></div><div class="otp-feedback"></div>';
    var wrap = $(".po-otp", root), row = $(".po-otp-row", root), msg = $(".po-otp-msg", root), feedback = $(".otp-feedback", root);
    var cells = [], value = "", attempts = MAX_ATTEMPTS, locked = false, timer = null;
    // Reenviar: aria-disabled durante o bloqueio e por 30 s depois de cada envio (revisão de Linhas e verificação).
    var resendBtn = $('[data-resend="' + channel + '"]'), cooldown = 0, cooldownTimer = null;
    function paintResend() {
      var off = locked || cooldown > 0;
      if (off) resendBtn.setAttribute("aria-disabled", "true"); else resendBtn.removeAttribute("aria-disabled");
      resendBtn.textContent = cooldown > 0 && !locked ? "Reenviar código em 0:" + (cooldown < 10 ? "0" : "") + cooldown : "Reenviar código";
    }
    function startCooldown() {
      clearInterval(cooldownTimer);
      cooldown = RESEND_SECONDS; paintResend();
      cooldownTimer = setInterval(function () {
        cooldown = Math.max(0, cooldown - 1); paintResend();
        if (!cooldown) clearInterval(cooldownTimer);
      }, 1000);
    }

    for (var i = 0; i < 6; i++) {
      if (i === 3) { var sep = document.createElement("span"); sep.className = "po-otp-sep"; sep.setAttribute("aria-hidden", "true"); row.appendChild(sep); }
      var c = document.createElement("input");
      c.className = "po-otp-cell";
      c.inputMode = "numeric";
      c.autocomplete = i === 0 ? "one-time-code" : "off";
      c.maxLength = 6;
      c.setAttribute("aria-label", "Dígito " + (i + 1) + " de 6");
      (function (idx) {
        c.addEventListener("input", function (e) { onInput(idx, e); });
        c.addEventListener("keydown", function (e) { onKey(idx, e); });
        c.addEventListener("focus", function (e) { e.target.select(); });
      })(i);
      cells.push(c);
      row.appendChild(c);
    }

    function paint() { cells.forEach(function (c, i) { c.value = value[i] || ""; c.readOnly = locked; }); }
    function setState(s) { wrap.className = "po-otp po-otp-" + s; row.toggleAttribute("aria-invalid", s === "error"); }
    function showAlert(a) {
      feedback.innerHTML = '<div class="po-alert" role="alert"><span class="po-alert-icon"><span class="po-icon" aria-hidden="true">error</span></span>' +
        '<div class="po-alert-text"><p class="po-alert-title"></p><p class="po-alert-body"></p></div></div>';
      $(".po-alert-title", feedback).textContent = a[0];
      $(".po-alert-body", feedback).textContent = a[1];
    }
    function showSuccess() {
      feedback.innerHTML = '<div class="po-status" role="status"><span class="po-status-icon"><span class="po-icon s20 fill" aria-hidden="true">check_circle</span></span>' +
        '<div class="po-status-text"><p class="po-status-title"></p><p class="po-status-desc"></p></div></div>';
      $(".po-status-title", feedback).textContent = SUCCESS[channel][0];
      $(".po-status-desc", feedback).textContent = SUCCESS[channel][1];
    }

    function commit(next) {
      value = next.replace(/\D/g, "").slice(0, 6);
      if (wrap.classList.contains("po-otp-error") && !locked) { setState("default"); }
      paint();
      if (value.length === 6) check();
    }
    function onInput(i, e) {
      if (locked) return;
      var digits = e.target.value.replace(/\D/g, "");
      if (!digits) { paint(); return; }
      commit(value.slice(0, i) + digits + value.slice(i + digits.length));
      var next = cells[Math.min(value.length, 5)];
      if (next && !locked) next.focus();
    }
    function onKey(i, e) {
      if (e.key !== "Backspace" || locked) return;
      e.preventDefault();
      var at = value[i] ? i : i - 1;
      if (at < 0) return;
      commit(value.slice(0, at) + value.slice(at + 1));
      cells[at].focus();
    }
    function check() {
      if (value === DEMO_CODE) {
        locked = true; paint(); setState("success");
        msg.hidden = true; showSuccess();
        timer = setTimeout(onSuccess, 1800);
        return;
      }
      attempts--;
      setState("error");
      if (attempts <= 0) {
        locked = true; paint(); paintResend();
        msg.hidden = true; showAlert(ALERTS.locked);
      } else {
        msg.hidden = false; msg.setAttribute("role", "alert");
        msg.textContent = "Tentativas restantes: " + attempts + "/" + MAX_ATTEMPTS;
        showAlert(ALERTS.wrong);
      }
    }
    // Novo envio de código (cadastro ou contato editado): zera tentativas, bloqueio e intervalo.
    function reset() {
      clearTimeout(timer); clearInterval(cooldownTimer);
      value = ""; attempts = MAX_ATTEMPTS; locked = false; cooldown = 0;
      setState("default"); paint(); paintResend();
      msg.hidden = true; feedback.innerHTML = "";
    }
    // Reenviar no mesmo contato: só um código novo. Tentativas e bloqueio continuam valendo.
    function resend() {
      if (locked || cooldown > 0) return false;
      value = ""; setState("default"); paint();
      msg.hidden = true; feedback.innerHTML = "";
      startCooldown();
      return true;
    }
    reset();
    return { reset: reset, resend: resend, focus: function () { if (!locked) cells[Math.min(value.length, 5)].focus(); } };
  }

  var otp = {
    sms: setupOtp($('[data-otp="sms"]'), "sms", function () { go("otp-email"); }),
    email: setupOtp($('[data-otp="email"]'), "email", function () { go("email-atualizado"); })
  };
  $$("[data-resend]").forEach(function (b) {
    b.addEventListener("click", function () { if (otp[b.dataset.resend].resend()) otp[b.dataset.resend].focus(); });
  });
  onEnter["otp-sms"] = function () { otp.sms.focus(); };
  onEnter["otp-email"] = function () { otp.email.focus(); };

  // ── FormMessage do artefato: ponto + texto, a space-stack-tight do campo (TextField e Select) ──
  function setFieldError(control, msg) {
    var field = control.closest(".po-field");
    var old = $(".po-msg", field);
    if (old) old.remove();
    var painted = control.tagName === "SELECT" ? control.closest(".po-select") : control;
    painted.classList.toggle("po-input-error", Boolean(msg));
    if (msg) {
      var p = document.createElement("p");
      p.className = "po-msg";
      p.id = control.id + "-msg";
      p.innerHTML = '<span class="po-icon s16 fill po-msg-icon" aria-hidden="true">error</span><span></span>';
      p.lastChild.textContent = msg;
      field.appendChild(p);
      control.setAttribute("aria-invalid", "true");
      control.setAttribute("aria-describedby", p.id);
    } else {
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-describedby");
    }
  }
  function clearOnInput(form) {
    form.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid")) setFieldError(e.target, null); });
    form.addEventListener("change", function (e) { if (e.target.getAttribute("aria-invalid")) setFieldError(e.target, null); });
  }

  // ── Editar celular / e-mail: botão sempre ativo, valida ao enviar ──
  function setupEdit(form, opts) {
    clearOnInput(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = form.valor.value.trim(), c = form.confirmacao.value.trim();
      var okV = opts.valid(v);
      setFieldError(form.valor, okV ? null : opts.invalid);
      var okC = okV && v === c;
      setFieldError(form.confirmacao, okV && !okC ? opts.mismatch : null);
      if (!okV) { form.valor.focus(); return; }
      if (!okC) { form.confirmacao.focus(); return; }
      opts.done(v);
      form.reset();
    });
  }
  setupEdit($("#editar-celular-form"), {
    valid: celularValido,
    invalid: "Número de celular inválido. Use o formato (XX) XXXXX-XXXX.",
    mismatch: "Os números não coincidem. Digite o mesmo celular nos dois campos.",
    done: function (v) { state.phone = v; renderContacts(); otp.sms.reset(); go("otp-sms"); }
  });
  setupEdit($("#editar-email-form"), {
    valid: emailValido,
    invalid: "E-mail inválido. Use o formato nome@exemplo.com.",
    mismatch: "Os e-mails não coincidem. Digite o mesmo e-mail nos dois campos.",
    done: function (v) { state.email = v; state.emailEdited = true; renderContacts(); otp.email.reset(); go("otp-email"); showToast(); }
  });

  // Toast "E-mail alterado com sucesso" — duração não definida no Figma (4s provisório)
  var toast = $("#email-toast"), toastTimer = null;
  function showToast() {
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4000);
  }
  $(".po-toast-close", toast).addEventListener("click", function () { toast.hidden = true; });

  onEnter["email-atualizado"] = function () {
    $('[data-bind="hero-title"]').textContent = state.emailEdited ? "E-mail atualizado com sucesso!" : "E-mail verificado com sucesso!";
  };

  // ── Endereço ──────────────────────────────────────
  var CIDADES = {
    SP: ["São Paulo", "Campinas", "Santos", "Guarulhos", "Ribeirão Preto"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
    MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora"],
    PR: ["Curitiba", "Londrina", "Maringá"],
    RS: ["Porto Alegre", "Caxias do Sul", "Pelotas"],
    BA: ["Salvador", "Feira de Santana"],
    PE: ["Recife", "Olinda"],
    DF: ["Brasília"]
  };
  var end = $("#endereco-form");
  var uf = end.uf, cidade = end.cidade, comp = end.complemento;
  Object.keys(CIDADES).forEach(function (k) { uf.add(new Option(k, k)); });
  function syncSelect(sel) { sel.closest(".po-select").classList.toggle("po-select-empty", !sel.value); }
  uf.addEventListener("change", function () {
    cidade.length = 1;
    cidade.selectedIndex = 0;
    CIDADES[uf.value].forEach(function (c) { cidade.add(new Option(c, c)); });
    cidade.disabled = false;
    syncSelect(uf); syncSelect(cidade);
  });
  cidade.addEventListener("change", function () { syncSelect(cidade); });
  end["sem-complemento"].addEventListener("change", function (e) {
    comp.disabled = e.target.checked;
    if (e.target.checked) comp.value = "";
  });
  // Botão sempre ativo; valida ao enviar. Os estados de erro do endereço não existem no Figma: textos provisórios.
  clearOnInput(end);
  end.addEventListener("submit", function (e) {
    e.preventDefault();
    var checks = [
      [end.cep, end.cep.value.length === 9, "CEP inválido. Use o formato 00000-000."],
      [end.rua, Boolean(end.rua.value.trim()), "Informe o nome da rua."],
      [end.numero, Boolean(end.numero.value.trim()), "Informe o número."],
      [cidade, Boolean(cidade.value) || !uf.value, "Selecione a cidade."],
      [uf, Boolean(uf.value), "Selecione o estado."]
    ];
    var firstBad = null;
    checks.forEach(function (c) {
      setFieldError(c[0], c[1] ? null : c[2]);
      if (!c[1] && !firstBad) firstBad = c[0];
    });
    if (firstBad) { firstBad.focus(); return; }
    go("status");
  });

  // ── Tela de status: contagem de 10 s com Continuar agora ──
  var countdownTimer = null, countdownLeft = 10;
  function paintCountdown() {
    $("#countdown").textContent = countdownLeft;
  }
  function leaveStatus() { clearInterval(countdownTimer); if (!$("#status").hidden) go("documento"); }
  onEnter["status"] = function () {
    countdownLeft = 10; paintCountdown();
    $("#st-live").textContent = "";
    setTimeout(function () { $("#st-live").textContent = "Redirecionando para a captura de documentos em 10 segundos."; }, 100);
    clearInterval(countdownTimer);
    countdownTimer = setInterval(function () {
      if ($("#status").hidden) { clearInterval(countdownTimer); return; }
      if (document.hidden) return;
      countdownLeft = Math.max(0, countdownLeft - 1); paintCountdown();
      if (countdownLeft <= 0) leaveStatus();
    }, 1000);
  };
  $("#st-now").addEventListener("click", leaveStatus);

  // ── Seleção de documento: a opção escolhida abre com as ações ──
  var actionsTpl = $("#doc-actions");
  $$("#doc-list .po-docopt-input").forEach(function (radio) {
    radio.addEventListener("change", function () {
      $$("#doc-list .po-docopt").forEach(function (opt) {
        var input = $(".po-docopt-input", opt);
        var on = input.checked;
        opt.classList.toggle("po-docopt-selected", on);
        input.setAttribute("aria-expanded", String(on));
        $(".po-docopt-chevron", opt).classList.toggle("po-docopt-chevron-up", on);
        var panel = $(".po-docopt-panel", opt);
        if (on && !panel) {
          panel = actionsTpl.content.firstElementChild.cloneNode(true);
          panel.id = input.getAttribute("aria-controls");
          opt.appendChild(panel);
        } else if (!on && panel) {
          panel.remove();
        }
      });
    });
  });

  renderContacts();
  window.palmeirasGo = go; // usado por liveness.js
  var start = location.hash.slice(1);
  go(document.getElementById(start) && $("#" + start).hasAttribute("data-screen") ? start : "login");
})();
