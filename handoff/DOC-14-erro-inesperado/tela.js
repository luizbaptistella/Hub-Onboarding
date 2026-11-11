// DOC-14 · Erro inesperado ao enviar o documento.
// Falha de sistema que o app não consegue explicar: ResultHero com tom de erro.
// "Tentar novamente" reenvia com os arquivos guardados; "Voltar" leva à seleção do documento (DOC-02).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

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
      h(P.AppHeader, { back: { label: "Voltar" }, title: props.header || "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "error", title: props.title || "Algo deu errado", focusOnMount: false, documentTitle: false,
          description: props.description || "Ocorreu um erro inesperado. Tente novamente." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "refresh", onClick: function () { location.assign(BASE + voltaDoUpload(props)); } }, "Tentar novamente"),
          props.reportar ? h(P.Button, { variant: "secondary", iconEnd: "report" }, "Reportar problema") :
          h(P.Button, { variant: "secondary", onClick: function () { location.assign(BASE + "../DOC-02-selecao-documento-estrangeiro/telas/fechada/screen.html"); } }, "Voltar"))));
  }

  window.EstDOC14 = { Screen: Screen };
  window.Est.mount(Screen);
})();
