// DOC-22 · Os dados do documento não conferem.
// Aparece quando os dados lidos por OCR (número, país emissor, tipo ou validade) são diferentes dos informados.
// Serve ao CRNM e ao DPRNM (?volta=dprnm). Falha de validação: ResultHero com tom de erro (regra do DS).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");
  var DIVERGENCIAS = ["Número do documento diferente do informado", "País emissor diferente do informado", "Tipo de documento diferente do informado", "Documento fora da validade"];

  // Caminho de volta: a mesma tela serve aos três uploads. props.volta (ou ?volta=) = "dprnm" | "rne"; sem isso, CRNM.
  function voltaDoUpload(props) {
    var m = location.search.match(/volta=(\w+)/), v = props.volta || (m && m[1]);
    if (v === "dprnm") return "../DOC-21-dprnm-upload/telas/completo/screen.html";
    if (v === "rne") return "../DOC-31-rne-upload/telas/completo/screen.html";
    return "../DOC-09-crnm-upload/telas/completo/screen.html";
  }

  function Screen(props) {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Validação do documento de identidade", language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "edit_note", title: "Os dados do documento não conferem", focusOnMount: false, documentTitle: false,
          description: "Os dados lidos no documento são diferentes dos que você informou. Confira o que está diferente:" }),
        h("div", { className: "est-motivos" },
          h("p", { className: "est-motivos-title" }, "Divergências encontradas:"),
          h("ul", null, DIVERGENCIAS.map(function (m) { return h("li", { key: m }, m); }))),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "edit", onClick: function () { location.assign(BASE + "../DOC-02-selecao-documento-estrangeiro/telas/fechada/screen.html"); } }, "Revisar dados informados"),
          h(P.Button, { variant: "secondary", iconEnd: "photo_camera", onClick: function () { location.assign(BASE + voltaDoUpload(props)); } }, "Enviar novos arquivos"))));
  }

  window.EstDOC22 = { Screen: Screen };
  window.Est.mount(Screen);
})();
