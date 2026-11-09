// DOC-11 · Falha na validação do documento.
// Mostrada quando o documento é reprovado. Falha não usa StatusScreen: usa ResultHero com tom de erro (regra do DS).
// Mostra os motivos identificados e as ações: tentar de novo (volta ao envio) ou ver como tirar uma boa foto.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");
  var MOTIVOS = ["QR Code identificado", "Informações não estão nítidas", "Documento está ilegível", "Documento não identificado"];

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
        h(P.ResultHero, { tone: "danger", title: "Falha na validação do documento de identidade", focusOnMount: false, documentTitle: false,
          description: "Sua validação foi reprovada pelos motivos listados abaixo. Você pode tentar novamente." }),
        h("div", { className: "est-motivos" },
          h("p", { className: "est-motivos-title" }, "Erros identificados:"),
          h("ul", null, MOTIVOS.map(function (m) { return h("li", { key: m }, m); }))),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "refresh", onClick: function () { location.assign(BASE + voltaDoUpload(props)); } }, "Tentar novamente"),
          h(P.Button, { variant: "secondary", iconEnd: "help", onClick: function () {} }, "Veja como tirar uma boa foto"))));
  }

  window.EstDOC11 = { Screen: Screen };
  window.Est.mount(Screen);
})();
