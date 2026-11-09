/* Select do DS: troca o menu nativo do <select> por uma lista no padrão do DS.
   O <select> original continua no formulário (valor, validação e eventos "change"). */
(function () {
  "use strict";

  var uid = 0;
  var aberto = null;

  function fechar() {
    if (!aberto) return;
    aberto.menu.hidden = true;
    aberto.trigger.setAttribute("aria-expanded", "false");
    aberto.el.classList.remove("is-open");
    aberto = null;
  }

  // Mostra no gatilho o texto da opção escolhida e espelha disabled do <select>.
  function sincronizar(w) {
    var sel = w.sel;
    var opt = sel.options[sel.selectedIndex];
    w.label.textContent = opt ? opt.text : "";
    w.el.classList.toggle("po-select-empty", !sel.value);
    w.trigger.disabled = sel.disabled;
    if (sel.disabled && aberto === w) fechar();
  }

  function itens(w) {
    return [].slice.call(w.menu.querySelectorAll("li.po-select-option:not(.is-disabled)"));
  }

  // Monta a lista a partir das opções atuais (o cidade é preenchido pelo CEP, então a lista é refeita a cada abertura).
  function montar(w) {
    var sel = w.sel;
    w.menu.innerHTML = "";
    [].forEach.call(sel.options, function (opt, i) {
      var placeholder = opt.disabled && opt.value === "";
      var escolhida = i === sel.selectedIndex;
      var li = document.createElement("li");
      li.id = w.id + "-o" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(escolhida));
      li.setAttribute("tabindex", "-1");
      li.dataset.index = String(i);
      li.className = "po-select-option" + (placeholder ? " po-select-option-placeholder" : "") + (opt.disabled ? " is-disabled" : "");
      if (opt.disabled) li.setAttribute("aria-disabled", "true");

      var check = document.createElement("span");
      check.className = "po-select-check";
      if (escolhida) check.innerHTML = '<span class="po-icon s18" aria-hidden="true">check</span>';

      var nome = document.createElement("span");
      nome.className = "po-select-option-text";
      nome.textContent = opt.text;

      li.appendChild(check);
      li.appendChild(nome);
      w.menu.appendChild(li);
    });
  }

  function escolher(w, i) {
    var opt = w.sel.options[i];
    if (!opt || opt.disabled) return;
    w.sel.selectedIndex = i;
    w.sel.dispatchEvent(new Event("change", { bubbles: true }));
    sincronizar(w);
    fechar();
    w.trigger.focus();
  }

  function abrir(w) {
    if (aberto === w) { fechar(); return; }
    fechar();
    montar(w);
    sincronizar(w);
    w.menu.hidden = false;
    w.trigger.setAttribute("aria-expanded", "true");
    w.el.classList.add("is-open");
    aberto = w;
    var lista = itens(w);
    var foco = w.menu.querySelector('li[aria-selected="true"]:not(.is-disabled)') || lista[0];
    if (foco) foco.focus();
  }

  function enhance(sel) {
    if (sel.dataset.enhanced === "1") return;
    var el = sel.parentElement;
    if (!el || !el.classList.contains("po-select")) return;
    sel.dataset.enhanced = "1";
    uid += 1;

    var id = "po-sel-" + uid;
    sel.classList.add("po-select-native");
    sel.tabIndex = -1;
    sel.setAttribute("aria-hidden", "true");

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.id = id + "-btn";
    trigger.className = "po-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", id + "-menu");

    var label = document.createElement("span");
    label.className = "po-select-value";
    trigger.appendChild(label);

    var menu = document.createElement("ul");
    menu.id = id + "-menu";
    menu.className = "po-select-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-labelledby", trigger.id);
    menu.hidden = true;

    // O <label for> passa a apontar para o botão visível.
    if (sel.id) {
      var rotulo = document.querySelector('label[for="' + sel.id + '"]');
      if (rotulo) rotulo.htmlFor = trigger.id;
    }

    el.insertBefore(trigger, sel);
    el.appendChild(menu);

    var w = { el: el, sel: sel, trigger: trigger, label: label, menu: menu, id: id };

    trigger.addEventListener("click", function () { abrir(w); });
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (aberto !== w) abrir(w);
      }
    });

    menu.addEventListener("click", function (e) {
      var li = e.target.closest("li.po-select-option");
      if (li) escolher(w, Number(li.dataset.index));
    });

    menu.addEventListener("keydown", function (e) {
      var lista = itens(w);
      var atual = lista.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        lista[(atual + 1) % lista.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        lista[(atual - 1 + lista.length) % lista.length].focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        lista[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        lista[lista.length - 1].focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (atual >= 0) escolher(w, Number(lista[atual].dataset.index));
      } else if (e.key === "Escape") {
        e.preventDefault();
        fechar();
        trigger.focus();
      } else if (e.key === "Tab") {
        fechar();
      }
    });

    sel.addEventListener("change", function () { sincronizar(w); });
    if (window.MutationObserver) {
      new MutationObserver(function () { sincronizar(w); })
        .observe(sel, { childList: true, attributes: true, attributeFilter: ["disabled"] });
    }
    if (sel.form) {
      sel.form.addEventListener("reset", function () { setTimeout(function () { sincronizar(w); }, 0); });
    }
    sincronizar(w);
  }

  // Clique fora ou Escape fecham a lista aberta.
  document.addEventListener("mousedown", function (e) {
    if (aberto && !aberto.el.contains(e.target)) fechar();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && aberto) { var w = aberto; fechar(); w.trigger.focus(); }
  });

  function iniciar() {
    [].forEach.call(document.querySelectorAll(".po-select > select"), enhance);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
