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
const HEAD = path.join(ROOT, 'originals', 'Headshot (2026-11-20)'); // the portrait for the About page
const ADD2 = path.join(ROOT, 'originals', 'Additional Images (2026-11-16)'); // the third batch (16-Nov-2026): storyboards, store photos, new inspirations scroll, new phone mockup
const ADD = path.join(ROOT, 'originals', 'Additional Images (2026-11-11)'); // the owner's second batch (11-Nov-2026): hi-res replacements and new images
const EXTRACTS = path.join(__dirname, 'extracts');
const OUT_IMG = path.join(ROOT, 'site', 'assets', 'img');
const OUT_VID = path.join(ROOT, 'site', 'assets', 'video');
sharp.cache(false);

const A = 'Animations-Videos', D = 'Digital Marketing - Marketing Campaigns', P = 'Print Marketing';
const BF = `${D}/Black Friday 2025`, CSS = `${D}/Collegiate Survival Sale 2025`;

// ---- IMAGES: [project slug, output name, source path, kind] -----------------------------------------------
// kind: img (max 1800w webp) | tall (long scrolling image, jpg 1000w) | gif (copied as is) | extract (pre-rendered PDF page)
const images = [];
// from = 'add' reads the file from the Additional Images folder instead of the first batch; width overrides the default size of an animation
const add = (slug, name, src, kind = 'img', from, width) => images.push({ slug, name, src, kind, from, width });
const inputOf = (it) => it.kind === 'extract' ? path.join(EXTRACTS, it.src) : path.join(it.from === 'head' ? HEAD : it.from === 'add2' ? ADD2 : it.from === 'add' ? ADD : SRC, it.src);

