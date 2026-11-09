(function () {
  // Accordions da área logada: o cabeçalho abre e fecha o corpo.
  // Usa delegação, então funciona nos blocos clonados do template.
  document.addEventListener("click", function (e) {
    var head = e.target.closest(".area-acc-head, .area-family-head");
    if (!head) return;
    var open = head.getAttribute("aria-expanded") === "true";
    head.setAttribute("aria-expanded", String(!open));
    var body = head.nextElementSibling;
    if (body) body.hidden = open;
  });

})();

// Seletor de idioma (LanguageSelector do DS v50): botão de menu com três itens menuitemradio.
// Nomes no próprio idioma, códigos PT/ES/EN, bandeiras do Brasil, da Espanha e dos EUA.
(function () {
  var OPTIONS = [
    { value: "PT", lang: "pt-BR", label: "Português", flag: "design-system/assets/flag-br.png" },
    { value: "ES", lang: "es", label: "Español", flag: "design-system/assets/flag-es.svg" },
    { value: "EN", lang: "en", label: "English", flag: "design-system/assets/flag-us.svg" }
  ];
  var current = OPTIONS[0];
  var openMenu = null;

  function paintButtons() {
    document.querySelectorAll(".po-lang").forEach(function (b) {
      var code = b.querySelector(".po-lang-code"), img = b.querySelector("img");
      if (code) code.textContent = current.value;
      if (img) img.src = current.flag;
      b.setAttribute("aria-label", "Idioma: " + current.label + ", " + current.value);
      if (!b.hasAttribute("aria-expanded")) b.setAttribute("aria-expanded", "false");
    });
  }
  function close(focusButton) {
    if (!openMenu) return;
    openMenu.menu.remove();
    openMenu.btn.setAttribute("aria-expanded", "false");
    if (focusButton) openMenu.btn.focus();
    openMenu = null;
  }
  function choose(o) {
    current = o;
    paintButtons();
    close(true);
  }
  function items() { return Array.prototype.slice.call(openMenu.menu.querySelectorAll('[role="menuitemradio"]')); }
  function open(btn) {
    close(false);
    var device = btn.closest(".device") || document.body;
    var menu = document.createElement("ul");
    menu.className = "lang-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Idioma");
    OPTIONS.forEach(function (o) {
      var li = document.createElement("li");
      var checked = o === current;
      li.setAttribute("role", "menuitemradio");
      li.setAttribute("aria-checked", String(checked));
      li.setAttribute("lang", o.lang);
      li.tabIndex = -1;
      li.innerHTML = '<img src="' + o.flag + '" alt=""><span class="lang-menu-label"></span>';
      li.querySelector(".lang-menu-label").textContent = o.label;
      if (checked) li.insertAdjacentHTML("beforeend", '<span class="po-icon s20" aria-hidden="true">check</span>');
      li.addEventListener("click", function (e) { e.stopPropagation(); choose(o); });
      menu.appendChild(li);
    });
    device.appendChild(menu);
    var b = btn.getBoundingClientRect(), d = device.getBoundingClientRect();
    menu.style.top = (b.bottom - d.top + 4) + "px";
    menu.style.right = (d.right - b.right) + "px";
    btn.setAttribute("aria-expanded", "true");
    openMenu = { btn: btn, menu: menu };
    (menu.querySelector('[aria-checked="true"]') || menu.firstChild).focus();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".po-lang");
    if (btn) {
      e.preventDefault();
      if (openMenu && openMenu.btn === btn) close(true); else open(btn);
      return;
    }
    if (openMenu && !e.target.closest(".lang-menu")) close(false);
  });
  // Teclado do menu: setas, Home, End, Enter/Espaço escolhem, Esc e Tab fecham
  document.addEventListener("keydown", function (e) {
    if (!openMenu) return;
    var list = items(), at = list.indexOf(document.activeElement), next = null;
    if (e.key === "Escape") { e.preventDefault(); close(true); return; }
    if (e.key === "Tab") { close(false); return; }
    if (at === -1) return;
    if (e.key === "ArrowDown") next = (at + 1) % list.length;
    else if (e.key === "ArrowUp") next = (at - 1 + list.length) % list.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(OPTIONS[at]); return; }
    if (next !== null) { e.preventDefault(); list[next].focus(); }
  }, true);
  paintButtons();
})();

