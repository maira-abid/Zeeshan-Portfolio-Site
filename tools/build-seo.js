/*
 * SEO + GEO build. Run after changing site/js/data.js (or any content):   cd tools && npm run build
 *
 * What it does
 *  1. Writes one real HTML file per page with clean URLs:  /, /projects/, /projects/<slug>/, /about/, /contact/, /privacy/
 *  2. Runs the site's own JavaScript in a headless DOM (jsdom) and saves the finished HTML, so the page text, headings, links, images and
 *     alt text are in the source for search engines and AI crawlers that do not run JavaScript. The browser still "hydrates" it.
 *  3. Adds unique <title>, meta description, canonical, Open Graph / Twitter cards, geo tags and JSON-LD structured data to every page.
 *  4. Writes sitemap.xml, robots.txt, llms.txt, llms-full.txt and 1200x630 share images.
 *  5. Leaves small redirect pages at the old URLs (about.html, project.html?p=..., ...).
 *
 * Config lives in SITE.seo in site/js/data.js (domain, indexable on/off, location, titles/descriptions of the main pages).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole, requestInterceptor } = require('jsdom');
// only load the site's own files while pre-rendering (no network: Vimeo embeds etc. stay as plain <iframe> tags)
const localOnly = { interceptors: [requestInterceptor((request) => (request.url.startsWith('file:') ? undefined : new Response('', { status: 204 })))] };
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(SITE, 'js', 'data.js'), 'utf8'), ctx);
const S = ctx.window.SITE;
const SEO = S.seo;
const BASE = SEO.url.replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);
const warnings = [];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const catName = (id) => S.categories.find((c) => c.id === id).name;
const indName = (id) => S.industries.find((c) => c.id === id).name;
const clean = (t) => String(t).replace(/\s*Full write-up coming soon\.?/i, '').trim();
const results = (p) => { for (const b of p.blocks) if (b.stats) return b.stats.map((s) => s.n + ' ' + s.l); return []; };
const fit = (parts, max) => { for (const t of parts) if (t.length <= max) return t; return parts[parts.length - 1].slice(0, max - 1).replace(/\s+\S*$/, '') + '…'; };
const realSocials = () => S.social.filter((s) => s.href && s.href !== '#').map((s) => s.href);

// ---------- routes ----------
const routes = [
  { page: 'home', dir: '', url: '/', ...SEO.pages.home, og: 'home' },
  { page: 'projects', dir: 'projects', url: '/projects/', ...SEO.pages.projects, og: 'projects' },
  { page: 'about', dir: 'about', url: '/about/', ...SEO.pages.about, og: 'about' },
  { page: 'contact', dir: 'contact', url: '/contact/', ...SEO.pages.contact, og: 'contact' },
  { page: 'privacy', dir: 'privacy', url: '/privacy/', ...SEO.pages.privacy, og: 'privacy' },
];
S.projects.forEach((p) => {
  const c0 = catName(p.categories[0]);
  const title = fit([`${p.title}: ${c0} Project | Zeeshan Abid`, `${p.title} | Zeeshan Abid, Toronto Designer`, `${p.title} | Zeeshan Abid`], 62);
  const sum = clean(p.summary), res = results(p);
  const tag = ' A project by Zeeshan Abid, designer in Toronto, ON.';
  const description = fit([
    `${sum} Client: ${p.client}. Results: ${res.slice(0, 2).join(', ')}.`, `${sum} Results: ${res.slice(0, 2).join(', ')}.`, `${sum} Client: ${p.client}.${sum.length + p.client.length < 90 ? tag : ''}`, sum + tag, sum,
  ].filter((t) => !/Results: \.$/.test(t)), 160);
  routes.push({ page: 'project', slug: p.slug, dir: 'projects/' + p.slug, url: '/projects/' + p.slug + '/', title, description, og: p.slug, project: p });
});

// ---------- share images (1200 x 630) ----------
async function ogImages() {
  const out = path.join(SITE, 'assets', 'og');
  fs.mkdirSync(out, { recursive: true });
  // Pages that are not a project (home, projects, about, contact, privacy) share one preview picture: three project images side by side
  // (Pizza Now, Collegiate Survival Sale, CarSwitch), the same look as the new site's link preview.
  const trio = ['pizza-now/box-1.webp', 'collegiate-survival-sale/hero-5.webp', 'carswitch/intro.webp'];
  const tiles = await Promise.all(trio.map((f) => sharp(path.join(SITE, 'assets', 'img', f)).resize(400, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toBuffer()));
  const collage = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#1b1b1b' } })
    .composite(tiles.map((input, i) => ({ input, left: i * 400, top: 0 }))).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  for (const r of routes) {
    if (!r.project) { fs.writeFileSync(path.join(out, r.og + '.jpg'), collage); continue; }
    const lead = r.project.lead;
    const src = lead.t === 'img' ? path.join(SITE, 'assets', 'img', lead.src) : path.join(SITE, 'assets', 'img', 'thumbs', r.project.slug + '.webp');
    await sharp(src).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, r.og + '.jpg'));
  }
}

// ---------- structured data ----------
function jsonld(r) {
  const personId = BASE + '/#zeeshan', websiteId = BASE + '/#website', serviceId = BASE + '/#service';
  const address = { '@type': 'PostalAddress', addressLocality: SEO.city, addressRegion: SEO.provinceCode, addressCountry: SEO.countryCode };
  const place = [{ '@type': 'City', name: SEO.city }, { '@type': 'AdministrativeArea', name: SEO.province }, { '@type': 'Country', name: SEO.country }];
  const person = { '@type': 'Person', '@id': personId, name: S.fullName, jobTitle: SEO.jobTitle, url: BASE + '/', description: `${SEO.jobTitle} based in ${SEO.city}, ${SEO.province}, ${SEO.country}, working professionally since 2017 in branding, motion graphics, marketing, UI/UX and more.`, address, homeLocation: { '@type': 'Place', name: `${SEO.city}, ${SEO.province}, ${SEO.country}`, geo: { '@type': 'GeoCoordinates', latitude: SEO.lat, longitude: SEO.lon } }, knowsAbout: SEO.knowsAbout, sameAs: realSocials() };
  if (!person.sameAs.length) delete person.sameAs;
  const service = { '@type': 'ProfessionalService', '@id': serviceId, name: `${S.fullName} - design services`, url: BASE + '/', image: BASE + '/assets/og/home.jpg', founder: { '@id': personId }, address, geo: { '@type': 'GeoCoordinates', latitude: SEO.lat, longitude: SEO.lon }, areaServed: place, serviceType: SEO.knowsAbout, knowsLanguage: 'en' };
  const website = { '@type': 'WebSite', '@id': websiteId, url: BASE + '/', name: SEO.siteName, inLanguage: 'en-CA', publisher: { '@id': personId } };
  const pageUrl = BASE + r.url, image = { '@type': 'ImageObject', url: BASE + '/assets/og/' + r.og + '.jpg', width: 1200, height: 630 };
  const crumbs = [{ name: 'Home', url: BASE + '/' }];
  if (r.page === 'project') crumbs.push({ name: 'Projects', url: BASE + '/projects/' }, { name: r.project.title, url: pageUrl });
  else if (r.page !== 'home') crumbs.push({ name: r.page === 'projects' ? 'Projects' : r.page[0].toUpperCase() + r.page.slice(1), url: pageUrl });
  const breadcrumb = { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) };
  const common = { '@id': pageUrl + '#webpage', url: pageUrl, name: r.title, description: r.description, inLanguage: 'en-CA', isPartOf: { '@id': websiteId }, primaryImageOfPage: image, breadcrumb: { '@id': pageUrl + '#breadcrumb' } };
  breadcrumb['@id'] = pageUrl + '#breadcrumb';
  const graph = [person, website];
  if (['home', 'about', 'contact'].includes(r.page)) graph.push(service);
  if (r.page === 'home') graph.push({ '@type': 'WebPage', ...common, about: { '@id': personId } });
  else if (r.page === 'about') graph.push({ '@type': 'AboutPage', ...common, mainEntity: { '@id': personId } });
  else if (r.page === 'contact') graph.push({ '@type': 'ContactPage', ...common, mainEntity: { '@id': personId } });
  else if (r.page === 'privacy') graph.push({ '@type': 'WebPage', ...common });
  else if (r.page === 'projects') {
    graph.push({ '@type': 'CollectionPage', ...common, mainEntity: { '@type': 'ItemList', numberOfItems: S.projects.length, itemListElement: S.projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: BASE + '/projects/' + p.slug + '/', name: p.title })) } });
  } else {
    const p = r.project, res = results(p);
    graph.push({ '@type': 'WebPage', ...common, mainEntity: { '@id': pageUrl + '#work' } });
    graph.push({
      '@type': 'CreativeWork', '@id': pageUrl + '#work', name: p.title, headline: p.title, description: clean(p.summary) + (res.length ? ' Results: ' + res.join(', ') + '.' : ''), url: pageUrl, image,
      creator: { '@id': personId }, author: { '@id': personId }, publisher: { '@id': personId }, inLanguage: 'en-CA', isPartOf: { '@id': websiteId },
      genre: p.categories.map(catName), keywords: [...p.categories.map(catName), ...p.industries.map(indName), 'Toronto designer'].join(', '),
      about: p.industries.map((i) => ({ '@type': 'Thing', name: indName(i) })), sponsor: { '@type': 'Organization', name: p.client },
    });
  }
  graph.push(breadcrumb);
  return '  <script type="application/ld+json">' + JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) + '</script>\n';
}

function seoTags(r) {
  const url = BASE + r.url, img = BASE + '/assets/og/' + r.og + '.jpg';
  const robots = SEO.indexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow';
  const alt = r.project ? `${r.project.title} by Zeeshan Abid` : 'Zeeshan Abid, multi-disciplinary designer in Toronto';
  return [
    `<meta name="description" content="${esc(r.description)}">`, `<meta name="robots" content="${robots}">`, `<meta name="author" content="${esc(S.fullName)}">`,
    `<link rel="canonical" href="${url}">`, `<link rel="alternate" hreflang="en-CA" href="${url}">`, `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta property="og:type" content="${r.page === 'project' ? 'article' : 'website'}">`, `<meta property="og:site_name" content="${esc(SEO.siteName)}">`, `<meta property="og:locale" content="${SEO.locale}">`,
    `<meta property="og:title" content="${esc(r.title)}">`, `<meta property="og:description" content="${esc(r.description)}">`, `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${img}">`, `<meta property="og:image:width" content="1200">`, `<meta property="og:image:height" content="630">`, `<meta property="og:image:alt" content="${esc(alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`, `<meta name="twitter:title" content="${esc(r.title)}">`, `<meta name="twitter:description" content="${esc(r.description)}">`, `<meta name="twitter:image" content="${img}">`,
    `<meta name="geo.region" content="${SEO.countryCode}-${SEO.provinceCode}">`, `<meta name="geo.placename" content="${SEO.city}">`, `<meta name="geo.position" content="${SEO.lat};${SEO.lon}">`, `<meta name="ICBM" content="${SEO.lat}, ${SEO.lon}">`,
  ].map((t) => '  ' + t + '\n').join('');
}

// ---------- pre-render ----------
const template = fs.readFileSync(path.join(__dirname, 'templates', 'shell.html'), 'utf8');
function shellFor(r) {
  const depth = r.dir ? r.dir.split('/').length : 0;
  return template.replace('{{BASE}}', depth ? `  <base href="${'../'.repeat(depth)}">\n` : '').replace('{{TITLE}}', esc(r.title)).replace('{{SEO}}', seoTags(r))
    .replace('{{JSONLD}}', jsonld(r)).replace('{{PAGE}}', r.page).replace('{{SLUG}}', r.slug ? ` data-slug="${r.slug}"` : '');
}
async function prerender(r) {
  const dir = path.join(SITE, r.dir), file = path.join(dir, 'index.html');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, shellFor(r));
  const vc = new VirtualConsole(); // keep the build output quiet (jsdom reports unimplemented browser features)
  vc.on('jsdomError', (e) => { if (!/Not implemented|Could not load iframe/.test(String(e.message))) warnings.push(r.url + ': ' + e.message); });
  const dom = await JSDOM.fromFile(file, {
    runScripts: 'dangerously', resources: localOnly, pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
      w.IntersectionObserver = w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
      w.HTMLMediaElement.prototype.play = () => Promise.resolve(); w.HTMLMediaElement.prototype.pause = () => {}; w.HTMLMediaElement.prototype.load = () => {};
      w.scrollTo = () => {};
    },
  });
  await new Promise((res) => { if (dom.window.document.readyState === 'complete') res(); else dom.window.addEventListener('load', res); });
  await new Promise((res) => setTimeout(res, 250));
  const d = dom.window.document;
  d.querySelectorAll('.ambient, .lightbox').forEach((el) => el.remove());   // decorative / interactive layers are added again in the browser
  d.documentElement.removeAttribute('style');
  d.body.setAttribute('data-prerendered', '1');
  const main = d.querySelector('main');
  const h1 = main ? main.querySelectorAll('h1').length : 0;
  if (h1 !== 1) warnings.push(`${r.url}: expected 1 <h1>, found ${h1}`);
  if (!main || main.textContent.trim().length < 200) warnings.push(`${r.url}: very little text rendered`);
  const html = '<!doctype html>\n' + d.documentElement.outerHTML + '\n';
  dom.window.close();
  fs.writeFileSync(file, html);
  return { words: (main ? main.textContent : '').trim().split(/\s+/).length };
}

// ---------- sitemap, robots, llms ----------
function writeSitemap() {
  const items = routes.map((r) => `  <url>\n    <loc>${BASE}${r.url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${r.page === 'project' ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${r.page === 'home' ? '1.0' : r.page === 'project' || r.page === 'projects' ? '0.8' : '0.5'}</priority>\n  </url>`);
  fs.writeFileSync(path.join(SITE, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + items.join('\n') + '\n</urlset>\n');
}
function writeRobots() {
  const ai = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];
  const txt = SEO.indexable
    ? 'User-agent: *\nAllow: /\n\n# AI search and assistant crawlers are welcome. Remove a block to opt out.\n' + ai.map((a) => `User-agent: ${a}\nAllow: /\n`).join('\n') + `\nSitemap: ${BASE}/sitemap.xml\n`
    : '# Preview copy: not for search engines. Set SITE.seo.indexable = true in site/js/data.js and rebuild when this should be indexed.\nUser-agent: *\nDisallow: /\n';
  fs.writeFileSync(path.join(SITE, 'robots.txt'), txt);
}
function writeLlms() {
  const services = SEO.knowsAbout.join(', ');
  const lines = [
    `# ${S.fullName}`, '',
    `> ${S.fullName} is a multi-disciplinary designer based in ${SEO.city}, ${SEO.province}, ${SEO.country}, working professionally since 2017 in branding, motion graphics and animation, social media, digital and print marketing, UI/UX, service design and photography.`, '',
    '## Key facts', '',
    `- Location: ${SEO.city}, ${SEO.province}, ${SEO.country}`, '- Experience: designing professionally since 2017',
    `- Services: ${services}`, '- Industries: fashion, advertising, healthcare, retail, tech, apps, food, cannabis, automotive, events',
    `- Contact: ${BASE}/contact/`, '', '## Pages', '',
    `- [Home](${BASE}/): featured work and clients`, `- [Projects](${BASE}/projects/): all projects, filterable by category and industry`, `- [About](${BASE}/about/): background and approach`,
    `- [Contact](${BASE}/contact/): enquiry form`, `- [Privacy Policy](${BASE}/privacy/)`, '', '## Projects', '',
  ];
  S.projects.forEach((p) => {
    const res = results(p);
    lines.push(`- [${p.title}](${BASE}/projects/${p.slug}/): ${clean(p.summary)} Client: ${p.client}. Categories: ${p.categories.map(catName).join(', ')}.${res.length ? ' Results: ' + res.join('; ') + '.' : ''}`);
  });
  fs.writeFileSync(path.join(SITE, 'llms.txt'), lines.join('\n') + '\n');
  // full text version: every write-up as plain text (useful for AI assistants that read one file)
  const full = [`# ${S.fullName}: full portfolio text`, '', ...S.about.map((t) => t.replace('{{work}}', 'versatile art-style').replace('{{contact}}', 'Drop me a message')), ''];
  S.projects.forEach((p) => {
    full.push(`## ${p.title}`, '', `URL: ${BASE}/projects/${p.slug}/`, `Client: ${p.client}`, `Industry: ${p.industries.map(indName).join(', ')}`, `Category: ${p.categories.map(catName).join(', ')}`, '', clean(p.summary), '');
    p.blocks.forEach((b) => {
      if (b.type !== 'section') return;
      full.push(`### ${b.title}`, '', ...(b.paras || []), ...(b.stats ? ['Results: ' + b.stats.map((s) => `${s.n} ${s.l}`).join('; ')] : []), ...(b.bullets && !b.stats ? b.bullets.map((x) => '- ' + x) : []), '');
    });
  });
  fs.writeFileSync(path.join(SITE, 'llms-full.txt'), full.join('\n') + '\n');
}

// ---------- redirects from the old URLs (so nothing 404s) ----------
function redirectPage(to, legacyScript) {
  return `<!doctype html>\n<html lang="en-CA"><head><meta charset="utf-8"><title>Redirecting…</title><meta name="robots" content="noindex"><link rel="canonical" href="${BASE}/${to}">\n<meta http-equiv="refresh" content="0; url=${to}">${legacyScript || ''}</head><body><p>This page has moved: <a href="${to}">${to}</a></p></body></html>\n`;
}
function writeRedirects() {
  fs.writeFileSync(path.join(SITE, 'projects.html'), redirectPage('projects/'));
  fs.writeFileSync(path.join(SITE, 'about.html'), redirectPage('about/'));
  fs.writeFileSync(path.join(SITE, 'contact.html'), redirectPage('contact/'));
  fs.writeFileSync(path.join(SITE, 'privacy.html'), redirectPage('privacy/'));
  fs.writeFileSync(path.join(SITE, 'project.html'), redirectPage('projects/', '<script>var m=location.search.match(/[?&]p=([\\w-]+)/);if(m)location.replace("projects/"+m[1]+"/");</script>'));
}

// Projects marked `hidden: true` in data.js get no page of their own. Any page left over from an earlier build is replaced by a small
// "moved" stub (noindex, redirects to the Projects page) so old links and bookmarks still land somewhere sensible.
function writeHiddenProjectStubs() {
  (S.hiddenProjects || []).forEach((p) => {
    const dir = path.join(SITE, 'projects', p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), `<!doctype html>\n<html lang="en-CA"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="${BASE}/projects/">\n<meta http-equiv="refresh" content="0; url=../"></head><body><p>This project is not on show right now. <a href="../">See all projects</a></p></body></html>\n`);
  });
}

// ---------- Framer pack: the same titles/descriptions/schema, ready to paste into Framer ----------
function writeFramerPack() {
  const dir = path.join(ROOT, 'framer', 'seo');
  fs.mkdirSync(path.join(dir, 'og'), { recursive: true });
  const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  const rows = [['Page', 'Path in Framer', 'Meta title', 'Meta description', 'Social image (upload in Page settings)']];
  routes.forEach((r) => {
    rows.push([r.page === 'project' ? r.project.title : r.page[0].toUpperCase() + r.page.slice(1), r.url.replace(/\/$/, '') || '/', r.title, r.description, 'og/' + r.og + '.jpg']);
    fs.copyFileSync(path.join(SITE, 'assets', 'og', r.og + '.jpg'), path.join(dir, 'og', r.og + '.jpg'));
  });
  fs.writeFileSync(path.join(dir, 'seo.csv'), '﻿' + rows.map((r) => r.map(q).join(',')).join('\r\n') + '\r\n');
  // site-wide structured data (Person + WebSite + ProfessionalService) for Site Settings > Custom Code > End of <head>
  const home = JSON.parse(jsonld(routes[0]).replace(/^\s*<script[^>]*>/, '').replace(/<\/script>\s*$/, ''));
  const graph = home['@graph'].filter((g) => ['Person', 'WebSite', 'ProfessionalService'].includes(g['@type']));
  fs.writeFileSync(path.join(dir, 'site-jsonld.html'), '<!-- Paste into Framer: Site Settings > General > Custom Code > End of <head> tag. Replace the domain with the real one first. -->\n<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2) + '\n</script>\n');
  fs.copyFileSync(path.join(SITE, 'llms.txt'), path.join(dir, 'llms.txt'));
  fs.copyFileSync(path.join(SITE, 'llms-full.txt'), path.join(dir, 'llms-full.txt'));
}

(async () => {
  await ogImages();
  const stats = [];
  for (const r of routes) { const s = await prerender(r); stats.push(`${r.url.padEnd(34)} ${String(s.words).padStart(5)} words | title ${r.title.length} | description ${r.description.length}`); if (r.title.length > 65) warnings.push(`${r.url}: title is ${r.title.length} chars (aim for 60 or less)`); if (r.description.length > 160) warnings.push(`${r.url}: description is ${r.description.length} chars`); }
  writeSitemap(); writeRobots(); writeLlms(); writeRedirects(); writeHiddenProjectStubs(); writeFramerPack();
  console.log(stats.join('\n'));
  console.log(`\nDomain: ${BASE} | indexable: ${SEO.indexable} | ${routes.length} pages, sitemap.xml, robots.txt, llms.txt, llms-full.txt, ${routes.length} share images`);
  if (BASE.includes('github.io')) console.log('NOTE: SITE.seo.url is still the GitHub preview address; replace it with the real domain before going live.');
  if (warnings.length) console.log('\nWarnings:\n- ' + warnings.join('\n- '));
})().catch((e) => { console.error(e); process.exit(1); });