// CarSwitch
for (let i = 1; i <= 6; i++) add('carswitch', `storyboard-${i}`, `${A}/CarSwitch/CS-Storyboards-0${i}.jpg`);
const CSW = 'CarSwitch';
add('carswitch', 'palette', `${CSW}/Missing Images_1-01.jpg`, 'img', 'add2');
add('carswitch', 'typography', `${CSW}/Missing Images_1-02.jpg`, 'img', 'add2');
add('carswitch', 'characters', `${CSW}/Missing Images_1-03.jpg`, 'img', 'add2');
// the other storyboard frames (the ones that repeat storyboard-1 to -4 are not added again)
add('carswitch', 'sb-you-set-the-price', `${CSW}/CS December 2019 - 001-04.jpg`, 'img', 'add2');
add('carswitch', 'sb-management-of-transfers', `${CSW}/CS December 2019 - 001-08.jpg`, 'img', 'add2');
add('carswitch', 'sb-haggling', `${CSW}/CS October Video Screens_v4-10.jpg`, 'img', 'add2');
add('carswitch', 'sb-managing-transfer', `${CSW}/CS October Video Screens_v4-12.jpg`, 'img', 'add2');
add('carswitch', 'sb-own-price', `${CSW}/CS October Video Screens_v4-17.jpg`, 'img', 'add2');
add('carswitch', 'sb-success-fee', `${CSW}/CS October Video Screens_v4-23.jpg`, 'img', 'add2');
add('carswitch', 'story-selling-your-car', `${CSW}/Selling-your-car_Storyboard-03.jpg`, 'photo', 'add2');
add('carswitch', 'story-get-more-value-cars', `${CSW}/Selling-your-car_Storyboard-05.jpg`, 'photo', 'add2');
add('carswitch', 'story-get-more-value-coins', `${CSW}/Selling-your-car_Storyboard-08.jpg`, 'photo', 'add2');
add('carswitch', 'story-download-the-app', `${CSW}/Selling-your-car_Storyboard-09.jpg`, 'photo', 'add2');
// Evercare
add('evercare', 'flatten-curve', `${A}/Evercare/Flatten Curve 03-13-01.jpg`);
for (let i = 1; i <= 12; i++) add('evercare', `storyboard-${i}`, `${A}/Evercare/EC-Portfolio-${String(i).padStart(2, '0')}.jpg`);
const EC = 'Evercare';
add('evercare', 'sb-wash-hands', `${EC}/7 Ways to Stop Covid-04.jpg`, 'img', 'add2');
add('evercare', 'sb-adequate-measures', `${EC}/7 Ways to Stop Covid-14.jpg`, 'img', 'add2');
add('evercare', 'sb-talk-to-family', `${EC}/Shortness of Breath-18.jpg`, 'img', 'add2');
add('evercare', 'sb-avoid-hard-foods', `${EC}/Shortness of Breath-24.jpg`, 'img', 'add2');
add('evercare', 'sb-keep-in-touch', `${EC}/Shortness of Breath-27.jpg`, 'img', 'add2');
add('evercare', 'palette', `${EC}/Missing Images_1-04.jpg`, 'img', 'add');
add('evercare', 'typography', `${EC}/Missing Images_1-05.jpg`, 'img', 'add');
add('evercare', 'assets', `${EC}/Missing Images_1-06.jpg`, 'img', 'add');
// Pizza Now
add('pizza-now', 'box-1', 'Branding/Pizza-Now_PF-Website_Box-1.jpg');
add('pizza-now', 'box-2', 'Branding/Pizza-Now_PF-Website_Box-2.jpg');
add('pizza-now', 'socials', 'Branding/Pizza-Now_PF-Website_Socials.jpg');
add('pizza-now', 'storefront', 'Branding/Pizza-Now_PF-Website_Storefront.jpg');
add('pizza-now', 'storefront-wide', 'Branding/Pizza-Now-Storefront-01.jpg');
add('pizza-now', 'logo-iterations', 'Branding/Preview-Images-for-Website-2026-07.jpg');
add('pizza-now', 'logo-evolution', 'Branding/Pizza-Now_Logo-Evolution.gif', 'gif');
// Breakfast Box
for (let i = 1; i <= 6; i++) add('breakfast-box', `bb-${i}`, `Branding/BB_2022_PF-Website_Images_${i}.jpg`);
Object.assign(images.find((i) => i.slug === 'breakfast-box' && i.name === 'bb-2'), { src: 'Breakfast Box/BB_2022_PF-Website_Images_2.jpg', from: 'add2' });
// Black Friday
add('black-friday', 'hero-1', `${BF}/Black-Friday_2025_PF-Website_Image_1.jpg`);
add('black-friday', 'post-starts-1', `${BF}/Black-Friday_Nov,2025_STARTS_POST_1.jpg`);
add('black-friday', 'post-starts-2', `${BF}/Black-Friday_Nov,2025_STARTS_POST_2.jpg`);
add('black-friday', 'post-still-on-1', `${BF}/Black-Friday_Nov,2025_Still-On_POST_1.jpg`);
add('black-friday', 'post-still-on-2', `${BF}/Black-Friday_Nov,2025_Still-On_POST_2.jpg`);
add('black-friday', 'about-the-client', 'Black Friday/Black-Friday_Nov,2025_about-the-client.jpg', 'img', 'add');
add('black-friday', 'what-needs-solving', 'Black Friday/November_Restocks_Are_Here_what-needs-solving.jpg', 'img', 'add');
add('black-friday', 'how-it-worked-out', 'Black Friday/rewards-post_how-it-worked-out.jpg', 'img', 'add');
add('black-friday', 'what-happened', 'Black Friday/Black-Friday_2025_PF-Website_what-happened.jpg', 'img', 'add');
// NOTE: the five email newsletters (here and under Collegiate Survival Sale) are trimmed to the email's own width (no side margins, no -640 copy).
// After running this script, run `node tools/trim-emails.js` to apply that; the 'tall' entries below are only the starting point.
add('black-friday', 'email-rewards', `${BF}/2025-11-Black-Friday-Sale-2-Rewards.png`, 'tall');
add('black-friday', 'email-starts', `${BF}/2025-11-Black-Friday-Sale-3-Sale-STARTS.png`, 'tall');
add('black-friday', 'email-whats-left', `${BF}/2025-11-Black-Friday-Sale-5-Whats-Left.png`, 'tall');
// Collegiate Survival Sale
add('collegiate-survival-sale', 'hero-5', `${CSS}/CSS_2025_PF-Website_Images_5.jpg`);
const CS = 'CSS Sale';
add('collegiate-survival-sale', 'about-the-client', `${CS}/CSS-teaser_Sep, 2025_POST_about-the-client.jpg`, 'img', 'add');
add('collegiate-survival-sale', 'what-needs-solving', `${CS}/CSS-launch_Sep, 2025_POST_what-needs-solving.jpg`, 'img', 'add');
add('collegiate-survival-sale', 'how-i-worked-it-out', `${CS}/CSS-Still-On_Sep, 2025_POST_how-i-worked-it-out.jpg`, 'img', 'add');
add('collegiate-survival-sale', 'what-happened', `${CS}/CSS-Last-Call_Sep, 2025_POST_what-happened.jpg`, 'img', 'add');
add('collegiate-survival-sale', 'story-last-call', `${CS}/CSS-last-call-gif.gif`, 'gif', 'add', 540);
add('collegiate-survival-sale', 'story-still-on', `${CS}/CSS-still-on-gif.gif`, 'gif', 'add', 540);
add('collegiate-survival-sale', 'email-launch', `${BF}/2025-09-CSS-Sale-1-Launch.png`, 'tall');
add('collegiate-survival-sale', 'email-last-call', `${BF}/2025-09-CSS-Sale-2-Last-Call.png`, 'tall');
// Annual Winter Sale (Generation)
const AWS = 'AWS - Generation';
add('annual-winter-sale', 'inspiration', `${AWS}/Generation_AWS_Inspirations.jpg`, 'tall', 'add2', 1200); // the new Inspirations scroll (16-Nov)
add('annual-winter-sale', 'palette', `${AWS}/Missing Images_1-07.jpg`, 'img', 'add');
add('annual-winter-sale', 'typography', `${AWS}/Missing Images_1-08.jpg`, 'img', 'add');
add('annual-winter-sale', 'initial-attempts', `${AWS}/Generation_AWS_Initial-Attempts_2.gif`, 'gif', 'add', 1000);
add('annual-winter-sale', 'banner-15cm', `${AWS}/15 cm adaption (for newspaper)(DONE)-01.jpg`, 'img', 'add');
add('annual-winter-sale', 'ad-27cm', `${AWS}/27 cm adaption(for newspaper)(DONE)-01.jpg`, 'photo', 'add');
add('annual-winter-sale', 'dawn', `${AWS}/Layer 15.jpg`, 'photo', 'add');
add('annual-winter-sale', 'the-news', `${AWS}/Layer 16.jpg`, 'photo', 'add');
add('annual-winter-sale', 'website', `${AWS}/aws-website.jpg`, 'img', 'add');
add('annual-winter-sale', 'daraz', `${AWS}/daraz-aws.jpg`, 'img', 'add');
add('annual-winter-sale', 'facebook-ad', `${AWS}/sale-ad-facebook.jpg`, 'img', 'add');
['IMG_1402_2', 'IMG_1421_2', 'IMG_1429_2', 'IMG_1475_2', 'IMG_1497_2', 'IMG_1537_2', '_MG_1582_2', '_MG_1609_2']
  .forEach((n, i) => add('annual-winter-sale', 'store-display-' + (i + 1), `${AWS}/${n}.jpg`, 'photo', 'add2'));
