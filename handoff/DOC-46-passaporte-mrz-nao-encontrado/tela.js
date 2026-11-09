// DOC-46 · Passaporte · código MRZ não encontrado.
// Não há captura do verso: a câmera lê só o MRZ, por visão computacional, e o resultado é validado via API
// dos certificados de atributos. Quando o código é lido, a moldura e a faixa do topo ficam verdes
// com a mensagem de sucesso, e a pessoa segue automaticamente para a validação facial (BIO-01).
// CameraCapture do DS (window.PalmeirasOnboarding.CameraCapture). O vídeo é simulado com fotos (img/).
// <div id="est-root" data-props='{"state":"aligned","done":true}'> abre a tela já com a leitura concluída.
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen(props) {
    var st = React.useState(props.state || "aligning"), state = st[0], setState = st[1];
    var dn = React.useState(!!props.done), done = dn[0], setDone = dn[1];
    var ar = React.useState(false), armed = ar[0], setArmed = ar[1];  // a leitura automática só corre depois do primeiro toque no visor
    var timer = React.useRef(null);
    React.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);

    var blocked = state === "denied" || state === "unavailable";
    var capturing = state === "capturing";
    var live = !blocked && !capturing;
    var photo = state === "aligned" || done ? "img/verso-enquadrado.jpg" : "img/verso-enquadrando.jpg";

    // MRZ lido: fica no estado enquadrado, com a faixa verde e a notificação. Sem nova captura.
    function onRead() {
      setDone(true); setState("aligned");
    }
    // Sem acesso à câmera ou sem câmera: "Voltar para a seleção" (DOC-02), no painel de ações do próprio CameraCapture.
    var root = React.useRef(null), panel = React.useState(null);
    React.useLayoutEffect(function () {
      var el = blocked && root.current ? root.current.querySelector(".po-camera-panel") : null;
      if (el !== panel[0]) panel[1](el);
    });
    var backToSelection = blocked && panel[0] ? ReactDOM.createPortal(
      h(P.Button, { variant: state === "denied" ? "secondary" : "primary", size: "sm", iconStart: "arrow_back", onClick: function () {} }, "Voltar para a seleção"),
      panel[0]) : null;


    return h("div", { className: "est-device est-device-camera est-code-strip" + (done ? " is-done" : ""), ref: root, style: { position: "relative" } },
      backToSelection,
      h(window.Est.StatusBar, { tone: "dark" }),
      h(P.CameraCapture, {
        state: state,
        frame: "card",
        instruction: "Não encontramos o código. Enquadre a faixa de letras e números.",
        successMessage: done ? "Código capturado com sucesso!" : "Enquadramento perfeito!",
        autoCapture: armed && !done,
        onBack: function () {},
        onCapture: onRead,
        onOpenSettings: function () {}
      }, live ? h("img", {
        src: BASE + photo, alt: "", className: "est-camera-feed",
        onClick: function () {
          if (done) return;
          setArmed(true);
          setState(state === "aligned" ? "aligning" : "aligned");
        }
      }) : null));
  }

  window.EstDOC46 = { Screen: Screen };
  window.Est.mount(Screen);
})();
