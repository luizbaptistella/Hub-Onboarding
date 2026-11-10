// REC-09 · Solicitação enviada. Proposta do hub (sem Figma), com o DS aplicado.
// Confirma o pedido de recuperação da conta feito em REC-08 e leva ao login. Prazo e protocolo são exemplos do protótipo.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: false, title: "Recuperar conta", language: false, help: false }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "success", icon: "mark_email_read", title: "Solicitação enviada!", focusOnMount: false, documentTitle: false,
          description: "Vamos conferir seus dados e responder em até 3 dias úteis, no contato que você informou. Protocolo: PAL-48213." }),
        h("div", { className: "est-actions" }, h(P.Button, { variant: "primary", onClick: function () { A.go(A.screenPath("ENT-01-login", "padrao")); } }, "Voltar ao login")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["REC-09"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
