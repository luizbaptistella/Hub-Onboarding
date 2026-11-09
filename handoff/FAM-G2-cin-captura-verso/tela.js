// FAM-G2 · CIN · captura do verso do familiar.
// CameraCapture do DS (window.PalmeirasOnboarding.CameraCapture), com moldura de cartão (ID-1: RG e CNH).
// Mesma estrutura da captura da frente (FAM-G2-captura-do-documento), com a instrução do verso.
// O vídeo é simulado com as fotos de DOC-04 (placeholder, o documento é um CRNM de exemplo).
// <div id="est-root" data-props='{"state":"aligned"}'> abre a tela no estado pedido.
// Demonstração: tocar no visor alterna enquadrando ↔ enquadrado. Enquadrado dispara sozinho em ~1 s (captura automática)
// ou pelo "Tirar foto"; mostra "Tirando a foto…" e volta a enquadrando (no app, segue para a confirmação do verso).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var IMG = "../DOC-04-crnm-camera-frente/img/";

  function Screen(props) {
    var st = React.useState(props.state || "aligning"), state = st[0], setState = st[1];
    var photo = state === "aligned" || state === "capturing" ? IMG + "camera-enquadrado.jpg" : IMG + "camera-enquadrando.jpg";
    var live = state === "aligning" || state === "aligned" || state === "capturing";
    var armed = React.useState(false);  // a variante abre parada; a captura automática só corre depois do primeiro toque no visor
    var timer = React.useRef(null);
    React.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);
    function capture() {
      setState("capturing");
      clearTimeout(timer.current);
      timer.current = setTimeout(function () { setState("aligning"); }, 1500);
    }
    return h("div", { className: "est-device est-device-camera" },
      h(window.Est.StatusBar, { tone: "dark" }),
      h(P.CameraCapture, {
        state: state,
        frame: "card",
        instruction: "Enquadre o verso da CIN de Ana Paula na moldura",
        autoCapture: armed[0],
        onBack: function () {},
        onCapture: capture,
        onOpenSettings: function () {}
      }, live ? h("img", {
        src: photo, alt: "", className: "est-camera-feed",
        onClick: function () { if (state === "capturing") return; armed[1](true); setState(state === "aligned" ? "aligning" : "aligned"); }
      }) : null));
  }

  window.EstFAMG2CINVerso = { Screen: Screen };
  window.Est.mount(Screen);
})();
