// Ajuda e atendimento (versão enxuta): valida categoria e descrição ao enviar e abre o chamado com número de protocolo.
// Protótipo: nada é enviado a um sistema real; o número é gerado aqui só para demonstrar a tela de confirmação.
(function () {
  var form = document.getElementById("ajuda-form-el");
  if (!form) return;
  var cat = document.getElementById("ajd-categoria");
  var desc = document.getElementById("ajd-descricao");
  var count = document.getElementById("ajd-descricao-count");
  var anexos = document.getElementById("ajd-anexos");
  var anexosStatus = document.getElementById("ajd-anexos-status");
  var protocolo = document.getElementById("ajd-protocolo");
  var copy = document.getElementById("ajd-copy");
  var MIN = 20, MAX_FILES = 3, MAX_BYTES = 5 * 1024 * 1024;

  // Erro junto ao campo; para o select, a borda vai no wrapper .po-select
  function setError(el, msg) {
    var field = el.closest(".po-field");
    var box = el.closest(".po-select") || el;
    var old = field.querySelector(".po-msg");
    if (old) old.remove();
    box.classList.toggle("po-input-error", Boolean(msg));
    if (msg) {
      var p = document.createElement("p");
      p.className = "po-msg";
      p.id = el.id + "-msg";
      p.innerHTML = '<span class="po-icon s16 fill po-msg-icon" aria-hidden="true">error</span><span></span>';
      p.lastChild.textContent = msg;
      field.appendChild(p);
      el.setAttribute("aria-invalid", "true");
      el.setAttribute("aria-describedby", p.id);
    } else {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    }
  }

  // Contador só aparece enquanto o texto está abaixo do mínimo
  function updateCount() {
    var len = desc.value.trim().length;
    if (desc.value.length > 0 && len < MIN) {
      count.hidden = false;
      count.textContent = "Faltam " + (MIN - len) + " caracteres";
    } else {
      count.hidden = true;
      count.textContent = "";
    }
  }
  desc.addEventListener("input", function () {
    updateCount();
    if (desc.getAttribute("aria-invalid") && desc.value.trim().length >= MIN) setError(desc, null);
  });
  cat.addEventListener("change", function () {
    cat.closest(".po-select").classList.remove("po-select-empty");
    if (cat.getAttribute("aria-invalid")) setError(cat, null);
  });

  function showAnexosStatus(text, isError) {
    anexosStatus.hidden = !text;
    anexosStatus.textContent = text || "";
    anexosStatus.classList.toggle("is-error", Boolean(isError));
  }
  anexos.addEventListener("change", function () {
    var files = Array.prototype.slice.call(anexos.files);
    if (files.length > MAX_FILES) return showAnexosStatus("Envie no máximo " + MAX_FILES + " arquivos.", true);
    if (files.some(function (f) { return f.size > MAX_BYTES; })) return showAnexosStatus("Cada arquivo pode ter até 5 MB.", true);
    showAnexosStatus(files.map(function (f) { return f.name; }).join(", "), false);
  });

  function validate() {
    var first = null;
    var checks = [
      [cat, !cat.value, "Escolha a categoria do problema."],
      [desc, desc.value.trim().length < MIN, "Descreva o problema com pelo menos " + MIN + " caracteres."]
    ];
    checks.forEach(function (c) {
      setError(c[0], c[1] ? c[2] : null);
      if (c[1] && !first) first = c[0];
    });
    return first;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var first = validate();
    if (first) { first.focus(); return; }
    protocolo.textContent = "PAL-2026-" + String(Math.floor(100000 + Math.random() * 900000));
    copy.querySelector("span:last-child").textContent = "Copiar número";
    form.reset();
    cat.closest(".po-select").classList.add("po-select-empty");
    updateCount();
    showAnexosStatus("", false);
    document.querySelector('.proto-nav [data-go="ajuda-enviado"]').click();
  });

  copy.addEventListener("click", function () {
    var label = copy.querySelector("span:last-child");
    try {
      navigator.clipboard.writeText(protocolo.textContent).then(
        function () { label.textContent = "Número copiado"; },
        function () { label.textContent = "Copie manualmente"; });
    } catch (err) {
      label.textContent = "Copie manualmente";
    }
  });
})();
