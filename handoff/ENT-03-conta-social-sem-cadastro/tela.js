// ENT-03 · Login social · conta sem cadastro. Proposta do hub (sem Figma), com o DS aplicado.
// O provedor (Google, Apple ou Microsoft) autenticou a pessoa, mas não há cadastro do Palmeiras ligado a essa conta.
// ResultHero em tom de aviso e duas saídas: criar cadastro ou entrar com CPF ou e-mail.
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
        h(P.ResultHero, { tone: "warning", icon: "person_search", title: "Não encontramos seu cadastro", focusOnMount: false, documentTitle: false,
          description: "Não há cadastro do Palmeiras ligado a esta conta " + (provedor === "Google" ? "do " : "da ") + provedor + ". Crie um cadastro ou entre com seu CPF ou e-mail." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", onClick: function () { A.go("CAD-01-cadastro-dados-pessoais/screen.html"); } }, "Criar cadastro"),
          h(P.Button, { variant: "secondary", onClick: function () { A.go(A.screenPath("ENT-01-login", "padrao")); } }, "Entrar com CPF ou e-mail")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["ENT-03"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
