// DOC-60 · CNH · câmera do verso.
// CameraCapture do DS (window.PalmeirasOnboarding.CameraCapture). O vídeo da câmera é simulado com uma foto (img/).
// <div id="est-root" data-props='{"state":"aligned"}'> abre a tela no estado pedido.
// Demonstração: tocar no visor alterna enquadrando ↔ enquadrado. Enquadrado dispara sozinho em ~1 s (captura automática, decidida no módulo)
// ou pelo "Tirar foto"; mostra "Tirando a foto…" e volta a enquadrando (no app, segue para a confirmação da frente).
(function () {
  "use strict";
  var P = window.PalmeirasOnboarding, h = React.createElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/[^/]*$/, "");

  function Screen(props) {
    var st = React.useState(props.state || "aligning"), state = st[0], setState = st[1];
    var photo = state === "aligned" || state === "capturing" ? "img/camera-enquadrado.jpg" : "img/camera-enquadrando.jpg";
    var live = state === "aligning" || state === "aligned" || state === "capturing";
    var armed = React.useState(false);  // a variante abre parada; a captura automática só corre depois do primeiro toque no visor
    var timer = React.useRef(null);
    React.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);
    function capture() {
      setState("capturing");
      clearTimeout(timer.current);
      timer.current = setTimeout(function () { setState("aligning"); }, 1500);
    }
    // Sem acesso à câmera ou sem câmera: "Voltar para a seleção" (DOC-02), no painel de ações do próprio CameraCapture,
    // abaixo do que o componente já mostra. Na seleção a pessoa escolhe "Fazer upload do documento".
    var blocked = state === "denied" || state === "unavailable";
    var root = React.useRef(null), panel = React.useState(null);
    React.useLayoutEffect(function () {
      var el = blocked && root.current ? root.current.querySelector(".po-camera-panel") : null;
      if (el !== panel[0]) panel[1](el);
    });
    var backToSelection = blocked && panel[0] ? ReactDOM.createPortal(
      h(P.Button, { variant: state === "denied" ? "secondary" : "primary", size: "sm", iconStart: "arrow_back", onClick: function () {} }, "Voltar para a seleção"),
      panel[0]) : null;
    return h("div", { className: "est-device est-device-camera", ref: root },
      backToSelection,
      h(window.Est.StatusBar, { tone: "dark" }),
      h(P.CameraCapture, {
        state: state,
        frame: "card",
        instruction: "Enquadre o verso do documento no centro da moldura",
        autoCapture: armed[0],
        onBack: function () {},
        onCapture: capture,
        onOpenSettings: function () {}
      }, live ? h("img", {
        src: BASE + photo, alt: "", className: "est-camera-feed",
        onClick: function () { if (state === "capturing") return; armed[1](true); setState(state === "aligned" ? "aligning" : "aligned"); }
      }) : null));
  }

  window.EstDOC37 = { Screen: Screen };
  window.Est.mount(Screen);
})();
