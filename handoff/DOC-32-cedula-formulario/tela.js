// DOC-32 · Cédula · formulário.
// Informar país e número da Cédula de identidade (Mercosul) antes das fotos. Componentes do DS: AppHeader, PageHeading, Select, TextField e Button.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var PAISES = ["Argentina", "Colômbia", "Paraguai", "Peru", "Uruguai", "Venezuela"];

  function Screen(props) {
    var p = React.useState(props.pais || ""), pais = p[0], setPais = p[1];
    var n = React.useState(props.num || ""), num = n[0], setNum = n[1];
    var erroPais = props.erro === "pais" ? "Não aceitamos este país para a Cédula de identidade." : undefined;
    var erroNum = props.erro === "numero" ? "Número inválido. Confira o número impresso no documento." : undefined;
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.PageHeading, { tone: "neutral", focusOnMount: false, documentTitle: false, title: "Cédula de identidade",
          subtitle: "Informe o país e o documento que você vai enviar. Vamos conferir esses dados com as fotos do documento." }),
        h("div", { className: "est-form" },
          h(P.Select, { label: "País", options: PAISES, placeholder: "Selecione", value: pais, error: erroPais,
            onChange: function (e) { setPais(e.target.value); } }),
          h(P.TextField, { label: "Número do documento", value: num, error: erroNum,
            onChange: function (e) { setNum(e.target.value); } })),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "arrow_forward", disabled: !(pais && num), onClick: function () {} }, "Continuar"))));
  }

  window.EstDOC32 = { Screen: Screen };
  window.Est.mount(Screen);
})();
