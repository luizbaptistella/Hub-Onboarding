// DOC-10 · Status · documento recebido.
// Tela de status depois do envio do documento: StatusScreen, JourneyStepper e RedirectCountdown, todos do DS.
// A contagem leva para a validação facial (BIO-01). "Continuar agora" pula a espera.
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
    // O RedirectCountdown vai no slot footer do StatusScreen (regra do DS); o fundo verde cobre a barra de status.
    return h("div", { className: "est-device", style: { background: "var(--bg-brand-bold, #00522e)" } },
      h(window.Est.StatusBar, { tone: "light" }),
      h(P.StatusScreen, { title: "Recebemos seus dados cadastrais!", tone: "success", focusOnMount: false, documentTitle: false,
        footer: h(P.RedirectCountdown, { seconds: 10, onComplete: goBiometria, continueLabel: "Continuar agora" },
          "Vamos para a validação facial.") },
        h(P.JourneyStepper, { steps: [
          { label: "Cadastro", state: "done" },
          { label: "Captura de documentos", state: "done", icon: "document" },
          { label: "Biometria facial", state: "current", icon: "face" },
          { label: "Validação de benefícios", state: "upcoming", icon: "clipboard" }
        ] })));
  }

  window.EstDOC10 = { Screen: Screen };
  window.Est.mount(Screen);
})();
