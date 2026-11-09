// DOC-23 · Documento vencido.
// Aparece quando a data de validade impressa no documento já passou. Serve ao CRNM e ao DPRNM.
// Falha de validação: ResultHero com tom de erro (regra do DS). Uma ação: escolher outro documento.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Validação do documento de identidade", language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "event_busy", title: "Seu documento está vencido", focusOnMount: false, documentTitle: false,
          description: "A data de validade impressa no documento já passou. Use um documento válido." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "arrow_forward", onClick: function () { location.assign(BASE + "../DOC-02-selecao-documento-estrangeiro/telas/fechada/screen.html"); } }, "Escolher outro documento"))));
  }

  window.EstDOC23 = { Screen: Screen };
  window.Est.mount(Screen);
})();
