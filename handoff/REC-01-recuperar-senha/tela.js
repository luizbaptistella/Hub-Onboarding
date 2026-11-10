// REC-01 · Recuperar senha.
// A pessoa escolhe receber o código por celular ou por e-mail e confirma a data de nascimento.
// Componentes do DS: AppHeader, PageHeading, Tabs, TextField, TextLink e Button.
// Continuar valida os dois campos ao enviar. Aba Celular abre REC-02 (SMS); aba E-mail abre REC-04 (e-mail).
// No protótipo qualquer contato válido segue: o servidor não confirma se a conta existe (a tela não revela isso).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement, A = window.Acesso;
  var MSG_VAZIO = "Você precisa preencher todos os campos.";

  function Screen(props) {
    var s1 = React.useState(props.aba || "celular"), aba = s1[0], setAba = s1[1];
    var s2 = React.useState({ celular: props.celular || "", email: props.email || "" }), contato = s2[0], setContato = s2[1];
    var s3 = React.useState(props.nascimento || ""), nasc = s3[0], setNasc = s3[1];
    var s4 = React.useState(function () {
      if (!props.erro) return {};
      var c = props.aba === "email" ? props.email : props.celular;
      return { contato: c ? null : MSG_VAZIO, nasc: props.nascimento ? null : MSG_VAZIO, vazio: true };
    }), erros = s4[0], setErros = s4[1];
    var ref = React.useRef(null);
    var email = aba === "email";

    function continuar() {
      var raw = contato[aba];
      var v = {
        contato: !raw || (email ? P.validators.email(raw) : P.validators.phone(raw.replace(/\D/g, ""))),
        nasc: !nasc || P.validators.date(nasc.replace(/\D/g, ""))
      };
      var vazio = !raw || !nasc;
      if (v.contato || v.nasc) {
        setErros({ contato: v.contato ? (raw ? v.contato : MSG_VAZIO) : null, nasc: v.nasc ? (nasc ? v.nasc : MSG_VAZIO) : null, vazio: vazio });
        setTimeout(function () { var el = ref.current && ref.current.querySelector('[aria-invalid="true"]'); if (el) el.focus(); }, 0);
        return;
      }
      // Contato mascarado para a tela do código (nunca vai na URL)
      A.store("contato", email ? P.maskEmail(raw) : P.maskPhone(raw));
      A.go(email ? A.screenPath("REC-04-codigo-email", "vazio") : A.screenPath("REC-02-codigo-sms", "vazio"));
    }

    var comErro = erros.contato || erros.nasc || erros.vazio;
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar", href: A.url(A.screenPath("ENT-01-login", "padrao")) }, title: "Recuperar Senha", language: false, help: false }),
      h("main", { className: "est-body", ref: ref },
        h(A.Logo, { size: "sm" }),
        h(P.PageHeading, { title: "Recuperação", subtitle: "Como você deseja recuperar sua senha?", tone: "brand", focusOnMount: false, documentTitle: false }),
        h(P.Tabs, { label: "Forma de recuperação", value: aba, onChange: function (v) { setAba(v); setErros({}); },
          items: [{ value: "celular", label: "Celular" }, { value: "email", label: "E-mail" }] }),
        h("div", { className: "est-form" },
          email
            ? h(P.TextField, { key: "email", label: "E-mail", preset: "email", name: "email", placeholder: "seu@email.com", autoComplete: "email", value: contato.email,
                error: erros.contato || undefined, onChange: function (e) { setContato(Object.assign({}, contato, { email: e.target.value })); setErros(Object.assign({}, erros, { contato: null })); } })
            : h(P.TextField, { key: "celular", label: "Número do celular", preset: "phone", name: "celular", placeholder: "(00) 00000-0000", autoComplete: "tel", value: contato.celular,
                error: erros.contato || undefined, onChange: function (e) { setContato(Object.assign({}, contato, { celular: e.target.value })); setErros(Object.assign({}, erros, { contato: null })); } }),
          h(P.TextField, { label: "Data de nascimento", preset: "date", name: "nascimento", placeholder: "DD/MM/AAAA", autoComplete: "bday", value: nasc,
            error: erros.nasc || undefined, onChange: function (e) { setNasc(e.target.value); setErros(Object.assign({}, erros, { nasc: null })); } })),
        comErro ? null : h("section", { className: "est-support", "aria-labelledby": "est-support-title" },
          h("h2", { className: "est-support-title", id: "est-support-title" }, "Não consegue acessar seu e-mail?"),
          h("p", { className: "est-support-text" }, "Se você perdeu o acesso à conta ou acredita que ela foi comprometida, solicite ajuda ao suporte."),
          h(P.TextLink, { variant: "standalone", href: "#recuperacao-da-conta" }, "Solicitar recuperação da conta")),
        h("div", { className: "est-actions" }, h(P.Button, { variant: "primary", onClick: continuar }, "Continuar")),
        h(P.LegalFooter, { links: [], className: "est-legal" }, "© 2026 Ellena. Todos os direitos reservados.")));
  }

  window.Acesso["REC-01"] = { Screen: Screen };
  window.Est.mount(Screen);
})();
