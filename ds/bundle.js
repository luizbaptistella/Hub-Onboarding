/* @ds-bundle: {"format":4,"namespace":"PalmeirasOnboarding","components":[{"name":"Icon"},{"name":"Button"},{"name":"IconButton"},{"name":"TextLink"},{"name":"SocialButton"},{"name":"TextField"},{"name":"FormMessage"},{"name":"Checkbox"},{"name":"Radio"},{"name":"RadioGroup"},{"name":"CheckboxGroup"},{"name":"Tabs"},{"name":"SegmentedControl"},{"name":"AppHeader"},{"name":"ProgressBar"},{"name":"LanguageSelector"},{"name":"ProfileMenu"},{"name":"PageHeading"},{"name":"DividerText"},{"name":"LegalFooter"},{"name":"OTPInput"},{"name":"Alert"},{"name":"StatusCard"},{"name":"ContactRow"},{"name":"ResendPrompt"},{"name":"Toast"},{"name":"ToastRegion"},{"name":"ErrorSummary"},{"name":"ResultHero"},{"name":"Select"},{"name":"StatusScreen"},{"name":"JourneyStepper"},{"name":"RedirectCountdown"},{"name":"Badge"},{"name":"DocumentOption"},{"name":"ActionRow"},{"name":"List"},{"name":"ListItem"},{"name":"OptionCard"},{"name":"Image"},{"name":"ScanFrame"},{"name":"CarouselDots"},{"name":"StepNumber"},{"name":"TutorialSlide"},{"name":"Tutorial"},{"name":"UploadArea"},{"name":"CameraCapture"},{"name":"FaceCapture"},{"name":"OrientationHint"},{"name":"LoadingState"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(" ");
  }

  function omit(props, keys) {
    var out = {};
    for (var k in props) if (keys.indexOf(k) === -1) out[k] = props[k];
    return out;
  }

  // ── Ícones ─────────────────────────────────────────────
  // Material Symbols Outlined (Google Fonts). O consumidor carrega a fonte; `name` é o nome do símbolo.
  // size nomeado (xs 16 · sm 20 · md 24 · lg 32 · xl 40, tokens size-icon-*); número é depreciado e vai para o passo mais próximo.
  // tone pinta com um token icon-*; sem tone (inherit), o ícone usa o currentColor do pai.
  var ICON_SIZES = { xs: 16, sm: 20, md: 24, lg: 32, xl: 40 };
  var ICON_SIZE_TOKEN = { xs: "--size-icon-xs", sm: "--size-icon-sm", md: "--size-icon", lg: "--size-icon-lg", xl: "--size-icon-xl" };
  var ICON_TONES = { "default": 1, subtle: 1, brand: 1, success: 1, danger: 1, warning: 1, info: 1 };

  function iconSizeName(size) {
    if (ICON_SIZES[size]) return size;
    var n = Number(size);
    if (!n) return "md";
    var best = "md", diff = Infinity;
    for (var k in ICON_SIZES) {
      var d = Math.abs(ICON_SIZES[k] - n);
      // Empate (ex.: 18) sobe para o passo maior.
      if (d < diff || (d === diff && ICON_SIZES[k] > ICON_SIZES[best])) { best = k; diff = d; }
    }
    return best;
  }

  function Icon(props) {
    var size = iconSizeName(props.size);
    var px = ICON_SIZES[size];
    var weight = props.weight === "strong" ? 600 : typeof props.weight === "number" ? props.weight : 400;
    var tone = ICON_TONES[props.tone] ? props.tone : null;
    var box = "var(" + ICON_SIZE_TOKEN[size] + ")";
    return h("span", {
      className: cx("po-icon", tone ? "po-icon-" + tone : null, props.className),
      "aria-hidden": props.label ? undefined : "true",
      "aria-label": props.label,
      role: props.label ? "img" : undefined,
      style: Object.assign({ fontSize: box, width: box, height: box,
        fontVariationSettings: "'FILL' " + (props.fill ? 1 : 0) + ", 'wght' " + weight + ", 'GRAD' 0, 'opsz' " + Math.min(48, Math.max(20, px)) }, props.style)
    }, props.name);
  }

  // ── Actions ────────────────────────────────────────────

  // Base comum de Button e IconButton: <button> ou <a href>, loading e desabilitado com aria-disabled
  // (continuam focáveis; o clique, o Enter e o Espaço são ignorados, inclusive o envio do formulário).
  var BUTTON_VARIANTS = { primary: 1, secondary: 1, tertiary: 1, accent: 1, danger: 1, subtle: 1 };
  var BUTTON_OWN_PROPS = ["variant", "size", "iconStart", "iconEnd", "iconRight", "fullWidth", "loading", "loadingLabel", "disabled", "onClick", "className", "children", "icon", "label", "iconSize"];

  function ButtonBase(props, className, content) {
    var inert = Boolean(props.disabled || props.loading);
    var rest = omit(props, BUTTON_OWN_PROPS);
    var onClick = function (event) {
      if (inert) { event.preventDefault(); event.stopPropagation(); return; }
      if (props.onClick) props.onClick(event);
    };
    var isLink = props.href !== undefined;
    var el = h(isLink ? "a" : "button", Object.assign(isLink ? {} : { type: "button" }, rest, {
      className: className,
      onClick: onClick,
      "aria-disabled": inert ? "true" : undefined,
      "aria-busy": props.loading ? "true" : undefined
    }),
      h("span", { className: "po-btn-content" }, content),
      props.loading ? h("span", { className: "po-btn-spinner", "aria-hidden": "true" }) : null);
    // A região viva fica fora do botão para não entrar no nome acessível dele.
    return h(React.Fragment, null, el,
      h("span", { className: "po-sr-only", role: "status", "aria-live": "polite" }, props.loading ? (props.loadingLabel || "Carregando") : ""));
  }

  // variant: primary | secondary | tertiary | accent | danger · size: md (48) | sm (40) · iconStart/iconEnd: símbolo do Material.
  function Button(props) {
    var variant = BUTTON_VARIANTS[props.variant] && props.variant !== "subtle" ? props.variant : "primary";
    var sm = props.size === "sm";
    var iconSize = sm ? 18 : 20;
    var iconEnd = props.iconEnd || props.iconRight;
    return ButtonBase(props,
      cx("po-btn", "po-btn-" + variant, sm ? "po-btn-sm" : null, props.fullWidth === false ? null : "po-btn-block", props.className),
      [props.iconStart ? h(Icon, { key: "s", name: props.iconStart, size: iconSize }) : null,
       h(React.Fragment, { key: "l" }, props.children),
       iconEnd ? h(Icon, { key: "e", name: iconEnd, size: iconSize }) : null]);
  }

  // Botão só com ícone. label é obrigatório (vira aria-label e title). size: md (48) | sm (40) | xs (24).
  function IconButton(props) {
    var variant = BUTTON_VARIANTS[props.variant] ? props.variant : "tertiary";
    var size = props.size === "sm" || props.size === "xs" ? props.size : "md";
    var iconSize = props.iconSize || (size === "xs" ? 16 : size === "sm" ? 20 : 24);
    var withLabel = Object.assign({}, props, { "aria-label": props.label, title: props.title === undefined ? props.label : props.title });
    return ButtonBase(withLabel,
      cx("po-btn", "po-iconbtn", "po-btn-" + variant, size !== "md" ? "po-iconbtn-" + size : null, props.className),
      h(Icon, { name: props.icon, size: iconSize }));
  }

  // Link que navega (ação na mesma tela é Button). href é obrigatório: sem ele, aviso no console e nada de "#".
  // variant: inline (padrão, herda a fonte do texto em volta, semibold) | standalone (label-md, alvo de 24px).
  // external (ou target="_blank"): rel="noopener noreferrer", ícone open_in_new e " (abre em nova aba)" para o leitor de tela.
  function TextLink(props) {
    if (props.href == null || props.href === "") {
      if (typeof console !== "undefined") console.warn("PalmeirasOnboarding.TextLink: passe um href real. Ação na mesma tela é Button.");
    }
    var variant = props.variant === "standalone" ? "standalone" : "inline";
    var external = Boolean(props.external || props.target === "_blank");
    var rest = omit(props, ["className", "children", "variant", "external"]);
    return h("a", Object.assign(external ? { target: "_blank", rel: "noopener noreferrer" } : {}, rest, {
      className: cx("po-link", "po-link-" + variant, props.className)
    }),
      props.children,
      external ? h(Icon, { name: "open_in_new", size: "xs", className: "po-link-icon" }) : null,
      external ? h("span", { className: "po-sr-only" }, " (abre em nova aba)") : null);
  }

  // Marcas oficiais, sem recolorir: "G" colorido do Google, maçã da Apple em currentColor (preta no claro,
  // branca no escuro) e os quatro quadrados da Microsoft.
  function GoogleMark() {
    return h("svg", { className: "po-social-svg", viewBox: "2 2 28 28", "aria-hidden": "true", focusable: "false" },
      h("path", { fill: "#4285F4", d: "M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1443 21.8798 21.2395 23.1864L21.2128 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109" }),
      h("path", { fill: "#34A853", d: "M16.2862 30C20.1433 30 23.3814 28.7555 25.7465 26.6089L21.2386 23.1865C20.0322 24.011 18.4132 24.5865 16.2862 24.5865C12.5085 24.5865 9.30219 22.1444 8.15923 18.7688L7.9917 18.7827L3.58202 22.1272L3.52435 22.2843C5.87353 26.8577 10.6989 30 16.2862 30Z" }),
      h("path", { fill: "#FBBC05", d: "M8.16007 18.7689C7.85848 17.8978 7.68395 16.9644 7.68395 16C7.68395 15.0355 7.85849 14.1022 8.1442 13.2311L8.13621 13.0455L3.67126 9.64736L3.52518 9.71546C2.55696 11.6133 2.0014 13.7444 2.0014 16C2.0014 18.2555 2.55696 20.3866 3.52518 22.2844L8.16007 18.7689" }),
      h("path", { fill: "#EB4335", d: "M16.2863 7.4133C18.9688 7.4133 20.7783 8.54885 21.8101 9.4978L25.8418 5.64C23.3657 3.38445 20.1434 2 16.2863 2C10.699 2 5.87354 5.1422 3.52435 9.71549L8.14339 13.2311C9.30223 9.85555 12.5086 7.4133 16.2863 7.4133" }));
  }

  function AppleMark() {
    return h("svg", { className: "po-social-svg", viewBox: "8 6 16 18", "aria-hidden": "true", focusable: "false" },
      h("path", { fill: "currentColor", d: "M22.5621 12.4574C22.4857 12.502 20.6671 13.4425 20.6671 15.5279C20.7528 17.9061 22.9621 18.7401 23 18.7401C22.9621 18.7847 22.6665 19.8763 21.7907 21.0205C21.0956 22.0062 20.3242 23 19.1528 23C18.0385 23 17.6385 22.3431 16.3528 22.3431C14.972 22.3431 14.5813 23 13.5242 23C12.3528 23 11.5242 21.953 10.7913 20.9766C9.8391 19.6986 9.02978 17.6931 9.00121 15.7675C8.98195 14.7471 9.19189 13.744 9.72481 12.8921C10.477 11.7026 11.8198 10.8952 13.2863 10.8686C14.4099 10.8333 15.4099 11.5875 16.0956 11.5875C16.7528 11.5875 17.9814 10.8686 19.3714 10.8686C19.9714 10.8692 21.5714 11.0376 22.5621 12.4574ZM16.0006 10.6649C15.8006 9.73303 16.3528 8.80119 16.8671 8.20677C17.5242 7.48792 18.5621 7 19.4571 7C19.5143 7.93185 19.1522 8.84575 18.505 9.51136C17.9242 10.2302 16.9242 10.7714 16.0006 10.6649Z" }));
  }

  function MicrosoftMark() {
    return h("span", { className: "po-ms", "aria-hidden": "true" },
      h("i", { style: { background: "#f25325" } }),
      h("i", { style: { background: "#80bc06" } }),
      h("i", { style: { background: "#05a6f0" } }),
      h("i", { style: { background: "#feba08" } })
    );
  }

  // Texto pelas regras de cada marca: Apple aceita "Iniciar sessão" (não "Fazer login"); a Microsoft usa "Entrar com".
  var SOCIAL_PROVIDERS = {
    google: { name: "Google", art: "o Google", mark: GoogleMark, signin: "Fazer login com " },
    apple: { name: "Apple", art: "a Apple", mark: AppleMark, signin: "Iniciar sessão com " },
    microsoft: { name: "Microsoft", art: "a Microsoft", mark: MicrosoftMark, signin: "Entrar com " }
  };
  var SOCIAL_INTENT = { "continue": "Continuar com ", signup: "Cadastrar-se com " };

  // Login social: largura total, 48px, "Continuar com …" visível (nome acessível = texto), marca embutida.
  // intent: continue (padrão) | signin | signup · loading enquanto abre o OAuth ("Abrindo Google…").
  // layout="icon" mantém o quadrado de 64px só com a marca (depreciado). icon (URL) é aceito e ignorado.
  function SocialButton(props) {
    var provider = SOCIAL_PROVIDERS[props.provider] ? props.provider : "google";
    var p = SOCIAL_PROVIDERS[provider];
    var verb = props.intent === "signin" ? p.signin : (SOCIAL_INTENT[props.intent] || SOCIAL_INTENT["continue"]);
    var text = verb + p.art;
    var iconOnly = props.layout === "icon";
    var base = Object.assign(omit(props, ["provider", "intent", "layout", "className"]), {
      loadingLabel: props.loadingLabel || "Abrindo " + p.name + "…",
      "aria-label": iconOnly ? (props["aria-label"] || text) : props["aria-label"]
    });
    return ButtonBase(base,
      cx("po-btn", "po-social", iconOnly ? "po-social-icon" : null, props.className),
      [h("span", { key: "m", className: "po-social-mark" }, h(p.mark)),
       iconOnly ? null : h("span", { key: "t" }, text)]);
  }

  // ── Forms ──────────────────────────────────────────────

  // Mensagem de erro de um campo: ícone + texto. Sem role: o campo a anuncia pelo aria-describedby.
  // live = erro que chega depois (servidor, upload): vira região viva para ser anunciado.
  function FormMessage(props) {
    return h("p", { className: cx("po-msg", props.className), id: props.id, role: props.live ? "status" : undefined },
      h(Icon, { name: "error", size: 16, fill: true }),
      h("span", null, props.children)
    );
  }

  var fieldSeq = 0;
  function useFieldId(id, prefix) {
    var ref = React.useRef(null);
    if (!ref.current) ref.current = id || (prefix || "po-field-") + (++fieldSeq);
    return ref.current;
  }

  var FIELD_OWN_PROPS = ["label", "hideLabel", "hint", "error", "optional", "width", "className", "id", "aria-describedby"];

  // Base de TextField e Select: rótulo, "(opcional)", controle, texto de apoio e erro, com o vínculo ARIA.
  // O erro ocupa o lugar do hint enquanto existir. control({ describedBy, invalid }) desenha o controle.
  function Field(props, id, control) {
    var error = typeof props.error === "string" && props.error ? props.error : null;
    var invalid = Boolean(props.error);
    var hintId = id + "-hint", msgId = id + "-msg";
    var describedBy = cx(error ? msgId : null, !error && props.hint ? hintId : null, props["aria-describedby"]) || undefined;
    var width = props.width === "half" || props.width === "short" ? props.width : null;
    return h("div", { className: cx("po-field", width ? "po-field-" + width : null, invalid ? "po-field-invalid" : null,
        props.readOnly ? "po-field-readonly" : null, props.disabled ? "po-field-disabled" : null, props.className) },
      h("label", { className: cx("po-field-label", props.hideLabel ? "po-sr-only" : null), htmlFor: id },
        props.label, props.optional ? h("span", { className: "po-field-optional" }, " (opcional)") : null),
      control({ describedBy: describedBy, invalid: invalid }),
      error ? h(FormMessage, { id: msgId }, error)
        : props.hint ? h("p", { className: "po-field-hint", id: hintId }, props.hint) : null
    );
  }

  // ── Presets brasileiros: máscara, teclado, autocomplete e validação ──

  function onlyDigits(v) { return String(v == null ? "" : v).replace(/\D/g, ""); }

  // "0" no padrão = um dígito; o resto é pontuação, que só entra antes de um dígito.
  function applyMask(pattern, digits) {
    var out = "", j = 0;
    for (var i = 0; i < pattern.length && j < digits.length; i++) out += pattern.charAt(i) === "0" ? digits.charAt(j++) : pattern.charAt(i);
    return out;
  }

  function cpfValid(d) {
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
    for (var n = 9; n < 11; n++) {
      var sum = 0;
      for (var i = 0; i < n; i++) sum += Number(d.charAt(i)) * (n + 1 - i);
      if ((sum * 10) % 11 % 10 !== Number(d.charAt(n))) return false;
    }
    return true;
  }

  // Cada validador recebe o valor puro e devolve a mensagem de erro, ou null. Campo vazio é decisão de quem envia o formulário.
  var validators = {
    cpf: function (raw) {
      var d = onlyDigits(raw);
      if (d.length < 11) return "Digite os 11 números do CPF";
      return cpfValid(d) ? null : "Esse CPF não existe. Confira os números";
    },
    phone: function (raw) {
      var d = onlyDigits(raw);
      return d.length === 11 && d.charAt(0) !== "0" && d.charAt(1) !== "0" && d.charAt(2) === "9" ? null
        : "Digite o celular com DDD, como (11) 98765-4321";
    },
    cep: function (raw) { return onlyDigits(raw).length === 8 ? null : "Digite os 8 números do CEP"; },
    date: function (raw) {
      var d = onlyDigits(raw);
      if (d.length < 8) return "Digite a data como DD/MM/AAAA";
      var day = Number(d.slice(0, 2)), month = Number(d.slice(2, 4)), year = Number(d.slice(4));
      var date = new Date(year, month - 1, day);
      if (year < 1900 || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return "Essa data não existe. Use DD/MM/AAAA";
      return date > new Date() ? "A data não pode estar no futuro" : null;
    },
    email: function (raw) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(raw).trim()) ? null : "Digite um e-mail como nome@exemplo.com"; },
    name: function (raw) { return String(raw).trim().split(/\s+/).length >= 2 ? null : "Digite o nome e o sobrenome"; }
  };

  var PRESETS = {
    cpf: { inputMode: "numeric", autoComplete: "off", spellCheck: false, mask: "000.000.000-00" },
    phone: { type: "tel", inputMode: "tel", autoComplete: "tel-national", mask: "(00) 00000-0000", strip: "55" },
    cep: { inputMode: "numeric", autoComplete: "postal-code", mask: "00000-000" },
    date: { inputMode: "numeric", autoComplete: "bday", mask: "00/00/0000" },
    email: { type: "email", inputMode: "email", autoComplete: "email", spellCheck: false, autoCapitalize: "none" },
    name: { autoComplete: "name", autoCapitalize: "words", spellCheck: false },
    password: { type: "password", autoComplete: "current-password", spellCheck: false, autoCapitalize: "none" }
  };

  function formatFor(preset, value) {
    if (!preset || !preset.mask) return value == null ? "" : String(value);
    var d = onlyDigits(value), max = preset.mask.split("0").length - 1;
    // Autocomplete e colagem trazem o +55 do país: tira quando sobra dígito.
    if (preset.strip && d.length > max && d.indexOf(preset.strip) === 0) d = d.slice(preset.strip.length);
    return applyMask(preset.mask, d);
  }

  var TEXTFIELD_OWN_PROPS = FIELD_OWN_PROPS.concat(["preset", "iconStart", "prefix", "clearable", "loading", "loadingLabel", "validate", "onValueChange", "size", "value", "defaultValue", "onChange", "onBlur"]);

  // Campo de texto. preset: cpf | phone | cep | date | email | name | password. Valida ao sair do campo
  // e, depois do primeiro erro, a cada mudança (o erro some assim que o valor fica certo).
  function TextField(props) {
    var id = useFieldId(props.id);
    var preset = PRESETS[props.preset] || null;
    var inputRef = React.useRef(null);
    var caretRef = React.useRef(null);
    var controlled = props.value !== undefined;
    var st = React.useState(function () { return formatFor(preset, props.defaultValue); });
    var value = controlled ? formatFor(preset, props.value) : st[0];
    var shown = React.useState(false);
    var touched = React.useState(false);
    var validate = props.validate === undefined ? validators[props.preset] : props.validate;
    var ownError = touched[0] && value && validate ? validate(preset && preset.mask ? onlyDigits(value) : value) : null;

    // Máscara sem pular o cursor: devolve o cursor para depois do mesmo número de dígitos.
    React.useLayoutEffect(function () {
      var el = inputRef.current, n = caretRef.current;
      if (n === null || !el || document.activeElement !== el) return;
      caretRef.current = null;
      var v = el.value, i = 0, c = 0;
      while (i < v.length && c < n) { if (/\d/.test(v.charAt(i))) c++; i++; }
      el.setSelectionRange(i, i);
    });

    function rawOf(v) { return preset && preset.mask ? onlyDigits(v) : v; }
    function update(next, event) {
      if (!controlled) st[1](next);
      // Recompensa cedo: o erro sai (e o campo deixa o modo de erro) assim que o valor fica certo.
      if (touched[0] && (!next || !validate || !validate(rawOf(next)))) touched[1](false);
      if (props.onValueChange) props.onValueChange(rawOf(next), next);
      if (event && props.onChange) props.onChange(event);
    }
    function onChange(e) {
      var el = e.target;
      if (preset && preset.mask) caretRef.current = onlyDigits(el.value.slice(0, el.selectionStart)).length;
      update(formatFor(preset, el.value), e);
    }
    function onBlur(e) {
      // Pune tarde: só valida ao sair do campo, e só entra no modo de erro se o valor estiver errado.
      if (value && validate && validate(rawOf(value))) touched[1](true);
      if (props.onBlur) props.onBlur(e);
    }
    function clear() { update(""); touched[1](false); if (inputRef.current) inputRef.current.focus(); }

    var isPassword = props.preset === "password" || props.type === "password";
    var type = isPassword ? (shown[0] ? "text" : "password") : props.type || (preset && preset.type) || "text";
    var error = props.error || ownError;
    var rest = omit(props, TEXTFIELD_OWN_PROPS.concat(["type"]));
    var hasStart = Boolean(props.iconStart || props.prefix);

    return Field(Object.assign({}, props, { error: error }), id, function (a) {
      return h("div", { className: cx("po-field-control", hasStart ? "po-field-has-start" : null) },
        props.iconStart ? h(Icon, { name: props.iconStart, size: 20, className: "po-field-icon" }) : null,
        props.prefix ? h("span", { className: "po-field-affix", "aria-hidden": "true" }, props.prefix) : null,
        h("input", Object.assign({}, preset ? omit(preset, ["type", "mask", "strip"]) : {}, rest, {
          ref: inputRef, id: id, type: type, value: value,
          className: "po-input",
          onChange: onChange, onBlur: onBlur,
          "aria-invalid": a.invalid || undefined,
          "aria-describedby": a.describedBy,
          "aria-busy": props.loading ? "true" : undefined
        })),
        props.loading ? h("span", { className: "po-field-spinner", "aria-hidden": "true" }) : null,
        props.loading ? h("span", { className: "po-sr-only", role: "status" }, props.loadingLabel || "Carregando") : null,
        props.clearable && value && !props.readOnly && !props.disabled
          ? h(IconButton, { icon: "close", label: "Limpar", variant: "subtle", size: "sm", iconSize: 20, className: "po-field-action", onClick: clear }) : null,
        isPassword && !props.disabled
          ? h(IconButton, { icon: shown[0] ? "visibility_off" : "visibility", label: shown[0] ? "Ocultar senha" : "Mostrar senha",
              "aria-pressed": shown[0], variant: "subtle", size: "sm", iconSize: 20, className: "po-field-action",
              onClick: function () { shown[1](!shown[0]); } }) : null
      );
    });
  }

  // ── Seleção: Checkbox, Radio e grupos ──────────────────

  // Contexto dos grupos: RadioGroup dá name, valor e onChange aos Radio e DocumentOption; os dois grupos dão o erro (invalid).
  var ChoiceContext = React.createContext(null);

  var CHOICE_OWN_PROPS = ["children", "description", "error", "indeterminate", "className", "id", "onChange", "checked", "defaultChecked"];

  // Base de Checkbox e Radio: input nativo invisível (44px de alvo) sobre a caixa desenhada, rótulo,
  // descrição e erro ligados por aria-describedby. A descrição fica fora do <label> para não entrar no nome.
  function Choice(type, props, checked, onChange, extra) {
    var id = useFieldId(props.id, "po-" + type + "-");
    var ctx = React.useContext(ChoiceContext);
    var inputRef = React.useRef(null);
    var indeterminate = type === "checkbox" && Boolean(props.indeterminate);
    React.useEffect(function () { if (inputRef.current) inputRef.current.indeterminate = indeterminate; }, [indeterminate]);
    var error = typeof props.error === "string" && props.error ? props.error : null;
    var invalid = Boolean(props.error) || Boolean(ctx && ctx.invalid);
    var descId = id + "-desc", msgId = id + "-msg";
    var describedBy = cx(props.description ? descId : null, error ? msgId : null, props["aria-describedby"]) || undefined;
    var rest = omit(props, CHOICE_OWN_PROPS.concat(["aria-describedby"]));
    return h("div", { className: cx("po-choice", type === "radio" ? "po-choice-radio" : null, invalid ? "po-choice-invalid" : null, props.disabled ? "po-choice-disabled" : null, props.className) },
      h("span", { className: "po-choice-control" },
        h("input", Object.assign({}, rest, extra, {
          ref: inputRef, id: id, type: type, className: "po-choice-input",
          checked: checked, onChange: onChange,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy
        })),
        h("span", { className: "po-choice-box", "aria-hidden": "true" },
          type === "checkbox" && (checked || indeterminate) ? h(Icon, { name: indeterminate ? "remove" : "check", size: 16, weight: 600 }) : null)
      ),
      h("span", { className: "po-choice-text" },
        h("label", { className: "po-choice-label", htmlFor: id }, props.children),
        props.description ? h("span", { className: "po-choice-desc", id: descId }, props.description) : null,
        error ? h(FormMessage, { id: msgId }, error) : null
      )
    );
  }

  // Caixa para escolhas independentes: aceite, opt-in, "Não possuo complemento".
  // Consentimento nunca vem marcado. onChange(checked, event).
  function Checkbox(props) {
    var controlled = props.checked !== undefined;
    var st = React.useState(Boolean(props.defaultChecked));
    var checked = controlled ? Boolean(props.checked) : st[0];
    return Choice("checkbox", props, checked, function (e) {
      if (!controlled) st[1](e.target.checked);
      if (props.onChange) props.onChange(e.target.checked, e);
    });
  }

  // Uma opção de escolha única. Use dentro de um RadioGroup, que dá o name e o valor.
  function Radio(props) {
    var ctx = React.useContext(ChoiceContext) || {};
    var checked = ctx.value !== undefined ? ctx.value === props.value : props.checked;
    return Choice("radio", props, checked, function (e) {
      if (ctx.onChange) ctx.onChange(props.value);
      if (props.onChange) props.onChange(e);
    }, { name: ctx.name || props.name, value: props.value, disabled: props.disabled || ctx.disabled });
  }

  // Base de RadioGroup e CheckboxGroup: <fieldset> com a pergunta na <legend>, dica e erro do grupo.
  function ChoiceGroup(props, ctx) {
    var id = useFieldId(props.id, "po-group-");
    var error = typeof props.error === "string" && props.error ? props.error : null;
    var hintId = id + "-hint", msgId = id + "-msg";
    return h(ChoiceContext.Provider, { value: Object.assign({ invalid: Boolean(props.error) }, ctx) },
      h("fieldset", { id: id, className: cx("po-choice-group", props.className), disabled: props.disabled,
          "aria-describedby": cx(props.hint ? hintId : null, error ? msgId : null) || undefined },
        h("legend", { className: cx("po-choice-legend", props.hideLegend ? "po-sr-only" : null) },
          props.legend, props.optional ? h("span", { className: "po-field-optional" }, " (opcional)") : null),
        props.hint ? h("p", { className: "po-field-hint", id: hintId }, props.hint) : null,
        h("div", { className: "po-choice-list" }, props.children),
        error ? h(FormMessage, { id: msgId }, error) : null
      ));
  }

  var groupSeq = 0;
  // Escolha única entre Radio ou DocumentOption. Nada vem pré-selecionado: sem escolha, mostre error ao enviar.
  function RadioGroup(props) {
    var nameRef = React.useRef(null);
    if (!nameRef.current) nameRef.current = props.name || "po-radio-group-" + (++groupSeq);
    var controlled = props.value !== undefined;
    var st = React.useState(props.defaultValue === undefined ? "" : props.defaultValue);
    var value = controlled ? props.value : st[0];
    return ChoiceGroup(props, {
      name: nameRef.current, value: value, disabled: props.disabled,
      onChange: function (v) { if (!controlled) st[1](v); if (props.onChange) props.onChange(v); }
    });
  }

  // Várias caixas sob uma pergunta, com dica e erro do grupo. Cada Checkbox controla o próprio valor.
  function CheckboxGroup(props) { return ChoiceGroup(props, {}); }


  // ── Navigation ─────────────────────────────────────────

  // Abas para alternar conteúdo da mesma tela (padrão WAI-ARIA): só a aba ativa entra no Tab, as setas e Home/End trocam,
  // e cada aba controla o seu painel. Não use para resposta de formulário: isso é SegmentedControl ou RadioGroup.
  function Tabs(props) {
    var items = props.items || [];
    var id = useFieldId(props.id, "po-tabs-");
    var refs = React.useRef([]);
    var controlled = props.value !== undefined;
    var st = React.useState(props.defaultValue !== undefined ? props.defaultValue : (items[0] && items[0].value));
    var current = controlled ? props.value : st[0];
    var hasPanels = items.some(function (it) { return it.panel !== undefined; });
    function select(v) {
      if (!controlled) st[1](v);
      if (props.onChange) props.onChange(v);
    }
    function onKeyDown(i, e) {
      var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      n = (n + items.length) % items.length;
      select(items[n].value);
      if (refs.current[n]) refs.current[n].focus();
    }
    return h("div", { className: cx("po-tabs-root", props.className) },
      h("div", { className: "po-tabs", role: "tablist", "aria-label": props.label },
        items.map(function (it, i) {
          var active = it.value === current;
          return h("button", {
            key: it.value, type: "button", role: "tab", id: id + "-tab-" + i,
            ref: function (el) { refs.current[i] = el; },
            "aria-selected": active, "aria-controls": hasPanels ? id + "-panel-" + i : undefined,
            tabIndex: active ? 0 : -1,
            className: cx("po-tab", active ? "po-tab-active" : null),
            onClick: function () { select(it.value); },
            onKeyDown: function (e) { onKeyDown(i, e); }
          }, it.label);
        })
      ),
      hasPanels ? items.map(function (it, i) {
        return h("div", { key: it.value, className: "po-tabpanel", role: "tabpanel", id: id + "-panel-" + i,
          "aria-labelledby": id + "-tab-" + i, tabIndex: 0, hidden: it.value !== current }, it.panel);
      }) : null
    );
  }

  // Escolha única entre 2 e 5 opções curtas, com visual de pílula (ex.: Brasileiro / Estrangeiro).
  // É um campo: <fieldset> + <legend> + rádios nativos (setas trocam). Sempre tem uma opção marcada (padrão: a primeira).
  function SegmentedControl(props) {
    var name = useFieldId(props.name, "po-seg-");
    var opts = props.options || [];
    var controlled = props.value !== undefined;
    var st = React.useState(props.defaultValue !== undefined ? props.defaultValue : (opts[0] && opts[0].value));
    var value = controlled ? props.value : st[0];
    return h("fieldset", { className: cx("po-seg", props.className), disabled: props.disabled },
      h("legend", { className: cx("po-seg-legend", props.hideLegend === false ? null : "po-sr-only") }, props.legend),
      h("div", { className: "po-seg-track" }, opts.map(function (o) {
        return h("label", { key: o.value, className: "po-seg-option" },
          h("input", { type: "radio", className: "po-seg-input", name: name, value: o.value, checked: value === o.value,
            onChange: function () { if (!controlled) st[1](o.value); if (props.onChange) props.onChange(o.value); } }),
          h("span", { className: "po-seg-label" }, o.label));
      }))
    );
  }

  // Progresso do cadastro: nome da etapa + "Etapa X de Y" em texto. Os segmentos só reforçam (aria-hidden),
  // desenhados como traços: concluídos em border-brand, pendentes em border-default.
  function ProgressBar(props) {
    var total = props.total !== undefined ? props.total : props.steps === undefined ? 4 : props.steps;
    var current = props.current === undefined ? 1 : props.current;
    var segs = [];
    for (var i = 0; i < total; i++) segs.push(h("span", { key: i, className: cx("po-progress-seg", i < current ? "po-progress-done" : null) }));
    return h("div", { className: cx("po-progress", props.className) },
      h("div", { className: "po-progress-row" },
        props.label ? h("span", { className: "po-progress-label" }, props.label) : null,
        total > 0 ? h("span", { className: "po-progress-count" }, "Etapa " + current + " de " + total) : null),
      total > 0 ? h("div", { className: "po-progress-track", "aria-hidden": "true" }, segs) : null
    );
  }

  // Idiomas do onboarding, sempre nesta ordem. short vai no gatilho, name (no próprio idioma) no menu,
  // label é a palavra "Idioma" no idioma atual, para o nome acessível e o menu.
  var LANGUAGES = {
    "pt-BR": { short: "PT", name: "Português", label: "Idioma" },
    es: { short: "ES", name: "Español", label: "Idioma" },
    en: { short: "EN", name: "English", label: "Language" }
  };
  var LANGUAGE_ORDER = ["pt-BR", "es", "en"];

  // Bandeiras redondas de 20px, desenhadas aqui como as marcas do SocialButton (cores oficiais, sem asset).
  // Brasil para pt-BR, Espanha para es, EUA para en. São decorativas: o nome do idioma é o que informa.
  var LANGUAGE_FLAG_PARTS = {
    "pt-BR": function () {
      return [
        h("rect", { key: "f", width: 20, height: 20, fill: "#009C3B" }),
        h("path", { key: "l", d: "M10 3.6 17.4 10 10 16.4 2.6 10Z", fill: "#FFDF00" }),
        h("circle", { key: "c", cx: 10, cy: 10, r: 4.1, fill: "#002776" }),
        h("path", { key: "b", d: "M6.1 9.1Q10.2 7.9 13.9 10.6", fill: "none", stroke: "#FFFFFF", strokeWidth: 0.9 })
      ];
    },
    es: function () {
      return [
        h("rect", { key: "f", width: 20, height: 20, fill: "#AA151B" }),
        h("rect", { key: "y", y: 5, width: 20, height: 10, fill: "#F1BF00" })
      ];
    },
    en: function () {
      return [
        h("rect", { key: "f", width: 20, height: 20, fill: "#FFFFFF" }),
        h("g", { key: "s", fill: "#B22234" }, h("rect", { y: 0.0, width: 20, height: 1.538 }), h("rect", { y: 3.077, width: 20, height: 1.538 }), h("rect", { y: 6.154, width: 20, height: 1.538 }), h("rect", { y: 9.231, width: 20, height: 1.538 }), h("rect", { y: 12.308, width: 20, height: 1.538 }), h("rect", { y: 15.385, width: 20, height: 1.538 }), h("rect", { y: 18.462, width: 20, height: 1.538 })),
        h("rect", { key: "c", width: 9, height: 10.769, fill: "#3C3B6E" }),
        h("g", { key: "e", fill: "#FFFFFF" }, h("circle", { cx: 1.6, cy: 1.4, r: 0.55 }), h("circle", { cx: 4.2, cy: 1.4, r: 0.55 }), h("circle", { cx: 6.8, cy: 1.4, r: 0.55 }), h("circle", { cx: 2.9, cy: 3.3, r: 0.55 }), h("circle", { cx: 5.5, cy: 3.3, r: 0.55 }), h("circle", { cx: 1.6, cy: 5.2, r: 0.55 }), h("circle", { cx: 4.2, cy: 5.2, r: 0.55 }), h("circle", { cx: 6.8, cy: 5.2, r: 0.55 }))
      ];
    }
  };

  function LanguageFlag(props) {
    var parts = LANGUAGE_FLAG_PARTS[props.code];
    if (!parts) return null;
    return h("svg", { className: cx("po-lang-flag", props.className), viewBox: "0 0 20 20", width: 20, height: 20, "aria-hidden": "true", focusable: "false" },
      parts(),
      h("circle", { cx: 10, cy: 10, r: 9.5, fill: "none", stroke: "rgba(0, 0, 0, 0.12)", strokeWidth: 1 }));
  }

  // Códigos antigos ("PT-BR", "EN-US", "ES") viram o código do DS; desconhecido vira null.
  function languageValue(code) {
    if (!code) return null;
    var c = String(code).toLowerCase();
    if (c === "pt-br" || c === "pt") return "pt-BR";
    if (c === "es" || c.indexOf("es-") === 0) return "es";
    if (c === "en" || c.indexOf("en-") === 0) return "en";
    return null;
  }

  // Seletor de idioma do header: bandeira, código (PT/ES/EN) e seta; abre um menu de seleção única (WAI-ARIA menu button).
  // Nome acessível "Idioma: Português, PT" no idioma atual. 32px de desenho e 44px de alvo; itens de 48px.
  // Sem onChange e com onClick, continua o botão simples de antes (quem usa trata o clique). As bandeiras vêm do DS; a prop flag é ignorada.
  function LanguageSelector(props) {
    var id = useFieldId(props.id, "po-lang-");
    var st = React.useState(function () {
      return languageValue(props.defaultValue) || languageValue(props.code || props.label) || "pt-BR";
    });
    var value = LANGUAGES[props.value] ? props.value : (languageValue(props.value) || st[0]);
    var lang = LANGUAGES[value];
    var options = LANGUAGE_ORDER.filter(function (c) { return !props.languages || props.languages.indexOf(c) !== -1; });
    var openSt = React.useState(false), open = openSt[0], setOpen = openSt[1];
    var rootRef = React.useRef(null), buttonRef = React.useRef(null), itemRefs = React.useRef([]), startRef = React.useRef(0);
    var plain = !props.onChange && props.onClick;
    var rest = omit(props, ["flag", "label", "code", "name", "className", "value", "defaultValue", "onChange", "languages", "id", "onClick", "onKeyDown"]);
    var accessibleName = lang.label + ": " + lang.name + ", " + lang.short;

    React.useEffect(function () {
      if (!open) return;
      var item = itemRefs.current[startRef.current];
      if (item) item.focus();
      function outside(e) { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); }
      document.addEventListener("mousedown", outside);
      document.addEventListener("touchstart", outside);
      return function () { document.removeEventListener("mousedown", outside); document.removeEventListener("touchstart", outside); };
    }, [open]);

    var content = [
      h(LanguageFlag, { key: "g", code: value }),
      h("span", { key: "c", lang: value }, lang.short),
      h(Icon, { key: "e", name: "expand_more", size: "sm", className: "po-lang-chevron" })
    ];

    if (plain) {
      return h("button", Object.assign({ type: "button" }, rest, { id: id, className: cx("po-lang", props.className), "aria-label": accessibleName,
        onClick: props.onClick, onKeyDown: props.onKeyDown }), content);
    }

    function openAt(index) { startRef.current = index; setOpen(true); }
    function close(focusButton) { setOpen(false); if (focusButton && buttonRef.current) buttonRef.current.focus(); }
    function choose(code) {
      if (props.value === undefined) st[1](code);
      close(true);
      if (props.onChange && code !== value) props.onChange(code);
    }
    var selected = Math.max(0, options.indexOf(value));

    function onButtonKey(e) {
      if (props.onKeyDown) props.onKeyDown(e);
      if (e.key === "ArrowDown") { e.preventDefault(); openAt(selected); }
      else if (e.key === "ArrowUp") { e.preventDefault(); openAt(options.length - 1); }
    }
    function onItemKey(e, i) {
      var n = options.length, next = null;
      if (e.key === "ArrowDown") next = (i + 1) % n;
      else if (e.key === "ArrowUp") next = (i - 1 + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(options[i]); return; }
      else if (e.key === "Escape") { e.preventDefault(); close(true); return; }
      else if (e.key === "Tab") { setOpen(false); return; }
      else if (e.key.length === 1 && /\S/.test(e.key)) {
        var k = e.key.toLowerCase();
        for (var m = 1; m <= n; m++) {
          var j = (i + m) % n;
          if (LANGUAGES[options[j]].name.charAt(0).toLowerCase() === k) { next = j; break; }
        }
      }
      if (next !== null) { e.preventDefault(); itemRefs.current[next].focus(); }
    }

    return h("span", { ref: rootRef, className: cx("po-lang-root", props.className) },
      h("button", Object.assign({ type: "button" }, rest, {
        ref: buttonRef, id: id, className: "po-lang", "aria-label": accessibleName,
        "aria-haspopup": "menu", "aria-expanded": open ? "true" : "false", "aria-controls": id + "-menu",
        onClick: function (e) { if (props.onClick) props.onClick(e); if (open) close(false); else openAt(selected); },
        onKeyDown: onButtonKey
      }), content),
      h("ul", { id: id + "-menu", role: "menu", "aria-label": lang.label, className: "po-lang-menu", hidden: !open },
        options.map(function (code, i) {
          var checked = code === value;
          return h("li", { key: code, ref: function (el) { itemRefs.current[i] = el; }, role: "menuitemradio", tabIndex: -1, lang: code,
            "aria-checked": checked ? "true" : "false", className: "po-lang-item",
            onClick: function () { choose(code); }, onKeyDown: function (e) { onItemKey(e, i); } },
            h(LanguageFlag, { code: code }),
            h("span", { className: "po-lang-item-name" }, LANGUAGES[code].name),
            h(Icon, { name: "check", size: "sm", className: "po-lang-check" }));
        }))
    );
  }

  // Menu "Meu perfil" da área logada: botão com ícone, nome e seta, que abre um menu de ações.
  // A linha Idioma leva o LanguageSelector dentro do menu; clicar em qualquer ponto da linha abre o seletor.
  // Itens são role="menuitem" (setas, Home, End; Esc fecha e devolve o foco ao gatilho; clique fora fecha).
  // Item desabilitado fica focável com aria-disabled. tone "danger" pinta de erro e ganha o divisor antes dele.
  function ProfileMenu(props) {
    var id = useFieldId(props.id, "po-profile-");
    var openSt = React.useState(Boolean(props.defaultOpen)), open = openSt[0], setOpen = openSt[1];
    var rootRef = React.useRef(null), triggerRef = React.useRef(null), menuRef = React.useRef(null), langRef = React.useRef(null);
    // Onde o foco vai ao abrir: "first", "last" ou "none" (defaultOpen não rouba o foco da página).
    var startRef = React.useRef(props.defaultOpen ? "none" : "first");
    var label = props.label === undefined ? "Meu perfil" : props.label;
    var items = props.items || [];
    var lang = props.language;
    var firstDanger = -1;
    for (var i = 0; i < items.length; i++) if (items[i].tone === "danger") { firstDanger = i; break; }

    function focusables() {
      return menuRef.current ? Array.prototype.slice.call(menuRef.current.querySelectorAll("[role='menuitem'], .po-lang")) : [];
    }

    React.useEffect(function () {
      if (!open) return;
      var list = focusables();
      if (startRef.current !== "none" && list.length) list[startRef.current === "last" ? list.length - 1 : 0].focus();
      startRef.current = "first";
      function outside(e) { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); }
      document.addEventListener("mousedown", outside);
      document.addEventListener("touchstart", outside);
      return function () {
        document.removeEventListener("mousedown", outside);
        document.removeEventListener("touchstart", outside);
      };
    }, [open]);

    function openAt(where) { startRef.current = where; setOpen(true); }
    function close(focusTrigger) {
      setOpen(false);
      if (focusTrigger && triggerRef.current) triggerRef.current.focus();
    }

    function onKeyDown(e) {
      // Gatilho fechado: seta abre o menu (primeiro ou último item).
      if (!open) {
        if (e.target === triggerRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          e.preventDefault();
          openAt(e.key === "ArrowDown" ? "first" : "last");
        }
        return;
      }
      // Esc já tratado por dentro (seletor de idioma aberto): não fecha o menu inteiro.
      if (e.key === "Escape") { if (!e.defaultPrevented) { e.preventDefault(); close(true); } return; }
      if (e.key === "Tab") { setOpen(false); return; }
      var list = focusables(), at = list.indexOf(e.target);
      if (at === -1 || e.defaultPrevented) return;
      var n = list.length, next = null;
      if (e.key === "ArrowDown") next = (at + 1) % n;
      else if (e.key === "ArrowUp") next = (at - 1 + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      if (next !== null) { e.preventDefault(); list[next].focus(); }
    }

    function activate(item, e) {
      if (item.disabled) { e.preventDefault(); return; }
      if (item.onSelect) item.onSelect(item.id);
      close(true);
    }

    function renderItem(item) {
      var danger = item.tone === "danger";
      var attrs = { role: "menuitem", tabIndex: -1, className: cx("po-profile-item", danger ? "po-profile-item-danger" : null),
        "aria-disabled": item.disabled ? "true" : undefined, onClick: function (e) { activate(item, e); } };
      var content = [
        h(Icon, { key: "i", name: item.icon, size: "sm", tone: danger ? "danger" : "subtle" }),
        h("span", { key: "l", className: "po-profile-label" }, item.label)
      ];
      if (item.href !== undefined && !item.disabled) return h("a", Object.assign(attrs, { href: item.href }), content);
      return h("button", Object.assign(attrs, { type: "button" }), content);
    }

    var rows = [];
    if (lang) {
      rows.push(h("li", { key: "lang", role: "none", ref: langRef, className: "po-profile-lang",
        onClick: function (e) {
          // Clique dentro do próprio seletor ou da lista de idiomas não mexe no seletor.
          if (e.target.closest(".po-lang, .po-lang-menu")) return;
          var btn = langRef.current && langRef.current.querySelector(".po-lang");
          if (btn) btn.click();
        } },
        h(Icon, { name: "translate", size: "sm", tone: "subtle" }),
        h("span", { className: "po-profile-label" }, "Idioma"),
        h(LanguageSelector, { value: lang.value, defaultValue: lang.defaultValue, onChange: lang.onChange, languages: lang.languages })));
    }
    items.forEach(function (item, index) {
      if (props.divider !== false && index === firstDanger && (index > 0 || lang)) {
        rows.push(h("li", { key: "div-" + item.id, role: "separator", className: "po-profile-divider" }));
      }
      rows.push(h("li", { key: item.id, role: "none" }, renderItem(item)));
    });

    return h("div", { ref: rootRef, className: cx("po-profile", props.className), onKeyDown: onKeyDown },
      h("button", { ref: triggerRef, type: "button", id: id, className: "po-profile-btn", "aria-haspopup": "menu",
        "aria-expanded": open ? "true" : "false", "aria-controls": id + "-menu",
        onClick: function () { if (open) close(true); else openAt("first"); } },
        h(Icon, { name: "person", size: "sm" }),
        h("span", { className: "po-profile-name" }, label),
        h(Icon, { name: "expand_more", size: "sm", tone: "subtle", className: "po-profile-chevron" })),
      h("ul", { id: id + "-menu", ref: menuRef, role: "menu", "aria-label": label, className: "po-profile-menu", hidden: !open }, rows));
  }

  // Barra do topo por partes: back · title (ou progress) · language · help.
  // As props antigas (label, steps, current, showBack, onBack, showHelp, onHelp, flag, language em texto) continuam aceitas.
  function AppHeader(props) {
    var back = props.back !== undefined ? props.back
      : (props.onBack === null || props.showBack === false ? false : { onClick: props.onBack });
    var help = props.help !== undefined ? props.help
      : (props.onHelp !== undefined || props.showHelp ? { onClick: props.onHelp } : false);
    var legacyLabel = props.title === undefined && props.label !== undefined;
    var progress = props.progress !== undefined ? props.progress
      : legacyLabel && props.steps !== 0 ? { current: props.current === undefined ? 1 : props.current, total: props.steps === undefined ? 4 : props.steps } : null;
    var text = props.title !== undefined ? props.title : props.label;
    // Título centralizado só no modo de edição (title sem progresso); o rótulo antigo sem progresso fica à esquerda.
    var centered = props.title !== undefined && !progress;
    var language = props.language === false || props.language === null ? null
      : typeof props.language === "object" ? props.language
      : props.language === undefined && props.title !== undefined && props.back === undefined ? null
      : { code: props.language || "PT-BR", flag: props.flag };

    return h("header", { className: cx("po-header", props.className) },
      back || centered ? h("div", { className: "po-header-icon" },
        back ? h(IconButton, { className: "po-header-action", variant: "subtle", size: "sm", iconSize: 24, icon: "chevron_left",
          label: back.label || "Voltar", onClick: back.onClick, href: back.href }) : null) : null,
      progress ? h(ProgressBar, { className: "po-header-progress", label: text, current: progress.current, total: progress.total })
        : h("span", { className: centered ? "po-header-title" : "po-header-text" }, text),
      language ? h(LanguageSelector, language) : null,
      help ? h(IconButton, { className: "po-header-action", variant: "subtle", size: "sm", iconSize: 24, icon: "help",
        label: help.label || "Ajuda", onClick: help.onClick }) : centered ? h("div", { className: "po-header-icon" }) : null
    );
  }

  // Texto puro de um nó React (para o document.title).
  function textOf(node) {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (node.props) return textOf(node.props.children);
    return "";
  }

  var DOCUMENT_TITLE_SUFFIX = " · Palmeiras";

  // Troca de etapa numa SPA: ao montar, foca o título (o leitor de tela anuncia a tela nova) e atualiza o document.title.
  // Base interna de PageHeading (e de StatusScreen/ResultHero). Devolve o ref do elemento, que leva tabIndex -1.
  // Não foca se o documento não tem o foco (aba em segundo plano, iframe que ninguém tocou).
  // options: enabled (padrão true) · title (nó do título) · documentTitle (string; false não mexe; padrão: texto do title + " · Palmeiras").
  function useFocusOnMount(options) {
    var o = options || {};
    var enabled = o.enabled !== false;
    var plain = textOf(o.title).replace(/\s+/g, " ").trim();
    var docTitle = o.documentTitle === false ? null
      : typeof o.documentTitle === "string" ? o.documentTitle
      : enabled && plain ? plain + DOCUMENT_TITLE_SUFFIX : null;
    var ref = React.useRef(null);
    React.useEffect(function () {
      // Só quando a página já tem o foco: não rouba o foco de outra janela ou de outro iframe (ex.: o catálogo do DS).
      if (enabled && ref.current && ref.current.focus && document.hasFocus()) ref.current.focus({ preventScroll: true });
    }, []);
    React.useEffect(function () {
      if (docTitle && typeof document !== "undefined") document.title = docTitle;
    }, [docTitle]);
    return ref;
  }

  // Título da tela: o único <h1>. tone: brand (padrão) | neutral · size: md (24) | sm (20).
  // Ordem fixa: título → subtítulo (body-md) → children (ex.: ContactRow), a space-stack-related.
  // focusOnMount (padrão true) foca o h1 e atualiza o document.title. spaced é aceito e ignorado (depreciado).
  function PageHeading(props) {
    var enabled = props.focusOnMount !== false;
    var ref = useFocusOnMount({ enabled: enabled, title: props.title, documentTitle: props.documentTitle });
    return h("div", { className: cx("po-heading", props.className) },
      h("h1", { ref: ref, tabIndex: enabled ? -1 : undefined,
        className: cx("po-heading-title", props.tone === "neutral" ? "po-heading-neutral" : null, props.size === "sm" ? "po-heading-sm" : null) }, props.title),
      props.subtitle ? h("p", { className: "po-heading-sub" }, props.subtitle) : null,
      props.children
    );
  }

  // Divisor com texto ("ou"). As linhas são decorativas (aria-hidden) e o texto é um parágrafo comum, sem role.
  function DividerText(props) {
    return h("div", { className: cx("po-divider", props.className) },
      h("span", { className: "po-divider-line", "aria-hidden": "true" }),
      h("p", { className: "po-divider-text" }, props.children == null ? "ou" : props.children),
      h("span", { className: "po-divider-line", "aria-hidden": "true" })
    );
  }

  // Destinos provisórios: troque pelos endereços reais da Ellena.
  var LEGAL_LINKS = [
    { label: "Termos de Uso", href: "/termos-de-uso" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" }
  ];

  // Rodapé legal: <footer> com <nav aria-label="Informações legais"> (Termos e Privacidade, em nova aba)
  // e o copyright com o ano do relógio. children substitui o copyright; links={[]} esconde a lista.
  function LegalFooter(props) {
    var links = props.links || LEGAL_LINKS;
    var copy = props.children || ("© " + new Date().getFullYear() + " " + (props.owner || "Ellena") + ". Todos os direitos reservados.");
    return h("footer", { className: cx("po-legal", props.className) },
      links.length ? h("nav", { className: "po-legal-nav", "aria-label": "Informações legais" },
        h("ul", { className: "po-legal-links" }, links.map(function (l, i) {
          return h("li", { key: l.href || i }, h(TextLink, { href: l.href, external: l.external !== false }, l.label));
        }))) : null,
      h("p", { className: "po-legal-copy" }, copy));
  }

  // ── Verificação ────────────────────────────────────────

  // Código de verificação: UM <input> (one-time-code) sob células só visuais. O leitor de tela vê um campo
  // com rótulo; o preenchimento do SMS e o colar entram direto. state: default | success | error.
  function OTPInput(props) {
    var length = props.length || 6;
    var half = Math.ceil(length / 2);
    var state = props.state || "default";
    var id = useFieldId(props.id, "po-otp-");
    var controlled = props.value !== undefined;
    var st = React.useState(onlyDigits(props.defaultValue).slice(0, length));
    var value = onlyDigits(controlled ? props.value : st[0]).slice(0, length);
    var focused = React.useState(false);
    var locked = state === "success" || props.disabled;
    // message: alias antigo; vira erro no estado error e apoio nos outros.
    var error = props.error || (state === "error" ? props.message : null);
    var hint = props.hint || (state !== "error" ? props.message : null);
    var msgId = id + "-msg";

    function onChange(e) {
      var next = onlyDigits(e.target.value).slice(0, length);
      if (!controlled) st[1](next);
      if (props.onChange) props.onChange(next);
      if (next.length === length && next !== value && props.onComplete) props.onComplete(next);
    }
    // O cursor fica sempre no fim: as células mostram onde entra o próximo dígito.
    function toEnd(e) { var el = e.target, n = el.value.length; if (el.selectionStart !== n) el.setSelectionRange(n, n); }

    var active = focused[0] && !locked ? Math.min(value.length, length - 1) : -1;
    var cells = [];
    for (var i = 0; i < length; i++) {
      if (i === half) cells.push(h("span", { key: "sep", className: "po-otp-sep" }));
      cells.push(h("span", { key: i, className: cx("po-otp-cell", i === active ? "po-otp-cell-active" : null) }, value.charAt(i)));
    }
    return h("div", { className: cx("po-otp", "po-otp-" + state, focused[0] ? "po-otp-focused" : null, props.className) },
      h("label", { className: cx("po-field-label", props.hideLabel === false ? null : "po-sr-only"), htmlFor: id }, props.label || "Código de verificação"),
      h("div", { className: "po-otp-row" },
        h("input", {
          id: id, className: "po-otp-input", type: "text", inputMode: "numeric", pattern: "[0-9]*",
          autoComplete: "one-time-code", value: value, readOnly: locked, disabled: props.disabled,
          "aria-invalid": state === "error" || undefined,
          "aria-describedby": error || hint ? msgId : undefined,
          onChange: onChange, onSelect: toEnd,
          onFocus: function (e) { focused[1](true); toEnd(e); },
          onBlur: function () { focused[1](false); }
        }),
        h("span", { className: "po-otp-cells", "aria-hidden": "true" }, cells)
      ),
      error || hint ? h("p", { className: cx("po-otp-msg", error ? "po-otp-msg-error" : null), id: msgId, role: error ? "status" : undefined }, error || hint) : null
    );
  }

  // ── Mensagens na página: Alert, StatusCard e ErrorSummary ──

  var TONE_ICON = { info: "info", success: "check_circle", warning: "warning", danger: "error" };
  // "error" continua como alias de danger. Sem tom, danger (o Alert nasceu como caixa de erro).
  function toneOf(tone) { return tone === "error" || !TONE_ICON[tone] ? "danger" : tone; }
  var LIVE_ROLE = { assertive: "alert", polite: "status" };

  // Ação única em texto, no fim da mensagem: { label, onClick?, href? }.
  function AlertAction(action) {
    if (!action) return null;
    return action.href
      ? h("a", { className: "po-alert-action", href: action.href, onClick: action.onClick }, action.label)
      : h("button", { type: "button", className: "po-alert-action", onClick: action.onClick }, action.label);
  }

  // Mensagem ligada ao passo: info | success | warning | danger. Cor no fundo, na borda e no ícone; texto em text-default.
  // Não some sozinha. live: anuncia ao aparecer depois de uma ação (assertive no erro, polite nos outros).
  function Alert(props) {
    var tone = toneOf(props.tone);
    return h("div", { className: cx("po-alert", "po-alert-" + tone, props.className), role: LIVE_ROLE[props.live] },
      h("span", { className: "po-alert-icon" }, h(Icon, { name: TONE_ICON[tone], size: 20, fill: true })),
      h("div", { className: "po-alert-text" },
        props.title ? h("p", { className: "po-alert-title" }, props.title) : null,
        props.children ? h("div", { className: "po-alert-body" }, props.children) : null,
        AlertAction(props.action)
      ),
      props.onClose ? h(IconButton, { className: "po-alert-close", variant: "subtle", size: "xs", icon: "close", label: "Fechar", onClick: props.onClose }) : null
    );
  }

  // @deprecated: Alert tone="success". Mantido para as telas que já usam (title + description).
  function StatusCard(props) {
    return h(Alert, { tone: "success", title: props.title, className: props.className, live: props.live }, props.description);
  }

  // Resumo de erros no topo do formulário, ao enviar: recebe o foco, e cada link leva ao campo.
  // Não substitui o erro de cada campo; repete a mesma mensagem.
  function ErrorSummary(props) {
    var id = useFieldId(props.id, "po-summary-");
    var ref = React.useRef(null);
    var errors = props.errors || [];
    var key = errors.map(function (e) { return e.fieldId + ":" + e.message; }).join("|");
    React.useEffect(function () { if (ref.current && errors.length) ref.current.focus(); }, [key]);
    if (!errors.length) return null;
    var title = props.title || (errors.length === 1 ? "Há 1 problema para continuar" : "Há " + errors.length + " problemas para continuar");
    function go(fieldId, e) {
      var el = document.getElementById(fieldId);
      if (!el) return;
      e.preventDefault();
      el.focus();
      if (el.scrollIntoView) el.scrollIntoView({ block: "center" });
    }
    return h("div", { ref: ref, tabIndex: -1, className: cx("po-alert", "po-alert-danger", "po-error-summary", props.className), role: "alert", "aria-labelledby": id + "-title" },
      h("span", { className: "po-alert-icon" }, h(Icon, { name: "error", size: 20, fill: true })),
      h("div", { className: "po-alert-text" },
        h("p", { className: "po-alert-title", id: id + "-title" }, title),
        h("ul", { className: "po-error-summary-list" }, errors.map(function (e) {
          return h("li", { key: e.fieldId }, h("a", { href: "#" + e.fieldId, onClick: function (ev) { go(e.fieldId, ev); } }, e.message));
        }))
      )
    );
  }

  // Máscaras do DS (LGPD, art. 6º, III: mostrar só o mínimo). Celular: DDD, 1º dígito e quatro finais. E-mail: até quatro letras e o domínio.
  // Devolvem "" se o dado não parecer válido. O ideal é o servidor mandar o valor já mascarado.
  function maskPhone(digits) {
    var d = String(digits == null ? "" : digits).replace(/\D/g, "");
    if (d.length === 13 && d.slice(0, 2) === "55") d = d.slice(2);
    if (d.length !== 10 && d.length !== 11) return "";
    return "(" + d.slice(0, 2) + ") " + d.charAt(2) + "****-" + d.slice(-4);
  }

  function maskEmail(email) {
    var s = String(email == null ? "" : email), at = s.indexOf("@");
    if (at < 1) return "";
    var local = s.slice(0, at), keep = Math.min(4, Math.max(1, local.length - 3));
    return local.slice(0, keep) + "***" + s.slice(at);
  }

  // Texto falado no lugar dos asteriscos: "Celular com final 5432", "E-mail que começa com silv, em email.com".
  function spokenContact(channel, value) {
    var s = String(value == null ? "" : value);
    if (channel === "email") {
      var at = s.indexOf("@"), local = at > 0 ? s.slice(0, at) : "", star = local.indexOf("*");
      if (star < 1) return s;
      return "E-mail que começa com " + local.slice(0, star) + ", em " + s.slice(at + 1);
    }
    var digits = s.replace(/\D/g, "");
    return digits.length >= 4 ? "Celular com final " + digits.slice(-4) : s;
  }

  function SmsIcon() { return h(Icon, { name: "sms", size: "xs" }); }

  function EditIcon() { return h(Icon, { name: "edit_square", size: "xs" }); }

  function MailIcon() { return h(Icon, { name: "mail", size: "sm" }); }

  // channel: sms (padrão) ou email, com ícone e texto da ação. O valor chega mascarado; os asteriscos ficam aria-hidden e o leitor ouve spokenValue.
  // Sem onEdit não há botão (o login não troca o número). Com onEdit, a ação tem alvo de 44px. null continua aceito (depreciado).
  function ContactRow(props) {
    var email = props.channel === "email";
    var spoken = props.spokenValue !== undefined ? props.spokenValue : spokenContact(email ? "email" : "sms", props.value);
    var canEdit = typeof props.onEdit === "function";
    return h("div", { className: cx("po-contact", email ? "po-contact-email" : null, props.className) },
      h("span", { className: "po-contact-value" }, email ? h(MailIcon) : h(SmsIcon),
        h("span", { "aria-hidden": "true" }, props.value),
        h("span", { className: "po-sr-only" }, spoken)),
      canEdit
        ? h("button", { type: "button", className: "po-contact-edit", onClick: props.onEdit }, h(EditIcon), props.editLabel || (email ? "Editar e-mail" : "Editar celular"))
        : null
    );
  }

  function fmtWait(s) { var m = Math.floor(s / 60), r = s % 60; return m + ":" + (r < 10 ? "0" : "") + r; }

  // Pergunta e ação para pedir outro código. A espera (cooldown, 30 s por padrão) é contada aqui dentro e aparece no próprio botão:
  // "Reenviar em 0:24", aria-disabled e focável. attemptsLeft é controlado pela tela (diminua quando o envio der certo); 0 mostra o limite e a alternativa.
  // A região viva polite anuncia só início e fim da espera, envio e limite, nunca cada segundo.
  function ResendPrompt(props) {
    var cooldown = props.cooldown === undefined ? 30 : Math.max(0, Math.floor(Number(props.cooldown) || 0));
    var attempts = props.attemptsLeft;
    var limited = attempts !== undefined && attempts !== null && attempts <= 0;
    var blocked = props.disabled === true; // @deprecated: a tela usa cooldown e attemptsLeft
    var hintId = useFieldId(undefined, "po-resend-hint-");
    var leftState = React.useState(cooldown), left = leftState[0], setLeft = leftState[1];
    var sendingState = React.useState(false), sending = sendingState[0], setSending = sendingState[1];
    var noticeState = React.useState(""), notice = noticeState[0], setNotice = noticeState[1];
    var sentState = React.useState(0), sentCount = sentState[0], setSentCount = sentState[1];
    var mounted = React.useRef(false), prevLeft = React.useRef(cooldown), prevLimited = React.useRef(limited), justSent = React.useRef(false);
    var waiting = left > 0;

    // Limpa e põe a mensagem no tick seguinte, para a mesma frase ser anunciada de novo.
    function say(msg) {
      setNotice("");
      setTimeout(function () { if (mounted.current) setNotice(msg); }, 50);
    }

    React.useEffect(function () {
      mounted.current = true;
      if (cooldown > 0 && !limited) say("Você pode pedir outro código em " + cooldown + " segundos.");
      return function () { mounted.current = false; };
    }, []);

    React.useEffect(function () {
      if (!waiting) return undefined;
      var t = setInterval(function () { setLeft(function (n) { return n > 1 ? n - 1 : 0; }); }, 1000);
      return function () { clearInterval(t); };
    }, [waiting, sentCount]);

    React.useEffect(function () {
      if (prevLeft.current > 0 && left === 0 && !limited) say("Já pode reenviar o código.");
      prevLeft.current = left;
    }, [left]);

    React.useEffect(function () {
      // Se o último envio zerou o limite, a mensagem de envio já diz isso.
      if (limited && !prevLimited.current && !justSent.current) say("Limite de reenvios atingido.");
      prevLimited.current = limited;
      justSent.current = false;
    }, [limited]);

    function resend() {
      if (blocked || sending || limited) return;
      if (waiting) { say("Aguarde " + left + " segundos para reenviar."); return; }
      setSending(true);
      var done = function (ok) {
        if (!mounted.current) return;
        setSending(false);
        if (!ok) { say("Não foi possível enviar o código. Tente de novo."); return; }
        var remaining = attempts === undefined || attempts === null ? null : Math.max(0, attempts - 1);
        var msg = "Novo código enviado" + (props.sentTo ? " para " + props.sentTo : "") + ".";
        if (remaining === 0) msg += " Este foi o último reenvio.";
        else if (remaining === 1) msg += " Resta 1 reenvio.";
        else if (remaining !== null) msg += " Restam " + remaining + " reenvios.";
        if (remaining !== 0 && cooldown > 0) msg += " Você pode pedir outro em " + cooldown + " segundos.";
        justSent.current = true;
        say(msg);
        setLeft(remaining === 0 ? 0 : cooldown);
        setSentCount(function (c) { return c + 1; });
      };
      var res;
      try { res = props.onResend ? props.onResend() : undefined; }
      catch (e) { done(false); return; }
      if (res && typeof res.then === "function") res.then(function () { done(true); }, function () { done(false); });
      else done(true);
    }

    var inactive = blocked || sending || waiting;
    var content;
    if (limited) {
      content = [
        h("span", { key: "l" }, "Limite de reenvios atingido."),
        props.alternative ? h("button", { key: "a", type: "button", className: "po-resend-action", onClick: props.alternative.onClick }, props.alternative.label) : null
      ];
    } else {
      var label = sending ? "Enviando…"
        : waiting ? h(React.Fragment, null, "Reenviar em ", h("span", { className: "po-resend-time" }, fmtWait(left)))
        : (props.actionLabel || "Reenviar código");
      content = [
        h("span", { key: "q" }, props.question || "Não recebeu o código?"),
        h("button", { key: "b", type: "button", className: "po-resend-action",
          "aria-disabled": inactive ? "true" : undefined,
          "aria-describedby": waiting ? hintId : undefined,
          onClick: resend }, label),
        waiting ? h("span", { key: "h", id: hintId, className: "po-sr-only" }, "Aguarde o fim da contagem para pedir outro código.") : null
      ];
    }
    return h("div", { className: cx("po-resend", props.className) },
      h("div", { className: "po-resend-line" }, content),
      h("span", { className: "po-sr-only", "aria-live": "polite" }, notice)
    );
  }

  // ── Feedback flutuante: Toast, ToastRegion e toast() ───

  // Confirmação de algo feito em outra tela (ex.: "E-mail alterado com sucesso"). success | info: erro nunca é toast.
  // Solto na tela, anuncia sozinho (role status); dentro da ToastRegion, quem anuncia é a região.
  function Toast(props) {
    var tone = props.tone === "info" ? "info" : "success";
    var action = props.action && Object.assign({}, props.action, {
      onClick: function (e) { if (props.action.onClick) props.action.onClick(e); if (props.onClose) props.onClose(); }
    });
    return h("div", { className: cx("po-alert", "po-alert-" + tone, "po-toast", props.className), role: props.role === undefined ? "status" : props.role },
      h("span", { className: "po-alert-icon" }, h(Icon, { name: TONE_ICON[tone], size: 20, fill: true })),
      h("div", { className: "po-alert-text" },
        h("p", { className: "po-alert-title" }, props.title || props.children),
        AlertAction(action)
      ),
      props.onClose ? h(IconButton, { className: "po-alert-close", variant: "subtle", size: "xs", icon: "close", label: "Fechar", onClick: props.onClose }) : null
    );
  }

  var toastListeners = [], toastSeq = 0;
  // Dispara um toast na ToastRegion da tela: toast("Salvo") ou toast({ title, tone, action, duration }). Devolve o id.
  function toast(options) {
    var t = Object.assign({ id: ++toastSeq }, typeof options === "string" ? { title: options } : options);
    toastListeners.forEach(function (fn) { fn(t); });
    return t.id;
  }

  // Região viva única, logo abaixo do AppHeader: mostra um toast por vez, sem cobrir o header nem mover o foco.
  // Some em 5s (+1s a cada 10 palavras), pausa com o ponteiro ou o foco dentro; com ação, só fecha pelo X ou pela ação.
  function ToastRegion(props) {
    var st = React.useState(null);
    var current = st[0];
    var timer = React.useRef(null), left = React.useRef(0), started = React.useRef(0), paused = React.useRef(false);
    var lasts = Boolean(current && current.action);

    function close() { clearTimeout(timer.current); st[1](null); }
    function run() { clearTimeout(timer.current); started.current = Date.now(); timer.current = setTimeout(close, left.current); }

    React.useEffect(function () {
      function show(t) { st[1](t); }
      toastListeners.push(show);
      return function () { toastListeners.splice(toastListeners.indexOf(show), 1); clearTimeout(timer.current); };
    }, []);
    React.useEffect(function () {
      if (!current || current.action) return undefined;
      var words = String(current.title || "").trim().split(/\s+/).length;
      left.current = current.duration || 5000 + Math.floor(words / 10) * 1000;
      if (!paused.current) run();
      return function () { clearTimeout(timer.current); };
    }, [current]);

    function pause() {
      if (paused.current) return;
      paused.current = true;
      if (current && !lasts) { clearTimeout(timer.current); left.current -= Date.now() - started.current; }
    }
    function resume(e) {
      if (e && e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
      paused.current = false;
      if (current && !lasts) run();
    }

    return h("div", {
      className: cx("po-toast-region", props.className), role: "status", "aria-live": "polite",
      onMouseEnter: pause, onMouseLeave: resume, onFocus: pause, onBlur: resume,
      onKeyDown: function (e) { if (e.key === "Escape") close(); }
    }, current ? h(Toast, { key: current.id, role: null, tone: current.tone, title: current.title, action: current.action, onClose: close }) : null);
  }

  // Resultado no topo de uma tela comum (com header e botão no pé): selo com ícone, h1 e texto centralizados.
  // tone: success (padrão) | info | warning | danger, nos tokens bg-{tom}-subtle / bg-{tom}-bold / text-on-{tom}, como o Alert.
  // O título fica em text-brand só no sucesso; nos outros tons, text-default (título verde num erro confunde).
  // icon: nome do Material Symbol (padrão por tom); ReactNode continua aceito (depreciado). focusOnMount (padrão true) foca o h1.
  var HERO_TONES = { success: "check", info: "info", warning: "warning", danger: "error" };
  function ResultHero(props) {
    var tone = HERO_TONES[props.tone] ? props.tone : "success";
    var enabled = props.focusOnMount !== false;
    var ref = useFocusOnMount({ enabled: enabled, title: props.title, documentTitle: props.documentTitle });
    var icon = props.icon == null ? HERO_TONES[tone] : props.icon;
    return h("div", { className: cx("po-hero", "po-hero-" + tone, props.className) },
      h("span", { className: "po-hero-badge", "aria-hidden": "true" },
        h("span", { className: "po-hero-badge-inner" }, typeof icon === "string" ? h(Icon, { name: icon, size: "lg" }) : icon)),
      h("div", { className: "po-hero-text" },
        h("h1", { className: "po-hero-title", ref: ref, tabIndex: enabled ? -1 : undefined }, props.title),
        props.description ? h("p", { className: "po-hero-desc" }, props.description) : null
      )
    );
  }

  // ── Forms (lg) ─────────────────────────────────────────

  function ChevronDownIcon() { return h(Icon, { name: "keyboard_arrow_down", size: 18 }); }

  // <select> nativo com a mesma base (Field) do TextField: abre o seletor do sistema no celular.
  function Select(props) {
    var id = useFieldId(props.id, "po-select-");
    var opts = props.options || [];
    var rest = omit(props, FIELD_OWN_PROPS.concat(["options", "placeholder", "value", "defaultValue", "onChange"]));
    var controlled = props.value !== undefined;
    var st = React.useState(props.defaultValue || "");
    var value = controlled ? props.value : st[0];
    return Field(props, id, function (a) {
      return h("div", { className: cx("po-field-control", "po-select", value === "" ? "po-select-empty" : null) },
        h("select", Object.assign({}, rest, {
          id: id, value: value, className: "po-input",
          "aria-invalid": a.invalid || undefined,
          "aria-describedby": a.describedBy,
          onChange: function (e) { if (!controlled) st[1](e.target.value); if (props.onChange) props.onChange(e); }
        }),
          h("option", { value: "", disabled: true }, props.placeholder || "Selecione"),
          opts.map(function (o) { var v = typeof o === "string" ? o : o.value; return h("option", { key: v, value: v }, typeof o === "string" ? o : o.label); })
        ),
        h("span", { className: "po-select-chevron" }, h(ChevronDownIcon))
      );
    });
  }

  // ── Status ─────────────────────────────────────────────

  // Apelidos antigos do JourneyStepper; qualquer outro nome é um Material Symbol.
  var JOURNEY_ICON_ALIASES = { document: "description", face: "familiar_face_and_zone", clipboard: "assignment_turned_in" };
  var JOURNEY_STATE_TEXT = { done: ", concluída", current: ", etapa atual", upcoming: ", próxima" };

  // Jornada vertical sobre o gradiente: <ol aria-label> com etapas done | current | upcoming ligadas por conectores.
  // O estado está em texto oculto em toda etapa (", concluída" / ", etapa atual" / ", próxima") e aria-current="step" na atual;
  // ícones e conectores são aria-hidden. A etapa atual tem anel branco (journey-step-current-ring), 3:1 em qualquer ponto do gradiente.
  function JourneyStepper(props) {
    var steps = props.steps || [];
    return h("ol", { className: cx("po-journey", props.className), "aria-label": props.label || "Etapas do cadastro" },
      steps.map(function (s, i) {
        var state = JOURNEY_STATE_TEXT[s.state] ? s.state : "upcoming";
        var last = i === steps.length - 1;
        var line = state === "done" ? "po-journey-line-done" : "po-journey-line";
        var symbol = state === "done" ? "check" : (JOURNEY_ICON_ALIASES[s.icon] || s.icon);
        var label = h("span", { className: "po-journey-label" }, s.label, h("span", { className: "po-sr-only" }, JOURNEY_STATE_TEXT[state]));
        return h("li", { key: i, className: cx("po-journey-step", "po-journey-" + state), "aria-current": state === "current" ? "step" : undefined },
          h("div", { className: "po-journey-row" },
            h("span", { className: "po-journey-circle" },
              symbol ? h(Icon, { name: symbol, size: state === "current" ? "lg" : "md", weight: state === "done" ? "strong" : "regular" }) : null),
            state === "current"
              ? h("span", { className: "po-journey-pill" },
                  h("svg", { className: "po-journey-pill-bg", viewBox: "0 0 251 40", preserveAspectRatio: "none", "aria-hidden": "true" },
                    h("path", { d: "M6.97 20.5C6.97 6.5 0 0 0 0h243.03C247.43 0 251 3.58 251 8v24c0 4.42-3.57 8-7.97 8H0s6.97-6.5 6.97-19.5Z", vectorEffect: "non-scaling-stroke" })),
                  label)
              : label
          ),
          last ? null : h("span", { className: cx("po-journey-connector", line), "aria-hidden": "true" })
        );
      })
    );
  }

  // Contagem que leva à próxima etapa (WCAG 2.2.1): conta sozinha (padrão 10 s), chama onComplete ao zerar ou em "Continuar agora",
  // e "Pausar"/"Retomar" seguram a tela. O número é aria-hidden; uma região status (sempre presente) fala uma vez no início
  // e ao pausar ou retomar, nunca a cada segundo. Para quando a aba fica oculta e volta quando ela reaparece.
  // Sem onComplete é o modo antigo (depreciado): só exibe o seconds que o consumidor controla.
  function RedirectCountdown(props) {
    var auto = typeof props.onComplete === "function";
    var total = Math.max(1, Math.round(Number(props.seconds) || 10));
    var leftSt = React.useState(total), left = leftSt[0], setLeft = leftSt[1];
    var pausedSt = React.useState(false), paused = pausedSt[0], setPaused = pausedSt[1];
    var hiddenSt = React.useState(function () { return typeof document !== "undefined" && document.hidden; }), hidden = hiddenSt[0], setHidden = hiddenSt[1];
    var doneSt = React.useState(false), done = doneSt[0], setDone = doneSt[1];
    var msgSt = React.useState(""), message = msgSt[0], setMessage = msgSt[1];
    var onCompleteRef = React.useRef(props.onComplete);
    onCompleteRef.current = props.onComplete;
    var destination = textOf(props.children).replace(/\s+/g, " ").replace(/[\s.…]+$/, "").trim();

    // Esvazia e preenche de novo, para o leitor anunciar mesmo quando o texto se repete.
    function say(text) {
      setMessage("");
      setTimeout(function () { setMessage(text); }, 80);
    }
    function finish() {
      if (done) return;
      setDone(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }

    React.useEffect(function () {
      if (!auto) return undefined;
      say((destination || "Vamos para a próxima etapa") + " em " + total + " segundos. Use " + (props.pauseLabel || "Pausar") + " para ficar nesta tela.");
      function onVisibility() { setHidden(document.hidden); }
      document.addEventListener("visibilitychange", onVisibility);
      return function () { document.removeEventListener("visibilitychange", onVisibility); };
    }, []);

    var running = auto && !paused && !hidden && !done && left > 0;
    React.useEffect(function () {
      if (!running) return undefined;
      var id = setTimeout(function () { setLeft(function (n) { return n - 1; }); }, 1000);
      return function () { clearTimeout(id); };
    }, [running, left]);
    React.useEffect(function () { if (auto && left <= 0) finish(); }, [left]);

    if (!auto) {
      return h("div", { className: cx("po-countdown", props.className) },
        h("div", { className: "po-countdown-row" },
          h("span", { className: "po-countdown-number", "aria-hidden": "true" }, props.seconds),
          h("p", { className: "po-countdown-text" }, props.children)));
    }

    function togglePause() {
      if (done) return;
      if (paused) { setPaused(false); say("Redirecionamento retomado: " + left + (left === 1 ? " segundo." : " segundos.")); }
      else { setPaused(true); say("Redirecionamento pausado."); }
    }

    return h("div", { className: cx("po-countdown", props.className) },
      h("div", { className: "po-countdown-row" },
        h("span", { className: "po-countdown-number", "aria-hidden": "true" }, Math.max(0, left)),
        h("p", { className: "po-countdown-text" }, props.children)),
      h("span", { className: "po-sr-only", role: "status" }, message),
      done ? null : h("div", { className: "po-countdown-actions" },
        h(Button, { variant: "accent", size: "sm", iconEnd: "arrow_forward", onClick: finish }, props.continueLabel || "Continuar agora"),
        h("button", { type: "button", className: "po-countdown-pause", onClick: togglePause },
          paused ? (props.resumeLabel || "Retomar") : (props.pauseLabel || "Pausar")))
    );
  }

  // Tela cheia de virada entre etapas, sobre o gradiente: selo desenhado com Icon, h1, conteúdo (JourneyStepper) e rodapé (RedirectCountdown).
  // tone: success (padrão) | pending ("Estamos validando…", aria-busy, sem contagem). Falha não usa StatusScreen: use ResultHero tone="danger".
  // focusOnMount (padrão true) foca o h1 ao montar e quando o tom muda. badge com URL continua aceito (depreciado) e substitui o selo.
  var STATUS_TONES = { success: "check_circle", pending: "hourglass_top" };
  function StatusScreen(props) {
    var tone = STATUS_TONES[props.tone] ? props.tone : "success";
    var enabled = props.focusOnMount !== false;
    var ref = useFocusOnMount({ enabled: enabled, title: props.title, documentTitle: props.documentTitle });
    var prevTone = React.useRef(tone);
    React.useEffect(function () {
      if (prevTone.current === tone) return;
      prevTone.current = tone;
      if (enabled && ref.current) ref.current.focus({ preventScroll: true });
    }, [tone]);
    var badge = typeof props.badge === "string" && props.badge
      ? h("img", { className: "po-status-screen-badge-img", src: props.badge, alt: "", width: 80, height: 80 })
      : props.badge === false ? null
      : h("span", { className: cx("po-status-screen-badge", "po-status-screen-badge-" + tone), "aria-hidden": "true" },
          h(Icon, { name: STATUS_TONES[tone], size: "xl", fill: tone === "success" }));
    return h("section", { className: cx("po-status-screen", "po-status-screen-" + tone, props.className), "aria-busy": tone === "pending" ? "true" : undefined },
      h("div", { className: "po-status-screen-head" },
        badge,
        h("h1", { className: "po-status-screen-title", ref: ref, tabIndex: enabled ? -1 : undefined }, props.title),
        props.description ? h("p", { className: "po-status-screen-desc" }, props.description) : null
      ),
      props.children ? h("div", { className: "po-status-screen-body" }, props.children) : null,
      props.footer ? h("div", { className: "po-status-screen-foot" }, props.footer) : null
    );
  }

  // ── Seleção de documento ───────────────────────────────

  // Estado curto ao lado de um título. Não é clicável nem recebe foco. Tons: neutral, info, success, warning, danger.
  // success continua o padrão (badges antigos seguem verdes); tom desconhecido também vira success.
  var BADGE_TONES = { neutral: 1, info: 1, success: 1, warning: 1, danger: 1 };
  function Badge(props) {
    var tone = BADGE_TONES[props.tone] ? props.tone : "success";
    return h("span", { className: cx("po-badge", "po-badge-" + tone, props.className) }, props.children);
  }

  function ChevronDown16() { return h(Icon, { name: "keyboard_arrow_down", size: 20 }); }

  // Opção de rádio que expande ao ser escolhida, revelando as ações (ex.: ActionRow).
  // Dentro de um RadioGroup, o grupo dá o name, o valor e o onChange; selected/onSelect ficam para uso avulso.
  var optionSeq = 0;
  function DocumentOption(props) {
    var idRef = React.useRef(null);
    if (!idRef.current) idRef.current = "po-opt-" + (++optionSeq);
    var id = idRef.current;
    var ctx = React.useContext(ChoiceContext) || {};
    var selected = ctx.value !== undefined ? ctx.value === props.value : Boolean(props.selected);
    var expanded = props.expanded === undefined ? selected : props.expanded;
    var hasPanel = Boolean(expanded && props.children);
    return h("div", { className: cx("po-docopt", selected ? "po-docopt-selected" : null, ctx.invalid ? "po-docopt-invalid" : null, props.className) },
      h("label", { className: "po-docopt-head", htmlFor: id },
        h("input", { id: id, type: "radio", className: "po-docopt-input", name: ctx.name || props.name, value: props.value, checked: selected,
          onChange: function () { if (ctx.onChange) ctx.onChange(props.value); if (props.onSelect) props.onSelect(props.value); },
          "aria-describedby": props.description ? id + "-desc" : undefined,
          "aria-controls": hasPanel ? id + "-panel" : undefined }),
        h("span", { className: "po-docopt-radio", "aria-hidden": "true" }),
        h("span", { className: "po-docopt-text" },
          h("span", { className: "po-docopt-title" }, h("span", null, props.title), props.badge),
          props.description ? h("span", { className: "po-docopt-desc", id: id + "-desc" }, props.description) : null
        ),
        h("span", { className: cx("po-docopt-chevron", expanded ? "po-docopt-chevron-up" : null) }, h(ChevronDown16))
      ),
      hasPanel ? h("div", { className: "po-docopt-panel", id: id + "-panel" }, props.children) : null
    );
  }

  function CameraIcon() { return h(Icon, { name: "photo_camera", size: "lg" }); }

  function UploadIcon() { return h(Icon, { name: "upload", size: "lg" }); }

  function ChevronRight14() { return h(Icon, { name: "chevron_right", size: "sm" }); }

  var ACTION_ICON_NAMES = { camera: "photo_camera", upload: "upload" };

  // Cartão de ação: a linha inteira é o botão. icon: nome de símbolo ("qr_code_scanner") ou 'camera' | 'upload'; ReactNode continua aceito (depreciado).
  // description: linha de apoio (formato, motivo do indisponível), ligada por aria-describedby. disabled vira aria-disabled: continua no Tab e ignora o clique.
  function ActionRow(props) {
    var descId = useFieldId(undefined, "po-action-desc-");
    var icon = props.icon;
    var iconNode = typeof icon === "string" ? h(Icon, { name: ACTION_ICON_NAMES[icon] || icon, size: "lg" }) : icon;
    return h("button", { type: "button", className: cx("po-action", props.className),
        "aria-disabled": props.disabled ? "true" : undefined,
        "aria-describedby": props.description ? descId : undefined,
        onClick: function (e) { if (props.disabled) { e.preventDefault(); return; } if (props.onClick) props.onClick(e); } },
      h("span", { className: "po-action-icon" }, iconNode),
      h("span", { className: "po-action-text" },
        h("span", { className: "po-action-label" }, props.children),
        props.description ? h("span", { className: "po-action-desc", id: descId }, props.description) : null
      ),
      h("span", { className: "po-action-arrow" }, h(ChevronRight14))
    );
  }

  // Cartão de escolha de etapa. layout "inline" (padrão): ícone em círculo, título, apoio e seta à direita,
  // como "Filhos" ou "Cônjuge". layout "stacked": ícone e título na mesma linha, seta no canto e apoio embaixo,
  // como "Preencher eu mesmo". selected: borda de 2px. icon: nome de símbolo do Material. Toque avança; disabled vira aria-disabled.
  function OptionCard(props) {
    var descId = useFieldId(undefined, "po-optcard-desc-");
    var stacked = props.layout === "stacked";
    var attrs = {
      type: "button",
      className: cx("po-optcard", stacked ? "po-optcard-stacked" : null, props.selected ? "po-optcard-selected" : null, props.className),
      "aria-disabled": props.disabled ? "true" : undefined,
      "aria-describedby": props.description ? descId : undefined,
      onClick: function (e) { if (props.disabled) { e.preventDefault(); return; } if (props.onClick) props.onClick(e); }
    };
    if (stacked) {
      return h("button", attrs,
        h("span", { className: "po-optcard-head" },
          h("span", { className: "po-optcard-lead" }, h(Icon, { name: props.icon, size: "sm" }), h("span", { className: "po-optcard-title" }, props.title)),
          h("span", { className: "po-optcard-arrow" }, h(Icon, { name: "arrow_forward", size: "sm" }))
        ),
        props.description ? h("span", { className: "po-optcard-desc", id: descId }, props.description) : null
      );
    }
    return h("button", attrs,
      h("span", { className: "po-optcard-icon" }, h(Icon, { name: props.icon, size: "sm", tone: "brand" })),
      h("span", { className: "po-optcard-text" },
        h("span", { className: "po-optcard-title" }, props.title),
        props.description ? h("span", { className: "po-optcard-desc", id: descId }, props.description) : null
      ),
      h("span", { className: "po-optcard-arrow" }, h(ChevronRight14))
    );
  }

  // ── Listas ─────────────────────────────────────────────

  // Lista agrupada (Figma "Lista/Item"): cartão com linhas separadas por divisor e um rótulo de seção opcional.
  // É um <ul> nomeado pelo rótulo. Cada ListItem é informativo (estático) ou navega (a linha inteira é o botão/link).
  var listSeq = 0;
  function List(props) {
    var idRef = React.useRef(null);
    if (!idRef.current) idRef.current = "po-list-" + (++listSeq);
    var level = props.headingLevel >= 2 && props.headingLevel <= 6 ? props.headingLevel : 2;
    var labelId = props.label ? idRef.current + "-label" : undefined;
    return h("section", { className: cx("po-list-section", props.className) },
      props.label ? h("h" + level, { className: "po-list-label", id: labelId }, props.label) : null,
      h("ul", { className: "po-list", "aria-labelledby": labelId, "aria-label": props.label ? undefined : props.ariaLabel },
        React.Children.map(props.children, function (child) { return child ? h("li", { className: "po-list-li" }, child) : null; })
      )
    );
  }

  // Linha da lista. Com href ou onClick a linha inteira é o controle e ganha a seta; com action, a linha fica
  // estática e a ação é um botão de texto à direita (nunca os dois: não se aninha controle dentro de controle).
  var LIST_TONES = { "default": 1, danger: 1 };
  function ListItem(props) {
    var tone = LIST_TONES[props.tone] ? props.tone : "default";
    var interactive = !props.action && Boolean(props.href || props.onClick);
    var disabled = interactive && Boolean(props.disabled);
    var media = props.icon
      ? h("span", { className: "po-list-icon" }, typeof props.icon === "string" ? h(Icon, { name: props.icon, size: 20 }) : props.icon)
      : null;
    var text = h("span", { className: "po-list-text" },
      h("span", { className: "po-list-title" }, props.title),
      props.description ? h("span", { className: "po-list-desc" }, props.description) : null
    );
    var trailing = props.trailing ? h("span", { className: "po-list-trailing" }, props.trailing) : null;
    var cls = cx("po-list-item", tone === "danger" ? "po-list-item-danger" : null, interactive ? "po-list-item-link" : null);
    if (interactive) {
      var onClick = function (e) {
        if (disabled) { e.preventDefault(); return; }
        if (props.onClick) props.onClick(e);
      };
      var chevron = h("span", { className: "po-list-chevron" }, h(Icon, { name: "chevron_right", size: 20 }));
      var tag = props.href && !disabled ? "a" : "button";
      return h(tag, {
        className: cls, href: tag === "a" ? props.href : undefined, type: tag === "button" ? "button" : undefined,
        "aria-disabled": disabled ? "true" : undefined, onClick: onClick
      }, media, text, trailing, chevron);
    }
    var action = props.action
      ? h("button", { type: "button", className: cx("po-list-action", props.action.tone === "danger" ? "po-list-action-danger" : null), onClick: props.action.onClick,
          "aria-label": props.action.ariaLabel }, props.action.label)
      : null;
    return h("div", { className: cls }, media, text, trailing, action);
  }

  // ── Mídia e tutorial ───────────────────────────────────

  // Imagem com proporção/altura fixa e corte cover. alt é obrigatório: "" = decorativa; sem alt, aviso no console.
  // srcDark troca a fonte no tema escuro ([data-theme="dark"]); erro de carregamento volta ao placeholder. style e position são depreciados.
  function Image(props) {
    var failKey = (props.src || "") + "|" + (props.srcDark || "");
    var failed = React.useState("");
    React.useEffect(function () {
      if (props.alt === undefined && typeof console !== "undefined")
        console.warn("PalmeirasOnboarding.Image: passe alt. Use alt=\"\" quando a imagem só decora.");
    }, []);
    var style = Object.assign({}, props.height !== undefined ? { height: typeof props.height === "number" ? props.height + "px" : props.height } : null,
      props.ratio ? { aspectRatio: String(props.ratio) } : null, props.style);
    var alt = props.alt || "";
    var imgStyle = { objectFit: props.fit === "contain" ? "contain" : "cover", objectPosition: props.position || undefined };
    var ok = props.src && failed[0] !== failKey;
    function img(src, cls, key) {
      return h("img", { key: key, src: src, alt: alt, className: cx("po-image-img", cls), style: imgStyle,
        loading: props.loading === "eager" ? "eager" : "lazy", decoding: "async", onError: function () { failed[1](failKey); } });
    }
    return h("div", { className: cx("po-image", props.rounded ? "po-image-rounded" : null, props.className), style: style },
      ok
        ? (props.srcDark ? [img(props.src, "po-image-light", "l"), img(props.srcDark, "po-image-dark", "d")] : img(props.src, null, "l"))
        : h("div", { className: "po-image-placeholder", role: alt ? "img" : undefined, "aria-label": alt || undefined, "aria-hidden": alt ? undefined : "true" },
            h(Icon, { name: "image", size: "xl" })),
      props.children
    );
  }

  // Moldura de enquadramento, sempre decorativa (aria-hidden). variant: corners (procurando) | solid (enquadrado).
  // surface: media (padrão, border-brand sobre ilustração) | camera (camera-fg com contorno camera-bg: aparece sobre qualquer vídeo).
  // ratio (largura/altura): ocupa o maior espaço do pai na proporção. width/height/style continuam aceitos (depreciados).
  function ScanFrame(props) {
    var style = Object.assign({}, props.ratio ? { aspectRatio: String(props.ratio), "--po-frame-ratio": props.ratio } : null,
      props.width ? { width: props.width } : null, props.height ? { height: props.height } : null, props.style);
    var solid = props.variant === "solid";
    var frame = h("div", { className: cx("po-scanframe", props.surface === "camera" ? "po-scanframe-camera" : null, solid ? "po-scanframe-solid" : null,
        props.ratio ? "po-scanframe-ratio" : null, props.ratio ? null : props.className), style: style, "aria-hidden": props.ratio ? undefined : "true" },
      solid ? null : [h("span", { key: "tl", className: "po-scanframe-c po-scanframe-tl" }), h("span", { key: "tr", className: "po-scanframe-c po-scanframe-tr" }),
        h("span", { key: "bl", className: "po-scanframe-c po-scanframe-bl" }), h("span", { key: "br", className: "po-scanframe-c po-scanframe-br" })],
      props.children
    );
    return props.ratio ? h("div", { className: cx("po-scanframe-fit", props.className), "aria-hidden": "true" }, frame) : frame;
  }

  // Indicador de posição. Sem onSelect é decorativo (aria-hidden): a etapa está escrita no texto.
  // Com onSelect, cada ponto é um botão de 24px "Etapa N de M" com aria-current="step" (WCAG 2.5.8).
  function CarouselDots(props) {
    var count = props.count || 3;
    var active = props.active || 0;
    var dots = [];
    for (var i = 0; i < count; i++) {
      var dot = h("span", { key: "d", className: cx("po-dot", i === active ? "po-dot-active" : null) });
      dots.push(props.onSelect
        ? h("button", { key: i, type: "button", className: cx("po-dot-btn", i === active ? "po-dot-btn-active" : null), "aria-label": "Etapa " + (i + 1) + " de " + count,
            "aria-current": i === active ? "step" : undefined, onClick: (function (n) { return function () { props.onSelect(n); }; })(i) }, dot)
        : h(React.Fragment, { key: i }, dot));
    }
    return props.onSelect
      ? h("div", { className: cx("po-dots", "po-dots-interactive", props.className), role: "group", "aria-label": props.label || "Etapas" }, dots)
      : h("div", { className: cx("po-dots", props.className), "aria-hidden": "true" }, dots);
  }

  // Número do passo em círculo. O número é aria-hidden; o leitor ouve o texto oculto "Passo 1 de 3" (com total) ou "Passo 1".
  // noun troca a palavra ("Etapa" no tutorial). decorative: dentro de uma lista ordenada que já diz o passo, o círculo inteiro sai do leitor.
  function StepNumber(props) {
    var spoken = (props.noun || "Passo") + " " + props.value + (props.total ? " de " + props.total : "");
    return h("span", { className: cx("po-stepnum", props.className), "aria-hidden": props.decorative ? "true" : undefined },
      h("span", { "aria-hidden": props.decorative ? undefined : "true" }, props.value),
      props.decorative ? null : h("span", { className: "po-sr-only" }, spoken));
  }

  // Corpo de um passo do tutorial (usado pelo TutorialSlide e pelo Tutorial). embedded: dentro do Tutorial,
  // o slide já se chama "Etapa N de M", então o número fica decorativo e os pontos também.
  function tutorialSlideBody(props, embedded) {
    var step = props.step || 1;
    var frame = props.frame;
    var legacyFrame = frame && typeof frame === "object" && (frame.width || frame.height);
    var frameEl = !frame ? null : legacyFrame
      ? h("div", { className: "po-tutorial-frame" }, h(ScanFrame, { width: frame.width || 160, height: frame.height || 402, style: { maxHeight: "85%" } }))
      : h("div", { className: "po-tutorial-frame po-tutorial-frame-fit" }, h(ScanFrame, { ratio: 160 / 402 }));
    if (props.imageAlt === undefined && props.image && typeof console !== "undefined")
      console.warn("PalmeirasOnboarding.TutorialSlide: passe imageAlt (\"\" quando o título já explica a imagem).");
    return h("section", { className: cx("po-tutorial", props.className) },
      h(Image, { src: props.image, alt: props.imageAlt === undefined ? "" : props.imageAlt, height: "var(--size-media-hero)", loading: "eager" },
        frameEl,
        props.total > 1 ? h(CarouselDots, { className: "po-tutorial-dots", count: props.total, active: step - 1, onSelect: embedded ? undefined : props.onSelectStep }) : null
      ),
      h("div", { className: "po-tutorial-body" },
        h(StepNumber, { className: "po-tutorial-num", value: step, total: props.total, noun: "Etapa", decorative: embedded }),
        h("div", { className: "po-tutorial-text" },
          h("h1", { className: "po-tutorial-title" }, props.title),
          props.description ? h("p", { className: "po-tutorial-desc" }, props.description) : null
        ),
        h(Button, { size: "sm", iconStart: props.actionIcon === "photo_camera" ? "photo_camera" : undefined,
          iconEnd: props.actionIcon === "photo_camera" ? undefined : "arrow_forward", onClick: props.onContinue }, props.actionLabel || "Continuar")
      )
    );
  }

  // Um passo do tutorial: imagem (clamp 240–470px), pontos, número, título, texto e "Continuar".
  // Sozinho, o número lê "Etapa N de M". frame: true mostra a moldura (objeto com width/height é depreciado).
  function TutorialSlide(props) { return tutorialSlideBody(props, false); }

  // Tutorial antes da câmera, no padrão de carrossel do WAI-ARIA: região "carrossel" com nome, slide "Etapa N de M",
  // troca anunciada (polite), sem avanço automático. Voltar no header (na etapa 1 chama onExit), "Pular" e, no último passo, "Abrir câmera".
  function Tutorial(props) {
    var steps = props.steps || [];
    var total = steps.length;
    var controlled = props.step !== undefined;
    var inner = React.useState(props.defaultStep || 1);
    var step = Math.min(Math.max(controlled ? props.step : inner[0], 1), Math.max(total, 1));
    var live = React.useState("");
    var first = React.useRef(true);
    var rootRef = React.useRef(null);
    var touch = React.useRef(null);
    var s = steps[step - 1] || {};

    React.useEffect(function () {
      if (first.current) { first.current = false; return; }
      live[1]("Etapa " + step + " de " + total + ", " + textOf(s.title));
    }, [step]);

    function go(n) {
      if (n < 1 || n > total) return;
      if (!controlled) inner[1](n);
      if (props.onStepChange) props.onStepChange(n);
    }
    function back() {
      if (step > 1) {
        // Na etapa 1 o voltar some (sem onExit): o foco vai para o botão do passo.
        if (step === 2 && !props.onExit && rootRef.current) {
          var btn = rootRef.current.querySelector(".po-tutorial-body .po-btn");
          setTimeout(function () { if (btn) btn.focus(); }, 0);
        }
        go(step - 1);
      } else if (props.onExit) props.onExit();
    }
    function next() { if (step < total) go(step + 1); else if (props.onFinish) props.onFinish(); }
    var last = step === total;
    var showBack = step > 1 || Boolean(props.onExit);
    var showHeader = props.title !== undefined || props.onSkip || props.onExit || total > 1;

    return h("section", { ref: rootRef, className: cx("po-tutorial-carousel", props.className), "aria-roledescription": "carrossel", "aria-label": props.label,
        onTouchStart: function (e) { touch.current = e.touches && e.touches[0] ? e.touches[0].clientX : null; },
        onTouchEnd: function (e) {
          var x = touch.current; touch.current = null;
          if (x == null || !e.changedTouches || !e.changedTouches[0]) return;
          var dx = e.changedTouches[0].clientX - x;
          if (dx < -50 && step < total) go(step + 1);
          else if (dx > 50 && step > 1) go(step - 1);
        } },
      showHeader ? h("div", { className: "po-header po-tutorial-header" },
        h("div", { className: "po-header-icon" },
          showBack ? h(IconButton, { className: "po-header-action", variant: "subtle", size: "sm", iconSize: "md", icon: "chevron_left",
            label: step > 1 ? "Voltar para a etapa " + (step - 1) : (props.exitLabel || "Voltar"), onClick: back }) : null),
        h("span", { className: "po-header-text" }, props.title),
        props.onSkip ? h(Button, { variant: "tertiary", size: "sm", fullWidth: false, className: "po-tutorial-skip", onClick: props.onSkip }, props.skipLabel || "Pular") : null
      ) : null,
      h("div", { role: "group", "aria-roledescription": "slide", "aria-label": "Etapa " + step + " de " + total, className: "po-tutorial-slide" },
        tutorialSlideBody({ step: step, total: total, title: s.title, description: s.description, image: s.image, imageAlt: s.imageAlt, frame: s.frame,
          actionLabel: last ? (props.finishLabel || "Abrir câmera") : (props.continueLabel || "Continuar"), actionIcon: last ? "photo_camera" : null, onContinue: next }, true)),
      h("div", { className: "po-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true" }, live[0])
    );
  }

  // ── Upload ─────────────────────────────────────────────

  function formatBytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return Math.round(n / 1024) + " KB";
    return (n / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
  }

  var UPLOAD_ACCEPT = "application/pdf,image/jpeg,image/png,image/heic";
  // Nome curto de cada tipo para as regras e os erros. HEIC/HEIF são aceitos mas não aparecem: é a foto do iPhone, que a pessoa conhece como foto.
  var UPLOAD_TYPE_NAMES = { "application/pdf": "PDF", ".pdf": "PDF", "image/jpeg": "JPG", "image/jpg": "JPG", ".jpg": "JPG", ".jpeg": "JPG",
    "image/png": "PNG", ".png": "PNG", "image/*": "imagem", "image/heic": "", "image/heif": "", ".heic": "", ".heif": "" };
  var UPLOAD_EXT_TYPES = { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", heic: "image/heic", heif: "image/heif" };

  function uploadTypeText(accept) {
    var seen = [];
    accept.split(",").forEach(function (t) {
      var k = t.trim().toLowerCase();
      var n = UPLOAD_TYPE_NAMES[k] === undefined ? k.replace(/^\./, "").toUpperCase() : UPLOAD_TYPE_NAMES[k];
      if (n && seen.indexOf(n) === -1) seen.push(n);
    });
    if (seen.length < 2) return seen.join("");
    return seen.slice(0, -1).join(", ") + " ou " + seen[seen.length - 1];
  }
  function fmtMB(mb) { return String(mb).replace(".", ",") + " MB"; }

  // Campo de arquivo: <input type="file"> nativo cobrindo a área tracejada (toque, clique, Tab, arrastar e leitor de tela chegam no mesmo controle).
  // label obrigatório; regras e erros saem de accept e maxSizeMB ("PDF, JPG ou PNG, até 5 MB"). status: idle | uploading (+progress) | done | error.
  // Com arquivo: nome, tamanho, "Trocar" (a própria área) e "Remover"/"Cancelar" com o nome do arquivo no rótulo. Valida antes de chamar onFile.
  var uploadSeq = 0;
  function UploadArea(props) {
    var idRef = React.useRef(null);
    if (!idRef.current) idRef.current = props.id || "po-upload-" + (++uploadSeq);
    var id = idRef.current;
    var inputRef = React.useRef(null);
    var dragDepth = React.useRef(0);
    var drag = React.useState(false);
    var err = React.useState(null);
    var picked = React.useState(null);
    var said = React.useState("");
    var controlled = props.file !== undefined;
    var file = controlled ? props.file : picked[0];
    var accept = props.accept || UPLOAD_ACCEPT;
    var maxMB = props.maxSizeMB || 5;
    var typeText = uploadTypeText(accept);
    var rules = (typeText ? typeText + ", até " : "Até ") + fmtMB(maxMB);
    var status = props.status || "idle";
    var label = props.label;
    if (!label) label = textOf(props.hint) || "Arquivo";
    React.useEffect(function () {
      if (!props.label && typeof console !== "undefined") console.warn("PalmeirasOnboarding.UploadArea: passe label (ex.: \"Documento de identidade (CIN)\").");
    }, []);

    var error = err[0] || props.error || (status === "error" ? "Não foi possível enviar o arquivo. Tente de novo." : null);
    var uploading = Boolean(file) && status === "uploading" && !err[0];
    var done = Boolean(file) && status === "done" && !error;
    var progress = Math.max(0, Math.min(100, Math.round(props.progress || 0)));
    var bucket = uploading ? Math.floor(progress / 25) * 25 : -1;
    var name = file ? file.name : "";

    // Anúncio polite: arquivo escolhido, progresso a cada 25%, enviado. O erro é anunciado pela FormMessage live.
    React.useEffect(function () {
      if (!file) { said[1](""); return; }
      if (uploading) said[1]("Enviando " + name + ": " + bucket + "%");
      else if (done) said[1](name + " enviado");
      else if (!error) said[1]("Arquivo escolhido: " + name);
    }, [name, uploading, done, bucket]);

    function okType(f) {
      var types = accept.split(",").map(function (x) { return x.trim().toLowerCase(); });
      var ext = (f.name.split(".").pop() || "").toLowerCase();
      var mime = (f.type || UPLOAD_EXT_TYPES[ext] || "").toLowerCase();
      return types.some(function (t) {
        return t === mime || (t.charAt(0) === "." && t === "." + ext) || (t.slice(-2) === "/*" && mime.indexOf(t.slice(0, -1)) === 0);
      });
    }
    function take(list) {
      var f = list && list[0];
      if (!f) return;
      if (!okType(f)) { err[1](props.typeError || "O arquivo deve ser " + (typeText || "de um tipo aceito") + "."); return; }
      if (f.size === 0) { err[1]("O arquivo está vazio."); return; }
      if (f.size > maxMB * 1024 * 1024) { err[1](props.sizeError || "O arquivo deve ter menos de " + fmtMB(maxMB) + "."); return; }
      err[1](null);
      if (!controlled) picked[1](f);
      if (props.onFile) props.onFile(f);
    }
    function remove() {
      err[1](null);
      if (!controlled) picked[1](null);
      if (props.onRemove) props.onRemove();
      setTimeout(function () { if (inputRef.current) inputRef.current.focus(); }, 0);
    }

    var rulesId = id + "-rules", fileId = id + "-file", msgId = id + "-msg";
    var state = error ? "error" : uploading ? "uploading" : done ? "done" : file ? "filled" : "empty";
    var fileIcon = state === "done" ? "check_circle" : state === "error" ? "error" : "description";
    var meta = uploading ? "Enviando… " + progress + "%" : done ? formatBytes(file.size) + " · Enviado" : file ? formatBytes(file.size) : "";

    return h("div", { className: cx("po-upload-wrap", props.className) },
      h("div", {
        className: cx("po-upload", "po-upload-" + state, drag[0] ? "po-upload-drag" : null),
        onDragEnter: function () { dragDepth.current++; drag[1](true); },
        onDragLeave: function () { dragDepth.current = Math.max(0, dragDepth.current - 1); if (!dragDepth.current) drag[1](false); },
        onDrop: function () { dragDepth.current = 0; drag[1](false); }
      },
        h("input", { ref: inputRef, id: id, type: "file", className: "po-upload-input", accept: accept, disabled: uploading || undefined,
          "aria-describedby": cx(file ? fileId : rulesId, error ? msgId : null), "aria-invalid": error ? "true" : undefined,
          onChange: function (e) { take(e.target.files); e.target.value = ""; } }),
        file
          ? h("div", { className: "po-upload-file" },
              h(Icon, { name: fileIcon, size: "lg", fill: state === "done" || state === "error", className: "po-upload-file-icon" }),
              h("div", { className: "po-upload-file-text" },
                h("label", { htmlFor: id, className: "po-sr-only" }, label + (uploading ? "" : ", trocar arquivo")),
                h("span", { id: fileId, className: "po-upload-file-info" },
                  h("span", { className: "po-upload-name" }, name),
                  h("span", { className: "po-sr-only" }, ", "),
                  h("span", { className: "po-upload-meta" }, meta)),
                uploading ? h("span", { className: "po-upload-progress", "aria-hidden": "true" }, h("span", { style: { width: progress + "%" } })) : null,
                uploading ? null : h("span", { className: "po-upload-swap", "aria-hidden": "true" }, "Trocar")),
              uploading
                ? (props.onCancel ? h(IconButton, { className: "po-upload-action", variant: "subtle", size: "sm", icon: "close", label: "Cancelar envio de " + name, onClick: props.onCancel }) : null)
                : (props.onRemove ? h(IconButton, { className: "po-upload-action", variant: "subtle", size: "sm", icon: "delete", label: "Remover " + name, onClick: remove }) : null))
          : h("div", { className: "po-upload-empty" },
              h(Icon, { name: "upload", size: "sm", fill: true }),
              h("label", { htmlFor: id, className: cx("po-upload-label", props.labelHidden ? "po-sr-only" : null) }, label),
              h("p", { className: "po-upload-hint", id: rulesId }, props.hint || rules))
      ),
      error ? h(FormMessage, { id: msgId, live: true }, error) : null,
      h("span", { className: "po-sr-only", role: "status", "aria-live": "polite" }, said[0])
    );
  }

  // ── Câmera ─────────────────────────────────────────────

  var CAMERA_STATES = { starting: 1, aligning: 1, aligned: 1, capturing: 1, denied: 1, unavailable: 1 };
  var CAMERA_FRAMES = { card: 54 / 85.6, open: 206 / 590 };

  // Tela de captura do documento: faixa com a instrução (só ela é região viva), vídeo (children), máscara e moldura branca com contorno,
  // e o rodapé com "Tirar foto" (64px) e "Enviar arquivo". state: starting | aligning | aligned | capturing | denied | unavailable.
  // autoCapture é atalho: dispara após ~1s enquadrado, e o botão continua lá. Em denied/unavailable a tela oferece configurações e upload.
  function CameraCapture(props) {
    var state = CAMERA_STATES[props.state] ? props.state : "aligning";
    var blocked = state === "denied" || state === "unavailable";
    var aligned = state === "aligned" || state === "capturing";
    var onCapture = props.onCapture;
    React.useEffect(function () {
      if (!props.autoCapture || state !== "aligned" || !onCapture) return;
      var t = setTimeout(function () { onCapture(); }, 1000);
      return function () { clearTimeout(t); };
    }, [state, props.autoCapture]);
    React.useEffect(function () {
      if (props.haptics && state === "aligned" && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40);
    }, [state]);

    var msg = state === "starting" ? "Abrindo a câmera…"
      : state === "aligned" ? (props.successMessage || (props.autoCapture ? "Enquadramento perfeito! Segure firme…" : "Enquadramento perfeito!"))
      : state === "capturing" ? "Tirando a foto…"
      : state === "denied" ? "Sem acesso à câmera"
      : state === "unavailable" ? "Câmera indisponível"
      : (props.instruction || "Enquadre o documento na moldura");

    var legacy = props.frameWidth || props.frameHeight || props.frameTop !== undefined;
    var frameVariant = aligned ? "solid" : "corners";
    var windowEl = legacy
      ? h("div", { className: "po-camera-window po-camera-window-legacy", style: { width: (props.frameWidth || 206) + "px", height: (props.frameHeight || 590) + "px", top: (props.frameTop === undefined ? 17 : props.frameTop) + "px" } },
          h(ScanFrame, { variant: frameVariant, surface: "camera", width: "100%", height: "100%" }))
      : h("div", { className: "po-camera-window" }, h(ScanFrame, { variant: frameVariant, surface: "camera", ratio: CAMERA_FRAMES[props.frame] || CAMERA_FRAMES.open }));

    var uploadBtn = props.onUseUpload;
    return h("section", { className: cx("po-camera", aligned ? "po-camera-aligned" : null, blocked ? "po-camera-blocked" : null, props.className), "aria-label": "Câmera" },
      h("div", { className: "po-camera-bar" },
        h("div", { className: "po-camera-side" },
          props.onBack ? h(IconButton, { className: "po-camera-back", variant: "subtle", size: "sm", iconSize: "md", icon: "chevron_left", label: "Voltar", onClick: props.onBack }) : null),
        h("p", { className: "po-camera-msg", role: "status", "aria-live": "polite" },
          aligned ? h(Icon, { name: "check", size: "sm", weight: "strong" }) : null, h("span", null, msg)),
        h("div", { className: "po-camera-side", "aria-hidden": "true" })
      ),
      h("div", { className: "po-camera-viewport" },
        blocked
          ? h("div", { className: "po-camera-panel" },
              h(Icon, { name: state === "denied" ? "no_photography" : "videocam_off", size: "xl" }),
              h("p", { className: "po-camera-panel-text" }, state === "denied"
                ? "Para fotografar o documento, libere a câmera nas configurações do navegador ou do celular. Você também pode enviar um arquivo."
                : "Não conseguimos abrir a câmera deste aparelho. Envie a foto ou o PDF do documento."),
              state === "denied" && props.onOpenSettings ? h(Button, { size: "sm", onClick: props.onOpenSettings }, "Abrir configurações") : null,
              uploadBtn ? h(Button, { size: "sm", variant: state === "denied" && props.onOpenSettings ? "secondary" : "primary", iconStart: "upload", onClick: props.onUseUpload }, "Enviar arquivo") : null)
          : [props.children ? h("div", { key: "f", className: "po-camera-feed" }, props.children) : null, h(React.Fragment, { key: "w" }, windowEl)]
      ),
      !blocked && (onCapture || uploadBtn) ? h("div", { className: "po-camera-footer" },
        h("div", { className: "po-camera-footer-side" },
          uploadBtn ? h("button", { type: "button", className: "po-camera-upload", onClick: props.onUseUpload }, h(Icon, { name: "upload", size: "sm" }), "Enviar arquivo") : null),
        onCapture ? h("button", { type: "button", className: "po-camera-shutter", "aria-label": "Tirar foto",
          "aria-disabled": state === "starting" || state === "capturing" ? "true" : undefined, "aria-busy": state === "capturing" ? "true" : undefined,
          onClick: function () { if (state !== "starting" && state !== "capturing") onCapture(); } }, h("span", { className: "po-camera-shutter-core" })) : h("span", null),
        h("div", { className: "po-camera-footer-side" })
      ) : null
    );
  }

  // FaceCapture: captura de selfie guiada pelo movimento da cabeça (prova de vida). Círculo com anel de progresso, moldura oval e contagem; o consumidor fornece o vídeo, a detecção e os tempos.
  var FACE_STATES = { idle: 1, progress: 1, frame: 1, success: 1, warning: 1, countdown: 1 };
  function FaceCapture(props) {
    var state = FACE_STATES[props.state] ? props.state : "idle";
    var progress = Math.min(1, Math.max(0, props.progress || 0));
    var side = props.direction === "right" ? "right" : "left";
    var ring = state === "success" || state === "countdown" ? "success" : state === "warning" ? "warning" : null;
    var counting = state === "countdown" && props.countdown !== undefined;
    return h("div", { className: cx("po-face", props.className), "data-state": state },
      h("div", { className: "po-face-circle" },
        props.children ? h("div", { className: "po-face-feed" }, props.children) : null,
        state === "frame" ? h("div", { className: "po-face-oval", "aria-hidden": "true" }) : null,
        // Sem progresso não desenha o arco: a ponta arredondada de um traço vazio vira um ponto.
        state === "progress" && progress > 0 ? h("svg", { className: "po-face-arc po-face-arc-" + side, viewBox: "0 0 100 100", "aria-hidden": "true" },
          h("circle", { cx: 50, cy: 50, r: 48, pathLength: 100, strokeDasharray: (progress * 50) + " 100" })) : null,
        ring ? h("div", { className: "po-face-ring po-face-ring-" + ring, "aria-hidden": "true" }) : null,
        counting ? h("span", { className: "po-face-count", "aria-hidden": "true" }, h("span", { className: "po-face-count-num" }, props.countdown)) : null),
      // Região viva sempre presente (criada vazia): fala só a contagem, "Foto em 3".
      h("span", { className: "po-sr-only", role: "status", "aria-live": "polite" }, counting ? "Foto em " + props.countdown : ""));
  }

  // Texto de região viva que só entra depois de montar: região criada já preenchida costuma não ser lida.
  function useLiveText(text) {
    var s = React.useState(""), live = s[0], setLive = s[1];
    React.useEffect(function () {
      setLive("");
      if (!text) return;
      var t = setTimeout(function () { setLive(text); }, 100);
      return function () { clearTimeout(t); };
    }, [text]);
    return live;
  }

  // OrientationHint: tela cheia para o celular na vertical. Aparece e some pelo `visible` do consumidor; sem botão nem dispensa.
  function OrientationHint(props) {
    var message = props.message || "Posicione seu celular na vertical.";
    var live = useLiveText(props.visible ? message : "");
    if (!props.visible) return null;
    return h("div", { className: cx("po-orientation", props.className) },
      h("span", { className: "po-icon po-orientation-icon", "aria-hidden": "true" }, "screen_rotation"),
      h("p", { className: "po-orientation-text", "aria-hidden": "true" }, message),
      h("span", { className: "po-sr-only", role: "alert" }, live));
  }

  // LoadingState: espera enquanto o backend valida. Gira o spinner, mas com movimento reduzido fica como arco estático.
  function LoadingState(props) {
    var live = useLiveText(props.description ? props.title + " " + props.description : props.title);
    return h("div", { className: cx("po-loading", props.className) },
      h("span", { className: "po-loading-spinner", "aria-hidden": "true" }),
      h("div", { className: "po-loading-copy", "aria-hidden": "true" },
        h("p", { className: "po-loading-title" }, props.title),
        props.description ? h("p", { className: "po-loading-text" }, props.description) : null),
      h("span", { className: "po-sr-only", role: "status", "aria-live": "polite" }, live));
  }

  window.PalmeirasOnboarding = Object.assign(window.PalmeirasOnboarding || {}, {
    CameraCapture: CameraCapture,
    UploadArea: UploadArea,
    Image: Image,
    ScanFrame: ScanFrame,
    CarouselDots: CarouselDots,
    StepNumber: StepNumber,
    TutorialSlide: TutorialSlide,
    Tutorial: Tutorial,
    Icon: Icon,
    Badge: Badge,
    DocumentOption: DocumentOption,
    ActionRow: ActionRow,
    OptionCard: OptionCard,
    Toast: Toast,
    ToastRegion: ToastRegion,
    ErrorSummary: ErrorSummary,
    // Não é componente: dispara um toast na ToastRegion.
    toast: toast,
    ResultHero: ResultHero,
    Select: Select,
    StatusScreen: StatusScreen,
    JourneyStepper: JourneyStepper,
    RedirectCountdown: RedirectCountdown,
    OTPInput: OTPInput,
    Alert: Alert,
    StatusCard: StatusCard,
    ContactRow: ContactRow,
    ResendPrompt: ResendPrompt,
    Button: Button,
    IconButton: IconButton,
    TextLink: TextLink,
    SocialButton: SocialButton,
    TextField: TextField,
    FormMessage: FormMessage,
    Checkbox: Checkbox,
    Radio: Radio,
    RadioGroup: RadioGroup,
    CheckboxGroup: CheckboxGroup,
    Tabs: Tabs,
    SegmentedControl: SegmentedControl,
    AppHeader: AppHeader,
    ProgressBar: ProgressBar,
    LanguageSelector: LanguageSelector,
    ProfileMenu: ProfileMenu,
    // Não é componente: a tabela de idiomas (PT, ES, EN) para as telas usarem nos próprios textos.
    LANGUAGES: LANGUAGES,
    PageHeading: PageHeading,
    DividerText: DividerText,
    LegalFooter: LegalFooter,
    FaceCapture: FaceCapture,
    OrientationHint: OrientationHint,
    LoadingState: LoadingState,
    List: List,
    ListItem: ListItem,
    // Não é componente: validadores dos presets para usar ao enviar o formulário.
    // Não são componentes: máscaras do DS para exibir contato (LGPD: só o mínimo).
    maskPhone: maskPhone,
    maskEmail: maskEmail,
    validators: validators
  });
})();
