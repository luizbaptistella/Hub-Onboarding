// REC-06 · Nova senha.
// Depois do código validado, a pessoa cria a nova senha e confirma. Componentes do DS: AppHeader, PageHeading, TextField (preset password),
// Button e LegalFooter. Fora do DS: medidor de força e lista de requisitos (window.Acesso.Strength e Rules).
// "Salvar senha" fica sempre ativo e valida ao enviar: a senha precisa cumprir os 4 requisitos e a confirmação precisa ser igual.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;

  function Screen(props) {
    var s1 = React.useState(props.senha || ""), senha = s1[0], setSenha = s1[1];
    var s2 = React.useState(props.confirmacao || ""), conf = s2[0], setConf = s2[1];
    var s3 = React.useState(props.erro || ""), erro = s3[0], setErro = s3[1];
    var ref = React.useRef(null);

    function salvar() {
      var ok = A.score(senha) === A.RULES.length;
      if (!ok) setErro("senha");
      else if (senha !== conf) setErro("confirmacao");
      else { A.go(A.screenPath("REC-07-senha-alterada", "padrao")); return; }
      setTimeout(function () { var el = ref.current && ref.current.querySelector('[aria-invalid="true"]'); if (el) el.focus(); }, 0);
    }

    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar", href: A.url(A.screenPath("ENT-01-login", "padrao")) }, title: "Nova Senha", language: false, help: false }),
      h("main", { className: "est-body", ref: ref },
        h(A.Logo, { size: "sm" }),
        h(P.PageHeading, { title: "Crie sua nova senha", subtitle: "Sua nova senha deve ter pelo menos 8 caracteres.", tone: "neutral", focusOnMount: false, documentTitle: false }),
        h("div", { className: "est-form" },
          h(P.TextField, { label: "Nova senha", preset: "password", name: "nova-senha", autoComplete: "new-password", value: senha,
            error: erro === "senha" ? "A senha precisa cumprir todos os requisitos abaixo." : undefined,
            onChange: function (e) { setSenha(e.target.value); setErro(""); } }),
          h(P.TextField, { label: "Confirmar nova senha", preset: "password", name: "confirmar-senha", autoComplete: "new-password", value: conf,
            error: erro === "confirmacao" ? "As senhas não são iguais. Digite a mesma senha nos dois campos." : undefined,
            onChange: function (e) { setConf(e.target.value); setErro(""); } })),
        h(A.Strength, { value: senha }),
        h(A.Rules, { value: senha }),
        h("div", { className: "est-actions" }, h(P.Button, { variant: "primary", onClick: salvar }, "Salvar senha")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["REC-06"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
