// FAM-G2 · tutorial da frente da CIN do familiar.
// Estrutura de DOC-03 (CRNM · tutorial da frente), com os passos da CIN. O botão do passo é o da FAM-G2 validada
// (lv-fill, de BIO-01): desabilitado, com barra primária enchendo o fundo por 3 s; em 100%, libera.
// Sem imagens: o DS mostra o espaço da imagem vazio (placeholder).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect;

  var LOADING_MS = 3000;
  var LABEL = "Como fotografar a frente da CIN de Ana Paula";
  var TITLE = "Foto da CIN";

  var STEPS = [
    { title: "Vamos capturar a frente da CIN.",
      description: "É importante que a CIN de Ana Paula esteja dentro da validade e com todas as informações legíveis." },
    { title: "Coloque a CIN numa superfície plana.",
      description: "Use uma superfície clara e limpa, num lugar bem iluminado." },
    { title: "Enquadre a frente da CIN na moldura.",
      description: "Posicione a CIN dentro da moldura e confira se a imagem está nítida e todas as informações legíveis.",
      frame: true }
  ];

  function Screen(props) {
    var total = STEPS.length;
    var stepState = useState(props.step || 1);
    var step = Math.min(Math.max(stepState[0], 1), total);
    var setStep = stepState[1];
    var busyState = useState(true);
    var busy = busyState[0], setBusy = busyState[1];
    var fillState = useState(false);
    var filling = fillState[0], setFilling = fillState[1];
    var s = STEPS[step - 1];
    var last = step === total;

    // Cada passo começa com o botão desabilitado e a barra vazia. A barra enche em 3 s; ao chegar a 100%, o botão libera.
    useEffect(function () {
      setBusy(true);
      setFilling(false);
      var raf = requestAnimationFrame(function () {
        requestAnimationFrame(function () { setFilling(true); });
      });
      var t = setTimeout(function () { setBusy(false); setFilling(false); }, LOADING_MS);
      return function () { cancelAnimationFrame(raf); clearTimeout(t); };
    }, [step]);

    function back() {
      if (step > 1) setStep(step - 1);
      else if (props.onExit) props.onExit();
    }
    function next() {
      if (step < total) setStep(step + 1);
      else if (props.onFinish) props.onFinish();
    }
    function skip() { if (props.onSkip) props.onSkip(); }

    return h("div", { className: "est-device" },
      h(window.Est.StatusBar),
      h("div", { className: "po-header po-tutorial-header" },
        h("div", { className: "po-header-icon" },
          h(P.IconButton, { className: "po-header-action", variant: "subtle", size: "sm", iconSize: "md", icon: "chevron_left",
            label: step > 1 ? "Voltar para a etapa " + (step - 1) : "Voltar", onClick: back })),
        h("span", { className: "po-header-text" }, TITLE),
        h(P.Button, { variant: "tertiary", size: "sm", fullWidth: false, className: "po-tutorial-skip", onClick: skip }, "Pular")),
      h("section", { className: "po-tutorial-carousel", "aria-roledescription": "carrossel", "aria-label": LABEL },
        h("div", { role: "group", "aria-roledescription": "slide", "aria-label": "Etapa " + step + " de " + total, className: "po-tutorial-slide" },
          h("section", { className: "po-tutorial" },
            h(P.Image, { alt: "", height: "var(--size-media-hero)", loading: "eager" },
              s.frame ? h("div", { className: "po-tutorial-frame po-tutorial-frame-fit" }, h(P.ScanFrame, { ratio: 160 / 402 })) : null,
              h(P.CarouselDots, { className: "po-tutorial-dots", count: total, active: step - 1 })),
            h("div", { className: "po-tutorial-body" },
              h(P.StepNumber, { className: "po-tutorial-num", value: step, total: total, noun: "Etapa", decorative: true }),
              h("div", { className: "po-tutorial-text" },
                h("h1", { className: "po-tutorial-title" }, s.title),
                s.description ? h("p", { className: "po-tutorial-desc" }, s.description) : null),
              h(P.Button, { size: "sm", fullWidth: true, className: "lv-fill" + (filling ? " is-filling" : ""),
                iconStart: last ? "photo_camera" : undefined, iconEnd: last ? undefined : "arrow_forward",
                disabled: busy, onClick: next },
                last ? "Abrir câmera" : "Continuar")))),
        h("div", { className: "po-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true" },
          "Etapa " + step + " de " + total + ", " + s.title)));
  }

  window.EstFAMG2CIN = { Screen: Screen };
  window.Est.mount(Screen);
})();
