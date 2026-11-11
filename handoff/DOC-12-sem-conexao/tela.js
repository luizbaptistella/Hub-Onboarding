// DOC-12 · Sem conexão ao enviar o documento.
// Falha de sistema, no padrão de falha do DS: ResultHero com tom de erro (não StatusScreen).
// As fotos e os arquivos já escolhidos são mantidos; "Tentar novamente" reenvia sem refazer a captura.
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
        h(P.ResultHero, { tone: "danger", icon: "wifi_off", title: props.title || "Sem conexão", focusOnMount: false, documentTitle: false,
          description: props.description || "Verifique sua internet e tente de novo. Suas fotos foram mantidas." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "refresh", onClick: function () { location.assign(BASE + voltaDoUpload(props)); } }, "Tentar novamente"),
          props.reportar ? h(P.Button, { variant: "secondary", iconEnd: "report" }, "Reportar problema") : null)));
  }

  window.EstDOC12 = { Screen: Screen };
  window.Est.mount(Screen);
})();
