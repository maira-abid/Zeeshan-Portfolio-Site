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
originals/    LOCAL ONLY, not in git: source videos, PDFs and images ("Portfolio Work Compilations ..."), the second batch ("Additional Images (2026-11-11)", with the 11-Nov feedback), and the tango festival photos at web size (2400 px WebP, 323 files; the full-size raw files were deleted)
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
- Typefaces: **Raleway only**, as the PDF specifies, in different weights for headings, labels, numbers and body text. There are no other typefaces: the logo is artwork, not a font. Magazine Letter, Kingthings Extortion, Hit Me Punk, Jockey Full of Bourbon and Anton
  are no longer in `site/assets/fonts/` (the sources stay in `brand/Typefaces`). Note for Framer: Raleway is in Framer's font list, so no custom font upload is needed. The `framer/` files still mention the old fonts and have no stacked Featured
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

- **Logo:** the supplied artwork (16-Nov-2026), in `site/assets/img/logo/` (white lettering for dark surfaces, dark lettering for light ones; the home header is always dark). The old placeholder lettering and its font are gone.
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

- **The switch:** a round half-moon button in the top-right of the header on every page. It flips the same site between light (the default) and dark, and remembers the choice on that device (`localStorage` key `zk-theme`). A one-line script in `<head>` (`tools/templates/shell.html`) applies the saved choice before the page paints, so there is no flash. To make the site follow the visitor's system setting by default instead, change that script to also check `prefers-color-scheme`.
- **Light colours (from the style guide only):** the page is That Other Grey `#E5E5E5`, cards, fields, image frames and the ticker are White, the footer is the same grey as the page (separated by a thin line), text is Carbon Black `#1B1B1B`, accents and violet text are Violet Ray `#8F00FF` (5.8:1 on white, 4.6:1 on the grey page). Only the hover shade (`#D4D4D4`) and the card border (`#BDBDBD`) are tints of the grey. The neon lime cannot be read on a light page, so in the light version the lime accents (eyebrow labels, bullet diamonds, logo mark) use the brand violet.
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

## Link-preview picture (share image)

- **What it is:** the picture shown when a page link is pasted into WhatsApp, LinkedIn, Slack and so on. The home, Projects, About, Contact and Privacy pages now use the same three-tile collage as the new site (Pizza Now, Collegiate Survival Sale and CarSwitch side by side, 1200x630). Project pages still use their own project image. It is generated by `ogImages()` in `tools/build-seo.js` (run `cd tools && npm run build`).
- **Note:** WhatsApp, LinkedIn and others cache previews, so an already-shared link can keep showing the old picture for a while.

## Themed cursor

- **What it is:** a small card-suit pointer (a diamond to start; each click deals the next suit: spade, heart, club, diamond) with a soft violet ring that trails behind and swells over links, buttons and cards. Code: `site/js/cursor.js` (loaded on every page from `tools/templates/shell.html`), styles under "Themed cursor" in `site/css/style.css`.
- **Built to stay light:** mouse and trackpad only (nothing on touch screens or with reduced-motion); the elements are created on the first real mouse move, so they are never in the pre-built HTML; only transforms are animated, and only while the pointer moves; it switches itself off, and the normal cursor comes back, with "Pause animations" or if the page ever drops below about 30 fps. Text fields keep the normal text cursor.
- **Tested** with simulated mouse input in a browser (the ring settles on the pointer, link/text/click states, the suit cycle, motion-off and the frame-rate guard). Not yet seen with a real mouse.
- **No flash of the normal arrow between pages:** the cursor remembers where the pointer was when you left a page (session storage, valid for a few seconds), is created straight away at that spot on the next page, and the normal arrow is hidden from the first paint (a `zc-pre` class set in `<head>`). Tested by saving a position and reloading.

## Feedback of 09-Nov-2026: what was done (both sites unless stated)

- **Pointer:** the fancy cursors are gone. A small dot (`site/js/cursor.js`) inverts whatever it is over (a grayscale invert, so it reads black on a light page and white on a dark one, and flips on text and pictures). It grows over buttons, links and pictures, and shrinks when pressed. Mouse only; text fields keep the normal text cursor; off with "Pause animations". It has no animation loop, and the position is carried to the next page so the normal arrow does not flash.
- **Colour mode:** the light version is the default for everyone (16-Nov-2026), whatever the visitor's system setting is; the switch in the header changes it and the choice is remembered on that device. The static pages carry `data-theme="light"`; a one-line script in `<head>` removes it when the saved choice is dark.
- **Square corners:** every box, button, tag, field and frame (all `border-radius` set to 0).
- **Home:** headline "Answering questions with design" on the video; copy "Multi-disciplinary designer, based in Toronto, working on animations, digital & print marketing, branding."; copy and buttons aligned left; floating icons removed (the ambient scripts are no longer loaded; the files stay in the repo); no checkered pattern on the home page; "Brands I've worked with" ticker moved to the bottom; "Browse by category" without its box, text to the left.
- **Checkered pattern, all other pages:** very subtle, 104 px: black and grey in dark, white-ish and grey in light (no violet).
- **Projects:** no side panel. Categories are a filter bar across the top (switching category keeps an industry that is chosen). Tags are no longer on the thumbnails: the industry follows the client name ("CarSwitch, Dubai, UAE | Automotive"), purple, underlined and clickable (it filters by industry; "Clear" removes it).
- **About:** the new copy from `ABOUT ME_2.txt` (the "versatile art-style" and "Drop me a message" links are kept), and a section at the bottom with every published result from every project (16 figures, each linking to its project).
- **Contact:** "Based in Toronto. Happy to work with clients anywhere." (the heading plus the line); "Helpful to include" now comes before "Find me online".
- **Framer:** `framer/` was written before these changes (it still describes the floating elements, rounded boxes, the old cursor, the side filter and the old About). Update it in the single Framer pass.

