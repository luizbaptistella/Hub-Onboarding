// DOC-39 · Passaporte · tutorial da frente.
// Tutorial do DS com os 3 passos antes da câmera da frente do Passaporte. Imagens do Figma em img/.
// <div id="est-root" data-props='{"step":2}'> abre a tela no passo 2.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  var STEPS = [
    { title: "Abra o passaporte na página com sua foto",
      description: "Mantenha o documento aberto na página com seus dados pessoais e sua foto.",
      image: BASE + "img/passo-1.jpg", imageAlt: "" },
    { title: "Coloque o documento sobre uma superfície plana",
      description: "A superfície deve ser plana, limpa e clara, em um lugar bem iluminado.",
      image: BASE + "img/passo-2.jpg", imageAlt: "" },
    { title: "Enquadre o documento dentro da moldura",
      description: "Posicione o documento dentro da moldura e confirme que a imagem está nítida e todos os dados estão legíveis.",
      image: BASE + "img/passo-3.jpg", imageAlt: "", frame: true }
  ];

  function Screen(props) {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.Tutorial, {
        label: "Como fotografar a página do passaporte",
        title: "Foto do documento",
        steps: STEPS,
        defaultStep: props.step || 1,
        onExit: function () {},
        onSkip: function () {},
        onFinish: function () {}
      }));
  }

  window.EstDOC39 = { Screen: Screen };
  window.Est.mount(Screen);
})();
