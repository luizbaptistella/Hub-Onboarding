// REC-03 · SMS recebido (apoio do protótipo).
// Mostra o SMS que chega ao celular com o código de recuperação. Não é tela do app: é a mensagem enviada pelo sistema,
// desenhada no Figma para mostrar o conteúdo do SMS. Sem componente do DS. Voltar leva à tela do código (REC-02).
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;

  function Screen() {
    return h("div", { className: "est-device est-sms" },
      h(window.Est.StatusBar),
      h("header", { className: "est-sms-head" },
        h("a", { className: "est-sms-back", href: A.url(A.screenPath("REC-02-codigo-sms", "vazio")), "aria-label": "Voltar ao app" }, h("span", { className: "po-icon", "aria-hidden": "true" }, "chevron_left")),
        h("div", { className: "est-sms-contact" }, h(A.Logo, { size: "xs" }), h("p", { className: "est-sms-name" }, "Palmeiras ", h("span", { className: "po-icon", "aria-hidden": "true" }, "chevron_right"))),
        h("span", { className: "po-icon est-sms-help", "aria-hidden": "true" }, "help")),
      h("main", { className: "est-sms-thread" },
        h("p", { className: "est-sms-when" }, "HOJE 14:32"),
        h("div", { className: "est-sms-bubble" },
          h("p", null, "Palmeiras: Seu código de verificação é ", h("strong", null, "847 291"), ". Válido por 10 minutos. Não compartilhe com ninguém. Se não foi você, ignore esta mensagem."),
          h("span", { className: "est-sms-time" }, "14:32"))),
      h("div", { className: "est-sms-compose", "aria-hidden": "true" },
        h("span", { className: "po-icon" }, "photo_camera"), h("span", { className: "po-icon" }, "apps"),
        h("span", { className: "est-sms-input" }, "Mensagem", h("span", { className: "est-sms-send" }, h("span", { className: "po-icon" }, "arrow_upward")))));
  }

  window.Acesso["REC-03"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
