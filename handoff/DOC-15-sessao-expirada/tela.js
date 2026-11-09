// DOC-15 · Sessão expirada.
// Falha de sistema: ResultHero com tom de erro. "Entrar" leva ao login (ENT-01) e, depois de entrar,
// a pessoa volta para esta etapa com o idioma escolhido e os arquivos guardados (pendência de regra do módulo).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: false, title: "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "lock_clock", title: "Sua sessão expirou", focusOnMount: false, documentTitle: false,
          description: "Entre novamente para continuar de onde parou." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "login", onClick: function () { location.assign(BASE + "../ENT-01-login/screen.html"); } }, "Entrar"))));
  }

  window.EstDOC15 = { Screen: Screen };
  window.Est.mount(Screen);
})();
