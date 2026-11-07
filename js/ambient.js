/*
 * Ambient background: floating elements in three size tiers (big / medium / small), drawn from the Patterns & Icons artwork
 * (cut-outs listed in ambient-assets.js) plus shapes drawn in the same style. Each page has its own theme (how many, which
 * sizes, which kinds) and the mix is randomised on every load, so no two pages (or visits) look the same.
 * They
 *  - spiral slowly around their resting point (the radius breathes in and out); spirals/sunbursts/chips also spin,
 *  - move at different speeds as you scroll (bigger = slower, for depth) and wrap so some are always on screen,
 *  - gently move away from the mouse pointer.
 * Transforms only; paused when the tab is hidden; static when the visitor prefers reduced motion.
 */
(function () {
  var page = document.body.dataset.page;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Per-page themes: count, share of each size tier, share of drawn (vector) shapes, and favourites for that page.
  var THEMES = {
    home:     { count: 15, tiers: { big: 0.22, medium: 0.33, small: 0.45 }, vector: 0.35, prefer: ['checker-bolt', 'hand-cards', 'thunder-outline', 'sunburst', 'flame', 'spiral-o', 'chip-o'] },
    projects: { count: 9,  tiers: { big: 0.1,  medium: 0.3,  small: 0.6 },  vector: 0.5,  prefer: ['bolt-', 'star-', 'zigzagband-o', 'checkerstrip-o', 'chip-o', 'sparkle'] },
    about:    { count: 12, tiers: { big: 0.15, medium: 0.5,  small: 0.35 }, vector: 0.3,  prefer: ['suit-', 'star-', 'hstar', 'card-o', 'spiral-o', 'heart-o'] },
    contact:  { count: 11, tiers: { big: 0.15, medium: 0.3,  small: 0.55 }, vector: 0.55, prefer: ['cursor', 'bubble-o', 'play', 'plus-o', 'bezier-o', 'sparkle', 'orbit-o'] },
    privacy:  { count: 5,  tiers: { big: 0,    medium: 0.4,  small: 0.6 },  vector: 0.6,  prefer: ['plus-o', 'ring-o', 'sparkle', 'star-'] }
  };
  var theme = THEMES[page];            // none on project pages
  if (!theme) return;

  var VECTORS = ['spiral-o', 'orbit-o', 'sparkle-o', 'sparkle', 'cursor', 'play-o', 'play', 'ring-o', 'bezier-o', 'plus-o', 'bubble-o',
    'triangle-o', 'checker-o', 'checkerstrip-o', 'zigzag-o', 'zigzagband-o', 'sunburst', 'flame-o', 'flame', 'chip-o', 'card-o', 'hstar',
    'bolt-o', 'star-o', 'spade-o', 'heart-o'];
  var SPIN = { 'spiral-o': 1, 'orbit-o': 1, 'sunburst': 1, 'chip-o': 1 };
  var SIZE = { big: [200, 320], medium: [100, 170], small: [44, 84] };   // longest side, px
  var DEPTH = { big: [0.25, 0.4], medium: [0.4, 0.7], small: [0.65, 1] }; // bigger = slower scroll parallax
  var ASSETS = window.AMBIENT || [];

  // random per load (mixed with the page name so pages differ even with the same clock)
  var seed = (Math.floor(Math.random() * 2147483000) + page.length * 7919) % 2147483646 + 1;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function between(a, b) { return a + rnd() * (b - a); }
  function pickWeighted(obj) { var r = rnd(), acc = 0, last; for (var k in obj) { acc += obj[k]; last = k; if (r < acc) return k; } return last; }
  function pickFrom(list, used) {
    var pool = list.filter(function (x) { return !used[x.id || x]; });
    if (!pool.length) pool = list;
    return pool[Math.floor(rnd() * pool.length)];
  }
  function favoured(list, key) { // 60% of the time choose a page favourite when one exists
    if (rnd() > 0.6) return list;
    var fav = list.filter(function (x) { var n = key(x); return theme.prefer.some(function (p) { return n.indexOf(p) === 0; }); });
    return fav.length ? fav : list;
  }

  var root = document.createElement('div');
  root.className = 'ambient';
  root.setAttribute('aria-hidden', 'true');
  var items = [], used = {};
  var xs = []; for (var s = 0; s < theme.count; s++) xs.push((s + rnd()) / theme.count);
  for (var j = xs.length - 1; j > 0; j--) { var r2 = Math.floor(rnd() * (j + 1)), t = xs[j]; xs[j] = xs[r2]; xs[r2] = t; } // spread across the width

  for (var i = 0; i < theme.count; i++) {
    var tier = pickWeighted(theme.tiers);
    var useVector = rnd() < theme.vector || !ASSETS.length;
    var inner, name, filled = false, opacity, spin = false, aspect = 1;
    var side = Math.round(between(SIZE[tier][0], SIZE[tier][1]));
    if (!useVector) {
      var tierAssets = ASSETS.filter(function (a) { return a.tier === tier; });
      if (!tierAssets.length) tierAssets = ASSETS;
      var asset = pickFrom(favoured(tierAssets, function (a) { return a.src.split('/').pop(); }).map(function (a) { a.id = a.src; return a; }), used);
      used[asset.id] = 1; aspect = asset.w / asset.h;
      var wpx = aspect >= 1 ? side : Math.round(side * aspect), hpx = aspect >= 1 ? Math.round(side / aspect) : side;
      opacity = { big: 0.3, medium: 0.4, small: 0.5 }[tier] + between(-0.06, 0.08);
      inner = '<img src="assets/' + asset.src + '" alt="" width="' + wpx + '" height="' + hpx + '" style="width:' + wpx + 'px;height:' + hpx + 'px;opacity:' + opacity.toFixed(2) + '" decoding="async">';
      side = Math.max(wpx, hpx);
    } else {
      name = pickFrom(favoured(VECTORS, function (v) { return v; }), used);
      used[name] = 1; filled = name.indexOf('-o') < 0; spin = !!SPIN[name];
      opacity = filled ? between(0.14, 0.2) : { big: 0.3, medium: 0.38, small: 0.5 }[tier] + between(-0.05, 0.08);
      inner = '<svg class="ico' + (spin ? ' amb--spin' : '') + '" style="width:' + side + 'px;height:' + side + 'px;opacity:' + opacity.toFixed(2) + '"><use href="#i-' + name + '"/></svg>';
    }
    var el = document.createElement('div');
    el.className = 'amb';
    el.style.cssText = '--rot:' + Math.round(between(-25, 25)) + 'deg;--dur:' + between(9, 18).toFixed(1) + 's;--delay:-' + between(0, 9).toFixed(1) + 's';
    el.innerHTML = inner;
    root.appendChild(el);
    items.push({
      el: el, x: xs[i], y: rnd(), depth: between(DEPTH[tier][0], DEPTH[tier][1]), size: side, ox: 0, oy: 0,
      phase: rnd() * 6.283, speed: between(0.16, 0.46) * (rnd() < 0.5 ? -1 : 1), orbit: between(tier === 'big' ? 18 : 28, tier === 'big' ? 46 : 74), spin: spin
    });
  }
  var checker = document.querySelector('.checker-bg');
  document.body.insertBefore(root, document.querySelector('main'));

  var W = innerWidth, H = innerHeight, sy = 0, mx = -9999, my = -9999, raf = 0, running = false;

  function draw(time) {
    var span = H + 360;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var x = it.x * (W - it.size);
      var y = it.y * span - (reduce ? 0 : sy * it.depth * 0.35);
      y = ((y % span) + span) % span - 180;
      var rot = 0;
      if (!reduce) {
        // spiral path around the resting point: angle advances with time, radius breathes in and out
        var ang = time * it.speed + it.phase;
        var rad = it.orbit * (0.55 + 0.45 * Math.sin(time * 0.22 + it.phase));
        x += Math.cos(ang) * rad;
        y += Math.sin(ang) * rad;
        if (it.spin) rot = (time * it.speed * 40) % 360;
        // push away from the pointer (a bigger reach for bigger elements)
        var dx = x + it.size / 2 - mx, dy = y + it.size / 2 - my;
        var d = Math.sqrt(dx * dx + dy * dy), R = 150 + it.size * 0.5, tx = 0, ty = 0;
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
