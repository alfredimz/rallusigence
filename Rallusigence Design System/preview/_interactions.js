/* ============================================================
   RALLUSIGENCE — Preview interactions (shared)
   Tap-to-copy swatches + toast feedback
   ============================================================ */

(function () {
  // ---------- Toast ---------------------------------------------------
  function ensureToast() {
    let host = document.querySelector('.rs-toast-host');
    if (host) return host;
    host = document.createElement('div');
    host.className = 'rs-toast-host';
    host.style.cssText =
      'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);' +
      'display:flex;flex-direction:column;gap:8px;align-items:center;' +
      'z-index:10000;pointer-events:none;';
    document.body.appendChild(host);
    return host;
  }

  function toast(msg, opts) {
    const host = ensureToast();
    const t = document.createElement('div');
    const tone = (opts && opts.tone) || 'default';
    const bg = tone === 'success' ? '#10B981' : tone === 'error' ? '#EF4444' : '#2C2C2C';
    t.style.cssText =
      'background:' + bg + ';color:#fff;font-family:Montserrat,system-ui,sans-serif;' +
      'font-size:13px;font-weight:500;padding:10px 16px;border-radius:24px;' +
      'box-shadow:0 8px 24px rgba(0,0,0,.18);' +
      'opacity:0;transform:translateY(8px) scale(.96);' +
      'transition:opacity .25s cubic-bezier(.16,1,.3,1),transform .25s cubic-bezier(.16,1,.3,1);';
    t.textContent = msg;
    host.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0) scale(1)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-4px) scale(.98)';
      setTimeout(() => t.remove(), 250);
    }, (opts && opts.duration) || 1600);
  }

  // ---------- Tap-to-copy --------------------------------------------
  // Any element with [data-copy] copies its value (or its textContent) and
  // ripples in its own colour.
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    return fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return Promise.resolve();
  }

  function rippleFromEvent(host, event, color) {
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 1.2;
    const x = (event.clientX || (r.left + r.width / 2)) - r.left - size / 2;
    const y = (event.clientY || (r.top + r.height / 2)) - r.top - size / 2;
    const s = document.createElement('span');
    s.style.cssText =
      'position:absolute;border-radius:50%;pointer-events:none;' +
      'left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:' + size + 'px;' +
      'background:' + (color || 'rgba(255,255,255,.45)') + ';' +
      'transform:scale(0);opacity:.6;' +
      'transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .55s ease-out;';
    const cs = getComputedStyle(host);
    if (cs.position === 'static') host.style.position = 'relative';
    if (cs.overflow !== 'hidden') host.style.overflow = 'hidden';
    host.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = 'scale(1)';
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 600);
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-copy]');
    if (!el) return;
    const value = el.getAttribute('data-copy') || el.textContent.trim();
    const label = el.getAttribute('data-copy-label') || value;
    const rippleColor = el.getAttribute('data-ripple') || 'rgba(255,255,255,.5)';
    rippleFromEvent(el, e, rippleColor);
    copyText(value).then(() => toast('Copiado · ' + label, { tone: 'success' }));
  });

  // Cursor hint for copy targets
  const styleId = 'rs-preview-style';
  if (!document.getElementById(styleId)) {
    const st = document.createElement('style');
    st.id = styleId;
    st.textContent =
      '[data-copy]{cursor:copy;position:relative;}' +
      '[data-copy]:focus-visible{outline:2px solid #20B4B1;outline-offset:2px;}';
    document.head.appendChild(st);
  }

  window.RS = window.RS || {};
  window.RS.toast = toast;
  window.RS.copyText = copyText;
  window.RS.ripple = rippleFromEvent;
})();
