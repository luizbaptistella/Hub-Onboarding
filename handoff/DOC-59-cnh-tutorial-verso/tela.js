// DOC-59 · CNH · tutorial do verso.
// Tutorial do DS (window.PalmeirasOnboarding.Tutorial) com os 3 passos antes da câmera, imagens do Figma em img/.
// <div id="est-root" data-props='{"step":2}'> abre a tela no passo 2.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  var STEPS = [
    { title: "Agora, vamos capturar o verso.",
      description: "Vire o documento e capture o verso inteiro. O QR Code precisa aparecer nítido.",
      image: BASE + "img/passo-1.jpg", imageAlt: "" },
    { title: "Enquadre o verso do documento na moldura.",
      description: "Posicione o documento inteiro dentro da moldura. Certifique-se de que a imagem está nítida e todas as informações legíveis.",
      image: BASE + "img/passo-2.jpg", imageAlt: "", frame: true }
  ];

  function Screen(props) {
    return h("div", { className: "est-device est-tutorial-2" },
      h(window.Est.StatusBar),
      h(P.Tutorial, {
        label: "Como fotografar o verso da CNH",
        title: "Foto do documento",
        steps: STEPS,
        defaultStep: props.step || 1,
        onExit: function () {},
        onSkip: function () {},
        onFinish: function () {}
      }));
  }

  window.EstDOC36 = { Screen: Screen };
  window.Est.mount(Screen);
})();