// Links e ações cuja tela ainda não existe: aviso curto em vez de não fazer nada
(function () {
  var timer = null;
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".proto-soon");
    if (!t) return;
    e.preventDefault();
    var device = t.closest(".device") || document.body;
    var toast = device.querySelector(".proto-soon-toast");
    if (!toast) {
      toast = document.createElement("p");
      toast.className = "proto-soon-toast";
      toast.setAttribute("role", "status");
      device.appendChild(toast);
    }
    toast.hidden = false;
    toast.textContent = "Esta tela ainda não está na implementação atual.";
    clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 2500);
  });
})();

// Meu perfil (ProfileMenu do DS): teclado e foco como no componente.
// Setas, Home e End percorrem itens e o seletor de idioma; Esc fecha e devolve o foco ao gatilho; Tab fecha; clique fora fecha.
(function () {
  function items(menu) { return Array.prototype.slice.call(menu.querySelectorAll("[role='menuitem'], [role='menuitemcheckbox'], .po-lang")); }
  function setOpen(root, open, where, focusTrigger) {
    var btn = root.querySelector(".po-profile-btn"), menu = root.querySelector(".po-profile-menu");
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      var list = items(menu);
      if (list.length) (where === "last" ? list[list.length - 1] : list[0]).focus();
    } else if (focusTrigger) {
      btn.focus();
    }
  }
  function openRoots() { return Array.prototype.slice.call(document.querySelectorAll("[data-profile]")).filter(function (r) { return !r.querySelector(".po-profile-menu").hidden; }); }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".po-profile-btn");
    if (btn) {
      var root = btn.closest("[data-profile]"), wasOpen = btn.getAttribute("aria-expanded") === "true";
      openRoots().forEach(function (r) { if (r !== root) setOpen(r, false, null, false); });
      setOpen(root, !wasOpen, "first", wasOpen);
      return;
    }
    var row = e.target.closest(".po-profile-lang");
    if (row) {
      // Clique na linha Idioma abre o seletor; clique no próprio botão ou na lista não mexe nele.
      if (!e.target.closest(".po-lang, .lang-menu")) row.querySelector(".po-lang").click();
      return;
    }
    if (e.target.closest(".lang-menu")) return;
    var item = e.target.closest(".po-profile-item");
    if (item) {
      if (item.getAttribute("aria-disabled") === "true") return;
      if (item.hasAttribute("data-theme-toggle")) return; // o tema trata o próprio clique e o menu continua aberto
      setOpen(item.closest("[data-profile]"), false, null, true);
      return;
    }
    openRoots().forEach(function (r) { setOpen(r, false, null, false); });
  });

  document.addEventListener("keydown", function (e) {
    if (!e.target || !e.target.closest) return;
    if (e.target.closest(".lang-menu")) return; // seletor de idioma trata o próprio teclado
    var root = e.target.closest("[data-profile]");
    if (!root) return;
    var btn = root.querySelector(".po-profile-btn"), menu = root.querySelector(".po-profile-menu");
    if (menu.hidden) {
      if (e.target === btn && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        setOpen(root, true, e.key === "ArrowDown" ? "first" : "last", false);
      }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setOpen(root, false, null, true); return; }
    if (e.key === "Tab") { setOpen(root, false, null, false); return; }
    var list = items(menu), at = list.indexOf(e.target);
    if (at === -1) return;
    var n = list.length, next = null;
    if (e.key === "ArrowDown") next = (at + 1) % n;
    else if (e.key === "ArrowUp") next = (at - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next !== null) { e.preventDefault(); list[next].focus(); }
  });
})();

