// Cards de documento (po-docopt): ao escolher uma opção, abre o painel de ações dela e fecha o das outras.
// Usado pelas telas de seleção de documento (DOC-01). A marcação do painel vem do <template id="doc-actions"> da própria tela.
(function () {
  "use strict";
  var list = document.getElementById("doc-list");
  var tpl = document.getElementById("doc-actions");
  if (!list || !tpl) return;

  function sync() {
    list.querySelectorAll(".po-docopt").forEach(function (opt) {
      var input = opt.querySelector(".po-docopt-input");
      var chevron = opt.querySelector(".po-docopt-chevron");
      var panel = opt.querySelector(".po-docopt-panel");
      var on = input.checked;
      opt.classList.toggle("po-docopt-selected", on);
      input.setAttribute("aria-expanded", String(on));
      if (chevron) chevron.classList.toggle("po-docopt-chevron-up", on);
      if (on && !panel) {
        panel = tpl.content.firstElementChild.cloneNode(true);
        panel.id = input.getAttribute("aria-controls");
        opt.appendChild(panel);
      } else if (!on && panel) {
        panel.remove();
      }
    });
  }

  list.querySelectorAll(".po-docopt-input").forEach(function (radio) {
    radio.addEventListener("change", sync);
  });
  sync();
})();
