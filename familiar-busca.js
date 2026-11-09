// Vincular familiar · Busca de usuário (spec seção 4).
// Um único campo aceita CPF ou e-mail. O tipo é inferido pelo que foi digitado:
// letras ou @ = e-mail; só dígitos = CPF (com máscara).
// Protótipo: uma conta ativa de cada tipo (DEMO_*). Qualquer outro dado válido responde
// não encontrado, com a mesma mensagem da spec (anti-enumeração).
(function () {
  var screen = document.getElementById("familiar-busca");
  if (!screen) return;

  var DEMO_CPF = "52998224725";
  var DEMO_EMAIL = "familiar@email.com";
  var form = document.getElementById("busca-form");
  var valor = document.getElementById("busca-valor");
  var submit = document.getElementById("busca-submit");
  var alertBox = document.getElementById("busca-alert");

  function digits(v) { return v.replace(/\D/g, ""); }
  function pareceEmail(v) { return /[a-zA-Z@]/.test(v); }

  function cpfValido(v) {
    var d = digits(v);
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var s = 0;
      for (var i = 0; i < t; i++) s += +d[i] * (t + 1 - i);
      if (((s * 10) % 11) % 10 !== +d[t]) return false;
    }
    return true;
  }

  function emailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  function fmtCpf(v) {
    var d = digits(v).slice(0, 11);
    return d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  // Erro de campo, mesmo padrão do DS (po-msg + po-input-error)
  function setError(msg) {
    var field = valor.closest(".po-field");
    var old = document.getElementById("busca-valor-msg");
    if (old) old.remove();
    valor.classList.toggle("po-input-error", Boolean(msg));
    if (msg) {
      var p = document.createElement("p");
      p.className = "po-msg";
      p.id = "busca-valor-msg";
      p.innerHTML = '<span class="po-icon s16 fill po-msg-icon" aria-hidden="true">error</span><span></span>';
      p.lastChild.textContent = msg;
      field.appendChild(p);
      valor.setAttribute("aria-invalid", "true");
      valor.setAttribute("aria-describedby", p.id);
    } else {
      valor.removeAttribute("aria-invalid");
      valor.removeAttribute("aria-describedby");
    }
  }

  // Alerta do resultado (po-alert do DS), com ação opcional
  // A ação fica dentro do próprio alerta, no mesmo componente da mensagem
  function setAlert(kind, icon, title, body, action) {
    if (!kind) { alertBox.innerHTML = ""; return; }
    var act = action
      ? '<div class="po-alert-action"><button type="button" class="po-btn po-btn-secondary po-btn-block" data-go="' + action.go + '"><span class="po-btn-content"><span class="busca-action-label"></span><span class="po-icon s18" aria-hidden="true">add</span></span></button></div>'
      : "";
    // Ícone e título na mesma linha; corpo e ação abaixo
    alertBox.innerHTML =
      '<div class="po-alert po-alert-' + kind + '" role="' + (kind === "danger" ? "alert" : "status") + '">' +
        '<div class="po-alert-text">' +
          '<div class="busca-alert-head"><span class="po-alert-icon"><span class="po-icon" aria-hidden="true">' + icon + '</span></span><p class="po-alert-title"></p></div>' +
          '<p class="po-alert-body"></p>' + act +
        '</div>' +
      '</div>';
    alertBox.querySelector(".po-alert-title").textContent = title;
    alertBox.querySelector(".po-alert-body").textContent = body;
    if (action) alertBox.querySelector(".busca-action-label").textContent = action.label;
  }

  function setLocked(locked) {
    valor.disabled = locked;
    submit.disabled = locked;
    valor.classList.toggle("busca-input-disabled", locked);
  }

  // Limpa o campo, os erros e os alertas
  function clear() {
    setLocked(false);
    valor.value = "";
    setError(null);
    setAlert(null);
    submit.disabled = true;
  }

  // Mensagem genérica da spec (USER_NOT_FOUND): mesma para inexistente e conta inativa
  // Copy proposta (a spec §13 traz o texto original; ver nota na resposta)
  function notFound() {
    setAlert("info", "info", "Não encontramos essa conta",
      "Confira o CPF ou e-mail informado. Se essa pessoa ainda não tem conta, você pode cadastrá-la como novo familiar.",
      { go: "familiar-cadastro", label: "Cadastrar novo familiar" });
  }

  // Conta ativa: abre o card do familiar (Caminho A)
  function found() {
    var nav = document.querySelector('.proto-nav [data-go="familiar-vinculo"]');
    if (nav) nav.click();
  }

  // Estados da tela (atalhos do menu de protótipo)
  var states = {
    inicial: function () { clear(); },
    "nao-encontrado": function () {
      clear();
      valor.value = "123.456.789-09";
      notFound();
      submit.disabled = false;
    },
    limite: function () {
      clear();
      setAlert("danger", "error", "Limite de consultas atingido",
        "Você atingiu o limite de consultas. Tente novamente mais tarde.");
      setLocked(true);
    }
  };

  document.querySelectorAll("[data-busca-state]").forEach(function (b) {
    b.addEventListener("click", function () { states[b.dataset.buscaState](); });
  });

  valor.addEventListener("input", function () {
    if (!pareceEmail(valor.value)) valor.value = fmtCpf(valor.value);
    if (valor.getAttribute("aria-invalid")) setError(null);
    setAlert(null);
    submit.disabled = !valor.value.trim();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setAlert(null);

    var raw = valor.value.trim();
    if (pareceEmail(raw)) {
      var email = raw.replace(/\s/g, "").toLowerCase();
      valor.value = email;
      if (!emailValido(email)) { setError("E-mail inválido."); valor.focus(); return; }
      if (email === DEMO_EMAIL) return found();
    } else {
      if (!cpfValido(raw)) { setError("CPF inválido."); valor.focus(); return; }
      if (digits(raw) === DEMO_CPF) return found();
    }
    // Não encontrado e conta inativa recebem a mesma resposta
    notFound();
  });
})();

