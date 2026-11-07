# Zeeshan - portfolio site (prototype)

Static HTML/CSS/JS build of the site described in `WEBSITE BRIEF.txt`. It is the design reference and content model
for the Framer build (the live site must stay on Framer for at least a year).

## Run it

```bash
node tools/serve.js         # then open http://localhost:5173
```

No dependencies. Any static host also works (open `site/index.html` through a server, not from disk).

## Folders

```
brief/        the website brief and About Me text
brand/        style guide, colour/pattern references, icons, typefaces (source files)
originals/    LOCAL ONLY, not in git: raw photos, source videos, PDFs ("Portfolio Work Compilations ...", tango photos)
site/         the website itself (this is what gets published)
  index.html  projects/  projects/<slug>/  about/  contact/  privacy/   (one folder + index.html per page: generated, see "SEO and GEO")
  css/style.css          all styling + design tokens (:root)
  js/data.js             ALL content: projects, write-ups, categories, industries, about text, privacy policy, social links
  js/app.js              page rendering, filtering/sorting, form, lightbox
  js/ambient.js          floating background icons
  js/icons.js            icon sprite (suits, bolt, star, social)
  js/media.js            generated: image/video sizes
  assets/                fonts, optimised images, videos, icons, background pattern
tools/
  serve.js               local preview server
  extract-ambient.js     cuts the floating background elements out of brand/Patterns & Icons
  build-seo.js           SEO + GEO build: pre-renders every page to static HTML, titles, schema, sitemap, robots, llms.txt (npm run build)
  prepare-assets.js      rebuilds site/assets from originals/ (cd tools, npm i, node prepare-assets.js)
  export-framer.js       regenerates the Framer CSVs/data file
  extracts/              PDF pages used in the CarSwitch / Evercare write-ups
framer/       CMS CSVs, code components and the Framer guide
(GitHub Pages is served from the gh-pages branch, which holds only the site/ folder; see below)
```

Originals are never modified. To add a project: put the files in `originals/`, add them to `tools/prepare-assets.js`, run it, then add an entry to
`js/data.js` (copy an existing one). `originals/` is not in git, so a fresh clone can run the site but not rebuild the assets.

## Images: web-ready by default

Everything goes through `tools/prepare-assets.js`, which enforces:
WebP only (animated WebP for GIFs), EXIF-rotated, metadata stripped, never upscaled; full size capped at 1800 px
(1000 px for long scrolling designs); smaller copies (`-640`, `-1200`) so the browser downloads the lightest one via
`srcset`; automatic re-encode if a file is over 300 KB; below-the-fold images lazy-load, the lead image loads first
(`fetchpriority="high"`); width/height are set so nothing jumps while loading. Raw files (`.CR2`, PSD, PDF) are never used.
Typical image weight per page is 150 KB to 900 KB (the Annual Winter Sale and magazine pages are heaviest).

## Privacy policy and ambient background

- `privacy.html` is a generic Canadian (PIPEDA) policy, content in `SITE.privacy` in `js/data.js`. It is a template, not
  legal advice: have it reviewed, and fill in `SITE.privacy.email` (shows a placeholder until then).
- Background: the checkerboard (fading down the page) is on every page. The card-suit pattern tiles that used to sit on Home, About and Contact were removed at the owner's request (the files are still in `assets/icons/`).
- `js/ambient.js` adds floating background elements in three sizes (big / medium / small, all small and faint, one neutral grey so they never hurt readability). They are cut out of the artwork in `brand/Patterns & Icons` (`node tools/extract-ambient.js` regenerates them into `site/assets/img/ambient/` and `js/ambient-assets.js`) plus shapes drawn in the same style (`js/icons.js`). Each page has its own theme and the mix is randomised on every load; they are a layer pinned behind the page (they do not move when you scroll, and their motion freezes while you scroll, like a fixed wallpaper), spiral slowly and move away from the mouse; paused when the tab is hidden and static with "reduce motion". Tune the themes in `THEMES` at the top of `ambient.js`.

## Brand

- Colours: Violet Ray `#8F00FF`, Carbon Black `#1B1B1B`, Grey `#E5E5E5`, White `#FFFFFF`.
  The style-guide PDF *renders* Violet Ray as a muted purple (about `#7352A0`), so that tone is used for the
  checkerboard and the icon patterns (`--violet-soft`) and `#8F00FF` for buttons and highlights.
- **Source of truth: the style-guide PDF** (`brand/Website Branding_style-guide.pdf`, 4 pages: colours, typeface, patterns, icons), not the
  Illustrator file. Client feedback (2026-11-07): the Illustrator file contained extra fonts that were never part of the style guide.
