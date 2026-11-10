// Peças comuns das telas de acesso: login, carregamento e recuperação de senha (ENT-00 a ENT-02, REC-01 a REC-07).
// Depende de estrangeiro.js (window.Est: barra de status e montagem) e do bundle do DS.
// window.Acesso.Logo: escudo do Palmeiras com a estrela (asset do DS, grupo Logos).
// window.Acesso.go / url: navegação entre telas do hub. window.Acesso.isEmbedded(): a tela roda dentro de um iframe do hub (ou do gerador).
// window.Acesso.Strength / Rules: medidor de força e lista de requisitos da nova senha (peças fora do DS, propostas).
(function () {
  "use strict";
  var h = React.createElement;
  var ROOT = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");
  var ASSETS = ROOT + "design-system/assets/";
  var HANDOFF = ROOT + "handoff/";

  // Dentro do hub a tela vive num iframe (miniatura e painel): navegação automática (timer) não pode acontecer lá.
  // Também vale para o gerador (build-tools/acesso/gen-*.html), que renderiza todas as variantes numa página só.
  function isEmbedded() {
    try { if (window.top !== window.self) return true; } catch (e) { return true; }
    return Boolean(document.querySelector("section[data-slug]"));
  }

  function url(path) { return HANDOFF + path; }
  function go(path) { location.assign(url(path)); }
  function screenPath(folder, slug) { return folder + "/telas/" + slug + "/screen.html"; }
  function query(name) {
    try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; }
  }
  function store(key, value) { try { sessionStorage.setItem("acesso." + key, value); } catch (e) {} }
  function load(key, fallback) { try { return sessionStorage.getItem("acesso." + key) || fallback; } catch (e) { return fallback; } }

  // size: sm 63×75 (telas com formulário) · lg 84×101 (carregando) · xl 128×153 (splash).
  function Logo(props) {
    var size = (props && props.size) || "sm";
    return h("div", { className: "est-logo est-logo-" + size, role: "img", "aria-label": "Palmeiras" },
      h("img", { className: "est-logo-bg", src: ASSETS + "logo-palmeiras-bg-ellipse.svg", alt: "" }),
      h("img", { className: "est-logo-mark", src: ASSETS + "logo-palmeiras.png", alt: "" }));
  }

  function cpfMask(raw) {
    var d = String(raw).replace(/\D/g, "").slice(0, 11);
    return d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  // O campo de acesso aceita CPF ou e-mail: só dígitos e pontuação de CPF = CPF; qualquer outra coisa = e-mail.
  function looksLikeCpf(v) { return /^[\d.\-\s]*$/.test(v); }
  function identifierChange(raw) { return looksLikeCpf(raw) ? cpfMask(raw) : raw; }

  var RULES = [
    { id: "len", label: "Mínimo de 8 caracteres", test: function (v) { return v.length >= 8; } },
    { id: "num", label: "1 ou mais números", test: function (v) { return /\d/.test(v); } },
    { id: "up", label: "1 letra maiúscula", test: function (v) { return /[A-ZÀ-Ý]/.test(v); } },
    { id: "esp", label: "1 ou mais caracteres especiais", test: function (v) { return /[^A-Za-z0-9À-ÿ\s]/.test(v); } }
  ];
  function score(v) { return RULES.filter(function (r) { return r.test(v || ""); }).length; }
  var LEVELS = ["Fraca", "Fraca", "Média", "Boa", "Forte"];
  var TONES = ["weak", "weak", "mid", "good", "strong"];

  function Strength(props) {
    var s = score(props.value), filled = Math.max(s, props.value ? 1 : 0);
    return h("div", { className: "est-strength" },
      h("div", { className: "est-strength-head" },
        h("span", { className: "est-strength-label" }, "Força da senha:"),
        h("span", { className: "est-strength-level est-tone-" + TONES[filled], "aria-live": "polite" }, props.value ? LEVELS[filled] : "")),
      h("div", { className: "est-strength-bars", "aria-hidden": "true" },
        [1, 2, 3, 4].map(function (i) { return h("span", { key: i, className: "est-strength-bar" + (i <= filled && props.value ? " est-on est-tone-" + TONES[filled] : "") }); })));
  }

  function Rules(props) {
    return h("div", { className: "est-rules" },
      h("p", { className: "est-rules-title", id: "est-rules-title" }, "Sua senha deve conter"),
      h("ul", { className: "est-rules-list", "aria-labelledby": "est-rules-title" },
        RULES.map(function (r) {
          var ok = r.test(props.value || "");
          return h("li", { key: r.id, className: "est-rule" + (ok ? " est-rule-ok" : "") },
            h("span", { className: "po-icon est-rule-icon", "aria-hidden": "true" }, ok ? "check_circle" : "radio_button_unchecked"),
            h("span", null, r.label),
            h("span", { className: "est-sr" }, ok ? " (cumprido)" : " (pendente)"));
        })));
  }

  // Tela do código de 6 dígitos da recuperação de senha, para SMS (REC-02) e e-mail (REC-04).
  // props.canal: "sms" | "email". props.estado: "vazio" | "validado" | "incorreto" | "expirado" | "bloqueado". props.valor e props.usadas: ponto de partida (variantes).
  // Regras do protótipo: 847291 acerta; 000000 simula código expirado; qualquer outro erra. No 3º erro seguido a tela bloqueia.
  var CORRETO = "847291", EXPIRADO = "000000", LIMITE = 3;
  var TEXTOS = {
    sms: { header: "Validação de celular", sub: "Enviamos um código de verificação via SMS para o seu celular. Pode levar alguns segundos.", demo: "(11) 9****-5432", edit: "celular-vazio", help: true },
    email: { header: "Validação de contato", sub: "Enviamos um e-mail com o código de verificação. Pode levar alguns segundos para chegar.", demo: "silv***@email.com", edit: "email-vazio", help: false }
  };
  var ALERTAS = {
    incorreto: ["Código incorreto", "O código que você inseriu está incorreto, verifique e tente novamente."],
    expirado: ["O código expirou.", "Solicite um novo código e tente fazer a validação novamente."],
    bloqueado: ["Excesso de tentativas.", "Você excedeu mais de 3 de tentativas. Tente novamente em 30 minutos."]
  };

  function CodeScreen(props) {
    var P = window.PalmeirasOnboarding, T = TEXTOS[props.canal];
    var s1 = React.useState(props.valor || ""), valor = s1[0], setValor = s1[1];
    var s2 = React.useState(props.estado || "vazio"), estado = s2[0], setEstado = s2[1];
    var s3 = React.useState(props.usadas || 0), usadas = s3[0], setUsadas = s3[1];
    var contato = load("contato", T.demo);
    var erro = estado === "incorreto" || estado === "expirado" || estado === "bloqueado";

    function validar(v) {
      if (v === CORRETO) {
        setEstado("validado");
        setTimeout(function () { go(screenPath("REC-06-nova-senha", "vazia")); }, 700);
      } else if (v === EXPIRADO) {
        setEstado("expirado");
      } else {
        var n = usadas + 1;
        setUsadas(n);
        setEstado(n >= LIMITE ? "bloqueado" : "incorreto");
      }
    }
    function mudou(v) {
      if (estado === "bloqueado" || estado === "validado") return;
      setValor(v);
      if (erro) setEstado("vazio");   // digitar de novo limpa o erro; as tentativas continuam contadas
    }
    function reenviar() { setValor(""); setEstado("vazio"); }

    var aviso = ALERTAS[estado];
    var voltarLogin = estado === "bloqueado";
    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar", href: url(voltarLogin ? screenPath("ENT-01-login", "padrao") : screenPath("REC-01-recuperar-senha", props.canal === "sms" ? "celular-vazio" : "email-vazio")) },
        title: T.header, language: false, help: T.help ? { label: "Ajuda" } : false }),
      h("main", { className: "est-body" },
        h(P.PageHeading, { title: "Insira o seu código", subtitle: T.sub, tone: "neutral", focusOnMount: false, documentTitle: false },
          h(P.ContactRow, { channel: props.canal, value: contato, onEdit: function () { go(screenPath("REC-01-recuperar-senha", props.canal === "sms" ? "celular-vazio" : "email-vazio")); } })),
        h(P.OTPInput, { value: valor, onChange: mudou, onComplete: validar, disabled: estado === "bloqueado",
          state: estado === "validado" ? "success" : erro ? "error" : "default",
          error: erro ? "Tentativas restantes: " + usadas + "/" + LIMITE : undefined }),
        aviso ? h(P.Alert, { tone: "danger", title: aviso[0] }, aviso[1]) : null,
        h(P.ResendPrompt, { cooldown: 0, onResend: reenviar, disabled: estado === "bloqueado" }),
        voltarLogin ? h("div", { className: "est-actions" }, h(P.Button, { variant: "secondary", onClick: function () { go(screenPath("ENT-01-login", "padrao")); } }, "Voltar ao login")) : null));
  }

  window.Acesso = window.Acesso || {};
  Object.assign(window.Acesso, {
    CodeScreen: CodeScreen,
    ASSETS: ASSETS, isEmbedded: isEmbedded, url: url, go: go, screenPath: screenPath, query: query, store: store, load: load,
    Logo: Logo, cpfMask: cpfMask, looksLikeCpf: looksLikeCpf, identifierChange: identifierChange,
    RULES: RULES, score: score, Strength: Strength, Rules: Rules
  });
})();
