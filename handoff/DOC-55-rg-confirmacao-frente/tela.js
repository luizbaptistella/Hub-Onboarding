// DOC-55 · RG · confirmação da frente.
// Depois da foto, a pessoa confere se a frente ficou legível. Componentes do DS: AppHeader, PageHeading, Image e Button.
// A foto é o recorte da moldura, como o CameraCapture envia (img/frente.jpg, montada com a imagem do Figma).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.PageHeading, { tone: "neutral", focusOnMount: false, documentTitle: false, title: "Confira a foto da frente",
          subtitle: "Todos os dados precisam estar nítidos, sem reflexo e sem partes cortadas." }),
        h("div", { className: "est-photo" },
          h(P.Image, { src: BASE + "img/frente.jpg", alt: "Foto da frente do RG", fit: "contain", rounded: true, loading: "eager", height: "100%" })),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "arrow_forward", onClick: function () {} }, "Continuar"),
          h(P.Button, { variant: "secondary", iconEnd: "photo_camera", onClick: function () {} }, "Tirar outra foto"))));
  }

  window.EstDOC28 = { Screen: Screen };
  window.Est.mount(Screen);
})();