// Vincular familiar · Card e tipo de vínculo (spec seção 5, Caminho A).
// O card mostra só nome e CPF mascarados. Prosseguir fica desabilitado até escolher o tipo.
(function () {
  var screen = document.getElementById("familiar-vinculo");
  if (!screen) return;
  var form = document.getElementById("vinculo-form");
  var tipo = document.getElementById("vinculo-tipo");
  var submit = document.getElementById("vinculo-submit");
  var alertBox = document.getElementById("vinculo-alert");

  tipo.addEventListener("change", function () {
    submit.disabled = !tipo.value;
    alertBox.innerHTML = "";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!tipo.value) return;
    // Segue direto para a confirmação de contatos e o envio do convite
    document.getElementById("contatos-relacao").textContent = tipo.options[tipo.selectedIndex].text;
    window.famContatos("A");
    var nav = document.querySelector('.proto-nav [data-go="familiar-contatos"]');
    if (nav) nav.click();
  });
})();

// Vincular familiar · Contatos e envio do convite (spec seção 5).
// Pelo menos um canal precisa estar marcado para enviar.
(function () {
  var screen = document.getElementById("familiar-contatos");
  if (!screen) return;
  var form = document.getElementById("contatos-form");
  var voltar = screen.querySelector(".po-header [data-go]");

  // Caminho A usa o exemplo da busca; Caminho B usa o que foi digitado no cadastro (6.3 e 7)
  function maskNome(n) {
    var p = n.split(/\s+/).filter(Boolean);
    if (p.length < 2) return p.join(" ");
    return p[0] + " S*** " + p[p.length - 1];
  }
  function maskEmail(e) { var i = e.indexOf("@"); return e.slice(0, 2) + "****" + e.slice(i); }
  function maskCel(d) { return "(" + d.slice(0, 2) + ") 9****-" + d.slice(-4); }
  // Reenvio (spec seção 7): a lista de convites abre esta tela com os dados do convite
  var titulo = screen.querySelector(".po-heading-title");
  var submitTexto = document.querySelector("#contatos-submit .po-btn-content > span");
  var reenvioId = null;
  var reenvioArmado = false;
  function modoReenvio(ativo) {
    titulo.textContent = ativo ? "Reenviar convite ao familiar" : "Enviar convite ao familiar";
    submitTexto.textContent = ativo ? "Reenviar link" : "Enviar link";
  }
  window.famContatos = function (caminho, dados) {
    reenvioId = null;
    if (caminho === "reenvio" && dados) {
      reenvioId = dados.id;
      reenvioArmado = true;
      document.getElementById("contatos-nome").textContent = dados.nome;
      document.getElementById("contatos-relacao").textContent = dados.relacao;
      document.getElementById("contatos-email-valor").textContent = dados.email;
      document.getElementById("contatos-cel-valor").textContent = dados.cel;
      document.getElementById("canal-email").checked = true;
      document.getElementById("canal-sms").checked = true;
      document.getElementById("canal-email").dispatchEvent(new Event("change"));
      voltar.setAttribute("data-go", "familiar-recebidos");
      modoReenvio(true);
      return;
    }
    modoReenvio(false);
    if (caminho === "B" && window.famDados) {
      var d = window.famDados;
      document.getElementById("contatos-nome").textContent = maskNome(d.nome);
      document.getElementById("contatos-relacao").textContent = d.relacao;
      document.getElementById("contatos-email-valor").textContent = maskEmail(d.email);
      document.getElementById("contatos-cel-valor").textContent = maskCel(d.cel);
      voltar.setAttribute("data-go", "familiar-decisao");
    } else {
      document.getElementById("contatos-nome").textContent = "Mariana S*** Costa";
      document.getElementById("contatos-email-valor").textContent = "ma****@email.com";
      document.getElementById("contatos-cel-valor").textContent = "(11) 9****-5432";
      voltar.setAttribute("data-go", "familiar-vinculo");
    }
  };
  // Abrir esta tela pela navegação do protótipo depois de um reenvio volta ao envio normal
  var navContatos = document.querySelector('.proto-nav [data-go="familiar-contatos"]');
  if (navContatos) {
    navContatos.addEventListener("click", function () {
      if (reenvioArmado) { reenvioArmado = false; return; }
      if (reenvioId) {
        window.famContatos("A");
        document.getElementById("contatos-relacao").textContent = "Filho(a)";
      }
    });
  }
  var canais = Array.prototype.slice.call(form.querySelectorAll('input[name="canal"]'));
  var submit = document.getElementById("contatos-submit");
  var alertBox = document.getElementById("contatos-alert");

  function selecionados() { return canais.filter(function (c) { return c.checked; }).length; }

  function atualiza() {
    var n = selecionados();
    submit.disabled = n === 0;
    alertBox.innerHTML = n === 0
      ? '<div class="po-alert po-alert-danger" role="alert"><div class="po-alert-text"><div class="busca-alert-head"><span class="po-alert-icon"><span class="po-icon" aria-hidden="true">error</span></span><p class="po-alert-title">Escolha pelo menos um canal</p></div></div></div>'
      : "";
  }

  canais.forEach(function (c) { c.addEventListener("change", atualiza); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (selecionados() === 0) return;
    // Envio concluído: volta para Meus familiares (familiar-recebidos), que mostra os convites enviados.
    var nav = document.querySelector('.proto-nav [data-go="familiar-recebidos"]');
    if (nav) nav.click();
  });

  // Copiar link: funciona com ou sem canal marcado, porque o titular envia por outro meio
  var copiar = document.getElementById("copiar-link");
  var copiarLabel = copiar.querySelector(".busca-copy-label");
  var copiarTimer = null;
  copiar.addEventListener("click", function () {
    var link = "https://palmeiras.com.br/convite/xxxxxxxx";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).catch(function () {});
    }
    copiarLabel.textContent = "Link copiado";
    clearTimeout(copiarTimer);
    copiarTimer = setTimeout(function () { copiarLabel.textContent = "Copiar link"; }, 2000);
  });

  atualiza();
})();

