/* Pointer: the normal arrow shape, solid black on the light version and solid white on the dark one. Over anything clickable (links, buttons, pictures
   that open) it inverts whatever is under it. Mouse and trackpad only (nothing on touch screens or with reduced-motion); off with "Pause animations". Text fields keep
   the normal text cursor. The real arrow is hidden from the first paint (class zc-pre, set in <head>), and the pointer position is carried to the next
   page, so the two never show together and nothing flashes between pages. No animation loop: it only moves when the mouse moves. */
(function () {
  'use strict';
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) { document.documentElement.classList.remove('zc-pre'); return; }
  var root = document.documentElement;
  var BIG = 'a[href], button, summary, select, label[for], [role="button"], [data-zoom], .card__img, .pan__img, input[type="submit"], input[type="checkbox"], input[type="radio"]';
  var DARK = '.hero, body[data-page="home"] .site-header'; // always dark, even in the light version
  var TEXT = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
  var wrap, built = false, x = -100, y = -100, lastT = null;
  var paused = function () { return root.classList.contains('motion-off'); };
  function place() { wrap.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'; }
  function state(t) {
    lastT = t;
    wrap.classList.toggle('is-big', !!(t && t.closest && t.closest(BIG)));
    wrap.classList.toggle('on-dark', !!(t && t.closest && t.closest(DARK)));
    wrap.classList.toggle('is-text', !!(t && t.closest && t.closest(TEXT)));
  }
  function build(px, py) {
    wrap = document.createElement('div'); wrap.className = 'zc'; wrap.setAttribute('aria-hidden', 'true'); wrap.innerHTML = '<svg viewBox="0 0 17 27" aria-hidden="true"><path d="M1 1v21.2l4.7-4.2 3.2 7.7 3.1-1.3-3.2-7.6h6.4z"/></svg><i></i>';
    document.body.appendChild(wrap); root.classList.add('zc-on'); root.classList.remove('zc-pre'); built = true; x = px; y = py; place();
  }
  document.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    if (!built) build(e.clientX, e.clientY);
    x = e.clientX; y = e.clientY; wrap.classList.remove('is-out'); place();
    if (e.target !== lastT) state(e.target); // read on every change of the element under the pointer, so it never goes stale
  }, { passive: true });
  document.addEventListener('pointerdown', function (e) { if (built && e.button === 0) wrap.classList.add('is-down'); save(); }, { passive: true });
  document.addEventListener('pointerup', function () { if (built) { wrap.classList.remove('is-down'); lastT = null; } }, { passive: true });
  document.documentElement.addEventListener('mouseleave', function () { if (built) wrap.classList.add('is-out'); });
  function save() { if (built && x >= 0) { try { sessionStorage.setItem('zc-pos', JSON.stringify({ x: x, y: y, t: Date.now() })); } catch (e) {} } }
  window.addEventListener('pagehide', save);
  (function () {
    // After a refresh the browser shows its own arrow until the first mouse move (a page cannot hide or replace it before then), so the pointer is
    // not drawn underneath it; it appears on the first move. Moving between pages of the site still carries the position over.
    var sp = null; try { sp = JSON.parse(sessionStorage.getItem('zc-pos') || 'null'); sessionStorage.removeItem('zc-pos'); } catch (e) {}
    var reloaded = (function () { try { var n = performance.getEntriesByType('navigation')[0]; return !!n && n.type === 'reload'; } catch (e) { return false; } })();
    if (!reloaded && sp && Date.now() - sp.t < 6000 && sp.x >= 0 && sp.x <= innerWidth && sp.y >= 0 && sp.y <= innerHeight && !paused()) {
      build(sp.x, sp.y); var under = document.elementFromPoint(sp.x, sp.y); if (under) state(under);
    }
  })();
})();
