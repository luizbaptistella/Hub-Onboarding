// DOC-25 · Bloqueio por tentativas no documento.
// Depois de três validações reprovadas, a pessoa fica 5 minutos sem tentar. Serve ao CRNM e ao DPRNM.
// Falha de validação: ResultHero com tom de erro (regra do DS). A saída é "Sair e continuar depois" (ENT-01), sem perder os arquivos.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen() {
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: false, title: "Validação do documento de identidade", language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.ResultHero, { tone: "danger", icon: "lock_clock", title: "Excesso de tentativas", focusOnMount: false, documentTitle: false,
          description: "Você atingiu o limite de tentativas de validação do documento. Tente novamente em 5:00. Você pode sair agora e continuar depois. Seus dados e documentos já enviados ficam salvos." }),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "logout", onClick: function () { location.assign(BASE + "../ENT-01-login/screen.html"); } }, "Sair e continuar depois"))));
  }

  window.EstDOC25 = { Screen: Screen };
  window.Est.mount(Screen);
})();
