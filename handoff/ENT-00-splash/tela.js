// ENT-00 · Splash.
// Primeira tela ao abrir o app: o escudo do Palmeiras centralizado. Depois de cerca de 2 s abre o login (ENT-01).
// Sem componente do DS: é só a marca sobre o fundo da tela. Sem barra de status no desenho do Figma.
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;
  var ESPERA_MS = 2000;

  function Screen() {
    // No hub a tela roda num iframe (miniatura e painel): o timer não pode navegar sozinho, senão a miniatura vira o login.
    React.useEffect(function () {
      if (A.isEmbedded()) return undefined;
      var t = setTimeout(function () { A.go(A.screenPath("ENT-01-login", "padrao")); }, ESPERA_MS);
      return function () { clearTimeout(t); };
    }, []);
    return h("div", { className: "est-device est-splash" },
      h("main", { className: "est-splash-main", "aria-label": "Palmeiras" }, h(A.Logo, { size: "xl" })));
  }

  window.Acesso["ENT-00"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