add('annual-winter-sale', 'socials', `${AWS}/Generation_AWS_Socials.gif`, 'gif', 'add', 900);
// Generation Magazines
add('generation-magazines', 'covers', `${P}/cover images (magazines).jpg`);
add('generation-magazines', 'magazine-1', `${P}/magazine design 01.jpg`, 'tall', undefined, 800);
add('generation-magazines', 'magazine-2', `${P}/magazine design 02.jpg`, 'tall', undefined, 800);
add('generation-magazines', 'magazine-3', `${P}/magazine design 03.jpg`, 'tall', undefined, 800);
const GM = 'Magazines - Generation';
add('generation-magazines', 'mockup-eu', `${GM}/01 Free EU Magazine Mockup_1.jpg`, 'img', 'add');
add('generation-magazines', 'mockup-concrete', `${GM}/01 Free Open A4 Magazine Mockup On Concrete_1.jpg`, 'img', 'add');
add('generation-magazines', 'mockup-green', `${GM}/Magazine_Mockup_3A.jpg`, 'img', 'add');
add('generation-magazines', 'mockup-flip', `${GM}/Magazine_Mockup_6A.jpg`, 'img', 'add');
add('generation-magazines', 'mockup-covers', `${GM}/Magazine_Mockup_7A.jpg`, 'img', 'add');
add('generation-magazines', 'mockup-wall', `${GM}/Open-Magazine-Mockup_1a.jpg`, 'img', 'add');
// Byte app
add('byte-app', 'cover', 'UI-UX/Byte App_Cover_3.jpg');
for (const i of [2, 3, 4, 6]) add('byte-app', `byte-0${i}`, `UI-UX/Byte-0${i}.jpg`);
add('byte-app', 'screens', 'UI-UX/Byte-05.jpg', 'tall');

