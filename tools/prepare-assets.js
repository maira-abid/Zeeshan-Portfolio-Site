/*
 * Asset pipeline for the portfolio site.
 *
 *   node prepare-assets.js            -> images + videos
 *   node prepare-assets.js images     -> only images (fast)
 *   node prepare-assets.js videos     -> only videos / hero reel (slow)
 *
 * Reads the originals from "Portfolio Work Compilations 2026-2027" (never modifies them) and writes
 * web-sized copies into site/assets. Also writes site/js/media.js with the pixel size of every image so
 * pages can reserve space before the images load.
 *
 * Requires: sharp (npm i) and ffmpeg/ffprobe on PATH.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'originals', 'Portfolio Work Compilations 2026-2027');
const EXTRACTS = path.join(__dirname, 'extracts');
const OUT_IMG = path.join(ROOT, 'site', 'assets', 'img');
const OUT_VID = path.join(ROOT, 'site', 'assets', 'video');
sharp.cache(false);

const A = 'Animations-Videos', D = 'Digital Marketing - Marketing Campaigns', P = 'Print Marketing';
const BF = `${D}/Black Friday 2025`, CSS = `${D}/Collegiate Survival Sale 2025`;

// ---- IMAGES: [project slug, output name, source path, kind] -----------------------------------------------
// kind: img (max 1800w webp) | tall (long scrolling image, jpg 1000w) | gif (copied as is) | extract (pre-rendered PDF page)
const images = [];
const add = (slug, name, src, kind = 'img') => images.push({ slug, name, src, kind });

// CarSwitch
add('carswitch', 'intro', `${A}/CarSwitch/CS December 2019 - 001-03.jpg`);
for (let i = 1; i <= 6; i++) add('carswitch', `storyboard-${i}`, `${A}/CarSwitch/CS-Storyboards-0${i}.jpg`);
add('carswitch', 'palette', 'carswitch-palette.png', 'extract');
add('carswitch', 'typography', 'carswitch-typography.png', 'extract');
add('carswitch', 'characters', 'carswitch-characters.png', 'extract');
// Evercare
add('evercare', 'flatten-curve', `${A}/Evercare/Flatten Curve 03-13-01.jpg`);
for (let i = 1; i <= 12; i++) add('evercare', `storyboard-${i}`, `${A}/Evercare/EC-Portfolio-${String(i).padStart(2, '0')}.jpg`);
add('evercare', 'colour-typography', 'evercare-colour-typography.png', 'extract');
add('evercare', 'assets', 'evercare-assets.png', 'extract');
// Pizza Now
add('pizza-now', 'box-1', 'Branding/Pizza-Now_PF-Website_Box-1.jpg');
add('pizza-now', 'box-2', 'Branding/Pizza-Now_PF-Website_Box-2.jpg');
add('pizza-now', 'socials', 'Branding/Pizza-Now_PF-Website_Socials.jpg');
add('pizza-now', 'storefront', 'Branding/Pizza-Now_PF-Website_Storefront.jpg');
add('pizza-now', 'storefront-wide', 'Branding/Pizza-Now-Storefront-01.jpg');
add('pizza-now', 'food-court', 'Branding/Pizza Now - Food Court.jpg');
add('pizza-now', 'logo-iterations', 'Branding/Preview-Images-for-Website-2026-07.jpg');
add('pizza-now', 'logo-evolution', 'Branding/Pizza-Now_Logo-Evolution.gif', 'gif');
// Breakfast Box
for (let i = 1; i <= 6; i++) add('breakfast-box', `bb-${i}`, `Branding/BB_2022_PF-Website_Images_${i}.jpg`);
// Black Friday
add('black-friday', 'hero-1', `${BF}/Black-Friday_2025_PF-Website_Image_1.jpg`);
add('black-friday', 'hero-4', `${BF}/Black-Friday_2025_PF-Website_Image_4.jpg`);
add('black-friday', 'post-starts-1', `${BF}/Black-Friday_Nov,2025_STARTS_POST_1.jpg`);
add('black-friday', 'post-starts-2', `${BF}/Black-Friday_Nov,2025_STARTS_POST_2.jpg`);
add('black-friday', 'post-still-on-1', `${BF}/Black-Friday_Nov,2025_Still-On_POST_1.jpg`);
add('black-friday', 'post-still-on-2', `${BF}/Black-Friday_Nov,2025_Still-On_POST_2.jpg`);
add('black-friday', 'email-rewards', `${BF}/2025-11-Black-Friday-Sale-2-Rewards.png`, 'tall');
add('black-friday', 'email-starts', `${BF}/2025-11-Black-Friday-Sale-3-Sale-STARTS.png`, 'tall');
add('black-friday', 'email-whats-left', `${BF}/2025-11-Black-Friday-Sale-5-Whats-Left.png`, 'tall');
// Collegiate Survival Sale
add('collegiate-survival-sale', 'hero-5', `${CSS}/CSS_2025_PF-Website_Images_5.jpg`);
add('collegiate-survival-sale', 'hero-6', `${CSS}/CSS_2025_PF-Website_Images_6.jpg`);
add('collegiate-survival-sale', 'launch', `${CSS}/B2S CSS Sale - Launch - Post-01.jpg`);
add('collegiate-survival-sale', 'still-on', `${CSS}/B2S CSS Sale - Still On - Post 01_2.jpg`);
add('collegiate-survival-sale', 'teaser-1', `${CSS}/CSS-teaser_Sep, 2025_POST_1.jpg`);
add('collegiate-survival-sale', 'teaser-2', `${CSS}/CSS-teaser_Sep, 2025_POST_1B.jpg`);
add('collegiate-survival-sale', 'last-call-1', `${CSS}/CSS-Last-Call_Sep, 2025_POST_1.jpg`);
add('collegiate-survival-sale', 'last-call-2', `${CSS}/CSS-Last-Call_Sep, 2025_POST_2.jpg`);
add('collegiate-survival-sale', 'email-launch', `${BF}/2025-09-CSS-Sale-1-Launch.png`, 'tall');
add('collegiate-survival-sale', 'email-last-call', `${BF}/2025-09-CSS-Sale-2-Last-Call.png`, 'tall');
// Annual Winter Sale (Generation)
add('annual-winter-sale', 'title', `${P}/01-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'brief', `${P}/02-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'inspiration', `${P}/03-AWS---Newspaper-Ad01.jpg`, 'tall');
add('annual-winter-sale', 'initial-attempts', `${P}/04-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'final-designs', `${P}/05-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'newspapers', `${P}/06-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'web-social', `${P}/07-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'templates', `${P}/08-AWS---Newspaper-Ad01.jpg`);
add('annual-winter-sale', 'banner-15cm', `${P}/15 cm adaption (for newspaper)(DONE)-01.jpg`);
add('annual-winter-sale', 'ad-27cm', `${P}/27 cm adaption(for newspaper)(DONE)-01.jpg`);
add('annual-winter-sale', 'website', `${P}/aws-website.jpg`);
add('annual-winter-sale', 'daraz', `${P}/daraz-aws.jpg`);
add('annual-winter-sale', 'dawn', `${P}/dawn-news-ad.jpg`);
add('annual-winter-sale', 'facebook-ad', `${P}/sale-ad-facebook.jpg`);
add('annual-winter-sale', 'facebook-cover', `${P}/sale-cover-fb.jpg`);
// Generation Magazines
add('generation-magazines', 'covers', `${P}/cover images (magazines).jpg`);
add('generation-magazines', 'magazine-1', `${P}/magazine design 01.jpg`, 'tall');
add('generation-magazines', 'magazine-2', `${P}/magazine design 02.jpg`, 'tall');
add('generation-magazines', 'magazine-3', `${P}/magazine design 03.jpg`, 'tall');
// Byte app
add('byte-app', 'cover', 'UI-UX/Byte App_Cover_3.jpg');
for (const i of [2, 3, 4, 6]) add('byte-app', `byte-0${i}`, `UI-UX/Byte-0${i}.jpg`);
add('byte-app', 'screens', 'UI-UX/Byte-05.jpg', 'tall');

// Tango photography (JPGs only; the .CR2 raw files are not used). Curated selection, rotated by EXIF.
const TANGO = '../Toronto Tango 8 Festival, 2026';
[3947, 3948, 3921, 3923, 3928, 3929, 3931, 3933, 3934, 3935, 3939, 3940, 3946, 3951, 3953, 3954, 3956, 3957, 3959, 3962, 3964, 3965, 3967, 3969]
  .forEach((n) => add('tango-photos', `tango-${n}`, `${TANGO}/IMG_${n}.JPG`, 'photo'));

// ---- THUMBNAILS (4:3 crop) -----------------------------------------------------------------------------
const thumbs = [
  { slug: 'carswitch', from: ['carswitch', 'intro'] },
  { slug: 'evercare', from: ['evercare', 'storyboard-5'] },
  { slug: 'pizza-now', from: ['pizza-now', 'box-1'] },
  { slug: 'breakfast-box', from: ['breakfast-box', 'bb-3'] },
  { slug: 'black-friday', from: ['black-friday', 'hero-1'] },
  { slug: 'collegiate-survival-sale', from: ['collegiate-survival-sale', 'hero-5'] },
  { slug: 'annual-winter-sale', from: ['annual-winter-sale', 'banner-15cm'] },
  { slug: 'generation-magazines', from: ['generation-magazines', 'covers'] },
  { slug: 'byte-app', from: ['byte-app', 'cover'] },
  { slug: 'tango-photos', from: ['tango-photos', 'tango-3948'], position: 'centre' },
];

// ---- VIDEOS ------------------------------------------------------------------------------------------------
const videos = [
  { out: 'colabs-launch', src: `${A}/COLABS Launch Video.mp4` },
  { out: 'ut-launch', src: `${A}/UT Launch Video.mp4` },
  { out: 'treble-product', src: `${A}/Treble Product Video.mp4` },
  { out: 'startup-grind-2019', src: `${A}/Startup Grind 2019.mp4` },
  { out: 'byte-order-tutorial', src: `${A}/Byte Order Tutorial - 03.mp4` },
  { out: 'byte-just-5-taps', src: `${A}/Just 5 Taps.mp4` },
  { out: 'byte-too-much-on-food', src: `${A}/Too Much on Food B - 02.mp4` },
  { out: 'byte-wheel', src: `${A}/Wheel Animation.mp4` },
];

// Placeholder hero reel: short cuts from existing animations (replace with the real showreel).
const reelClips = [
  [`${A}/CarSwitch/CarSwitch - Sell Animation_4.mp4`, 8], [`${A}/Evercare/7 Ways to Stop Covid - 02.mp4`, 20],
  [`${A}/UT Launch Video.mp4`, 12], [`${A}/CarSwitch/CS Outdoor (Landscape) - 003.mp4`, 6],
  [`${A}/Treble Product Video.mp4`, 8], [`${A}/Evercare/EC App Animation.mp4`, 35],
  [`${A}/Startup Grind 2019.mp4`, 39], [`${A}/CarSwitch/Lemon Car Aniation 04.mp4`, 3],
  [`${A}/Evercare/Covid Home Management - 06.mp4`, 30], [`${A}/UT Launch Video.mp4`, 30],
];
const REEL_SEG = 2.2;

// -----------------------------------------------------------------------------------------------------------
const media = {};
const rel = (...p) => p.join('/');
const mkdir = (d) => fs.mkdirSync(d, { recursive: true });

// Web-image rules (everything on the site goes through here):
//  - WebP only (animated WebP for GIFs), EXIF-rotated, metadata stripped, never upscaled
//  - full size capped at 1800px (photos/graphics) or 1000px (long scrolling designs)
//  - smaller copies (-640, -1200) are generated so the browser can pick the lightest one via srcset
//  - warns when a file is heavier than the budget so it can be reviewed
const BUDGET_KB = 300;
const VARIANTS = { img: [640, 1200], photo: [640, 1200], extract: [640, 1200], tall: [640] };
const stats = { files: 0, bytes: 0, warn: [] };

async function webp(input, outFile, resize, quality, opts) {
  let r, q = quality;
  // re-encode at lower quality (down to 60) if a normal-sized image is over budget
  for (;;) {
    r = await sharp(input, Object.assign({ limitInputPixels: false }, opts || {}))
      .rotate().resize(resize).webp({ quality: q, effort: 6, smartSubsample: true }).toFile(outFile);
    if (r.size / 1024 <= BUDGET_KB || r.height > 4000 || (opts && opts.animated) || q <= 60) break;
    q -= 8;
  }
  stats.files++; stats.bytes += r.size;
  return r;
}

async function doImages() {
  for (const it of images) {
    const dir = path.join(OUT_IMG, it.slug);
    mkdir(dir);
    const input = it.kind === 'extract' ? path.join(EXTRACTS, it.src) : path.join(SRC, it.src);
    if (!fs.existsSync(input)) { console.error('MISSING', input); continue; }
    const base = path.join(dir, it.name);
    let r, q = 80;
    if (it.kind === 'gif') {
      // animated GIF -> animated WebP (keeps the GIF only if WebP would be bigger)
      r = await webp(input, base + '.webp', { width: 800, withoutEnlargement: true }, 70, { animated: true });
      if (r.size > fs.statSync(input).size) console.warn('NOTE: webp larger than gif for', it.name);
    } else if (it.kind === 'tall') {
      r = await webp(input, base + '.webp', { width: 1000, withoutEnlargement: true }, 66);
    } else if (it.kind === 'photo') {
      r = await webp(input, base + '.webp', { width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true }, 78);
    } else {
      r = await webp(input, base + '.webp', { width: 1800, withoutEnlargement: true }, q);
    }
    const info = { w: r.width, h: r.pageHeight || r.height };
    const variants = [];
    for (const w of VARIANTS[it.kind] || []) {
      if (r.width > w * 1.15) {
        await webp(input, base + '-' + w + '.webp', { width: w, withoutEnlargement: true }, it.kind === 'tall' ? 66 : 78, it.kind === 'gif' ? { animated: true } : undefined);
        variants.push(w);
      }
    }
    if (variants.length) info.v = variants;
    if (r.size / 1024 > BUDGET_KB && it.kind !== 'tall') stats.warn.push(it.slug + '/' + it.name + ' ' + Math.round(r.size / 1024) + 'KB');
    media[rel('img', it.slug, it.name + '.webp')] = info;
    console.log('img', it.slug, it.name + '.webp', info.w + 'x' + info.h, Math.round(r.size / 1024) + 'KB', variants.join('/'));
  }
  // card thumbnails: 900w + 450w
  mkdir(path.join(OUT_IMG, 'thumbs'));
  for (const t of thumbs) {
    const it = images.find((i) => i.slug === t.from[0] && i.name === t.from[1]);
    const input = it.kind === 'extract' ? path.join(EXTRACTS, it.src) : path.join(SRC, it.src);
    for (const w of [900, 450]) {
      const outFile = path.join(OUT_IMG, 'thumbs', t.slug + (w === 900 ? '' : '-' + w) + '.webp');
      await webp(input, outFile, { width: w, height: Math.round(w * 0.75), fit: 'cover', position: t.position || 'attention' }, 80);
    }
    console.log('thumb', t.slug);
  }
  console.log('images: ' + stats.files + ' files, ' + (stats.bytes / 1048576).toFixed(1) + ' MB total' + (stats.warn.length ? '\nOVER ' + BUDGET_KB + 'KB BUDGET: ' + stats.warn.join(', ') : ''));
}

function ff(args) { execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' }); }
function probe(file) {
  const o = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-show_entries', 'format=duration', '-of', 'json', file]).toString();
  const j = JSON.parse(o); return { w: j.streams[0].width, h: j.streams[0].height, d: +j.format.duration };
}

async function doVideos() {
  mkdir(OUT_VID);
  mkdir(path.join(OUT_IMG, 'posters'));
  for (const v of videos) {
    const input = path.join(SRC, v.src);
    const out = path.join(OUT_VID, v.out + '.mp4');
    const pr = probe(input);
    if (!fs.existsSync(out)) {
      console.log('video', v.out);
      ff(['-i', input, '-vf', "scale='if(gt(iw,ih),min(1280,iw),min(720,iw))':-2", '-c:v', 'libx264', '-crf', '27', '-preset', 'fast', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out]);
    }
    const poster = path.join(OUT_IMG, 'posters', v.out + '.webp');
    ff(['-ss', String(Math.min(pr.d * 0.3, 20)), '-i', input, '-frames:v', '1', '-vf', 'scale=960:-2:force_original_aspect_ratio=decrease', '-c:v', 'libwebp', '-quality', '72', poster]);
    media[rel('video', v.out + '.mp4')] = { w: pr.w, h: pr.h };
  }
  // Hero reel (silent, 1280x720)
  const reel = path.join(OUT_VID, 'hero-reel.mp4');
  console.log('hero reel');
  const inputs = []; const filters = [];
  reelClips.forEach(([src, ss], i) => {
    inputs.push('-ss', String(ss), '-t', String(REEL_SEG), '-i', path.join(SRC, src));
    filters.push(`[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=25,format=yuv420p[v${i}]`);
  });
  const concat = reelClips.map((_, i) => `[v${i}]`).join('') + `concat=n=${reelClips.length}:v=1:a=0[out]`;
  ff([...inputs, '-filter_complex', filters.join(';') + ';' + concat, '-map', '[out]', '-c:v', 'libx264', '-crf', '28', '-preset', 'fast', '-an', '-movflags', '+faststart', reel]);
  ff(['-ss', '3', '-i', reel, '-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '72', path.join(OUT_IMG, 'posters', 'hero-reel.webp')]);
}

// Thumbnails for video-only projects, cut from the generated poster frames.
async function doVideoThumbs() {
  const map = { showreel: 'hero-reel', 'app-launch': 'ut-launch', 'startup-grind': 'startup-grind-2019' };
  mkdir(path.join(OUT_IMG, 'thumbs'));
  for (const [slug, poster] of Object.entries(map)) {
    for (const w of [900, 450]) {
      await sharp(path.join(OUT_IMG, 'posters', poster + '.webp')).resize(w, Math.round(w * 0.75), { fit: 'cover', position: 'attention' })
        .webp({ quality: 80 }).toFile(path.join(OUT_IMG, 'thumbs', slug + (w === 900 ? '' : '-' + w) + '.webp'));
    }
    console.log('thumb', slug);
  }
}

function writeMedia() {
  const file = path.join(ROOT, 'site', 'js', 'media.js');
  let existing = {};
  try { existing = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^window\.MEDIA\s*=\s*/, '').replace(/;\s*$/, '')); } catch (e) { /* first run */ }
  fs.writeFileSync(file, 'window.MEDIA = ' + JSON.stringify({ ...existing, ...media }, null, 1) + ';\n');
  console.log('wrote', file);
}

(async () => {
  const what = process.argv[2] || 'all';
  if (what === 'all' || what === 'images') await doImages();
  if (what === 'all' || what === 'videos') await doVideos();
  if (what === 'all' || what === 'videos' || what === 'video-thumbs') await doVideoThumbs();
  writeMedia();
})().catch((e) => { console.error(e); process.exit(1); });