## Changes of 10-Nov-2026

- **Pointer:** the normal arrow shape, solid black in the light version and solid white in the dark version; over anything clickable it inverts what is under it (code: `site/js/cursor.js`, styles at the end of `site/css/style.css`). The real arrow is hidden from the first paint and the position is carried between pages so nothing flashes. Text fields keep the text cursor; "reduce motion" in the system turns it off.
- **Single project pages:** now laid out like the new site's case pages: a band in the project colour with the title and result line, the cover, an "at a glance" box (client, industry, what I did, results) beside the short version and numbered sections, and a next-project band with a thumbnail. Code: `renderProject()` in `site/js/app.js`; colours and wording in `caseMeta` in `site/js/data.js`.
- **Home:** a "What I can help with" list (six numbered items) now sits between Featured Work and the client ticker. Code: `renderHome()` in `site/js/app.js`, styles under "What I can help with".

## Feedback of 11-Nov-2026: what was done

The second batch of files (images, GIFs and `WEBSITE FEEDBACK - 2026-11-11.txt`) is kept in `originals/Additional Images (2026-11-11)/`; `tools/prepare-assets.js` reads it (entries marked `'add'`).

- **Purple:** one violet everywhere, the style guide's `#8F00FF`. The lighter tone used for text in the dark version (`--violet-light`) and the lighter violet in the three background patterns (`site/assets/icons/pattern-*.svg`) are now `#8F00FF`. Small purple text on the dark version is therefore about 3:1 contrast (below the 4.5:1 guideline); that was the client's call.
- **Stats under "What happened":** black outline style (outline in the text colour: black on the light version, white on the dark one), no tinted fill.
- **CarSwitch / Evercare:** the first animation autoplays (muted, as browsers require; skipped with "reduce motion"). CarSwitch: the 2nd animation replaces the picture under "About the client"; the 3rd sits under "What I did" with the character sheet below it (so the three are no longer repeated under "What happened"). Evercare: the masked-crowd frame is under "What I did", the living-room frame under "How I worked it out", and the three new palette / typography / assets images replace the old ones. **CarSwitch's new characters, colour and typography images were not in the folder**, so the old ones are still in use, and more storyboards are still to come.
- **Pizza Now:** the low-resolution food-court banner is gone; the picture with many pizza boxes sits under "What needed solving" (and is no longer repeated under "What happened"); under "How I worked it out" the animation is above the still, and every picture is the same width as the others (`stack: true` on a section in `data.js` does this).
- **Black Friday / Collegiate Survival Sale:** the new images sit under the paragraph they are named for; Black Friday has a "Social Media Carousels" block after the email newsletters (two carousels, each a row of full-size slides that scrolls sideways, `layout: 'carousel'` in `data.js`); Collegiate Survival Sale has a "Social Media Stories" block (two animations) after the emails.
- **Annual Winter Sale:** the supplied write-up (obvious typos fixed), all new hi-res images, the Inspirations & References scroll now sits below its paragraph at the same width as the other images, and the "coming soon" note is removed. The result figures are 2.5x sales, about PKR 1.5M a day and about 35 in-store artworks.
- **Generation Magazines:** six new mockups ("Spreads & Mockups"). **Byte App:** user flow, wireframes and screens are now separate blocks (the wireframes image was not being shown before). The write-ups for both are still to come, so both keep the "coming soon" note.

### Image and video check (whole site)

- Every image is WebP (animated WebP for the GIFs), never upscaled, 1800 px wide at most, with `-640` / `-1200` copies; the long scrolling designs are 800-1000 px wide. The magazine scrolls were cut from 1000 to 800 px wide (about 40% lighter). The GIFs became animated WebP (the stories are 540 px wide, the others 900-1000 px).
- Every video is H.264 + AAC with `faststart`, at most 1280x720 (960x540 for the hero reel), with a poster image and `preload="none"`. The two largest videos (both on hidden projects) were re-encoded about 30% smaller. The poster of "Take a Byte" was a blank red frame and is now the burger shot.
- Pictures that are no longer used were deleted from `site/assets/img` (`tools/prepare-assets.js` is the list of what belongs there).
- **Descriptions (alt text):** every image now has a specific description of what it shows (and the on-screen words); mismatched ones were corrected (for example the CarSwitch and Evercare storyboards). Videos get an `aria-label` and the Vimeo frames a descriptive title. Card thumbnails and the next-project thumbnail keep an empty `alt` on purpose, because the title next to each is the description.
- **Framer:** `framer/` still describes the earlier content. Run `node tools/export-framer.js` in the single Framer pass to refresh it.

