// REC-02 · Código por SMS (recuperação de senha).
// Código de 6 dígitos enviado ao celular informado em REC-01. A lógica vive em window.Acesso.CodeScreen (ellena-hub/acesso.js),
// compartilhada com REC-04 (e-mail). Componentes do DS: AppHeader, PageHeading, ContactRow, OTPInput, Alert, ResendPrompt e Button.
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;
  function Screen(props) { return h(A.CodeScreen, Object.assign({ canal: "sms" }, props)); }
  window.Acesso["REC-02"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
