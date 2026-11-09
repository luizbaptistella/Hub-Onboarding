// DOC-42 · Passaporte · tutorial do código.
// Tutorial do DS (window.PalmeirasOnboarding.Tutorial) com os 2 passos antes da câmera do verso, imagens do Figma em img/.
// A moldura do passo 2 é a faixa do código (horizontal): está desenhada na imagem, no estilo do ScanFrame do DS,
// porque o frame do Tutorial só tem a proporção do documento em pé (160:402).
// <div id="est-root" data-props='{"step":2}'> abre a tela no passo 2.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  var STEPS = [
    { title: "Mantenha seu passaporte aberto",
      description: "Mantenha o passaporte na mesma posição da captura anterior.",
      image: BASE + "img/passo-1.jpg", imageAlt: "" },
    { title: "Enquadre o código dentro da moldura",
      description: "Aponte a câmera do seu celular para o documento, dentro da moldura, e confirme que a imagem está nítida.",
      image: BASE + "img/passo-2.jpg", imageAlt: "Código do passaporte dentro da moldura" }
  ];

  function Screen(props) {
    return h("div", { className: "est-device est-tutorial-2" },  // 2.º tutorial do fluxo: o número visível é 2
      h(window.Est.StatusBar),
      h(P.Tutorial, {
        label: "Como fotografar o código do passaporte",
        title: "Foto do documento",
        steps: STEPS,
        defaultStep: props.step || 1,
        onExit: function () {},
        onSkip: function () {},
        onFinish: function () {}
      }));
  }

  window.EstDOC42 = { Screen: Screen };
  window.Est.mount(Screen);
})();