### File names (SEO and GEO)

Every project image, card thumbnail, video poster and share image has a descriptive, lowercase, hyphenated name that says whose work it is and what it shows, for example `carswitch-dubai-storyboard-looking-to-sell-your-car.webp`, `multiverse-black-friday-carousel-sale-starts-slide-1.webp`, `pizza-now-project-thumbnail.webp`, `evercare-project-zeeshan-abid-designer.jpg`. The list is `NAMES` in `tools/prepare-assets.js` (old working name -> published name), so a rebuild keeps them; share images are named in `tools/build-seo.js`. To add an image, add it to the pipeline and give it a name in `NAMES` in the same pattern: `<client or project>-<what the picture shows>`. The small decorative background pieces in `ambient/` and the video files keep their names.

### Page changes without a reload (pointer fix of 15-Nov-2026)

A screen recording showed the browser's own white arrow appearing on top of the themed pointer right after every page change, until the mouse moved. A browser restarts its pointer whenever a new document opens, and a page cannot stop that. So moving between pages of the site (links, nav, cards, next-project band, back and forward) now swaps the page inside the same document instead of loading a new one (`go()` in `site/js/app.js`); the pointer, and the cursor state, are never reset. The static pages are still real pages for search engines, shared links, new tabs and Ctrl/Cmd-click; links to other sites, files and `target="_blank"` open as usual. After a change the title and description are read from the target page, the page scrolls to the top and `main` takes focus. `site/js/cursor.js` listens for the `zk:navigate` event to re-read what is under the pointer.

## Feedback of 16-Nov-2026: what was done

The third batch (new folders and `WEBSITE FEEDBACK - 2026-11-16.txt`) is in `originals/Additional Images (2026-11-16)/`; copies of files already in the 11-Nov batch were removed from it. The logo and icon files are in `brand/Website Logo & Icons/`. The light version is now the default (see "Colour mode" above).

- **Menu:** the page you are on is a violet box with white text; hovering outlines a name in violet. No underline.
- **Logo and tab icons:** the new wordmark replaces the placeholder in the header and footer. The browser-tab icon is the purple-on-black Z in the dark version and the white-on-purple Z in the light version (`site/assets/icons/zeeshan-abid-favicon-*`), and it changes with the switch. The Apple touch icon follows too. The logo is also in the site's structured data.
- **All projects:** more than one picture under a heading now means one below the other, each at the full width of the text column (`stack` in `data.js` is automatic for two or more pictures; `stack: false` brings back a row). Left as they were on purpose: the Storyboards galleries (many small frames), the tall scrolling designs, the Black Friday carousels (horizontal on request) and the Collegiate Survival Sale stories (two tall animations side by side; stacked and widened they would be about 1,500 px tall each and blurry).
- **CarSwitch:** "What I did" keeps the animation and adds colour and typography below it; "How I worked it out" has the characters; the new colour, typography and characters images are in; the Storyboards now hold every frame in story order (frames that repeated one already used above are not added twice) plus the four vertical story frames in their own block.
- **Evercare:** images one below the other under "What needs solving" and "Colour & Typography"; five missing storyboard frames added (the other five in the folder repeated frames already there).
- **Breakfast Box:** the phone mockup without the white line replaces the "About the client" picture.
- **Black Friday and Collegiate Survival Sale:** the picture moved from "What happened" to "What I did".
- **Annual Winter Sale:** the vertical poster is under "What I did" at the same width; the new Inspirations scroll; "What needed solving" stacked; Newspaper Adaptations has only the two newspaper pages; Websites & Social Media in the order GIF, Facebook, website, Daraz; a new "Store Displays" block with the eight store photos.
- **Generation Magazines:** the pictures are grouped by magazine (Magazine 1: Eid 2018, Magazine 2, Magazine 3: Autumn/Winter 2018-19), each with its mockups and its full scrolling layout. The new write-up has not been supplied yet, so the page keeps its "coming soon" note.

## Footer button and back-to-top (20-Nov-2026)

- The "Pause animations" button in the footer is gone (and its saved choice is cleared on the next visit). The hero video keeps its own play/pause button, the client strip still pauses on hover or keyboard focus, and the system's "reduce motion" setting still stops the autoplay, the themed pointer and the smooth scrolling.
- **Back to top:** an icon-only button (an up arrow, labelled "Back to top" for screen readers) at the bottom right, shown once the page has been scrolled about 500 px, and only on pages longer than the Contact page (never on Contact itself; Contact is about 1,700 px tall on a desktop layout and 2,700 px on a phone, which is what `longEnough()` compares against). It is a dark square with a light arrow on the light version and a light square with a dark arrow on the dark version, and turns violet on hover or keyboard focus. Code: `initToTop()` in `site/js/app.js`, styles at the end of `site/css/style.css`. The footer line keeps clear of it.