// Segurança (List do DS): Conectar / Desconectar alterna o login social na própria tela (implementação atual, só em memória).
(function () {
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toggle]");
    if (!t) return;
    var row = t.closest("[data-social]");
    var on = row.dataset.on !== "true";
    var name = row.dataset.name;
    row.dataset.on = String(on);
    row.querySelector("[data-desc]").textContent = on ? (name === "Google" ? "Conectado · roberto.silva@gmail.com" : "Conectado") : "Não conectado";
    t.textContent = on ? "Desconectar" : "Conectar";
    t.setAttribute("aria-label", t.textContent + " " + name);
    t.classList.toggle("po-list-action-danger", on);
  });
})();

// Campo de senha: Mostrar/Ocultar (como o TextField preset password do DS), aria-pressed acompanha o estado.
(function () {
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-pass-toggle]");
    if (!b) return;
    var input = document.getElementById(b.dataset.passToggle);
    var show = input.type === "password";
    input.type = show ? "text" : "password";
    b.setAttribute("aria-pressed", String(show));
    b.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
    b.querySelector(".po-icon").textContent = show ? "visibility_off" : "visibility";
  });
})();

// Cadastro do titular em cenários (Completo / Pendente / Reprovado): status, detalhe ao abrir com CTA,
// timeline vertical à esquerda e progresso. Implementação atual: o seletor fica no menu de telas.
(function () {
  var tpl = document.getElementById("tpl-detalhe");
  var slots = [].slice.call(document.querySelectorAll("[data-detalhe]"));
  if (!tpl || !slots.length) return;
  var ETAPAS = { "Contatos": "contatos", "Dados pessoais": "dados", "Validação de identidade": "identidade", "Benefício Meia-Entrada": "beneficio" };
  var CENARIOS = {
    completo: { contatos: "concluido", dados: "concluido", identidade: "concluido", beneficio: "validado" },
    pendente: { contatos: "concluido", dados: "concluido", identidade: "pendente", beneficio: "pendente" },
    reprovado: { contatos: "concluido", dados: "concluido", identidade: "reprovado", beneficio: "pendente" },
    analise: { contatos: "concluido", dados: "concluido", identidade: "analise", beneficio: "pendente" },
    // Variações por seção: cada uma altera um acordeão e deixa os outros como no cenário completo (ou pendente do benefício).
    "contatos-pendente": { contatos: "pendente", dados: "concluido", identidade: "concluido", beneficio: "validado" },
    "contatos-analise": { contatos: "analise", dados: "concluido", identidade: "concluido", beneficio: "validado" },
    "dados-pendente": { contatos: "concluido", dados: "pendente", identidade: "concluido", beneficio: "validado" },
    "dados-reprovado": { contatos: "concluido", dados: "reprovado", identidade: "concluido", beneficio: "validado" },
    "dados-analise": { contatos: "concluido", dados: "analise", identidade: "concluido", beneficio: "validado" },
    "identidade-bloqueada": { contatos: "concluido", dados: "concluido", identidade: "bloqueado", beneficio: "pendente" },
    "beneficio-reprovado": { contatos: "concluido", dados: "concluido", identidade: "concluido", beneficio: "reprovado" },
    "beneficio-analise": { contatos: "concluido", dados: "concluido", identidade: "concluido", beneficio: "analise" },
    "beneficio-aguardando": { contatos: "concluido", dados: "concluido", identidade: "concluido", beneficio: "aguardando" }
  };
  var ROTULO = { concluido: "Concluído", validado: "Validado", pendente: "Pendente", reprovado: "Reprovado", analise: "Em análise", bloqueado: "Bloqueado", aguardando: "Aguardando" };
  var FEITO = { concluido: true, validado: true };
  var DESCRICAO = {
    contatos: { pendente: "Confirme seu celular", analise: "Novo e-mail em verificação" },
    dados: { pendente: "Falta preencher o endereço", reprovado: "Dados não conferem com o documento", analise: "Alteração em análise" },
    identidade: { pendente: "Falta validar documento e foto", analise: "Documento e selfie em análise", reprovado: "Não conseguimos aprovar sua foto", bloqueado: "Limite de tentativas atingido" },
    beneficio: { pendente: "Liberado após validar sua identidade", reprovado: "Não conseguimos validar seu benefício", analise: "Comprovante de estudante em análise", aguardando: "Disponível em breve" }
  };
  var DETALHE = {
    contatos: {
      pendente: { titulo: "Confirme seu celular", texto: "Seu celular ainda não foi confirmado. Sem ele, não conseguimos enviar os códigos de acesso.", cta: "Confirmar celular", go: "editar-celular" },
      analise: { titulo: "Estamos verificando seu e-mail", texto: "Enviamos um link para o novo endereço. Assim que for confirmado, ele entra no seu cadastro. Você não precisa fazer nada agora." }
    },
    dados: {
      pendente: { titulo: "Falta preencher o endereço", texto: "Informe onde você mora para concluir seus dados pessoais.", cta: "Completar endereço", go: "endereco" },
      reprovado: { titulo: "Seus dados não conferem", texto: "O nome ou o CPF não bate com o documento enviado. Revise seus dados e tente de novo.", cta: "Revisar dados", go: "cadastro" },
      analise: { titulo: "Estamos analisando seus dados", texto: "Recebemos sua alteração. Avisaremos por e-mail quando a análise terminar. Você não precisa fazer nada agora." }
    },
    identidade: {
      pendente: { titulo: "Falta só mais uma etapa", texto: "Envie seu documento com foto e tire uma selfie. Leva cerca de 3 minutos e libera a compra de ingressos.", cta: "Concluir validação", go: "documento" },
      reprovado: { titulo: "Sua foto não foi aprovada", texto: "Motivo: rosto não identificado com clareza. Tente de novo em um lugar bem iluminado, sem óculos ou boné.", cta: "Tentar novamente", go: "documento" },
      analise: { titulo: "Estamos analisando seus documentos", texto: "Recebemos seu documento e sua selfie. Avisaremos por e-mail assim que a análise terminar. Você não precisa fazer nada agora." },
      bloqueado: { titulo: "Validação bloqueada", texto: "Você atingiu o limite de tentativas. Fale com o atendimento para liberar uma nova validação.", cta: "Falar com o atendimento", go: "ajuda-form" }
    },
    beneficio: {
      pendente: { titulo: "Quase lá", texto: "Este benefício é liberado depois que sua identidade for validada." },
      reprovado: { titulo: "Benefício não aprovado", texto: "Não conseguimos confirmar sua condição de estudante. Tente de novo com outro documento.", cta: "Tentar novamente", go: "documento" },
      analise: { titulo: "Estamos analisando seu benefício", texto: "Recebemos seu comprovante de estudante. Avisaremos por e-mail quando a análise terminar." },
      aguardando: { titulo: "Disponível em breve", texto: "Este benefício será liberado em breve. Você não precisa fazer nada agora." }
    }
  };
  var CABECALHO = {
    completo: { texto: "Cadastro completo", classe: "po-badge-success" },
    pendente: { texto: "Cadastro pendente", classe: "po-badge-warning" },
    reprovado: { texto: "Cadastro reprovado", classe: "po-badge-danger" },
    analise: { texto: "Cadastro em análise", classe: "po-badge-info" },
    "contatos-pendente": { texto: "Cadastro pendente", classe: "po-badge-warning" },
    "contatos-analise": { texto: "Cadastro em análise", classe: "po-badge-info" },
    "dados-pendente": { texto: "Cadastro pendente", classe: "po-badge-warning" },
    "dados-reprovado": { texto: "Cadastro reprovado", classe: "po-badge-danger" },
    "dados-analise": { texto: "Cadastro em análise", classe: "po-badge-info" },
    "identidade-bloqueada": { texto: "Cadastro reprovado", classe: "po-badge-danger" },
    "beneficio-reprovado": { texto: "Cadastro completo", classe: "po-badge-success" },
    "beneficio-analise": { texto: "Cadastro completo", classe: "po-badge-success" },
    "beneficio-aguardando": { texto: "Cadastro completo", classe: "po-badge-success" }
  };

  function montar(slot, cenario) {
    var dados = { nome: slot.dataset.nome, cpf: slot.dataset.cpf, email: slot.dataset.email, telefone: slot.dataset.telefone };
    var estados = CENARIOS[cenario];
    var feitos = 0;
    slot.innerHTML = "";
    var cards = [].slice.call(tpl.content.cloneNode(true).children);
    cards.forEach(function (card) {
      var etapa = ETAPAS[card.querySelector(".area-acc-title").textContent];
      var estado = estados[etapa];
      if (FEITO[estado]) feitos++;
      card.dataset.state = estado;
      if (estado !== "aguardando") {
        // Variante B aprovada: linha no topo do card com a ação (pendente) ou o status (demais estados).
        var eyebrow = document.createElement("div");
        eyebrow.className = "tl-eyebrow";
        eyebrow.textContent = { concluido: "Concluído", validado: "Validado", pendente: "Ação necessária", reprovado: "Reprovado", analise: "Em análise", bloqueado: "Bloqueado" }[estado];
        card.insertBefore(eyebrow, card.firstChild);
      }
      card.querySelector(".area-acc-badge").textContent = ROTULO[estado];
      var desc = DESCRICAO[etapa] && DESCRICAO[etapa][estado];
      if (desc) card.querySelector(".area-acc-desc").textContent = desc;
      var corpo = card.querySelector(".area-acc-body");
      var det = DETALHE[etapa] && DETALHE[etapa][estado];
      if (det) {
        var cta = det.cta ? '<button type="button" class="po-btn po-btn-primary po-btn-block tl-cta" data-go="' + det.go + '"><span class="po-btn-content"><span>' + det.cta + '</span><span class="po-icon s18" aria-hidden="true">arrow_forward</span></span></button>' : "";
        corpo.innerHTML = '<div class="tl-detail"><p class="tl-detail-title">' + det.titulo + '</p><p class="tl-detail-text">' + det.texto + "</p>" + cta + "</div>";
      }
      // Aprovado não leva badge dentro do card: a borda verde já marca o status.
      // Os demais status saem do cabeçalho e vão para o topo do corpo: somem quando fechado, aparecem ao abrir.
      var badge = card.querySelector(".area-acc-badge");
      if (estado === "concluido" || estado === "validado" || estado === "analise") {
        badge.remove();
      } else {
        var status = document.createElement("div");
        status.className = "tl-status";
        status.appendChild(badge);
        corpo.insertBefore(status, corpo.firstChild);
      }
      // Cards começam fechados: o destaque do pendente aparece sem abrir.
      card.querySelector(".area-acc-head").setAttribute("aria-expanded", "false");
      corpo.hidden = true;
      slot.appendChild(card);
    });
    slot.querySelectorAll("[data-bind]").forEach(function (el) { el.textContent = dados[el.dataset.bind] || ""; });
    if (slot.dataset.detalhe === "titular") {
      var cab = CABECALHO[cenario];
      document.querySelectorAll(".area-user .po-badge").forEach(function (b) { b.textContent = cab.texto; b.className = "po-badge " + cab.classe; });
    }
  }

  var botoes = [].slice.call(document.querySelectorAll("[data-cenario]"));
  // Só o titular muda de cenário; os familiares ficam no cadastro completo.
  function ativar(cenario) {
    slots.forEach(function (s) { montar(s, s.dataset.detalhe === "titular" ? cenario : "completo"); });
    botoes.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.cenario === cenario)); });
  }
  botoes.forEach(function (b) {
    b.addEventListener("click", function () {
      ativar(b.dataset.cenario);
      var ir = document.querySelector('.proto-nav [data-go="area-cadastro-detalhe"]');
      if (ir) ir.click();
    });
  });
  ativar("completo");
})();