- Typefaces: **Raleway only**, as the PDF specifies, in different weights for headings, labels, numbers and body text. The one exception
  is the **placeholder logo lettering** (Jockey Full of Bourbon, trimmed to a 49 KB logo-only file): the client confirmed the punk font is for
  the logo only and will supply their own logo later. Magazine Letter, Kingthings Extortion, Hit Me Punk and Anton are no longer loaded
  (the old files are still in `site/assets/fonts/`). Note for Framer: Raleway is in Framer's font list, so no custom font upload (and no paid
  plan for fonts) is needed except for the placeholder logo. The `framer/` files still mention the old fonts and have no stacked Featured
  Work yet; they get updated in the single Framer pass at the end.
- Colours in the stylesheet now match the PDF exactly: Violet Ray `#8F00FF`, Carbon Black `#1B1B1B` (they were `#8800ff` and `#141414`,
  taken from the Illustrator file).

## Placeholders to replace

| What | Where |
|---|---|
| Logo | `renderChrome()` in `js/app.js` (spade + "ZEESHAN" wordmark) |
| Hero reel | `assets/video/hero-reel.mp4` is a cut from existing projects; replace with the real reel (silent, 16:9) |
| Hero text | `SITE.hero.sub` in `js/data.js` (the headline was removed; the page keeps a screen-reader-only h1) |
| Client logos | `SITE.clients` (text names for now) |
| Headshot | About page (`renderAbout`) |
| Social URLs | `SITE.social` (Vimeo points to vimeo.com/zeeshanabid) |
| Contact form | prototype only validates; set `window.CONTACT_ENDPOINT` or use Framer's built-in form |
| Projects with no write-up | `placeholder: true` in `data.js` shows "Write-up coming soon" |
| Home page projects | `SITE.featured` (list of project slugs, in display order) |
| Planned projects with no material yet | `SITE.upcoming` (not shown at the moment) |

## Moving to Framer

See **`framer/README.md`**: CMS CSVs, three paste-in code components (background pattern, client ticker, filterable
projects grid) and a page-by-page build guide. Summary of the approach:

1. **CMS collections**: `Categories`, `Industries`, `Projects` (title, slug, client, categories and industries as
   multi-references, thumbnail, summary, lead media, write-up as rich text with H2 subheadings). `data.js` maps 1:1.
2. **Pages**: Home, Projects (CMS list with filter + sort), Project (CMS detail template), About, Contact (Framer form).
3. **Reusable pieces**: ticker (Framer's built-in Ticker), hero video, project card (thumbnail + tag chips + title + client),
   footer. The checkerboard fade and icon pattern are pure CSS/SVG (`.checker-bg`, `pattern-tile.svg`) and can be
   pasted into a Framer code component or recreated with a background layer and gradient mask.
4. **Fonts**: upload the supplied TTFs as custom fonts in Framer (Raleway is a Google font and is built in).
5. **Video**: host on Vimeo and embed (as the CarSwitch / Evercare pages already do) rather than uploading large MP4s.
6. **Domain**: connect the custom domain in Framer's site settings.

## GitHub and preview hosting

The repository is public and the preview is at https://maira-abid.github.io/Zeeshan-Portfolio-Site/. GitHub Pages serves the `gh-pages` branch, which contains only the `site/` folder (no originals,
brand files or tools). To publish changes: commit and push to `main`, then run `bash tools/publish-pages.sh`.
(An automatic deploy on every push would need a GitHub Actions workflow, which requires the `workflow` permission on the
GitHub login: `gh auth refresh -s workflow`.)
The preview is for review only: it is marked `noindex` (meta tag + `robots.txt`) so it does not compete with the live Framer site.
Remove those two when/if this copy should ever be public. Because the repo is public, everything committed (including the fonts in brand/ and the photos in site/assets) is downloadable by anyone.

## SEO and GEO (search engines and AI assistants)

Every page has its own clean URL (`/`, `/projects/`, `/projects/<slug>/`, `/about/`, `/contact/`, `/privacy/`). The site's JavaScript builds the
pages in the browser, but search engines and especially AI crawlers often do not run JavaScript, so `tools/build-seo.js` runs the site in a headless
DOM and saves the finished HTML (text, headings, links, image alt text) into each page file. Run it after any content change:

```bash
cd tools && npm run build
```

