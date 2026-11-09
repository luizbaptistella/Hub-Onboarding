// Peças comuns das telas do fluxo de documento de estrangeiro (DOC-02 em diante).
// window.Est.StatusBar: barra de status do celular (mock do sistema, não implementar).
// window.Est.mount(Screen): monta a tela em #est-root com as props de data-props (JSON); cada screen.html já traz a marcação pronta.
(function () {
  "use strict";
  var h = React.createElement;

  // tone "dark": sobre a câmera (fundo camera-bg, texto camera-fg), como pede o CameraCapture do DS.
  function StatusBar(props) {
    var dark = props && props.tone === "dark";
    var light = props && props.tone === "light";  // sobre fundo de marca (tela de status): texto branco
    var svg = function (w, children) { return h("svg", { width: w, height: 12, viewBox: "0 0 " + w + " 12", "aria-hidden": "true", focusable: "false" }, children); };
    return h("div", { className: "est-statusbar" + (dark ? " est-statusbar-dark" : "") + (light ? " est-statusbar-light" : ""), "aria-hidden": "true" },
      h("span", { className: "est-statusbar-time" }, "9:41"),
      h("span", { className: "est-statusbar-icons" },
        svg(18, [0, 1, 2, 3].map(function (i) { return h("rect", { key: i, x: i * 5, y: 9 - i * 3, width: 3, height: 3 + i * 3, rx: 1 }); })),
        svg(16, [
          h("path", { key: "a", d: "M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.5 1.5.5 3.4l1.2 1.3A8.6 8.6 0 0 1 8 2.2z" }),
          h("path", { key: "b", d: "M8 5.7c1.5 0 2.8.5 3.9 1.5l1.2-1.3A7.4 7.4 0 0 0 8 3.9c-1.9 0-3.7.7-5.1 2l1.2 1.3A5.5 5.5 0 0 1 8 5.7z" }),
          h("path", { key: "c", d: "M8 9.2c.6 0 1.1.2 1.5.6L8 11.5 6.5 9.8c.4-.4.9-.6 1.5-.6z" })
        ]),
        svg(27, [
          h("rect", { key: "o", x: 0.5, y: 0.5, width: 22, height: 11, rx: 3, fill: "none", stroke: "currentColor", opacity: 0.4 }),
          h("rect", { key: "i", x: 2, y: 2, width: 19, height: 8, rx: 1.6 }),
          h("path", { key: "t", d: "M24.5 4v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z", opacity: 0.4 })
        ])));
  }

  function mount(Screen) {
    var el = document.getElementById("est-root");
    if (!el || !el.hasAttribute("data-props")) return;
    var props = {};
    try { props = JSON.parse(el.getAttribute("data-props") || "{}"); } catch (e) {}
    ReactDOM.createRoot(el).render(h(Screen, props));
  }


  window.Est = { StatusBar: StatusBar, mount: mount };
})();
