/*
 * Ambient background: large, faint design / motion shapes (spirals, sparkles, cursor, play button, rings, a few card suits...) that
 *  - spiral slowly around their resting point (radius breathes in and out) while spinning,
 *  - move at different speeds as you scroll (parallax, wrapping so some are always on screen),
 *  - gently move away from the mouse pointer,
 * and the checkerboard shifts slightly with scroll. Transforms only; paused when the tab is hidden;
 * static when the visitor prefers reduced motion.
 */
(function () {
  var page = document.body.dataset.page;
  var cfg = { home: 12, projects: 8, about: 10, contact: 10, privacy: 5 }; // shapes per page (none on project pages)
  var count = cfg[page];
  if (!count) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Mostly non-card shapes; spirals come early so every page gets some (order is varied for a good spread)
  var names = ['spiral-o', 'sparkle-o', 'cursor', 'orbit-o', 'checker-o', 'spiral-o', 'play-o', 'ring-o', 'bolt-o', 'zigzag-o',
    'spade-o', 'bezier-o', 'star-o', 'spiral-o', 'bubble-o', 'plus-o', 'triangle-o', 'sparkle', 'heart-o', 'play'];
  var root = document.createElement('div');
  root.className = 'ambient';
  root.setAttribute('aria-hidden', 'true');
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var items = [];
  for (var i = 0; i < count; i++) {
    var name = names[i % names.length];
    var filled = name.indexOf('-o') < 0;
    var isSpiral = name.indexOf('spiral') === 0 || name.indexOf('orbit') === 0;
    var size = 76 + Math.round(rnd() * 84) + (isSpiral ? 16 : 0); // 76-160 px (a little bigger than before)
    var depth = 0.25 + rnd() * 0.75;
    var el = document.createElement('div');
    el.className = 'amb';
    // spirals get a continuous spin from JS; the other shapes keep the gentle CSS float
    el.innerHTML = '<svg class="ico' + (isSpiral ? ' amb--spin' : '') + '" width="' + size + '" height="' + size + '" style="width:' + size + 'px;height:' + size + 'px;--rot:' + Math.round(rnd() * 50 - 25) + 'deg;--dur:' +
      (9 + rnd() * 9).toFixed(1) + 's;--delay:-' + (rnd() * 9).toFixed(1) + 's;opacity:' + (filled ? 0.16 : 0.3 + rnd() * 0.14).toFixed(2) + '"><use href="#i-' + name + '"/></svg>';
    root.appendChild(el);
    items.push({
      el: el, svg: el.firstChild, x: rnd(), y: rnd(), depth: depth, size: size, ox: 0, oy: 0,
      phase: rnd() * 6.283, speed: (0.18 + rnd() * 0.3) * (rnd() < 0.5 ? -1 : 1), orbit: 28 + rnd() * 50, spin: isSpiral
    });
  }
  var checker = document.querySelector('.checker-bg');
  document.body.insertBefore(root, document.querySelector('main'));

  var W = innerWidth, H = innerHeight, sy = 0, mx = -9999, my = -9999, raf = 0, running = false;

  function draw(t) {
    var span = H + 260;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var x = it.x * (W - it.size);
      var y = it.y * span - (reduce ? 0 : sy * it.depth * 0.35);
      y = ((y % span) + span) % span - 130; // wrap so shapes keep cycling through the viewport
      var rot = 0;
      if (!reduce) {
        // spiral path around the resting point: angle advances with time, radius breathes in and out
        var ang = t * it.speed + it.phase;
        var rad = it.orbit * (0.55 + 0.45 * Math.sin(t * 0.22 + it.phase));
        x += Math.cos(ang) * rad;
        y += Math.sin(ang) * rad;
        if (it.spin) rot = (t * it.speed * 40) % 360;
        // push away from the pointer
        var dx = x + it.size / 2 - mx, dy = y + it.size / 2 - my;
        var d = Math.sqrt(dx * dx + dy * dy), R = 240, tx = 0, ty = 0;
        if (d < R && d > 0) { var f = (1 - d / R) * 90 * it.depth; tx = dx / d * f; ty = dy / d * f; }
        it.ox += (tx - it.ox) * 0.12;
        it.oy += (ty - it.oy) * 0.12;
      }
      it.el.style.transform = 'translate3d(' + (x + it.ox).toFixed(1) + 'px,' + (y + it.oy).toFixed(1) + 'px,0) rotate(' + rot.toFixed(1) + 'deg)';
    }
    if (checker && !reduce) checker.style.backgroundPosition = '0 ' + (-sy * 0.08).toFixed(1) + 'px';
  }
  function loop(ts) { draw(ts / 1000); raf = requestAnimationFrame(loop); }
  function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  addEventListener('scroll', function () { sy = window.scrollY; }, { passive: true });
  addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') { mx = e.clientX; my = e.clientY; } }, { passive: true });
  document.addEventListener('pointerleave', function () { mx = my = -9999; });
  addEventListener('resize', function () { W = innerWidth; H = innerHeight; draw(performance.now() / 1000); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
  draw(0);
  start();
})();
