// Vínculo de familiares · Convidado sem conta: entrada pelo link do convite (spec seção 8.2).
// O link mostra só o nome do titular e o tipo de vínculo. Antes de criar a conta, o convidado confirma
// o CPF do convite. CPF diferente bloqueia com a mensagem genérica (CPF_MISMATCH), sem revelar o CPF do convite.
// Protótipo: o CPF do convite é 529.982.247-25. Qualquer outro CPF válido responde divergente.
(function () {
  var tela = document.getElementById("convite-link");
  if (!tela) return;

  var CPF_DO_CONVITE = "52998224725";
  var campo = document.getElementById("convite-cpf");
  var botao = document.getElementById("convite-submit");
  var alerta = document.getElementById("convite-alert");
  var erroCampo = document.getElementById("convite-cpf-msg");

  function digitos(v) { return v.replace(/\D/g, ""); }
  function fmtCpf(v) {
    var d = digitos(v).slice(0, 11);
    return d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  function cpfValido(v) {
    var d = digitos(v);
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var s = 0;
      for (var i = 0; i < t; i++) s += +d[i] * (t + 1 - i);
      if (((s * 10) % 11) % 10 !== +d[t]) return false;
    }
    return true;
  }

  function limpaErro() {
    campo.classList.remove("po-input-error");
    campo.removeAttribute("aria-invalid");
    erroCampo.hidden = true;
    alerta.innerHTML = "";
  }

  function mostraDivergente() {
    // Só o alerta com a mensagem genérica; o campo fica marcado, sem texto de validação de formato
    campo.classList.add("po-input-error");
    campo.setAttribute("aria-invalid", "true");
    erroCampo.hidden = true;
    alerta.innerHTML =
      '<div class="po-alert po-alert-danger" role="alert"><div class="po-alert-text">' +
      '<div class="convite-alert-head"><span class="po-alert-icon"><span class="po-icon" aria-hidden="true">error</span></span>' +
      '<p class="po-alert-title">Não conseguimos confirmar seu CPF</p></div>' +
      '<p class="po-alert-body">Os dados informados não conferem com o convite.</p>' +
      '</div></div>';
    campo.focus();
  }

  function atualizaBotao() { botao.disabled = digitos(campo.value).length !== 11; }

  campo.addEventListener("input", function () {
    campo.value = fmtCpf(campo.value);
    limpaErro();
    atualizaBotao();
  });

  tela.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    limpaErro();
    if (!cpfValido(campo.value)) {
      campo.classList.add("po-input-error");
      campo.setAttribute("aria-invalid", "true");
      erroCampo.textContent = "CPF inválido.";
      erroCampo.hidden = false;
      campo.focus();
      return;
    }
    if (digitos(campo.value) !== CPF_DO_CONVITE) {
      mostraDivergente();
      return;
    }
    // CPF confirmado: segue para o cadastro de conta (reaproveita a etapa de dados pessoais)
    var nav = document.querySelector('.proto-nav [data-go="cadastro"]');
    if (nav) nav.click();
  });

  // Cenários do menu do protótipo
  document.querySelectorAll('.proto-nav [data-convite-state]').forEach(function (b) {
    b.addEventListener("click", function () {
      campo.value = "";
      limpaErro();
      atualizaBotao();
      if (b.getAttribute("data-convite-state") === "divergente") {
        campo.value = "123.456.789-09";
        atualizaBotao();
        botao.click();
      }
    });
  });

  atualizaBotao();
})();
