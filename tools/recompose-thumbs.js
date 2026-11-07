/*
 * Recomposes selected card thumbnails (4:3, 900w + 450w) from a chosen frame and an exact crop, so the important part of the picture is never
 * cut off (the automatic "attention" crop clipped the CarSwitch logo, the Winter Sale badge and the Evercare caption).
 *   node tools/recompose-thumbs.js
 * Reads the finished images in site/assets/img and writes site/assets/img/thumbs/<slug>.webp and <slug>-450.webp.
 * crop = which part of the source to keep, as fractions of its width/height (left, top, width, height).
 */
const path = require('path');
const sharp = require('./node_modules/sharp');
const IMG = path.join(__dirname, '..', 'site', 'assets', 'img');
const SPEC = [
  // "Looking to sell your car?": the whole character and the whole headline, with plain orange along the top where the tags sit
  { slug: 'carswitch', src: 'carswitch/storyboard-4.webp', crop: { left: 0.16, top: 0, width: 0.75, height: 1 } },
  // the woman at home in her red cape, centred; only decoration sits under the tags
  { slug: 'evercare', src: 'evercare/flatten-curve.webp', crop: { left: 0.125, top: 0, width: 0.75, height: 1 } },
  // keep the round "Breakfast Box" logo on the left edge whole (the automatic crop clipped it)
  { slug: 'breakfast-box', src: 'breakfast-box/bb-3.webp', crop: { left: 0, top: 0, width: 0.875, height: 1 } },
  // the 15 cm banner, centred on the complete "Annual Winter Sale" badge
  { slug: 'annual-winter-sale', src: 'annual-winter-sale/banner-15cm.webp', crop: { left: 0.19, top: 0, width: 0.62, height: 1 } },
];
(async () => {
  for (const t of SPEC) {
    const file = path.join(IMG, t.src), meta = await sharp(file).metadata();
    const region = { left: Math.round(meta.width * t.crop.left), top: Math.round(meta.height * t.crop.top), width: Math.round(meta.width * t.crop.width), height: Math.round(meta.height * t.crop.height) };
    const cropped = await sharp(file).extract(region).toBuffer();
    for (const w of [900, 450]) {
      const out = path.join(IMG, 'thumbs', t.slug + (w === 900 ? '' : '-' + w) + '.webp');
      const r = await sharp(cropped).resize(w, Math.round(w * 0.75), { fit: 'cover' }).webp({ quality: 80, effort: 6, smartSubsample: true }).toFile(out);
      console.log(t.slug, w + 'w', Math.round(r.size / 1024) + 'KB', '(crop ' + region.width + 'x' + region.height + ' of ' + meta.width + 'x' + meta.height + ')');
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
