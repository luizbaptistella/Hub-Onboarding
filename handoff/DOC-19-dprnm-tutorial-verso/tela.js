// DOC-19 · DPRNM · tutorial do verso (QR Code).
// Tutorial do DS com os 2 passos antes da câmera do verso do DPRNM. Imagens em img/.
// A moldura do passo 2 é quadrada, em volta do QR Code (canto superior direito do verso), desenhada na imagem.
// <div id="est-root" data-props='{"step":2}'> abre a tela no passo 2.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  var STEPS = [
    { title: "Vire o documento",
      description: "Agora vamos fotografar o QR Code: ele fica no canto superior direito do verso.",
      image: BASE + "img/passo-1.jpg", imageAlt: "" },
    { title: "Enquadre o QR Code",
      description: "Posicione o QR Code dentro da moldura e confira se a imagem está nítida.",
      image: BASE + "img/passo-2.jpg", imageAlt: "Verso do DPRNM com o QR Code dentro da moldura" }
  ];

  function Screen(props) {
    return h("div", { className: "est-device est-tutorial-2" },  // 2.º tutorial do fluxo: o número visível é 2
      h(window.Est.StatusBar),
      h(P.Tutorial, {
        label: "Como fotografar o QR Code do verso do DPRNM",
        title: "Foto do documento",
        steps: STEPS,
        defaultStep: props.step || 1,
        onExit: function () {},
        onSkip: function () {},
        onFinish: function () {}
      }));
  }

  window.EstDOC19 = { Screen: Screen };
  window.Est.mount(Screen);
})();
