// REC-04 · Código por e-mail (recuperação de senha).
// Código de 6 dígitos enviado ao e-mail informado em REC-01. A lógica vive em window.Acesso.CodeScreen (ellena-hub/acesso.js),
// compartilhada com REC-02 (SMS). Componentes do DS: AppHeader, PageHeading, ContactRow, OTPInput, Alert, ResendPrompt e Button.
(function () {
  "use strict";
  var h = React.createElement, A = window.Acesso;
  function Screen(props) { return h(A.CodeScreen, Object.assign({ canal: "email" }, props)); }
  window.Acesso["REC-04"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
