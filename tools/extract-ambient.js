/*
 * Cuts individual elements out of the artwork in brand/Patterns & Icons and saves them as small transparent WebP files in
 * site/assets/img/ambient/, plus site/js/ambient-assets.js (the list the floating background uses, with a size tier for each).
 *
 *   cd tools && node extract-ambient.js
 *
 * Sources: checker lightning bolt, hand-with-cards illustration, glossy and flat card suits, thunder outline,
 * halftone stars, black lightning bolts. Originals are never modified.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'brand', 'Patterns & Icons');
const OUT = path.join(ROOT, 'site', 'assets', 'img', 'ambient');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const VIOLET = [201, 160, 255]; // --violet-light
const manifest = [];

// ---------- helpers ----------
async function raw(input, opts) {
  const { data, info } = await sharp(input, opts).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}
function lum(d, i) { return 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; }

// connected components on a binary mask; returns bounding boxes
function components(mask, w, h) {
  const seen = new Uint8Array(w * h), boxes = [], stack = [];
  for (let s = 0; s < w * h; s++) {
    if (!mask[s] || seen[s]) continue;
    let x0 = w, y0 = h, x1 = 0, y1 = 0, area = 0;
    stack.push(s); seen[s] = 1;
    while (stack.length) {
      const p = stack.pop(), x = p % w, y = (p / w) | 0;
      area++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (mask[q] && !seen[q]) { seen[q] = 1; stack.push(q); }
      }
    }
    boxes.push({ x0, y0, x1, y1, area });
  }
  return boxes;
}
function dilate(mask, w, h, r) {
  const tmp = new Uint8Array(w * h), out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let v = 0; for (let k = -r; k <= r && !v; k++) { const xx = x + k; if (xx >= 0 && xx < w && mask[y * w + xx]) v = 1; } tmp[y * w + x] = v;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let v = 0; for (let k = -r; k <= r && !v; k++) { const yy = y + k; if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1; } out[y * w + x] = v;
  }
  return out;
}
// find element boxes in an RGBA buffer using a per-pixel "ink" test, merging nearby strokes (grow = dilation px at 1/scale)
function findBoxes(img, ink, scale, grow, minArea) {
  const sw = Math.floor(img.w / scale), sh = Math.floor(img.h / scale), m = new Uint8Array(sw * sh);
  for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
    if (ink(img.data, ((y * scale) * img.w + (x * scale)) * 4)) m[y * sw + x] = 1;
  }
  return components(dilate(m, sw, sh, grow), sw, sh).filter((b) => b.area >= minArea)
    .map((b) => ({ x: Math.max(0, b.x0 * scale - scale), y: Math.max(0, b.y0 * scale - scale),
      w: Math.min(img.w, (b.x1 + 1) * scale + scale) - Math.max(0, b.x0 * scale - scale), h: Math.min(img.h, (b.y1 + 1) * scale + scale) - Math.max(0, b.y0 * scale - scale), area: b.area }));
}
async function save(name, rgba, w, h, tier, maxSide) {
  const file = path.join(OUT, name + '.webp');
  const r = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(file);
  manifest.push({ src: 'img/ambient/' + name + '.webp', tier, w: r.width, h: r.height });
  console.log(tier.padEnd(6), name.padEnd(26), r.width + 'x' + r.height, Math.round(r.size / 1024) + 'KB');
}
// crop a box out of an RGBA raw image
function crop(img, b) {
  const out = Buffer.alloc(b.w * b.h * 4);
  for (let y = 0; y < b.h; y++) img.data.copy(out, y * b.w * 4, ((b.y + y) * img.w + b.x) * 4, ((b.y + y) * img.w + b.x + b.w) * 4);
  return out;
}
// recolour: keep alpha, replace RGB
function tint(buf, rgb) { for (let i = 0; i < buf.length; i += 4) { buf[i] = rgb[0]; buf[i + 1] = rgb[1]; buf[i + 2] = rgb[2]; } return buf; }

(async () => {
  // 1. Checker lightning bolt (JPG on white): flood-fill the white background away, keep the white sticker border
  {
    const img = await raw(path.join(SRC, '13cd766669657b20f809a859a539fd8c.jpg'));
    const { data, w, h } = img, outside = new Uint8Array(w * h), st = [];
    const isBg = (p) => data[p * 4] > 236 && data[p * 4 + 1] > 236 && data[p * 4 + 2] > 236;
    for (let x = 0; x < w; x++) { st.push(x, (h - 1) * w + x); }
    for (let y = 0; y < h; y++) { st.push(y * w, y * w + w - 1); }
    while (st.length) {
      const p = st.pop(); if (p < 0 || p >= w * h || outside[p] || !isBg(p)) continue; outside[p] = 1;
      const x = p % w; if (x > 0) st.push(p - 1); if (x < w - 1) st.push(p + 1); st.push(p - w, p + w);
    }
    for (let p = 0; p < w * h; p++) data[p * 4 + 3] = outside[p] ? 0 : 255;
    const box = findBoxes(img, (d, i) => d[i + 3] > 0, 2, 1, 20).sort((a, b) => b.area - a.area)[0];
    await save('checker-bolt', crop(img, box), box.w, box.h, 'big', 520);
  }

  // 2. Hand holding cards + chips (SVG): drop the flat maroon background rectangle
  {
    let svg = fs.readFileSync(path.join(SRC, 'mohamed_hassan-gambling-7020545.svg'), 'utf8');
    svg = svg.replace(/<g fill="#7d2b42">[\s\S]*?<\/g>/, '');
    const img = await raw(Buffer.from(svg), { density: 160 });
    const box = findBoxes(img, (d, i) => d[i + 3] > 20, 3, 2, 30).sort((a, b) => b.area - a.area)[0];
    await save('hand-cards', crop(img, box), box.w, box.h, 'big', 520);
  }

  // 3. Thunder outline (SVG, recoloured teal -> violet)
  {
    let svg = fs.readFileSync(path.join(SRC, 'yazriltri-thunder-9055278.svg'), 'utf8').replace('#00A8BB', '#a77fe0');
    const img = await raw(Buffer.from(svg), { density: 40 });
    const box = findBoxes(img, (d, i) => d[i + 3] > 20, 2, 2, 20).sort((a, b) => b.area - a.area)[0];
    await save('thunder-outline', crop(img, box), box.w, box.h, 'big', 480);
  }

  // 4. Card suits: glossy set (4) and flat set (4). Black suits are lightened so they show on the dark page.
  for (const [file, set, density] of [['openclipart-vectors-card-games-146687.svg', 'glossy', 320], ['openclipart-vectors-cards-159600.svg', 'flat', 1500]]) {
    const img = await raw(path.join(SRC, file), { density });
    const boxes = findBoxes(img, (d, i) => d[i + 3] > 40, 2, 3, 30).sort((a, b) => a.x - b.x).slice(0, 7);
    const names = set === 'glossy' ? ['heart', 'club', 'diamond', 'spade'] : ['diamond', 'club', 'spade', 'heart'];
    let n = 0;
    for (const b of boxes) {
      if (b.w < img.h * 0.2) continue; // skip slivers
      const buf = crop(img, b);
      let dark = 0, tot = 0;
      for (let i = 0; i < buf.length; i += 4) if (buf[i + 3] > 200) { tot++; if (buf[i] + buf[i + 1] + buf[i + 2] < 150) dark++; }
      if (dark / Math.max(tot, 1) > 0.5) for (let i = 0; i < buf.length; i += 4) { buf[i] = 235 - buf[i] * 0.3; buf[i + 1] = 225 - buf[i + 1] * 0.3; buf[i + 2] = 245 - buf[i + 2] * 0.2; }
      await save('suit-' + set + '-' + (names[n++] || 'x' + n), buf, b.w, b.h, 'medium', 260);
    }
  }

  // 3. Halftone stars (light grey on black): luminance becomes opacity, tinted violet-light
  {
    const img = await raw(path.join(SRC, '8f777f158279bcc19df30d17534a8d63.jpg'));
    for (let i = 0; i < img.data.length; i += 4) {
      const a = Math.max(0, Math.min(255, (lum(img.data, i) - 30) * 1.7)); img.data[i] = VIOLET[0]; img.data[i + 1] = VIOLET[1]; img.data[i + 2] = VIOLET[2]; img.data[i + 3] = a;
    }
    const boxes = findBoxes(img, (d, i) => d[i + 3] > 60, 3, 3, 12).filter((b) => b.w > 24 && b.h > 24 && b.w / b.h < 1.5 && b.h / b.w < 1.5).sort((a, b) => b.w * b.h - a.w * a.h);
    const clean = boxes.filter((b) => {
      let edge = 0, n = 0;
      for (let y = 0; y < b.h; y++) for (let x = 0; x < b.w; x++) {
        if (x > 3 && x < b.w - 4 && y > 3 && y < b.h - 4) continue; n++;
        if (img.data[((b.y + y) * img.w + b.x + x) * 4 + 3] > 60) edge++;
      } return edge / n < 0.06;
    });
    console.log('stars found', boxes.length, 'clean', clean.length);
    let i = 0;
    for (const b of clean.slice(0, 9)) { i++; const tier = Math.max(b.w, b.h) > 150 ? 'medium' : 'small'; await save('star-' + i, crop(img, b), b.w, b.h, tier, 220); }
  }

  // 4. Black lightning bolts (pattern on white): keep only the dark ones, tint violet-light
  {
    const img = await raw(path.join(SRC, '76090e47ebe2dcbd59e62869e59d4d73.jpg'));
    for (let i = 0; i < img.data.length; i += 4) {
      const a = Math.max(0, Math.min(255, (150 - lum(img.data, i)) * 2.4)); img.data[i] = VIOLET[0]; img.data[i + 1] = VIOLET[1]; img.data[i + 2] = VIOLET[2]; img.data[i + 3] = a;
    }
    const boxes = findBoxes(img, (d, i) => d[i + 3] > 80, 2, 2, 20).filter((b) => b.w > 20 && b.h > 30 && b.h < img.h * 0.4).sort((a, b) => b.w * b.h - a.w * a.h);
    console.log('bolts found', boxes.length);
    let i = 0; for (const b of boxes.slice(0, 3)) { i++; await save('bolt-' + i, crop(img, b), b.w, b.h, 'small', 150); }
  }

  fs.writeFileSync(path.join(ROOT, 'site', 'js', 'ambient-assets.js'), '// Generated by tools/extract-ambient.js\nwindow.AMBIENT = ' + JSON.stringify(manifest, null, 1) + ';\n');
  console.log('total', manifest.length, 'elements;', ['big', 'medium', 'small'].map((t) => t + ' ' + manifest.filter((m) => m.tier === t).length).join(', '));
})().catch((e) => { console.error(e); process.exit(1); });
