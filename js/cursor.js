/* Simple pointer: a small dot that inverts whatever it is over, so it reads black on a light page and white on a dark one (and flips on text and
   pictures). It grows over buttons, links and pictures. Mouse and trackpad only (nothing on touch screens or with reduced-motion); created on the first mouse
   move; off with "Pause animations". Text fields keep the normal text cursor. The pointer position is carried to the next page so the normal arrow
   does not flash between pages. No animation loop: it only moves when the mouse moves. */
(function () {
  'use strict';
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  var BIG = 'a[href], button, summary, select, label[for], [role="button"], [data-zoom], .card__img, .pan__img, input[type="submit"], input[type="checkbox"], input[type="radio"]';
  var TEXT = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
  var wrap, built = false, x = -100, y = -100, lastT = null;
  var paused = function () { return root.classList.contains('motion-off'); };
  function place() { wrap.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)'; }
  function state(t) {
    lastT = t;
    wrap.classList.toggle('is-big', !!(t && t.closest && t.closest(BIG)));
    wrap.classList.toggle('is-text', !!(t && t.closest && t.closest(TEXT)));
  }
  function build(px, py) {
    wrap = document.createElement('div'); wrap.className = 'zc'; wrap.setAttribute('aria-hidden', 'true'); wrap.innerHTML = '<i></i>';
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
    var sp = null; try { sp = JSON.parse(sessionStorage.getItem('zc-pos') || 'null'); sessionStorage.removeItem('zc-pos'); } catch (e) {}
    if (sp && Date.now() - sp.t < 6000 && sp.x >= 0 && sp.x <= innerWidth && sp.y >= 0 && sp.y <= innerHeight && !paused()) {
      build(sp.x, sp.y); var under = document.elementFromPoint(sp.x, sp.y); if (under) state(under);
    } else root.classList.remove('zc-pre');
  })();
})();
