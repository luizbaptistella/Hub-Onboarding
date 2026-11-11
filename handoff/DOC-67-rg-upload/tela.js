// DOC-67 · RG · upload da frente e do verso.
// Uma tela com dois UploadArea do DS empilhados: frente em cima, verso embaixo. Só PDF ou imagem, até 5 MB.
// Quando a pessoa escolhe uma imagem, a miniatura aparece no campo. O verso é lido por OCR da imagem do verso.
// Se o OCR não encontra o verso, o erro aparece no campo do verso (não é tela nova).
// Enviar leva à tela de status (DOC-10), que depois segue para a biometria facial.
// <div id="est-root" data-props='{"front":"rg-frente.jpg","frontThumb":"img/exemplo-frente.jpg","back":"rg-verso.jpg","backThumb":"img/exemplo-verso.jpg","erro":"mrz"}'>
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");
  var ERR_verso = "Não conseguimos ler o verso do documento. Envie uma imagem nítida do verso, com o documento inteiro.";
  // Erros de arquivo no campo do verso (inline, sem trocar de tela). Formato e tamanho seguem os textos padrão do DS.
  var ERRS = {
    mrz: ERR_verso,
    formato: "O arquivo deve ser PDF, JPG ou PNG.",
    tamanho: "O arquivo deve ter menos de 5 MB.",
    senha: "Este PDF tem senha. Envie uma versão sem senha.",
    corrompido: "Não conseguimos abrir este arquivo. Envie o PDF de novo.",
    envio: "Não foi possível enviar o arquivo. Tente de novo."
  };
  var IMG = /\.(png|jpe?g|heic)$/i;

  // Erro de demonstração: props.erro = "mrz" | "formato" | "tamanho" | "senha" | "corrompido" | "envio" (mrzError é o nome antigo de mrz).
  function errorKey(props) { return props.erro || (props.mrzError ? "mrz" : ""); }

  function fileOf(name, size, url, thumb) {
    return name ? { name: name, size: size, url: url || (thumb ? BASE + thumb : null) } : null;
  }
  // Miniatura só para imagem; PDF continua com o ícone de documento.
  function thumbOf(f) { return f && f.url && IMG.test(f.name) ? f.url : ""; }

  function Screen(props) {
    var fr = React.useState(fileOf(props.front, 1258291, null, props.frontThumb)), front = fr[0], setFront = fr[1];
    var bk = React.useState(fileOf(props.back, 1363148, null, props.backThumb)), back = bk[0], setBack = bk[1];
    var er = React.useState(errorKey(props) ? ERRS[errorKey(props)] : ""), err = er[0], setErr = er[1];
    var root = React.useRef(null);

    // Coloca a miniatura no lugar do ícone do UploadArea (o DS não tem miniatura; o ícone é escondido, não removido).
    React.useLayoutEffect(function () {
      var el = root.current; if (!el) return;
      el.querySelectorAll("[data-thumb]").forEach(function (w) {
        var url = w.getAttribute("data-thumb");
        var ic = w.querySelector(".po-upload-file-icon");
        var old = w.querySelector(".est-thumb");
        if (!url) { if (old) old.remove(); if (ic) ic.style.display = ""; return; }
        if (old && old.getAttribute("src") === url) return;
        if (old) old.remove();
        if (!ic) return;
        var img = document.createElement("img");
        img.className = "est-thumb"; img.alt = ""; img.src = url;
        ic.style.display = "none"; ic.parentNode.insertBefore(img, ic);
      });
    });

    function send() {
      if (!front || !back) return;
      if (errorKey(props)) { setErr(ERRS[errorKey(props)]); return; }
      location.assign(BASE + "../DOC-10-status-documento-recebido/telas/padrao/screen.html");
    }

    return h("div", { className: "est-device", ref: root },
      h(window.Est.StatusBar),
      h(P.AppHeader, { back: { label: "Voltar" }, title: "Captura de documentos", progress: { current: 2, total: 4 }, language: false, help: { label: "Ajuda" } }),
      h("main", { className: "est-body est-body-fill" },
        h(P.PageHeading, { tone: "neutral", focusOnMount: false, documentTitle: false, title: "Envie a frente e o verso do RG",
          subtitle: "O verso é conferido automaticamente. Use o PDF oficial, com todas as informações legíveis." }),
        h("div", { className: "est-uploads" },
          h("div", { "data-thumb": thumbOf(front) },
            h(P.UploadArea, { id: "rg-frente", label: "Frente do RG", file: front, status: "idle",
              hint: "PDF ou imagem, até 5 MB.",
              onFile: function (f) { setFront({ name: f.name, size: f.size, url: URL.createObjectURL(f) }); },
              onRemove: function () { setFront(null); } })),
          h("div", { "data-thumb": thumbOf(back) },
            h(P.UploadArea, { id: "rg-verso", label: "Verso do RG", file: back, status: err ? "error" : "idle", error: err || undefined,
              hint: "PDF ou imagem, até 5 MB. O verso é lido desta imagem.",
              onFile: function (f) { setBack({ name: f.name, size: f.size, url: URL.createObjectURL(f) }); setErr(""); },
              onRemove: function () { setBack(null); setErr(""); } }))),
        h("div", { className: "est-actions" },
          h(P.Button, { variant: "primary", iconEnd: "arrow_forward", disabled: !(front && back), onClick: send }, "Enviar documento"))));
  }

  window.EstDOC09 = { Screen: Screen };
  window.Est.mount(Screen);
})();