// About page portrait
add('about', 'portrait', 'IMG_8090_1080x1350.jpg', 'photo', 'head');

// Tango photography (JPGs only; the .CR2 raw files are not used). Curated selection, rotated by EXIF.
const TANGO = '../Toronto Tango 8 Festival, 2026';
[3947, 3948, 3921, 3923, 3928, 3929, 3931, 3933, 3934, 3935, 3939, 3940, 3946, 3951, 3953, 3954, 3956, 3957, 3959, 3962, 3964, 3965, 3967, 3969]
  .forEach((n) => add('tango-photos', `tango-${n}`, `${TANGO}/IMG_${n}.JPG`, 'photo'));

// ---- SEO / GEO file names: <project or client>-<what the picture shows>, lowercase words joined by hyphens ----------
const NAMES = {
 'annual-winter-sale/ad-27cm': 'generation-winter-sale-newspaper-ad-27cm',
 'annual-winter-sale/banner-15cm': 'generation-winter-sale-newspaper-banner-15cm',
 'annual-winter-sale/daraz': 'generation-winter-sale-daraz-banner',
 'annual-winter-sale/dawn': 'generation-winter-sale-dawn-newspaper-ad',
 'annual-winter-sale/facebook-ad': 'generation-winter-sale-facebook-banner',
 'annual-winter-sale/initial-attempts': 'generation-winter-sale-initial-layouts-animation',
 'annual-winter-sale/inspiration': 'generation-winter-sale-constructivism-inspirations',
 'annual-winter-sale/palette': 'generation-brand-colour-palette',
 'annual-winter-sale/socials': 'generation-winter-sale-social-post-animation',
 'annual-winter-sale/the-news': 'generation-winter-sale-the-news-newspaper-ad',
 'annual-winter-sale/typography': 'generation-brand-typography-avant-garde',
 'annual-winter-sale/website': 'generation-winter-sale-website-banner',
 'black-friday/about-the-client': 'multiverse-black-friday-sale-launch-posts',
 'black-friday/email-rewards': 'multiverse-black-friday-rewards-email',
 'black-friday/email-starts': 'multiverse-black-friday-sale-starts-email',
 'black-friday/email-whats-left': 'multiverse-black-friday-whats-left-email',
 'black-friday/hero-1': 'multiverse-black-friday-sale-25-percent-off-post',
 'black-friday/how-it-worked-out': 'multiverse-black-friday-rewards-carousel',
 'black-friday/post-starts-1': 'multiverse-black-friday-carousel-starts-1',
 'black-friday/post-starts-2': 'multiverse-black-friday-carousel-starts-2',
 'black-friday/post-still-on-1': 'multiverse-black-friday-carousel-still-on-1',
 'black-friday/post-still-on-2': 'multiverse-black-friday-carousel-still-on-2',
 'black-friday/what-happened': 'multiverse-black-friday-stock-running-out-post',
 'black-friday/what-needs-solving': 'multiverse-black-friday-november-restocks-post',
 'breakfast-box/bb-1': 'breakfast-box-instagram-posts-pastel-pink',
 'breakfast-box/bb-2': 'breakfast-box-in-byte-app-restaurant-list',
 'breakfast-box/bb-3': 'breakfast-box-logo-and-eggs-on-toast',
 'breakfast-box/bb-4': 'breakfast-box-typefaces-monggoland-and-figtree',
 'breakfast-box/bb-5': 'breakfast-box-branded-coffee-cups',
 'breakfast-box/bb-6': 'breakfast-box-logo-on-hanging-shop-sign',
 'byte-app/byte-02': 'byte-app-redesign-intro',
 'byte-app/byte-03': 'byte-app-user-flow',
 'byte-app/byte-04': 'byte-app-wireframes',
 'byte-app/byte-06': 'byte-app-screens-on-phones',
 'byte-app/cover': 'byte-app-home-screen',
 'byte-app/screens': 'byte-app-screen-designs',
 'carswitch/characters': 'carswitch-dubai-animation-character-sheet',
 'carswitch/palette': 'carswitch-dubai-animation-colour-palette',
 'carswitch/typography': 'carswitch-dubai-animation-typography',
 'carswitch/storyboard-1': 'carswitch-dubai-storyboard-seller-and-car-dealer',
 'carswitch/storyboard-2': 'carswitch-dubai-storyboard-endless-phone-calls',
 'carswitch/storyboard-3': 'carswitch-dubai-storyboard-mechanic-inspects-car',
 'carswitch/storyboard-4': 'carswitch-dubai-storyboard-looking-to-sell-your-car',
 'carswitch/storyboard-5': 'carswitch-dubai-storyboard-fees-charged-after-sale',
 'carswitch/storyboard-6': 'carswitch-dubai-storyboard-online-inspection-report',
 'collegiate-survival-sale/about-the-client': 'collegiate-survival-sale-teaser-posts',
 'collegiate-survival-sale/email-last-call': 'collegiate-survival-sale-last-call-email',
 'collegiate-survival-sale/email-launch': 'collegiate-survival-sale-launch-email',
 'collegiate-survival-sale/hero-5': 'collegiate-survival-sale-posts-on-instagram-and-phone',
 'collegiate-survival-sale/how-i-worked-it-out': 'collegiate-survival-sale-still-on-posts',
 'collegiate-survival-sale/story-last-call': 'collegiate-survival-sale-last-call-story-animation',
 'collegiate-survival-sale/story-still-on': 'collegiate-survival-sale-still-on-story-animation',
 'collegiate-survival-sale/what-happened': 'collegiate-survival-sale-last-call-posts',
 'collegiate-survival-sale/what-needs-solving': 'collegiate-survival-sale-launch-posts',
 'evercare/assets': 'evercare-animation-characters-backgrounds',
 'evercare/flatten-curve': 'evercare-flatten-the-curve-frame',
 'evercare/palette': 'evercare-animation-colour-palette',
 'evercare/typography': 'evercare-animation-typography',
 'evercare/storyboard-1': 'evercare-storyboard-pandemic-curve-chart',
 'evercare/storyboard-2': 'evercare-storyboard-sick-person-isolates',
 'evercare/storyboard-3': 'evercare-storyboard-working-at-home-isolating',
 'evercare/storyboard-4': 'evercare-storyboard-turn-away-when-sneezing',
 'evercare/storyboard-5': 'evercare-storyboard-seek-medical-help',
 'evercare/storyboard-6': 'evercare-storyboard-stay-updated',
 'evercare/storyboard-7': 'evercare-storyboard-home-isolation-guidelines',
 'evercare/storyboard-8': 'evercare-storyboard-wear-face-mask-in-crowd',
 'evercare/storyboard-9': 'evercare-storyboard-disinfect-surfaces',
 'evercare/storyboard-10': 'evercare-storyboard-avoid-holding-breath',
 'evercare/storyboard-11': 'evercare-storyboard-use-support-on-stairs',
 'evercare/storyboard-12': 'evercare-storyboard-daily-items-within-reach',
 'generation-magazines/covers': 'generation-magazine-three-covers',
 'generation-magazines/magazine-1': 'generation-magazine-eid-2018-full-layout',
 'generation-magazines/magazine-2': 'generation-magazine-beach-cover-full-layout',
 'generation-magazines/magazine-3': 'generation-magazine-autumn-winter-18-19-layout',
 'generation-magazines/mockup-concrete': 'generation-magazine-spread-on-concrete-mockup',
 'generation-magazines/mockup-covers': 'generation-magazine-front-and-back-cover-mockup',
 'generation-magazines/mockup-eu': 'generation-magazine-open-spread-mockup',
 'generation-magazines/mockup-flip': 'generation-magazine-page-turn-spread-mockup',
 'generation-magazines/mockup-green': 'generation-magazine-green-border-spread-mockup',
 'generation-magazines/mockup-wall': 'generation-magazine-spread-on-wall-mockup',
 'pizza-now/box-1': 'pizza-now-pizza-boxes-checkerboard-pattern',
 'pizza-now/box-2': 'pizza-now-pizza-box-pattern-in-rows',
 'pizza-now/logo-evolution': 'pizza-now-logo-evolution-animation',
 'pizza-now/logo-iterations': 'pizza-now-final-logo-on-pizza-pan',
 'pizza-now/socials': 'pizza-now-instagram-posts',
 'pizza-now/storefront-wide': 'pizza-now-banner-pizza-and-logo',
 'pizza-now/storefront': 'pizza-now-in-byte-app-restaurant-list',
 'posters/byte-just-5-taps': 'byte-app-order-in-5-taps-video-poster',
 'posters/byte-order-tutorial': 'byte-app-order-tutorial-video-poster',
 'posters/byte-too-much-on-food': 'byte-app-take-a-byte-video-poster',
 'posters/byte-wheel': 'byte-app-wheel-animation-video-poster',
 'posters/colabs-launch': 'colabs-launch-video-poster',
 'posters/hero-reel': 'zeeshan-abid-animation-showreel-video-poster',
 'posters/startup-grind-2019': 'startup-grind-2019-video-poster',
 'posters/treble-product': 'treble-product-video-poster',
 'posters/ut-launch': 'ut-launch-video-poster',
 'tango-photos/tango-3921': 'toronto-tango-festival-2026-couple-dancing-3921',
 'tango-photos/tango-3923': 'toronto-tango-festival-2026-couple-dancing-3923',
 'tango-photos/tango-3928': 'toronto-tango-festival-2026-couple-dancing-3928',
 'tango-photos/tango-3929': 'toronto-tango-festival-2026-couple-dancing-3929',
 'tango-photos/tango-3931': 'toronto-tango-festival-2026-couple-dancing-3931',
 'tango-photos/tango-3933': 'toronto-tango-festival-2026-couple-dancing-3933',
 'tango-photos/tango-3934': 'toronto-tango-festival-2026-couple-dancing-3934',
 'tango-photos/tango-3935': 'toronto-tango-festival-2026-couple-dancing-3935',
 'tango-photos/tango-3939': 'toronto-tango-festival-2026-couple-dancing-3939',
 'tango-photos/tango-3940': 'toronto-tango-festival-2026-couple-dancing-3940',
 'tango-photos/tango-3946': 'toronto-tango-festival-2026-couple-dancing-3946',
 'tango-photos/tango-3947': 'toronto-tango-festival-2026-couple-dancing-3947',
 'tango-photos/tango-3948': 'toronto-tango-festival-2026-couple-dancing-3948',
 'tango-photos/tango-3951': 'toronto-tango-festival-2026-couple-dancing-3951',
 'tango-photos/tango-3953': 'toronto-tango-festival-2026-couple-dancing-3953',
 'tango-photos/tango-3954': 'toronto-tango-festival-2026-couple-dancing-3954',
 'tango-photos/tango-3956': 'toronto-tango-festival-2026-couple-dancing-3956',
 'tango-photos/tango-3957': 'toronto-tango-festival-2026-couple-dancing-3957',
 'tango-photos/tango-3959': 'toronto-tango-festival-2026-couple-dancing-3959',
 'tango-photos/tango-3962': 'toronto-tango-festival-2026-couple-dancing-3962',
 'tango-photos/tango-3964': 'toronto-tango-festival-2026-couple-dancing-3964',
 'tango-photos/tango-3965': 'toronto-tango-festival-2026-couple-dancing-3965',
 'tango-photos/tango-3967': 'toronto-tango-festival-2026-couple-dancing-3967',
 'tango-photos/tango-3969': 'toronto-tango-festival-2026-couple-dancing-3969',
 'thumbs/annual-winter-sale': 'annual-winter-sale-thumbnail',
 'thumbs/app-launch': 'app-launch-thumbnail',
 'thumbs/black-friday': 'black-friday-thumbnail',
 'thumbs/breakfast-box': 'breakfast-box-thumbnail',
 'thumbs/byte-app': 'byte-app-thumbnail',
 'thumbs/carswitch': 'carswitch-thumbnail',
 'thumbs/collegiate-survival-sale': 'collegiate-survival-sale-thumbnail',
 'thumbs/evercare': 'evercare-thumbnail',
 'thumbs/generation-magazines': 'generation-magazines-thumbnail',
 'thumbs/pizza-now': 'pizza-now-thumbnail',
 'thumbs/showreel': 'showreel-thumbnail',
 'thumbs/startup-grind': 'startup-grind-thumbnail',
 'thumbs/tango-photos': 'tango-photos-thumbnail',
 'carswitch/sb-you-set-the-price': 'carswitch-dubai-storyboard-you-set-the-price',
 'carswitch/sb-management-of-transfers': 'carswitch-dubai-storyboard-transfers-test-drives-calls',
 'carswitch/sb-haggling': 'carswitch-dubai-storyboard-haggling-with-strangers',
 'carswitch/sb-managing-transfer': 'carswitch-dubai-storyboard-transfer-paperwork',
 'carswitch/sb-own-price': 'carswitch-dubai-storyboard-set-your-own-price',
 'carswitch/sb-success-fee': 'carswitch-dubai-storyboard-fee-only-when-we-sell',
 'carswitch/story-selling-your-car': 'carswitch-dubai-vertical-storyboard-selling-your-car',
 'carswitch/story-get-more-value-cars': 'carswitch-dubai-vertical-storyboard-more-value-road',
 'carswitch/story-get-more-value-coins': 'carswitch-dubai-vertical-storyboard-more-value-coins',
 'carswitch/story-download-the-app': 'carswitch-dubai-vertical-storyboard-download-app',
 'evercare/sb-wash-hands': 'evercare-storyboard-wash-hands-with-soap',
 'evercare/sb-adequate-measures': 'evercare-storyboard-adequate-measures-on-bus',
 'evercare/sb-talk-to-family': 'evercare-storyboard-talk-to-family-friends',
 'evercare/sb-avoid-hard-foods': 'evercare-storyboard-avoid-hard-foods',
 'evercare/sb-keep-in-touch': 'evercare-storyboard-keep-in-touch',
 'annual-winter-sale/store-display-1': 'generation-winter-sale-store-window-banners-mannequins',
 'annual-winter-sale/store-display-2': 'generation-winter-sale-store-mall-entrance-window',
 'annual-winter-sale/store-display-3': 'generation-winter-sale-store-tall-banner-mannequins',
 'annual-winter-sale/store-display-4': 'generation-winter-sale-store-building-window-banners',
 'annual-winter-sale/store-display-5': 'generation-winter-sale-store-billboard-above-sign',
 'annual-winter-sale/store-display-6': 'generation-winter-sale-store-arched-windows-banners',
 'annual-winter-sale/store-display-7': 'generation-winter-sale-store-mall-red-door-banner',
 'annual-winter-sale/store-display-8': 'generation-winter-sale-store-mall-entrance-banner',
 'about/portrait': 'zeeshan-abid-designer-portrait-toronto'
};
images.forEach((it) => { it.key = it.name; it.name = NAMES[it.slug + '/' + it.name] || it.name; });
const thumbName = (slug) => slug + '-thumbnail';
const posterName = (out) => NAMES['posters/' + out] || out;

