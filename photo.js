// Foto de perfil (protótipo). Abre a folha de ações pelo avatar, recorta em quadrado com zoom
// centralizado, salva em 256px (JPEG) no localStorage e aplica em todos os avatares da área logada.
(function () {
  var KEY = 'po-proto-avatar';
  var sheet = document.getElementById('photo-sheet');
  var edit = document.getElementById('photo-edit');
  var fileGallery = document.getElementById('photo-input');
  var fileCamera = document.getElementById('photo-camera');
  var zoom = document.getElementById('photo-zoom');
  var preview = document.getElementById('photo-preview');
  var removeBtn = document.getElementById('photo-remove');
  var errorP = document.getElementById('photo-error');
  var saveBtn = document.getElementById('photo-save');
  var lastTrigger = null, source = null;

  function avatars() { return document.querySelectorAll('.area-avatar'); }

  function apply(dataUrl) {
    avatars().forEach(function (a) {
      a.innerHTML = dataUrl
        ? '<img alt="" src="' + dataUrl + '">'
        : '<span class="po-icon s26" aria-hidden="true">person</span>';
    });
    removeBtn.hidden = !dataUrl;
    try {
      // 'none' marca que a pessoa removeu a foto; sem registro, vale o mock padrão do HTML.
      localStorage.setItem(KEY, dataUrl || 'none');
    } catch (e) { /* armazenamento indisponível: a foto vale só nesta sessão */ }
  }

  function drawCrop(canvas, size) {
    var c = canvas.getContext('2d');
    var side = Math.min(source.width, source.height) / Number(zoom.value);
    var sx = (source.width - side) / 2, sy = (source.height - side) / 2;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(source, sx, sy, side, side, 0, 0, size, size);
  }

  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  function openSheet(trigger) {
    lastTrigger = trigger;
    show(sheet);
    sheet.querySelector('.photo-item').focus();
  }

  function closeAll() {
    hide(sheet); hide(edit); errorP.hidden = true;
    if (lastTrigger) lastTrigger.focus();
  }

  function focusables(panel) {
    return [].slice.call(panel.querySelectorAll('button, input')).filter(function (x) {
      return !x.disabled && x.offsetParent !== null;
    });
  }

  function trap(e, panel) {
    if (e.key !== 'Tab') return;
    var f = focusables(panel);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-photo-open]');
    if (open) { openSheet(open); return; }
    if (e.target.closest('[data-photo-close]') || e.target.closest('[data-photo-edit-cancel]')) { closeAll(); return; }
    var act = e.target.closest('[data-photo-act]');
    if (!act) return;
    var kind = act.getAttribute('data-photo-act');
    if (kind === 'camera') { fileCamera.value = ''; fileCamera.click(); }
    if (kind === 'gallery') { fileGallery.value = ''; fileGallery.click(); }
    if (kind === 'remove') { apply(null); closeAll(); }
  });

  function onFile(input) {
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          source = img;
          hide(sheet);
          zoom.value = '1';
          drawCrop(preview, preview.width);
          show(edit);
          zoom.focus();
        };
        img.onerror = function () {
          hide(sheet); show(edit);
          errorP.textContent = 'Não foi possível abrir essa imagem. Tente outra foto.';
          errorP.hidden = false;
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  onFile(fileGallery);
  onFile(fileCamera);

  zoom.addEventListener('input', function () { if (source) drawCrop(preview, preview.width); });

  saveBtn.addEventListener('click', function () {
    if (!source) return;
    var out = document.createElement('canvas');
    out.width = out.height = 256;
    drawCrop(out, 256);
    apply(out.toDataURL('image/jpeg', 0.85));
    closeAll();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && (!sheet.hidden || !edit.hidden)) { e.preventDefault(); closeAll(); return; }
    if (!sheet.hidden) trap(e, sheet.querySelector('.photo-panel'));
    if (!edit.hidden) trap(e, edit.querySelector('.photo-panel'));
  });

  // Sem foto salva, a foto mock já vem no HTML (assets/foto-perfil-mock.svg): só libera "Remover foto".
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* sem armazenamento */ }
  if (saved === 'none') apply(null);
  else if (saved) apply(saved);
  else removeBtn.hidden = false;
})();
