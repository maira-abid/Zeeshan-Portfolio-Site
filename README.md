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
  index.html  projects.html  project.html?p=<slug>  about.html  contact.html  privacy.html
  css/style.css          all styling + design tokens (:root)
  js/data.js             ALL content: projects, write-ups, categories, industries, about text, privacy policy, social links
  js/app.js              page rendering, filtering/sorting, form, lightbox
  js/ambient.js          floating background icons
  js/icons.js            icon sprite (suits, bolt, star, social)
  js/media.js            generated: image/video sizes
  assets/                fonts, optimised images, videos, icons, background pattern
tools/
  serve.js               local preview server
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
- Background: the checkerboard (fading down the page) is on every page; a sparse card-suit pattern (`assets/icons/pattern-tile.svg`) is only on Home, About and Contact (see the `body[data-page=...]` rule in `style.css`).
- `js/ambient.js` adds floating icons in the background (Home, Projects, About, Contact, Privacy): they drift, move at
  different speeds on scroll and gently move away from the mouse; it pauses when the tab is hidden and is static with
  "reduce motion". Tune the count per page in `cfg` at the top of that file.

## Brand

- Colours: Violet Ray `#8F00FF`, Carbon Black `#1B1B1B`, Grey `#E5E5E5`, White `#FFFFFF`.
  The style-guide PDF *renders* Violet Ray as a muted purple (about `#7352A0`), so that tone is used for the
  checkerboard and the icon patterns (`--violet-soft`) and `#8F00FF` for buttons and highlights.
- Typefaces (only the supplied ones): **Raleway** for body/UI; **Magazine Letter** for page and category
  headings; **Kingthings Extortion** for write-up subheadings; **Jockey Full of Bourbon** for the placeholder logo;
  **Hit Me Punk (04)** for stat numbers and small eyebrows.

## Placeholders to replace

| What | Where |
|---|---|
| Logo | `renderChrome()` in `js/app.js` (spade + "ZEESHAN" wordmark) |
| Hero reel | `assets/video/hero-reel.mp4` is a cut from existing projects; replace with the real reel (silent, 16:9) |
| Hero headline / sub text | `SITE.hero` in `js/data.js` (brief left it blank) |
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
