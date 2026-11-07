/*
 * Email newsletters: trim the empty white side margins so each email fills its scrolling frame.
 *
 *   node tools/trim-emails.js
 *
 * The source PNGs are the emails centred on a wide white canvas (1910 px wide, the email itself is about 750 px). Only the left and right
 * margins are removed (full height is kept), and the email is saved at its own pixel width (no resizing). Because the copy is under
 * 1200 px wide it needs no smaller variants, so the old -640 copies are deleted and `v` is dropped from site/js/media.js.
 * prepare-assets.js uses the same rule (kind 'email'), so a full run gives the same result; this script is the fast way to redo just these five.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'originals', 'Portfolio Work Compilations 2026-2027', 'Digital Marketing - Marketing Campaigns', 'Black Friday 2025');
const OUT = path.join(ROOT, 'site', 'assets', 'img');
const MEDIA_JS = path.join(ROOT, 'site', 'js', 'media.js');
sharp.cache(false);

const EMAILS = [
  ['black-friday', 'email-rewards', '2025-11-Black-Friday-Sale-2-Rewards.png'],
  ['black-friday', 'email-starts', '2025-11-Black-Friday-Sale-3-Sale-STARTS.png'],
  ['black-friday', 'email-whats-left', '2025-11-Black-Friday-Sale-5-Whats-Left.png'],
  ['collegiate-survival-sale', 'email-launch', '2025-09-CSS-Sale-1-Launch.png'],
  ['collegiate-survival-sale', 'email-last-call', '2025-09-CSS-Sale-2-Last-Call.png'],
];

(async () => {
  const src = fs.readFileSync(MEDIA_JS, 'utf8');
  const head = 'window.MEDIA = ';
  const media = JSON.parse(src.slice(src.indexOf(head) + head.length).replace(/;\s*$/, ''));
  for (const [slug, name, file] of EMAILS) {
    const input = path.join(SRC, file);
    if (!fs.existsSync(input)) { console.error('MISSING', input); continue; }
    const meta = await sharp(input, { limitInputPixels: false }).metadata();
    // find the email's left and right edges: the canvas around it is light grey (247), with a stray darker pixel on the very first column,
    // so (instead of sharp's trim) scan a set of rows and take the first and last column that differ from the canvas, ignoring the outer 3 px
    const { data, info } = await sharp(input, { limitInputPixels: false }).raw().toBuffer({ resolveWithObject: true });
    const ch = info.channels, W = info.width, H = info.height;
    let l = W, rr = -1;
    for (let k = 1; k <= 40; k++) {
      const y = Math.floor((H * k) / 41), row = y * W * ch;
      for (let x = 3; x < W - 3; x++) { const o = row + x * ch; if (Math.abs(data[o] - 247) > 6 || Math.abs(data[o + 1] - 247) > 6 || Math.abs(data[o + 2] - 247) > 6) { if (x < l) l = x; break; } }
      for (let x = W - 4; x >= 3; x--) { const o = row + x * ch; if (Math.abs(data[o] - 247) > 6 || Math.abs(data[o + 1] - 247) > 6 || Math.abs(data[o + 2] - 247) > 6) { if (x > rr) rr = x; break; } }
    }
    if (rr < l) { console.error('no email found in', file); continue; }
    const left = l, width = rr - l + 1;
    const outFile = path.join(OUT, slug, name + '.webp');
    const r = await sharp(input, { limitInputPixels: false }).extract({ left, top: 0, width, height: meta.height }).webp({ quality: 70, effort: 6, smartSubsample: true }).toFile(outFile);
    const old640 = path.join(OUT, slug, name + '-640.webp');
    if (fs.existsSync(old640)) fs.unlinkSync(old640);
    media['img/' + slug + '/' + name + '.webp'] = { w: r.width, h: r.height };
    console.log(slug + '/' + name + '.webp', 'source ' + meta.width + 'x' + meta.height, '-> crop left ' + left + ', ' + r.width + 'x' + r.height, Math.round(r.size / 1024) + 'KB');
  }
  fs.writeFileSync(MEDIA_JS, head + JSON.stringify(media, null, 1) + ';\n');
  console.log('site/js/media.js updated');
})();