It also writes, per page: a unique `<title>` and meta description, canonical link, Open Graph and Twitter cards, geo tags, and JSON-LD structured
data (Person, ProfessionalService with Toronto / Ontario / Canada, WebSite, CollectionPage, AboutPage, ContactPage, CreativeWork per project,
BreadcrumbList). Site-wide: `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt` (a plain-text summary and the full write-ups for AI assistants),
and 1200x630 share images in `assets/og/`. Old addresses such as `about.html` and `project.html?p=carswitch` redirect to the new ones.

Settings are in `SITE.seo` in `site/js/data.js`:
- `url`: the real domain (currently the GitHub preview address, replace before going live; used in canonical links, sitemap and schema)
- `indexable`: `false` keeps the preview out of search results (noindex + robots.txt block) so it does not compete with the live Framer site.
  Set `true` only when this copy itself should be indexed. When true, robots.txt also welcomes AI search/assistant crawlers (edit the list in `build-seo.js` to opt out).
- titles/descriptions of the main pages; project titles and descriptions are generated from the project data (kept within about 60 / 160 characters).

The Framer equivalents (page titles and descriptions, share images, site-wide schema, llms.txt) are in `framer/seo/`; see `framer/README.md`.

## Performance and hidden projects (quick wins)

- **Logo font:** `site/assets/fonts/JockeyFullOfBourbon-logo.woff2` is a 49 KB cut of the supplied 883 KB font containing only capitals, digits and a few marks (the logo always upper-cases the name). The original `.ttf` is kept for reference. Check the font's licence allows web use and modification before launch.
- **Hero video:** 960x540, about 1 MB (was 2 MB, 1280x720). It no longer autoplays on page load: it starts after the page has loaded, and stays still for reduced-motion and Save-Data visitors (the play button still works). `tools/prepare-assets.js` uses the same settings.
- **Hidden projects:** `showreel`, `app-launch` and `startup-grind` carry `hidden: true` in `site/js/data.js`, so they appear nowhere (pages, filters, counts, sitemap, search files). Their old addresses redirect to the Projects page. Delete the flag and run `cd tools && npm run build` to bring one back.
- **Social links:** Behance, LinkedIn, Instagram and Vimeo are set in `SITE.social` in `data.js`.

## Tango photos hidden, image protection, white panels