// Banners da área logada em carrossel: o banner Avanti vira o primeiro slide e ganha dois modelos (ingressos e loja).
// Desliza com o dedo (scroll-snap); as bolinhas acompanham o slide atual e levam a ele.
(function () {
  // Desligado nesta fase: as telas mostram só o banner Avanti, sem bolinhas nem slides extras. Para voltar, mude para true.
  var CARROSSEL_ATIVO = false;
  // Cada modelo tem layout próprio: ingressos em formato de bilhete (claro), loja em tipografia grande (escuro).
  var MODELOS = [
    { tipo: "ingressos" },
    { tipo: "loja" }
  ];
  function slideHTML(m) {
    if (m.tipo === "ingressos") {
      return '<button type="button" class="promo-ticket promo-slide proto-soon">' +
        '<span class="stub"><span class="stub-label">Próximo jogo</span><span class="stub-day">14</span><span class="stub-label">Nov · 16h</span></span>' +
        '<span class="ticket-body"><span class="ticket-kicker">Ingressos</span><span class="ticket-title">Compre seus ingressos</span><span class="ticket-sub">Setores e preços dos próximos jogos</span><span class="ticket-cta">Ver jogos disponíveis →</span></span></button>';
    }
    return '<button type="button" class="promo-loja promo-slide proto-soon">' +
      '<span class="loja-bigword" aria-hidden="true">LOJA</span><span class="loja-icon" aria-hidden="true">checkroom</span>' +
      '<span class="loja-tag">Loja oficial</span><span class="loja-title">Camisas, acessórios e coleções</span><span class="loja-cta">Ver produtos</span></button>';
  }
  if (!CARROSSEL_ATIVO) return;
  document.querySelectorAll(".area-promo").forEach(function (orig) {
    var parent = orig.parentNode;
    var wrap = document.createElement("div");
    wrap.className = "promo-carousel";
    var track = document.createElement("div");
    track.className = "promo-track";
    track.tabIndex = 0;
    track.setAttribute("role", "region");
    track.setAttribute("aria-roledescription", "carrossel");
    track.setAttribute("aria-label", "Destaques");
    var dots = document.createElement("div");
    dots.className = "promo-dots";
    wrap.appendChild(track);
    wrap.appendChild(dots);
    parent.replaceChild(wrap, orig);

    var slides = [orig];
    MODELOS.forEach(function (m) {
      var t = document.createElement("template");
      t.innerHTML = slideHTML(m);
      slides.push(t.content.firstChild);
    });
    orig.classList.add("promo-slide");
    slides.forEach(function (s) { track.appendChild(s); });

    var bolinhas = slides.map(function (s, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "promo-dot" + (i === 0 ? " is-on" : "");
      d.setAttribute("aria-label", "Banner " + (i + 1) + " de " + slides.length);
      d.addEventListener("click", function () { track.scrollTo({ left: s.offsetLeft - track.offsetLeft, behavior: "smooth" }); });
      dots.appendChild(d);
      return d;
    });
    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      bolinhas.forEach(function (d, k) { d.classList.toggle("is-on", k === i); });
    }, { passive: true });

    // Arrastar com o mouse (desktop): o toque no celular já desliza nativamente.
    // Durante o arraste o snap é desligado; ao soltar, o carrossel para no banner mais próximo.
    var arrasto = null, ignorarClique = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      arrasto = { x: e.clientX, left: track.scrollLeft, moved: false };
      track.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!arrasto) return;
      var dx = e.clientX - arrasto.x;
      if (Math.abs(dx) > 4) arrasto.moved = true;
      track.scrollLeft = arrasto.left - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!arrasto) return;
      ignorarClique = arrasto.moved;
      arrasto = null;
      track.classList.remove("is-dragging");
      var i = Math.round(track.scrollLeft / track.clientWidth);
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    });
    // Depois de arrastar, o soltar não conta como clique no banner (que mostraria o aviso de tela).
    track.addEventListener("click", function (e) {
      if (!ignorarClique) return;
      e.preventDefault();
      e.stopPropagation();
      ignorarClique = false;
    }, true);
  });
})();

