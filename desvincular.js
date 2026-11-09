/* Desvincular familiar: abre o modal de confirmação a partir de cada "Desvincular familiar"
   e, ao confirmar, remove o familiar da lista. Sem familiares restantes, vai para o estado vazio. */
(function () {
  "use strict";

  var modal = document.getElementById("desv-modal");
  if (!modal) return;

  var nome = document.getElementById("desv-nome");
  var cancelar = document.getElementById("desv-cancelar");
  var confirmar = document.getElementById("desv-confirmar");
  var alvo = null;     // o .area-family a remover
  var gatilho = null;  // o botão que abriu o modal (recebe o foco ao fechar)

  function abrir(botao) {
    alvo = botao.closest(".area-family");
    gatilho = botao;
    nome.textContent = alvo.querySelector(".area-family-name").textContent;
    modal.hidden = false;
    cancelar.focus();
  }

  function fechar() {
    modal.hidden = true;
    if (gatilho) gatilho.focus();
    alvo = null;
    gatilho = null;
  }

  function desvincular() {
    if (!alvo) return;
    alvo.remove();
    modal.hidden = true;
    alvo = null;
    gatilho = null;
    var restam = document.querySelectorAll("#rec-panel-meus .area-family").length;
    if (restam === 0) {
      var vazio = document.querySelector('.proto-nav [data-go="area-familiares-vazio"]');
      if (vazio) vazio.click();
    }
  }

  // Na lista de Meus familiares (familiar-recebidos), só nos familiares ativos
  document.querySelectorAll('#familiar-recebidos [data-act="desvincular"]').forEach(function (botao) {
    botao.addEventListener("click", function () { abrir(botao); });
  });

  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-desv-close]")) fechar();
  });
  confirmar.addEventListener("click", desvincular);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) fechar();
  });
})();
