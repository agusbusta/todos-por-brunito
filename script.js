// ---- Progreso de la campaña ----
// Para actualizar lo recaudado: cambiar estos 3 valores, guardar, y hacer commit + push.
// (Vercel redeploya solo si el repo de GitHub está conectado)
var CAMPAIGN = {
  raised: 241100,
  goal: 7260550,
  updated: '24/09/2026'
};

(function () {
  var toastEl = document.getElementById('toast');
  var toastTimer;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      /* no-op */
    }
    document.body.removeChild(textarea);
    return Promise.resolve();
  }

  var copyBtn = document.getElementById('copy-btn');
  var aliasText = document.getElementById('alias-text');
  var copyBtnText = document.getElementById('copy-btn-text');

  if (copyBtn && aliasText) {
    copyBtn.addEventListener('click', function () {
      copyText(aliasText.textContent.trim()).then(function () {
        copyBtn.classList.add('copied');
        if (copyBtnText) copyBtnText.textContent = 'Copiado ✓';
        showToast('Alias copiado');
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          if (copyBtnText) copyBtnText.textContent = 'Copiar';
        }, 2000);
      });
    });
  }

  var copyLinkBtn = document.getElementById('copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      copyText(window.location.href).then(function () {
        showToast('Link copiado');
      });
    });
  }

  var shareWhatsapp = document.getElementById('share-whatsapp');
  if (shareWhatsapp) {
    var msg = 'Ayudemos a Bruno a conseguir su casco ortopédico 💚 ' + window.location.href;
    shareWhatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastFocused = null;

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.doc-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(btn.getAttribute('data-full'), btn.getAttribute('data-caption'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  function formatARS(n) {
    return '$' + Math.round(n).toLocaleString('es-AR');
  }

  var fillEl = document.getElementById('progress-fill');
  var barEl = document.getElementById('progress-bar');
  var raisedEl = document.getElementById('progress-raised');
  var goalEl = document.getElementById('progress-goal');
  var percentEl = document.getElementById('progress-percent');
  var updatedEl = document.getElementById('progress-updated');

  if (fillEl && CAMPAIGN.goal > 0) {
    var pct = Math.min(100, Math.max(0, (CAMPAIGN.raised / CAMPAIGN.goal) * 100));
    var pctRounded = Math.round(pct * 10) / 10;
    fillEl.style.width = pct + '%';
    if (barEl) barEl.setAttribute('aria-valuenow', String(Math.round(pct)));
    if (raisedEl) raisedEl.textContent = formatARS(CAMPAIGN.raised);
    if (goalEl) goalEl.textContent = formatARS(CAMPAIGN.goal);
    if (percentEl) percentEl.textContent = pctRounded + '%';
    if (updatedEl) updatedEl.textContent = CAMPAIGN.updated;
  }
})();