// Encerrar conta (Figma 3142:61697): botão sempre ativo, valida a senha ao enviar; depois de 1,2 s de loading
// a conta fica inativa e a implementação atual volta ao Login com um Alert informativo (tela de resultado ainda não desenhada).
(function () {
  var form = document.getElementById("encerrar-form");
  if (!form) return;
  var input = document.getElementById("enc-senha");
  var submit = document.getElementById("enc-submit");
  var notice = document.getElementById("login-conta-encerrada");
  function setError(msg) {
    var field = input.closest(".po-field");
    var old = field.querySelector(".po-msg");
    if (old) old.remove();
    input.classList.toggle("po-input-error", Boolean(msg));
    if (msg) {
      var p = document.createElement("p");
      p.className = "po-msg";
      p.id = "enc-senha-msg";
      p.innerHTML = '<span class="po-icon s16 fill po-msg-icon" aria-hidden="true">error</span><span></span>';
      p.lastChild.textContent = msg;
      field.appendChild(p);
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", p.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  }
  function reset() {
    form.reset();
    input.type = "password";
    var t = form.querySelector("[data-pass-toggle]");
    t.setAttribute("aria-pressed", "false"); t.setAttribute("aria-label", "Mostrar senha");
    t.querySelector(".po-icon").textContent = "visibility";
    setError(null);
    submit.removeAttribute("aria-busy"); submit.removeAttribute("aria-disabled");
    var sp = submit.querySelector(".po-btn-spinner"); if (sp) sp.remove();
  }
  input.addEventListener("input", function () { if (input.getAttribute("aria-invalid")) setError(null); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submit.getAttribute("aria-busy")) return;
    if (!input.value) { setError("Digite sua senha para confirmar o encerramento."); input.focus(); return; }
    submit.setAttribute("aria-busy", "true");
    submit.setAttribute("aria-disabled", "true");
    submit.insertAdjacentHTML("beforeend", '<span class="po-btn-spinner" aria-hidden="true"></span><span class="po-sr-only" role="status">Encerrando conta</span>');
    setTimeout(function () {
      reset();
      notice.hidden = false;
      var go = document.querySelector('.proto-nav [data-go="login"]');
      go.click();
    }, 1200);
  });
  form.querySelectorAll('[data-go="seguranca"]').forEach(function (b) { b.addEventListener("click", reset); });
  // O aviso no Login some quando a pessoa começa a digitar ou troca de tela.
  var loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("input", function () { notice.hidden = true; });
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]");
    if (t && t.dataset.go !== "login") notice.hidden = true;
    if (t && t.closest("#encerrar-conta .po-header")) reset();
  });
})();

// Modo escuro (theme.css): o item do menu Meu perfil alterna <html data-theme="dark">; a escolha fica no navegador do visitante.
(function () {
  var KEY = "proto-theme";
  function read() { try { return window.localStorage.getItem(KEY); } catch (err) { return null; } }
  function write(v) { try { window.localStorage.setItem(KEY, v); } catch (err) { /* modo privado: a troca vale só nesta página */ } }
  function setTheme(dark, save) {
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]")).forEach(function (t) {
      t.setAttribute("aria-checked", String(dark));
    });
    if (save) write(dark ? "dark" : "light");
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    setTheme(document.documentElement.getAttribute("data-theme") !== "dark", true);
  });
  setTheme(read() === "dark", false);
})();
