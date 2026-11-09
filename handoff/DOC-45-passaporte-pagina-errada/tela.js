// DOC-45 · Documento vencido.
// Aparece quando a data de validade impressa no documento já passou. Serve ao CRNM e ao DPRNM.
// Falha de validação: ResultHero com tom de erro (regra do DS). Uma ação: escolher outro documento.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Validação do passaporte", language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "menu_book", title: "Esta não é a página com sua foto", focusOnMount: false, documentTitle: false,
          description: "Abra o passaporte na página de dados, onde estão sua foto e seus dados pessoais." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "arrow_forward", onClick: function () { location.assign(BASE + "../DOC-40-passaporte-camera-pagina/telas/enquadrando/screen.html"); } }, "Tirar outra foto"))));
  }

  window.EstDOC45 = { Screen: Screen };
  window.Est.mount(Screen);
})();
