// DOC-02 · Seleção do documento · estrangeiro.
// Tela montada com os componentes reais do DS (window.PalmeirasOnboarding, de ellena-hub/ds/bundle.js).
// Cada screen.html traz a marcação já renderizada (para leitura e inspeção) e este script a torna interativa:
// <div id="est-root" data-props='{"open":"crnm"}'> abre a tela com o CRNM escolhido; {"open":""} abre com a lista fechada.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;

  var CAMERA = { icon: "camera", label: "Tirar foto do documento", description: "A câmera captura a frente e o verso sozinha" };
  var UPLOAD = { icon: "upload", label: "Fazer upload do documento", description: "Arquivo em PDF, de até 5 MB" };
  var DOCS = [
    { value: "crnm", title: "CRNM", description: "Carteira de Registro Nacional Migratório", actions: [CAMERA, UPLOAD] },
    { value: "dprnm", title: "DPRNM", description: "Documento Provisório de Registro Nacional Migratório", actions: [CAMERA, UPLOAD] },
    { value: "rne", title: "RNE", description: "Registro Nacional de Estrangeiros", actions: [CAMERA, UPLOAD] },
    { value: "passaporte", title: "Passaporte", description: "Documento internacional",
      actions: [{ icon: "camera", label: "Tirar foto do documento", description: "Página com sua foto e a faixa de código" }] },
    { value: "cedula", title: "Cédula de identidade", description: "Documento de identidade do país de origem (Mercosul)",
      actions: [{ icon: "camera", label: "Tirar foto do documento", description: "Antes, você informa o país e o tipo do documento" }] }
  ];

  // Clicar de novo no card aberto (ou Espaço no rádio já escolhido) recolhe o card e volta ao estado inicial, sem escolha.
  // O rádio nativo não desmarca sozinho; por isso o clique no cabeçalho do card já escolhido é tratado aqui.
  function headOf(target) { return target && target.closest ? target.closest(".po-docopt-head") : null; }
  function valueOf(head) { var input = head && head.querySelector("input[type=radio]"); return input ? input.value : null; }

  function Screen(props) {
    var st = React.useState(props.open || ""), value = st[0], setValue = st[1];
    function onClickCapture(e) {
      var head = headOf(e.target);
      if (head && value && valueOf(head) === value) { e.preventDefault(); e.stopPropagation(); setValue(""); }
    }
    function onKeyDownCapture(e) {
      if (e.key !== " " || !e.target.matches || !e.target.matches("input[type=radio]")) return;
      if (value && e.target.value === value) { e.preventDefault(); e.stopPropagation(); setValue(""); }
    }
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body" },
        h(P.PageHeading, { tone: "neutral", focusOnMount: false, documentTitle: false, title: "Documento de identidade",
          subtitle: "Escolha o documento que você vai enviar. Depois, escolha como enviar." }),
        h("div", { className: "est-choices", onClickCapture: onClickCapture, onKeyDownCapture: onKeyDownCapture },
          h(P.RadioGroup, { legend: "Qual documento você vai enviar?", hideLegend: true, value: value, onChange: setValue },
            DOCS.map(function (d) {
              return h(P.DocumentOption, { key: d.value, value: d.value, title: d.title, description: d.description },
                d.actions.map(function (a, i) { return h(P.ActionRow, { key: i, icon: a.icon, description: a.description }, a.label); }));
            }))),
        h("div", { className: "est-legal" }, h(P.LegalFooter, null))));
  }

  window.EstDOC02 = { Screen: Screen };
  window.Est.mount(Screen);
})();
