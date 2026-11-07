/*
 * Ambient background: floating elements in three size tiers (big / medium / small), drawn from the Patterns & Icons artwork
 * (cut-outs listed in ambient-assets.js) plus shapes drawn in the same style. Each page has its own theme (how many, which
 * sizes, which kinds) and the mix is randomised on every load, so no two pages (or visits) look the same.
 * All one neutral grey, small and faint so they never compete with the text. They are a layer pinned behind the page (like a fixed
 * wallpaper): they do NOT move when you scroll, and their motion is frozen while the page is scrolling, then resumes. They
 *  - spiral slowly around their resting point (the radius breathes in and out); spirals/sunbursts/chips also spin,
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
    about:    { count: 5,  tiers: { big: 0.15, medium: 0.5,  small: 0.35 }, vector: 0.3,  prefer: ['suit-', 'star-', 'hstar', 'card-o', 'spiral-o', 'heart-o'] },
    contact:  { count: 11, tiers: { big: 0.15, medium: 0.3,  small: 0.55 }, vector: 0.55, prefer: ['cursor', 'bubble-o', 'play', 'plus-o', 'bezier-o', 'sparkle', 'orbit-o'] },
    privacy:  { count: 5,  tiers: { big: 0,    medium: 0.4,  small: 0.6 },  vector: 0.6,  prefer: ['plus-o', 'ring-o', 'sparkle', 'star-'] }
  };
  var theme = THEMES[page];            // none on project pages
  if (!theme) return;

  var VECTORS = ['spiral-o', 'orbit-o', 'sparkle-o', 'sparkle', 'cursor', 'play-o', 'play', 'ring-o', 'bezier-o', 'plus-o', 'bubble-o',
    'triangle-o', 'checker-o', 'checkerstrip-o', 'zigzag-o', 'zigzagband-o', 'sunburst', 'flame-o', 'flame', 'chip-o', 'card-o', 'hstar',
    'bolt-o', 'star-o', 'spade-o', 'heart-o'];
  var SPIN = { 'spiral-o': 1, 'orbit-o': 1, 'sunburst': 1, 'chip-o': 1 };
  var SIZE = { big: [110, 180], medium: [56, 96], small: [26, 48] };     // longest side, px (biggest was 320, now 180: 44% smaller)
  var DEPTH = { big: [0.4, 0.6], medium: [0.55, 0.8], small: [0.7, 1] }; // scales how far the pointer pushes an element
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
  var H = innerHeight, W = innerWidth;
  var count = theme.count;
  function spread(n) { var a = []; for (var q = 0; q < n; q++) a.push((q + rnd()) / n); for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), t = a[j]; a[j] = a[k]; a[k] = t; } return a; }
  var xs = spread(count), ys = spread(count); // evenly spread over the page width and height, in random order

  for (var i = 0; i < count; i++) {
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
      opacity = { big: 0.13, medium: 0.16, small: 0.2 }[tier] + between(-0.02, 0.03);
      inner = '<img src="assets/' + asset.src + '" alt="" width="' + wpx + '" height="' + hpx + '" style="width:' + wpx + 'px;height:' + hpx + 'px;opacity:' + opacity.toFixed(2) + '" decoding="async">';
      side = Math.max(wpx, hpx);
    } else {
      name = pickFrom(favoured(VECTORS, function (v) { return v; }), used);
      used[name] = 1; filled = name.indexOf('-o') < 0; spin = !!SPIN[name];
      opacity = filled ? between(0.08, 0.12) : { big: 0.14, medium: 0.18, small: 0.24 }[tier] + between(-0.02, 0.03);
      inner = '<svg class="ico' + (spin ? ' amb--spin' : '') + '" style="width:' + side + 'px;height:' + side + 'px;opacity:' + opacity.toFixed(2) + '"><use href="#i-' + name + '"/></svg>';
    }
    var el = document.createElement('div');
    el.className = 'amb';
    el.style.cssText = '--rot:' + Math.round(between(-25, 25)) + 'deg;--dur:' + between(9, 18).toFixed(1) + 's;--delay:-' + between(0, 9).toFixed(1) + 's';
    el.innerHTML = inner;
    root.appendChild(el);
    items.push({
      el: el, x: xs[i], y: ys[i], depth: between(DEPTH[tier][0], DEPTH[tier][1]), size: side, ox: 0, oy: 0,
      phase: rnd() * 6.283, speed: between(0.16, 0.46) * (rnd() < 0.5 ? -1 : 1), orbit: between(tier === 'big' ? 12 : 16, tier === 'big' ? 30 : 44), spin: spin
    });
  }
  document.body.insertBefore(root, document.querySelector('main'));

  var mx = -9999, my = -9999, raf = 0, running = false;
  var paused = false, calm = 0, vt = 0, lastTs = 0; // vt = animation clock; it stops while the page is scrolling

  function draw(time) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var x = it.x * (W - it.size);
      var y = it.y * (H - it.size);       // a spot on the screen: the layer is pinned, it does not move with scroll
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
        var d = Math.sqrt(dx * dx + dy * dy), R = 120 + it.size * 0.6, tx = 0, ty = 0;
        if (d < R && d > 0) { var f = (1 - d / R) * 90 * it.depth; tx = dx / d * f; ty = dy / d * f; }
        it.ox += (tx - it.ox) * 0.12;
        it.oy += (ty - it.oy) * 0.12;
      }
      it.el.style.transform = 'translate3d(' + (x + it.ox).toFixed(1) + 'px,' + (y + it.oy).toFixed(1) + 'px,0) rotate(' + rot.toFixed(1) + 'deg)';
    }
  }
  function loop(ts) {
    var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.1) : 0; lastTs = ts;
    if (!paused) { vt += dt; draw(vt); }     // frozen (nothing moves) while the page is being scrolled
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; lastTs = 0; cancelAnimationFrame(raf); }

  addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') { mx = e.clientX; my = e.clientY; } }, { passive: true });
  document.addEventListener('pointerleave', function () { mx = my = -9999; });
  addEventListener('scroll', function () { paused = true; clearTimeout(calm); calm = setTimeout(function () { paused = false; }, 220); }, { passive: true });
  addEventListener('resize', function () { W = innerWidth; H = innerHeight; draw(vt); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
  draw(0);
  start();
})();
