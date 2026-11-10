// REC-07 · Senha alterada com sucesso.
// Fim da recuperação: ResultHero de sucesso e "Ir para o login". Sem login automático: a pessoa entra com a nova senha.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: false, title: "Recuperar Senha", language: false, help: false }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "success", title: "Senha alterada com sucesso!", focusOnMount: false, documentTitle: false,
          description: "Sua senha foi redefinida. Faça login com sua nova senha." }),
        h("div", { className: "est-actions" }, h(P.Button, { variant: "primary", onClick: function () { A.go(A.screenPath("ENT-01-login", "padrao")); } }, "Ir para o login")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["REC-07"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
