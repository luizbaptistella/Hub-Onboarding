// ENT-01 · Login.
// Entrar com CPF ou e-mail e senha, ou começar um cadastro novo. Componentes do DS: AppHeader, PageHeading, Alert, TextField,
// TextLink, Button, DividerText, SocialButton e LegalFooter.
// O botão Entrar fica sempre ativo e valida ao enviar. Campos inválidos: erro em cada campo (nada é enviado).
// Campos válidos: abre o carregamento (ENT-02); se o servidor rejeitar, volta aqui com o aviso "Credenciais inválidas".
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;
  var MSG_CRED = "Confira seu CPF, e-mail ou senha e tente novamente.";

  // O campo aceita CPF ou e-mail. Só dígitos e pontuação = CPF (máscara 000.000.000-00); o resto vale como e-mail.
  function validar(id, senha) {
    var out = {};
    if (!id.trim()) out.id = "Informe seu CPF ou e-mail.";
    else out.id = A.looksLikeCpf(id) ? P.validators.cpf(id.replace(/\D/g, "")) : P.validators.email(id.trim());
    if (!senha) out.pw = "Informe sua senha.";
    return out;
  }

  function Screen(props) {
    // Ao voltar de ENT-02 com credenciais rejeitadas, o CPF ou e-mail volta preenchido (guardado só na sessão da aba). A senha nunca é guardada.
    var s1 = React.useState(props.identificador || (A.query("erro") === "credenciais" ? A.load("identificador", "") : "")), id = s1[0], setId = s1[1];
    var s2 = React.useState(props.senha || ""), senha = s2[0], setSenha = s2[1];
    var s3 = React.useState(function () { return props.erro === "campos" ? validar(props.identificador || "", props.senha || "") : {}; }), errs = s3[0], setErrs = s3[1];
    var s4 = React.useState(props.erro === "credenciais" || A.query("erro") === "credenciais"), cred = s4[0], setCred = s4[1];
    var s5 = React.useState(Boolean(props.encerrada) || A.query("encerrada") === "1"), encerrada = s5[0], setEncerrada = s5[1];
    var ref = React.useRef(null);

    function digitou() { setEncerrada(false); }   // o aviso de conta encerrada some ao digitar
    function enviar(e) {
      e.preventDefault();
      var v = validar(id, senha);
      if (v.id || v.pw) {
        setErrs(v); setCred(false);
        // o foco vai para o primeiro campo com erro
        setTimeout(function () { var el = ref.current && ref.current.querySelector('[aria-invalid="true"]'); if (el) el.focus(); }, 0);
        return;
      }
      setErrs({});
      A.store("identificador", id);
      A.go(A.screenPath("ENT-02-carregando-login", "padrao") + "?r=" + (senha === "errada" ? "erro" : "ok"));
    }

    var quiet = cred ? "est-field-quiet" : undefined;   // credenciais inválidas: borda vermelha nos dois campos, o texto fica no aviso
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: false, title: "Login", language: { defaultValue: "pt-BR" }, help: false }),
      h("main", { className: "est-body", ref: ref },
        h(A.Logo, { size: "sm" }),
        h(P.PageHeading, { title: "Faça seu login", subtitle: "Faça seu login para começar ou cadastre-se.", tone: "brand", focusOnMount: false, documentTitle: false }),
        cred ? h(P.Alert, { tone: "danger", title: "Credenciais inválidas" }, MSG_CRED) : null,
        encerrada ? h(P.Alert, { tone: "info", title: "Sua conta foi encerrada." }, "O cadastro ficou inativo. Para voltar, fale com o atendimento.") : null,
        h("form", { className: "est-form est-login-form", noValidate: true, onSubmit: enviar },
          h(P.TextField, { label: "Número do seu CPF ou E-Mail", name: "identificador", placeholder: "000.000.000-00", autoComplete: "username", inputMode: "text",
            value: id, className: quiet, error: cred ? MSG_CRED : errs.id || undefined,
            onChange: function (e) { digitou(); setId(A.identifierChange(e.target.value)); setErrs(Object.assign({}, errs, { id: undefined })); } }),
          h("div", { className: "est-login-pw" },
            h(P.TextField, { label: "Senha", preset: "password", name: "senha", placeholder: "Insira sua senha", autoComplete: "current-password",
              value: senha, className: quiet, error: cred ? MSG_CRED : errs.pw || undefined,
              onChange: function (e) { digitou(); setSenha(e.target.value); setErrs(Object.assign({}, errs, { pw: undefined })); } }),
            h(P.TextLink, { variant: "standalone", href: A.url(A.screenPath("REC-01-recuperar-senha", "celular-vazio")) }, "Esqueceu sua senha?")),
          h("div", { className: "est-actions est-login-actions" },
            h(P.Button, { variant: "primary", type: "submit" }, "Entrar"),
            h(P.Button, { variant: "accent", type: "button", onClick: function () { A.go("CAD-01-cadastro-dados-pessoais/screen.html"); } }, "Criar cadastro"))),
        h("div", { className: "est-others" },
          h(P.DividerText, null, "ou entrar com:"),
          h("div", { className: "est-social" },
            h(P.SocialButton, { provider: "google", layout: "icon", intent: "signin", type: "button" }),
            h(P.SocialButton, { provider: "apple", layout: "icon", intent: "signin", type: "button" }),
            h(P.SocialButton, { provider: "microsoft", layout: "icon", intent: "signin", type: "button" }))),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["ENT-01"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
