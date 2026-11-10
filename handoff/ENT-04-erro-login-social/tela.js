// ENT-04 · Login social · erro do provedor. Proposta do hub (sem Figma), com o DS aplicado.
// A pessoa cancelou o login no Google, Apple ou Microsoft, ou o serviço não respondeu. ResultHero em tom de erro
// (regra do DS) e uma saída: voltar ao login para tentar de novo ou usar CPF ou e-mail.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;
  var NOMES = { google: "Google", apple: "Apple", microsoft: "Microsoft" };

  function Screen(props) {
    var provedor = NOMES[props.provedor || A.query("p")] || "Google";
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar", href: A.url(A.screenPath("ENT-01-login", "padrao")) }, title: "Entrar com " + provedor, language: false, help: false }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", title: "Não foi possível entrar com " + (provedor === "Google" ? "o " : "a ") + provedor, focusOnMount: false, documentTitle: false,
          description: "O login foi cancelado ou o serviço não respondeu. Tente de novo ou entre com seu CPF ou e-mail." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", onClick: function () { A.go(A.screenPath("ENT-01-login", "padrao")); } }, "Tentar novamente")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["ENT-04"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
