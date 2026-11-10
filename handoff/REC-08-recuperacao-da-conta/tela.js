// REC-08 · Recuperação da conta (pedido ao suporte). Proposta do hub (sem Figma), com o DS aplicado.
// Para quem perdeu o acesso ao e-mail e ao celular cadastrados, ou acha que a conta foi comprometida.
// Componentes do DS: AppHeader, PageHeading, TextField, Select e Button. Enviar solicitação valida ao enviar.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;
  var MOTIVOS = ["Perdi o acesso ao e-mail e ao celular cadastrados", "Acho que minha conta foi comprometida", "Outro motivo"];

  function validarContato(v) {
    if (!v.trim()) return "Informe um e-mail ou celular para contato.";
    if (v.indexOf("@") >= 0) return P.validators.email(v.trim());
    return P.validators.phone(v.replace(/\D/g, ""));
  }

  function Screen(props) {
    var s1 = React.useState(props.cpf || ""), cpf = s1[0], setCpf = s1[1];
    var s2 = React.useState(props.motivo || ""), motivo = s2[0], setMotivo = s2[1];
    var s3 = React.useState(props.contato || ""), contato = s3[0], setContato = s3[1];
    var s4 = React.useState(function () {
      return props.erro ? { cpf: cpf ? P.validators.cpf(cpf.replace(/\D/g, "")) : "Informe o CPF da conta.", motivo: motivo ? null : "Escolha o que aconteceu.", contato: validarContato(contato) } : {};
    }), erros = s4[0], setErros = s4[1];
    var ref = React.useRef(null);

    function enviar() {
      var v = { cpf: cpf ? P.validators.cpf(cpf.replace(/\D/g, "")) : "Informe o CPF da conta.", motivo: motivo ? null : "Escolha o que aconteceu.", contato: validarContato(contato) };
      if (v.cpf || v.motivo || v.contato) {
        setErros(v);
        setTimeout(function () { var el = ref.current && ref.current.querySelector('[aria-invalid="true"]'); if (el) el.focus(); }, 0);
        return;
      }
      A.go(A.screenPath("REC-09-solicitacao-enviada", "padrao"));
    }

    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar", href: A.url(A.screenPath("REC-01-recuperar-senha", "celular-vazio")) }, title: "Recuperar conta", language: false, help: false }),
      h("main", { className: "est-body", ref: ref },
        h(P.PageHeading, { title: "Recuperação da conta", subtitle: "Conte o que aconteceu. Nossa equipe confere sua identidade e responde no contato que você informar.", tone: "brand", focusOnMount: false, documentTitle: false }),
        h("div", { className: "est-form" },
          h(P.TextField, { label: "CPF da conta", preset: "cpf", name: "cpf", placeholder: "000.000.000-00", value: cpf, error: erros.cpf || undefined,
            onChange: function (e) { setCpf(e.target.value); setErros(Object.assign({}, erros, { cpf: null })); } }),
          h(P.Select, { label: "O que aconteceu", options: MOTIVOS, placeholder: "Selecione", value: motivo, error: erros.motivo || undefined,
            onChange: function (e) { setMotivo(e.target.value); setErros(Object.assign({}, erros, { motivo: null })); } }),
          h(P.TextField, { label: "E-mail ou celular para contato", name: "contato", placeholder: "seu@email.com ou (00) 00000-0000", autoComplete: "email", value: contato,
            hint: "Use um contato que você acessa agora.", error: erros.contato || undefined,
            onChange: function (e) { setContato(e.target.value); setErros(Object.assign({}, erros, { contato: null })); } })),
        h("div", { className: "est-actions" }, h(P.Button, { variant: "primary", onClick: enviar }, "Enviar solicitação")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["REC-08"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
