/* Themed cursor for the original site: a small card-suit pointer (a diamond to start with; each click deals the next suit: spade, heart, club, diamond)
   and a soft ring that trails behind and swells over links and buttons.
   Light by design: mouse and trackpad only, nothing for touch screens or reduced-motion; the elements are created on the first real mouse move (so they
   are never part of the pre-built HTML); only transforms are animated, and only while the pointer is moving; it switches itself off (the normal cursor
   comes back) when "Pause animations" is on, or if the page ever runs below about 30 fps. Text fields keep the normal text cursor. */
(function () {
  'use strict';
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  var SUITS = [
    'M12 1.8C9.6 5.6 4 9.1 4 13.6a4.1 4.1 0 0 0 7.2 2.7c-.1 2.4-.9 4.4-2.7 5.5h7c-1.8-1.1-2.6-3.1-2.7-5.5A4.1 4.1 0 0 0 20 13.6C20 9.1 14.4 5.6 12 1.8z',
    'M12 21.8C5 15.6 2.2 12.4 2.2 8.6 2.2 5.6 4.4 3.4 7.2 3.4c1.9 0 3.6 1 4.8 2.9 1.2-1.9 2.9-2.9 4.8-2.9 2.8 0 5 2.2 5 5.2 0 3.8-2.8 7-9.8 13.2z',
    'M12 2a4.2 4.2 0 0 0-3 7.1 4.5 4.5 0 1 0 2.3 8.2c-.1 2.2-.9 3.9-2.5 4.7h6.4c-1.6-.8-2.4-2.5-2.5-4.7a4.5 4.5 0 1 0 2.3-8.2A4.2 4.2 0 0 0 12 2z',
    'M12 1.8l7 10.2-7 10.2L5 12z'
  ];
  var LINK = 'a[href], button, summary, select, label[for], [role="button"], [data-zoom], .card, .pan, .catlink, input[type="submit"], input[type="checkbox"], input[type="radio"]';
  var TEXT = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
  var wrap, dotEl, ringEl, path, built = false, off = false;
  /* (the pointer dot is moved straight in the mouse-move handler; only the trailing ring uses the animation loop) */
  var x = -100, y = -100, rx = -100, ry = -100, looping = false, suit = 3, slow = 0, last = 0, lastT = null;

  function build(px, py) {
    wrap = document.createElement('div'); wrap.className = 'zc'; wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<div class="zc__ring"><i></i></div><div class="zc__dot"><svg viewBox="0 0 24 24" width="20" height="20"><path d="' + SUITS[suit] + '"/></svg></div>';
    document.body.appendChild(wrap);
    ringEl = wrap.firstChild; dotEl = wrap.lastChild; path = dotEl.querySelector('path');
    root.classList.add('zc-on'); root.classList.remove('zc-pre'); built = true;
    if (px != null) { x = rx = px; y = ry = py; dotEl.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0) translate(-50%,-50%)'; ringEl.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0) translate(-50%,-50%)'; }
  }
  function loop(t) {
    if (off) { looping = false; return; }
    if (last && t - last < 250) { slow = t - last > 36 ? slow + 1 : Math.max(0, slow - 1); } last = t;
    if (slow >= 20) { disable(); return; }
    var dx = x - rx, dy = y - ry; rx += dx * .45; ry += dy * .45; // follows closely: only a hint of trail
    ringEl.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0) translate(-50%,-50%)';
    if (Math.abs(dx) > .3 || Math.abs(dy) > .3) requestAnimationFrame(loop); else looping = false;
  }
  function disable() {
    off = true; root.classList.remove('zc-on');
    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }
  function paused() { return root.classList.contains('motion-off'); }

  document.addEventListener('pointermove', function (e) {
    if (off || e.pointerType === 'touch') return;
    if (!built) { build(); rx = e.clientX; ry = e.clientY; }
    wrap.classList.remove('is-out');
    x = e.clientX; y = e.clientY;
    dotEl.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    if (e.target !== lastT) { // what is under the pointer is read whenever it changes (also right after the cursor is created), so it never goes stale
      lastT = e.target; var t = e.target;
      wrap.classList.toggle('is-link', !!(t && t.closest && t.closest(LINK)));
      wrap.classList.toggle('is-text', !!(t && t.closest && t.closest(TEXT)));
    }
    if (!looping && !paused()) { looping = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener('pointerdown', function (e) {
    if (!built || off || e.button !== 0) return;
    wrap.classList.add('is-down');
    suit = (suit + 1) % 4; path.setAttribute('d', SUITS[suit]); // each click deals the next suit
    dotEl.firstChild.classList.remove('pop'); void dotEl.offsetWidth; dotEl.firstChild.classList.add('pop');
  }, { passive: true });
  document.addEventListener('pointerup', function () { if (built) wrap.classList.remove('is-down'); }, { passive: true });
  document.documentElement.addEventListener('mouseleave', function () { if (built) wrap.classList.add('is-out'); });
  /* carry the pointer position over to the next page, so the cursor is there from the first moment (no flash of the normal arrow) */
  function save() { if (built && x >= 0) { try { sessionStorage.setItem('zc-pos', JSON.stringify({ x: x, y: y, t: Date.now() })); } catch (e) {} } }
  window.addEventListener('pagehide', save); document.addEventListener('pointerdown', save, { passive: true });
  (function () {
    var sp = null; try { sp = JSON.parse(sessionStorage.getItem('zc-pos') || 'null'); sessionStorage.removeItem('zc-pos'); } catch (e) {}
    if (sp && Date.now() - sp.t < 6000 && sp.x >= 0 && sp.x <= innerWidth && sp.y >= 0 && sp.y <= innerHeight && !paused()) {
      build(sp.x, sp.y);
      var under = document.elementFromPoint(sp.x, sp.y);
      if (under && under.closest) { wrap.classList.toggle('is-link', !!under.closest(LINK)); wrap.classList.toggle('is-text', !!under.closest(TEXT)); lastT = under; }
    } else root.classList.remove('zc-pre');
  })();
})();