- **Tango photos are hidden, not deleted:** `tango-photos` carries `hidden: true` in `site/js/data.js`. It disappears from the Projects list, filters, sitemap and search files, and its old address redirects to Projects. Delete the flag and run `cd tools && npm run build` to show it again. The image files are still in `site/assets/img/tango-photos/`.
- **Image protection (a deterrent only):** images do not offer the right-click menu ("Open image in new tab", "Save image as"), cannot be dragged out, and are not long-press savable (`app.js` and the last rule in `style.css`). It cannot stop screenshots, developer tools, or someone who already knows an image's address.
- **Featured panels use white text on every colour (owner's choice).** The three light colours from the work were darkened only slightly so white reads better: CarSwitch `#f6a623` to `#c97c00`, Breakfast Box `#f4a6bd` to `#dc6b8e`, Black Friday `#34d8a4` to `#14a074` (white contrast about 2.0 / 1.9 / 1.8 up to 3.3 / 3.2 / 3.3 : 1). That passes WCAG for large text (3:1: the big result numbers and titles) but not for small text (4.5:1: the small labels and body line). The other three panels (green, red, navy) pass.

## Client feedback of 07-Nov-2026: what was done

- **Thumbnails (Projects page):** all 4:3 (900x675 and 450x338). Four were recomposed with exact crops via `node tools/recompose-thumbs.js` (CarSwitch, Evercare, Breakfast Box, Annual Winter Sale) so logos, headlines and badges are never cut off; the tool also records which frame each one uses. Tags are black `#1B1B1B` at 65% opacity with white text (no purple). On project pages the tags are outlined, also not purple.
- **Side navigation:** the selected item is purple only (no white tip).
- **Category icons ("Browse by category"):** filled icons only (bolt, spade, diamond, club, heart), same 18 px icon box and 10 px gap on every button.
- **Ticker:** the client's list of 11 names, alphabetical.
- **Project pages:** one steady layout (title left, writing and pictures right, same every time); subheading icons are stroked with no box; the opening paragraph is the same size and colour as the body text; no image can be opened in a new tab, dragged out or saved from the right-click menu, and only a web copy (1200 px at most) is ever served, never the full-size file (a deterrent, not a lock: screenshots and developer tools still work). **CarSwitch:** every section now has a picture or a video.
- **Colours:** every black is `#1B1B1B` and every purple is `#8F00FF` (the style-guide values). Text in a lighter purple (`--violet-light`, `#CBA6FF`) is kept for small text on black, because `#8F00FF` itself is only about 3:1 against black.
- **Skipped on purpose (owner's instruction):** everything about the floating background icons (scroll behaviour, filled and stroked variety, the shiny diamond, the checkered bolt and the spirals).
- **Known accessibility trade-off:** white text on the three light panel colours (orange, pink, mint) is about 3.2 to 3.3:1, fine for large text but under 4.5:1 for small text, so axe flags the small labels on those panels.

- **Key results line (project pages only):** each project page that has published figures shows them as one compact line at the top, above the main image (`keystats` in `app.js`; the figures are the ones in the Outcome section of `data.js`). Annual Winter Sale, Generation Magazines and Byte App have no figures, so they have no line. The Projects listing page is unchanged.

## Light version (a switch, not a second site)

- **The switch:** a round half-moon button in the top-right of the header on every page. It flips the same site between dark (the default, the approved look) and light, and remembers the choice on that device (`localStorage` key `zk-theme`). A one-line script in `<head>` (`tools/templates/shell.html`) applies the saved choice before the page paints, so there is no flash. To make the site follow the visitor's system setting by default instead, change that script to also check `prefers-color-scheme`.
- **Light colours (from the style guide only):** the page is That Other Grey `#E5E5E5`, cards, fields, image frames, the ticker and the footer are White, text is Carbon Black `#1B1B1B`, accents and violet text are Violet Ray `#8F00FF` (5.8:1 on white, 4.6:1 on the grey page). Only the hover shade (`#D4D4D4`) and the card border (`#BDBDBD`) are tints of the grey. The neon lime cannot be read on a light page, so in the light version the lime accents (eyebrow labels, bullet diamonds, logo mark) use the brand violet.
- **Hero edge:** the video ends in a clean dark edge in both versions. (A white fade at the bottom was tried and removed because it looked like a glow.)
- **What stays the same in both:** the home hero video with its white header and buttons, the six coloured Featured Work panels (white text on their own colours), the tags on thumbnails (white on dark), the image viewer, and every violet button.
- **How it works:** `html[data-theme="light"]` in `site/css/style.css` swaps the colour tokens (`--white` is "the text colour", `--black` is "the page colour"); the few colours that were fixed values are now tokens (`--surface-*`, `--soft`, `--footer`, `--ticker-text`, `--err`). The floating background art is darkened in the light version so it still shows faintly. The switch code is `initTheme()` in `site/js/app.js`.
- **Checked:** axe (WCAG 2 AA) is clean in both versions on Projects, two project pages, About, Contact and Privacy. The Home page has the same known low-contrast items in both versions (white text on the lighter Featured Work panel colours).

## Email newsletters (and other tall designs) sized like the new site

- **Trimmed images:** the five email newsletters (Black Friday x3, Collegiate Survival Sale x2) used to sit in a wide light-grey canvas, so the email itself looked small inside its frame. `node tools/trim-emails.js` cuts the side margins off (full height kept, no resizing), so each email is 750 px wide and fills its frame. They are under 1200 px, so they have no smaller copies and the old `-640` files were removed. Run it after `prepare-assets.js` (same pattern as `recompose-thumbs.js`).
- **Layout:** on the project pages these designs now sit in the right-hand text column like every other chapter (title on the left), up to three in one row about 270 px wide at a 1280 px window, each in a frame with a 6 px gap around the image and a "Scroll to explore" line. They stack to one column on small phones. This applies to every tall-design block: the email newsletters, the magazines and the Byte app screens.
- **Code:** `renderProject()` in `site/js/app.js` (the `layout === 'scroll'` branch) and `.sec__media--s` in `site/css/style.css`.

## Contact page redesign

- **Layout:** facts on the left (a violet "Based in Toronto" block with the live Toronto time, an "Open to new roles and projects" line, social links, and a "Helpful to include" list), the form on the right. On tablets and phones it stacks.
- **Form:** unchanged (first name, last name, email, subject, message). The three "What brings you here?" choice cards were tried and removed at the owner's request. It still posts to `window.CONTACT_ENDPOINT` when one is set (in Framer it is replaced by the built-in form).
- **Not included:** an email address and a Copy button. The original site has no contact email yet (`privacy.email` in `data.js` is blank); add one and it can be shown beside the social links.
- **Code:** `renderContact()` in `site/js/app.js`; styles under "Contact" (`.side__hero`, `.intent*`) in `site/css/style.css`. Rebuilt with `cd tools && npm run build`.