// Vincular familiar · Cadastro do familiar sem conta (spec seção 6.1, Caminho B).
// Campos vazios, sem dados da Receita. Protótipo: CPF com conta ativa vai para o card (Caminho A);
// CPF 100.200.300-88 simula cadastro irregular na Receita (CPF_NOT_VALIDATED).
(function () {
  var screen = document.getElementById("familiar-cadastro");
  if (!screen) return;
  var form = document.getElementById("fam-cad-form");
  var fields = {
    vinculo: document.getElementById("cad-fam-vinculo"),
    cpf: document.getElementById("cad-fam-cpf"),
    nome: document.getElementById("cad-fam-nome"),
    email: document.getElementById("cad-fam-email"),
    cel: document.getElementById("cad-fam-cel")
  };
  var submit = document.getElementById("fam-cad-submit");
  var alertBox = document.getElementById("fam-cad-alert");
  var CPF_ATIVO = "52998224725";
  var CPF_IRREGULAR = "10020030088";
  var CPF_MENOR = "35791357915"; // Receita informa is_minor = true (protótipo)

  function digits(v) { return v.replace(/\D/g, ""); }
  function cpfValido(v) {
    var d = digits(v);
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var s = 0;
      for (var i = 0; i < t; i++) s += +d[i] * (t + 1 - i);
      if (((s * 10) % 11) % 10 !== +d[t]) return false;
    }
    return true;
  }
  function fmtCpf(v) {
    var d = digits(v).slice(0, 11);
    return d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  function fmtCel(v) {
    var d = digits(v).slice(0, 11);
    if (!d) return "";
    if (d.length <= 2) return "(" + d;
    var r = "(" + d.slice(0, 2) + ") " + d.slice(2, 7);
    if (d.length > 7) r += "-" + d.slice(7);
    return r;
  }
  function emailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  // Erro de campo, mesmo padrão do DS
  function setError(input, msg) {
    var field = input.closest(".po-field");
    var id = input.id + "-msg";
    var old = document.getElementById(id);
    if (old) old.remove();
    input.classList.toggle("po-input-error", Boolean(msg));
    if (input.tagName === "SELECT") (input.closest(".po-select") || input).classList.toggle("po-input-error", Boolean(msg));
    if (msg) {
      var p = document.createElement("p");
      p.className = "po-msg";
      p.id = id;
      p.innerHTML = '<span class="po-icon s16 fill po-msg-icon" aria-hidden="true">error</span><span></span>';
      p.lastChild.textContent = msg;
      field.appendChild(p);
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  }

  function setAlert(kind, icon, title, body) {
    alertBox.innerHTML = !kind ? "" :
      '<div class="po-alert po-alert-' + kind + '" role="' + (kind === "danger" ? "alert" : "status") + '"><div class="po-alert-text">' +
      '<div class="busca-alert-head"><span class="po-alert-icon"><span class="po-icon" aria-hidden="true">' + icon + '</span></span><p class="po-alert-title"></p></div>' +
      '<p class="po-alert-body"></p></div></div>';
    if (!kind) return;
    alertBox.querySelector(".po-alert-title").textContent = title;
    alertBox.querySelector(".po-alert-body").textContent = body;
  }

  function filled() {
    return fields.vinculo.value && fields.cpf.value.trim() && fields.nome.value.trim() &&
      fields.email.value.trim() && fields.cel.value.trim();
  }
  function refresh() { submit.disabled = !filled(); }

  fields.cpf.addEventListener("input", function () { fields.cpf.value = fmtCpf(fields.cpf.value); });
  fields.cel.addEventListener("input", function () { fields.cel.value = fmtCel(fields.cel.value); });
  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid")) setError(e.target, null);
    setAlert(null);
    refresh();
  });
  fields.vinculo.addEventListener("change", function () {
    if (fields.vinculo.getAttribute("aria-invalid")) setError(fields.vinculo, null);
    refresh();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setAlert(null);
    var ok = true;
    var c = digits(fields.cpf.value);
    if (!cpfValido(fields.cpf.value)) { setError(fields.cpf, "CPF inválido."); ok = false; }
    if (fields.nome.value.trim().split(/\s+/).length < 2) { setError(fields.nome, "Informe nome e sobrenome."); ok = false; }
    if (!emailValido(fields.email.value.trim())) { setError(fields.email, "E-mail inválido."); ok = false; }
    if (digits(fields.cel.value).length !== 11) { setError(fields.cel, "Celular inválido."); ok = false; }
    if (!ok) return;

    // CPF com conta ativa: vai para o card do familiar (Caminho A, R6)
    if (c === CPF_ATIVO) {
      var nav = document.querySelector('.proto-nav [data-go="familiar-vinculo"]');
      if (nav) nav.click();
      return;
    }
    // Receita não validou o CPF (CPF_NOT_VALIDATED): campo bloqueado, mensagem genérica
    if (c === CPF_IRREGULAR) {
      setError(fields.cpf, "Não foi possível validar este CPF.");
      fields.cpf.focus();
      return;
    }
    // CPF validado: guarda os dados para as telas seguintes e abre a decisão (maior de idade, 6.3)
    window.famDados = {
      nome: fields.nome.value.trim(),
      email: fields.email.value.trim().toLowerCase(),
      cel: digits(fields.cel.value),
      relacao: fields.vinculo.options[fields.vinculo.selectedIndex].text
    };
    // Menor de idade (is_minor = true, seção 6.2): termo de responsabilidade, sem opção de convite
    var destino = c === CPF_MENOR ? "familiar-termo" : "familiar-decisao";
    var next = document.querySelector('.proto-nav [data-go="' + destino + '"]');
    if (next) next.click();
  });

  refresh();
})();

// Cadastro do familiar: decisão para maior de idade (spec seção 6.3)
(function () {
  var convite = document.getElementById("decisao-convite");
  var cadastrar = document.getElementById("decisao-cadastrar");
  if (!convite || !cadastrar) return;
  convite.addEventListener("click", function () {
    window.famContatos("B");
    var nav = document.querySelector('.proto-nav [data-go="familiar-contatos"]');
    if (nav) nav.click();
  });
  // Cadastrar agora: as capturas do familiar (6.5) ainda não têm tela neste protótipo
})();

// Termo de responsabilidade do menor (spec seção 6.2): só segue com o aceite marcado.
(function () {
  var screen = document.getElementById("familiar-termo");
  if (!screen) return;
  var aceite = document.getElementById("termo-aceite");
  var submit = document.getElementById("termo-submit");
  aceite.addEventListener("change", function () { submit.disabled = !aceite.checked; });
  // Continuar: o preenchimento e as capturas no celular do titular (6.5) ainda não têm tela neste protótipo
})();
