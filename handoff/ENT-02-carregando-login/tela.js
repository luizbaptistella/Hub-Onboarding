// ENT-02 · Carregando login.
// Espera da resposta do servidor depois de "Entrar". Marca, barra de progresso e "Carregando Login...".
// Resposta aceita: abre a área logada (AREA-01). Resposta rejeitada: volta ao login com o aviso de credenciais inválidas.
// No protótipo o resultado vem de ?r=ok|erro, definido pelo login (senha "errada" simula a rejeição).
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;
  var ESPERA_MS = 2200;

  function Screen() {
    React.useEffect(function () {
      if (A.isEmbedded()) return undefined;   // no hub (iframe) a tela não navega sozinha
      var t = setTimeout(function () {
        if (A.query("r") === "erro") A.go(A.screenPath("ENT-01-login", "padrao") + "?erro=credenciais");
        else A.go("AREA-01-meu-cadastro/screen.html");
      }, ESPERA_MS);
      return function () { clearTimeout(t); };
    }, []);
    return h("div", { className: "est-device est-load" },
      h("main", { className: "est-load-main", "aria-busy": "true" },
        h(A.Logo, { size: "lg" }),
        h("div", { className: "est-load-card", role: "status" },
          h("div", { className: "est-loadbar", role: "progressbar", "aria-label": "Carregando login" }, h("span", { className: "est-loadbar-fill" })),
          h("p", { className: "est-load-text" }, "Carregando Login..."))));
  }

  window.Acesso["ENT-02"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