// ---- THUMBNAILS (4:3 crop) -----------------------------------------------------------------------------
// NOTE: carswitch, evercare, breakfast-box and annual-winter-sale are recomposed with exact crops (the automatic crop clipped their logos and
// captions). After running this script, run `node tools/recompose-thumbs.js` to apply them; the entries below are only the starting point.
const thumbs = [
  { slug: 'carswitch', from: ['carswitch', 'storyboard-4'] },
  { slug: 'evercare', from: ['evercare', 'flatten-curve'] },
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
  { out: 'byte-too-much-on-food', src: `${A}/Too Much on Food B - 02.mp4`, at: 5 }, // the opening frame is plain red, so the poster is taken from the burger shot
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

const ONLY = process.argv.slice(3); // optional project slugs: only those projects are rebuilt
async function doImages() {
  for (const it of images) {
    if (ONLY.length && ONLY.indexOf(it.slug) < 0) continue;
    const dir = path.join(OUT_IMG, it.slug);
    mkdir(dir);
    const input = inputOf(it);
    if (!fs.existsSync(input)) { console.error('MISSING', input); continue; }
    const base = path.join(dir, it.name);
    let r, q = 80;
    if (it.kind === 'gif') {
      // animated GIF -> animated WebP (keeps the GIF only if WebP would be bigger)
      r = await webp(input, base + '.webp', { width: it.width || 800, withoutEnlargement: true }, 70, { animated: true });
      if (r.size > fs.statSync(input).size) console.warn('NOTE: webp larger than gif for', it.name);
    } else if (it.kind === 'tall') {
      r = await webp(input, base + '.webp', { width: it.width || 1000, withoutEnlargement: true }, 66);
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
    if (ONLY.length && ONLY.indexOf(t.slug) < 0) continue;
    const it = images.find((i) => i.slug === t.from[0] && i.key === t.from[1]);
    const input = inputOf(it);
    for (const w of [900, 450]) {
      const outFile = path.join(OUT_IMG, 'thumbs', thumbName(t.slug) + (w === 900 ? '' : '-' + w) + '.webp');
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
      ff(['-i', input, '-vf', "scale='if(gt(iw,ih),min(1280,iw),min(720,iw))':-2", '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out]);
    }
    const poster = path.join(OUT_IMG, 'posters', posterName(v.out) + '.webp');
    ff(['-ss', String(v.at || Math.min(pr.d * 0.3, 20)), '-i', input, '-frames:v', '1', '-vf', 'scale=960:-2:force_original_aspect_ratio=decrease', '-c:v', 'libwebp', '-quality', '72', poster]);
    media[rel('video', v.out + '.mp4')] = { w: pr.w, h: pr.h };
  }
  // Hero reel (silent, 960x540: it is a background under a dark overlay, so this halves the download with no visible loss)
  const reel = path.join(OUT_VID, 'hero-reel.mp4');
  console.log('hero reel');
  const inputs = []; const filters = [];
  reelClips.forEach(([src, ss], i) => {
    inputs.push('-ss', String(ss), '-t', String(REEL_SEG), '-i', path.join(SRC, src));
    filters.push(`[${i}:v]scale=960:540:force_original_aspect_ratio=decrease,pad=960:540:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=25,format=yuv420p[v${i}]`);
  });
  const concat = reelClips.map((_, i) => `[v${i}]`).join('') + `concat=n=${reelClips.length}:v=1:a=0[out]`;
  ff([...inputs, '-filter_complex', filters.join(';') + ';' + concat, '-map', '[out]', '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-an', '-movflags', '+faststart', reel]);
  ff(['-ss', '3', '-i', reel, '-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '72', path.join(OUT_IMG, 'posters', posterName('hero-reel') + '.webp')]);
}

// Thumbnails for video-only projects, cut from the generated poster frames.
async function doVideoThumbs() {
  const map = { showreel: 'hero-reel', 'app-launch': 'ut-launch', 'startup-grind': 'startup-grind-2019' };
  mkdir(path.join(OUT_IMG, 'thumbs'));
  for (const [slug, poster] of Object.entries(map)) {
    for (const w of [900, 450]) {
      await sharp(path.join(OUT_IMG, 'posters', posterName(poster) + '.webp')).resize(w, Math.round(w * 0.75), { fit: 'cover', position: 'attention' })
        .webp({ quality: 80 }).toFile(path.join(OUT_IMG, 'thumbs', thumbName(slug) + (w === 900 ? '' : '-' + w) + '.webp'));
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
