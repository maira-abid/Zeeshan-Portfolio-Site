/*
 * Ambient background: a few large, faint card-suit / bolt / star icons that
 *  - drift and rotate slowly,
 *  - move at different speeds as you scroll (parallax, wrapping so some are always on screen),
 *  - gently move away from the mouse pointer,
 * and the checkerboard shifts slightly with scroll. Transforms only; paused when the tab is hidden;
 * static when the visitor prefers reduced motion.
 */
(function () {
  var page = document.body.dataset.page;
  var cfg = { home: 14, projects: 10, about: 12, contact: 12, privacy: 6 }; // icons per page (none on project pages)
  var count = cfg[page];
  if (!count) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var names = ['spade-o', 'heart-o', 'bolt-o', 'diamond-o', 'star-o', 'club-o', 'spade', 'star', 'bolt', 'heart'];
  var root = document.createElement('div');
  root.className = 'ambient';
  root.setAttribute('aria-hidden', 'true');
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var items = [];
  for (var i = 0; i < count; i++) {
    var name = names[i % names.length];
    var filled = name.indexOf('-o') < 0;
    var size = 36 + Math.round(rnd() * 64);
    var depth = 0.25 + rnd() * 0.75;
    var el = document.createElement('div');
    el.className = 'amb';
    el.innerHTML = '<svg class="ico" width="' + size + '" height="' + size + '" style="--rot:' + Math.round(rnd() * 50 - 25) + 'deg;--dur:' +
      (9 + rnd() * 9).toFixed(1) + 's;--delay:-' + (rnd() * 9).toFixed(1) + 's;opacity:' + (filled ? 0.1 : 0.2 + rnd() * 0.12).toFixed(2) + '"><use href="#i-' + name + '"/></svg>';
    root.appendChild(el);
    items.push({ el: el, x: rnd(), y: rnd(), depth: depth, size: size, ox: 0, oy: 0 });
  }
  var checker = document.querySelector('.checker-bg');
  document.body.insertBefore(root, document.querySelector('main'));

  var W = innerWidth, H = innerHeight, sy = 0, mx = -9999, my = -9999, raf = 0, running = false;

  function draw() {
    var span = H + 240;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var x = it.x * (W - it.size);
      var y = it.y * span - (reduce ? 0 : sy * it.depth * 0.35);
      y = ((y % span) + span) % span - 120; // wrap so icons keep cycling through the viewport
      if (!reduce) {
        // push away from the pointer
        var dx = x + it.size / 2 - mx, dy = y + it.size / 2 - my;
        var d = Math.sqrt(dx * dx + dy * dy), R = 190, tx = 0, ty = 0;
        if (d < R && d > 0) { var f = (1 - d / R) * 70 * it.depth; tx = dx / d * f; ty = dy / d * f; }
        it.ox += (tx - it.ox) * 0.12;
        it.oy += (ty - it.oy) * 0.12;
      }
      it.el.style.transform = 'translate3d(' + (x + it.ox).toFixed(1) + 'px,' + (y + it.oy).toFixed(1) + 'px,0)';
    }
    if (checker && !reduce) checker.style.backgroundPosition = '0 ' + (-sy * 0.08).toFixed(1) + 'px';
  }
  function loop() { draw(); raf = requestAnimationFrame(loop); }
  function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  addEventListener('scroll', function () { sy = window.scrollY; }, { passive: true });
  addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') { mx = e.clientX; my = e.clientY; } }, { passive: true });
  document.addEventListener('pointerleave', function () { mx = my = -9999; });
  addEventListener('resize', function () { W = innerWidth; H = innerHeight; draw(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
  draw();
  start();
})();
