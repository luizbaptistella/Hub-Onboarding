// REC-05 · E-mail recebido (apoio do protótipo).
// Mostra o e-mail transacional com o código de recuperação. Não é tela do app: é o template de e-mail do Figma
// (largura de 600 px), com saudação, código em destaque, validade e aviso de segurança. Sem componente do DS.
// "Acessar minha conta" só volta ao app (REC-04): a pessoa digita o código; ele não preenche nem valida sozinho.
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;

  function Screen() {
    return h("div", { className: "est-mail" },
      h("header", { className: "est-mail-top" }, h(A.Logo, { size: "md" })),
      h("main", { className: "est-mail-body" },
        h("article", { className: "est-mail-card" },
          h("h1", { className: "est-mail-title" }, "Olá, Mariana Silva!"),
          h("p", { className: "est-mail-text" }, "Você solicitou um código de validação para acessar sua conta oficial do Palmeiras. Use o código abaixo para concluir seu acesso:"),
          h("p", { className: "est-mail-code", "aria-label": "Código 8 4 7 2 9 1" }, "847 291"),
          h("p", { className: "est-mail-expira" }, h("span", { className: "po-icon", "aria-hidden": "true" }, "schedule"), h("span", null, "Este código expira em ", h("strong", null, "10 minutos"), ". Não compartilhe com ninguém.")),
          h("a", { className: "est-mail-btn", href: A.url(A.screenPath("REC-04-codigo-email", "vazio")) }, "Acessar minha conta"),
          h("hr", { className: "est-mail-hr" }),
          h("p", { className: "est-mail-aviso" }, h("span", { className: "po-icon", "aria-hidden": "true" }, "lock"), h("span", null, "Se você não solicitou este código, ignore este e-mail e sua conta permanecerá segura.")))),
      h("footer", { className: "est-mail-foot" },
        h("p", null, "Precisa de ajuda? ", h("a", { href: "#central-de-suporte" }, "Acesse nossa central de suporte")),
        h("hr", { className: "est-mail-foot-hr" }),
        h("p", { className: "est-mail-copy" }, "© 2026 Palmeiras. Todos os direitos reservados."),
        h("p", { className: "est-mail-addr" }, "Sociedade Esportiva Palmeiras · Rua Palestra Itália, 214 · São Paulo, SP")));
  }

  window.Acesso["REC-05"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
