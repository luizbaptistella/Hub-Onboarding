// DOC-16 · DPRNM · tutorial da frente.
// Tutorial do DS com os 3 passos antes da câmera da frente do DPRNM. Imagens do Figma em img/.
// <div id="est-root" data-props='{"step":2}'> abre a tela no passo 2.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  var STEPS = [
    { title: "Vamos capturar a frente do DPRNM",
      description: "É importante que o documento esteja em bom estado e com todas as informações legíveis.",
      image: BASE + "img/passo-1.jpg", imageAlt: "" },
    { title: "Coloque o documento numa superfície plana",
      description: "Use uma superfície clara e limpa, num lugar bem iluminado.",
      image: BASE + "img/passo-2.jpg", imageAlt: "" },
    { title: "Enquadre a frente do documento",
      description: "Posicione o documento dentro da moldura e confira se a imagem está nítida e todas as informações legíveis.",
      image: BASE + "img/passo-3.jpg", imageAlt: "", frame: true }
  ];

  function Screen(props) {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.Tutorial, {
        label: "Como fotografar a frente do DPRNM",
        title: "Foto do documento",
        steps: STEPS,
        defaultStep: props.step || 1,
        onExit: function () {},
        onSkip: function () {},
        onFinish: function () {}
      }));
  }

  window.EstDOC16 = { Screen: Screen };
  window.Est.mount(Screen);
})();
