// Vínculo de familiares · Área do convidado, versão com abas (spec seção 8.1 e CT-20).
// Abas "Meus familiares" e "Sou familiar de". Em cada aba, uma seção colapsável com os convites
// (enviados ou recebidos) e, abaixo, os familiares. Cada familiar expande e mostra as etapas de validação.
// Recusar pede confirmação (modal de Desvincular). Aceitar mostra o familiar em "Sou familiar de".
(function () {
  var screen = document.getElementById("familiar-recebidos");
  if (!screen) return;

  var seg = document.getElementById("rec-seg");
  var vistaMeus = document.getElementById("rec-vista-meus");
  var vistaSou = document.getElementById("rec-vista-sou");
  var dotMeus = document.getElementById("rec-dot-meus");
  var dotSou = document.getElementById("rec-dot-sou");
  var toast = document.getElementById("rec-toast");
  var toastTexto = document.getElementById("rec-toast-text");
  var toastTimer = null;
  var modal = document.getElementById("rec-modal");
  var gatilho = null;
  var recusaAlvo = null;

  function mostraToast(texto) {
    toastTexto.textContent = texto;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4000);
  }
  toast.querySelector(".po-toast-close").addEventListener("click", function () { toast.hidden = true; });

  function vista(qual) {
    seg.querySelector('input[value="' + qual + '"]').checked = true;
    vistaMeus.hidden = qual !== "meus";
    vistaSou.hidden = qual !== "sou";
  }
  seg.addEventListener("change", function (e) {
    if (e.target.name === "rec-vista") vista(e.target.value);
  });

  // Seções colapsáveis de convites
  function alternaCard(head) {
    var aberto = head.getAttribute("aria-expanded") === "true";
    head.setAttribute("aria-expanded", String(!aberto));
    document.getElementById(head.getAttribute("aria-controls")).hidden = aberto;
    head.querySelector(".hub-chev").textContent = aberto ? "expand_more" : "expand_less";
  }
  document.querySelectorAll("#familiar-recebidos .hub-card-head").forEach(function (h) {
    h.addEventListener("click", function () { alternaCard(h); });
  });

  // Contagens e pontos
  function convitesMeus() { return document.querySelectorAll("#rec-panel-meus .rec-invite").length; }
  function convitesSou() { return document.querySelectorAll("#rec-panel-sou .rec-invite").length; }
  function atualiza() {
    document.querySelector("[data-count-rec-meus]").textContent = convitesMeus() + (convitesMeus() === 1 ? " convite" : " convites");
    document.querySelector("[data-count-rec-sou]").textContent = convitesSou() + (convitesSou() === 1 ? " convite" : " convites");
    var expirado = document.querySelector('#rec-panel-meus .rec-invite[data-status="expirado"]');
    dotMeus.hidden = !expirado;
    var pendente = document.querySelector('#rec-panel-sou .rec-invite[data-status="pendente"]');
    dotSou.hidden = !pendente;
    document.querySelector("[data-count-meus-fam]").textContent = document.querySelectorAll("#rec-vista-meus .area-family").length;
    document.querySelector("[data-count-sou-fam]").textContent = document.querySelectorAll("#rec-vista-sou .area-family:not([hidden])").length;
  }

  // Modal de recusa
  function fechaModal() {
    modal.hidden = true;
    if (gatilho) gatilho.focus();
    gatilho = null;
    recusaAlvo = null;
  }
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-rec-close]")) fechaModal();
  });
  document.getElementById("rec-modal-confirmar").addEventListener("click", function () {
    var convite = recusaAlvo;
    modal.hidden = true;
    gatilho = null;
    recusaAlvo = null;
    if (!convite) return;
    var nome = convite.querySelector("[data-nome]").textContent;
    convite.remove();
    atualiza();
    mostraToast("Convite recusado. " + nome + " será avisado.");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) fechaModal();
  });

  // Ações dos convites
  screen.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var acao = b.getAttribute("data-act");
    var convite = b.closest(".rec-invite");

    if (acao === "copiar") {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText("https://palmeiras.com.br/convite/c4r1a7").catch(function () {});
      }
      var label = b.querySelector("[data-label]");
      label.textContent = "Link copiado";
      setTimeout(function () { label.textContent = "Copiar link"; }, 2000);
      return;
    }
    if (acao === "reenviar") {
      convite.setAttribute("data-status", "pendente");
      var badge = convite.querySelector("[data-badge]");
      badge.className = "po-badge po-badge-info";
      badge.textContent = "Pendente";
      convite.querySelector("[data-note]").hidden = true;
      atualiza();
      mostraToast("Convite reenviado para Paulo H*** Silva. O link anterior deixou de valer.");
      return;
    }
    if (acao === "aceitar") {
      var nome = convite.querySelector("[data-nome]").textContent;
      convite.remove();
      var novo = document.getElementById("rec-fam-roberto");
      novo.hidden = false;
      atualiza();
      var head = novo.querySelector(".area-family-head");
      head.setAttribute("aria-expanded", "true");
      novo.querySelector(".area-family-body").hidden = false;
      novo.classList.add("pend-novo");
      setTimeout(function () { novo.classList.remove("pend-novo"); }, 2000);
      mostraToast("Convite aceito. Agora você é familiar de " + nome + ".");
      return;
    }
    if (acao === "recusar") {
      recusaAlvo = convite;
      gatilho = b;
      var n = convite.querySelector("[data-nome]").textContent;
      document.getElementById("rec-modal-nome").textContent = n;
      modal.querySelector("[data-rec-modal-nome]").textContent = n;
      modal.hidden = false;
      document.getElementById("rec-modal-voltar").focus();
    }
  });

  // Familiares: o chevron troca de ícone em vez de girar (evita o corte do glifo)
  screen.addEventListener("click", function (e) {
    var head = e.target.closest(".area-family-head");
    if (!head) return;
    setTimeout(function () {
      var aberto = head.getAttribute("aria-expanded") === "true";
      head.querySelector(".area-chev").textContent = aberto ? "expand_less" : "expand_more";
    }, 0);
  });

  // Cenários do menu do protótipo
  // Estado inicial dos convites, guardado na carga da página
  var convitesOriginais = { meus: document.getElementById("rec-panel-meus").innerHTML, sou: document.getElementById("rec-panel-sou").innerHTML };
  document.querySelectorAll('.proto-nav [data-go="familiar-recebidos"]').forEach(function (b) {
    b.addEventListener("click", function () {
      // Recomeça com os convites iniciais e colapsa as seções
      var painel = document.getElementById("rec-panel-meus");
      var sou = document.getElementById("rec-panel-sou");
      painel.innerHTML = convitesOriginais.meus;
      sou.innerHTML = convitesOriginais.sou;
      document.getElementById("rec-fam-roberto").hidden = true;
      document.querySelectorAll("#familiar-recebidos .hub-card-head").forEach(function (h) {
        h.setAttribute("aria-expanded", "false");
        document.getElementById(h.getAttribute("aria-controls")).hidden = true;
        h.querySelector(".hub-chev").textContent = "expand_more";
      });
      toast_hide();
      var primeiro = b.getAttribute("data-rec-state") === "primeiro";
      // "Primeiro convite": sem familiares ainda, só o convite recebido
      document.getElementById("rec-fam-ana").hidden = primeiro;
      document.getElementById("rec-h-sou").parentElement.querySelector(".rec-sec-desc").hidden = primeiro;
      vista("meus");
      atualiza();
    });
  });
  function toast_hide() { toast.hidden = true; }

  atualiza();
})();
