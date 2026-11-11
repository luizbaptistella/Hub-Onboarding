// DOC-24 · Conclusão do fluxo de documento.
// Tela de status do Figma 2283:34738, com as etapas do fluxo e a contagem de redirecionamento.
// Aparece quando o documento foi aprovado e o fluxo de documento termina. Conteúdo do Figma, sem mudanças.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var T0 = Date.now();
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    // No hub a tela roda dentro de um iframe (miniatura do mapa e painel): a contagem de 10 s não pode navegar sozinha,
    // senão a miniatura vira a BIO-01. "Continuar agora" (clique, antes dos 10 s) navega normalmente.
    function goBiometria() {
      var automatico = Date.now() - T0 >= 9500;
      if (automatico && window.top !== window.self) return;
      location.assign(BASE + "../BIO-01-tutorial-da-captura/screen.html");
    }
    return h("div", { className: "est-device", style: { background: "var(--bg-brand-bold, #00522e)" } },
      h(window.Est.StatusBar, { tone: "light" }),
      h(P.StatusScreen, { title: "Recebemos seus dados cadastrais!", tone: "success", focusOnMount: false, documentTitle: false,
        footer: h(P.RedirectCountdown, { seconds: 10, onComplete: goBiometria, continueLabel: "Continuar agora" },
          "Redirecionando para a biometria facial...") },
        h(P.JourneyStepper, { steps: [
          { label: "Cadastro", state: "done" },
          { label: "Captura de documentos", state: "done", icon: "document" },
          { label: "Biometria facial", state: "current", icon: "face" },
          { label: "Validação de benefícios", state: "upcoming", icon: "clipboard" }
        ] })));
  }

  window.EstDOC24 = { Screen: Screen };
  window.Est.mount(Screen);
})();
