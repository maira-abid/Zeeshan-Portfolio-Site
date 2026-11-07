# Copying the site into Framer

Framer cannot import an HTML/CSS/JS site, so the local build (`site/`) is the design reference and this folder holds
everything that can be pasted or imported into Framer. Regenerate the exports after editing `site/js/data.js`:
`cd tools && node export-framer.js` (and `node extract-ambient.js` if the background artwork changes).

```
framer/
  cms/categories.csv  industries.csv  projects.csv     -> CMS "Import from CSV" (8 categories, 8 industries, 13 projects)
  cms/privacy-policy.html                              -> text of the Privacy Policy page (paste into a Framer page)
  components/BackgroundPattern.tsx                     -> checkerboard fade + optional SPARSE suit scatter
  components/AmbientElements.tsx                       -> floating grey background elements (pinned, freeze on scroll)
  components/ClientTicker.tsx                          -> client ticker
  components/ProjectsExplorer.tsx + ProjectsData.ts    -> Projects page body (filters + sort + grid)
  components/PhotoGallery.tsx                          -> masonry photo gallery with click-to-enlarge (for the tango photos)
  assets/ambient/*.webp                                -> cut-out artwork for AmbientElements (upload in Framer)
```

## What was tested, and what was not

- **Tested:** all five components pass TypeScript strict mode, and were run in a real browser with a stand-in for the `framer`
  module: the ambient layer moves, freezes while scrolling and resumes; the gallery opens, pages with the arrow keys and closes with
  Esc; the Projects filter works (13 projects, Photography filter gives Tango Photos); the ticker and background render.
- **Not tested:** inside Framer itself (no access to your Framer project from here). Expect small adjustments on first paste, e.g.
  the code-file import path in `ProjectsExplorer.tsx` and how Framer lists the property controls.

## 1. Set up the project

1. **Colour styles**: Violet `#8800FF`, Violet soft `#5b2a99` (checker), Violet light `#cba6ff` (text on dark), Carbon Black `#141414`,
   Ink `#0c0c0c`, Panel `#1f1f1f`, Line `#333333`, Grey `#E5E5E5`, White.
2. **Fonts**: upload the TTFs from `brand/Typefaces/` (Magazine Letter, Kingthings Extortion, Jockey Full of Bourbon, Hit Me Punk 04).
   Raleway is in Framer's font list. **Custom fonts need a paid Framer plan, and check the licences allow web use.**
3. **Text styles**: Body = Raleway 17/1.7. Page and category headings = Magazine Letter. Write-up subheadings = Kingthings Extortion (large).
   Stat numbers = Hit Me Punk 04. Logo placeholder = Jockey Full of Bourbon.
4. **Breakpoints**: Desktop (content width 1240), Tablet 960, Phone 640.

## 2. CMS (Framer > CMS)

1. Create **Categories** and **Industries** (Title, Slug, Order) and import the two CSVs.
2. Create **Projects**: Title, Slug, Client, Categories (multi-reference), Industries (multi-reference), Summary, Thumbnail (image),
   Lead video (link), Write-up (formatted text), Write-up coming soon (toggle), Featured (toggle, used on Home). Import `projects.csv`.
   - If Framer does not map the comma-separated Categories/Industries names to the references, set them by hand once (13 projects).
   - `Write-up` is HTML (headings, paragraphs, stat lists, Vimeo links). The image columns are file paths on this computer: upload the
     images (`site/assets/img/`, use the 1800 px files, not the `-640`/`-1200` copies: Framer makes its own sizes) and attach them.
3. **Project page template** (`/projects/:slug`): H1 title, Client / Industry / Category row, lead video or image, then the Write-up.

## 3. Pages

| Page | Build |
|---|---|
| **Home** | Hero: Framer Video (silent, loop, autoplay), overlay text, buttons "View Projects" (filled) and "About Me" (outline). **ClientTicker**. "Featured Work": Collection List (3 columns) filtered by the Featured toggle (CarSwitch, Evercare, Pizza Now, Collegiate Survival Sale, Breakfast Box, Black Friday), a "Browse by category" row linking to `/projects?category=...`, and a "View all projects" button. |
| **Projects** | Heading + **ProjectsExplorer** (Project path `/projects`). Images: host `site/assets/img/thumbs/` somewhere public and set *Image base URL*, or put full Framer image URLs in the `thumb` fields of `ProjectsData.ts`. |
| **About** | Headshot + text; link "versatile art-style" to `/projects` and "Drop me a message" to `/contact`. |
| **Contact** | Framer's built-in **Form**: First name, Last name, Email, Subject, Message; set the notification email. Add the line "By sending this message you agree to the use of your details to reply to you, as described in the Privacy Policy" linking to `/privacy`. |
| **Privacy** | A text page; paste `cms/privacy-policy.html`. Add the privacy contact email (placeholder until supplied). Link it in the footer. |
| **Tango Photos** (project) | Use **PhotoGallery** on the project page with the photos from `site/assets/img/tango-photos/` (see limits). |
| **Global** | Header (logo centre; Home / Projects / About Me / Contact) and footer (page links, Privacy Policy, Behance / Vimeo / LinkedIn / Instagram icons) as shared components. |

## 4. Background (matches the website)

- **Checkerboard on every page**: **BackgroundPattern** at the top, behind everything (height about 2400 on Home, 760 elsewhere).
- **Sparse card-suit scatter only on Home, About and Contact**: turn on "Sparse suits" in BackgroundPattern on those pages.
- **Floating elements**: **AmbientElements** on Home, Projects, About, Contact and Privacy (not on project pages). Set its **Position to Fixed**,
  width 100%, height 100vh, and send it to the back. Counts used on the site: Home 15, Projects 9, About 5, Contact 11, Privacy 5.
  Add the images from `assets/ambient/` under "Artwork" to mix your own artwork with the drawn shapes.

## 5. Adding components

1. Assets > Code > New file, named exactly like the file here (`BackgroundPattern`, `AmbientElements`, `ClientTicker`, `PhotoGallery`,
   `ProjectsData`, `ProjectsExplorer`).
2. Replace the contents with the matching file from `components/`.
3. If the import line at the top of `ProjectsExplorer.tsx` shows an error, use the path Framer suggests for your `ProjectsData` file.
4. Drag the component from Assets onto the canvas; colours, sizes and text appear as controls in the right-hand panel.

## 6. What Framer does differently from the website (decide early)

- **Project page layout**: the website alternates text and images in each write-up section with big icon badges and stat cards. A
  Framer CMS rich-text field gives headings, paragraphs and inline images, but not icon badges, stat cards or text/image side-by-side
  sections. Options: (a) accept a simpler rich-text layout; (b) build one hand-made layout per project (more control, more work, not
  driven by the CMS). Tell me which.
- **Tall scrolling designs** (emails, magazines, app screens): use a Framer frame with vertical scroll overflow; they are not CMS-driven.
- **Photo galleries**: I could not confirm that Framer's CMS has a many-photos field, so the tango gallery uses the **PhotoGallery** component
  (photos added in its properties, not in the CMS).
- **Random mix on every load**: Framer cannot do this natively; AmbientElements does it in code, so it only shows in Preview/published site.
  On the canvas it shows nothing animated.
- **Videos**: embed Vimeo links (Embed component) instead of uploading large MP4s. The hero reel should be a small, silent MP4.
- **Privacy policy**: generic template, not legal advice; have it reviewed.
- **ProjectsExplorer keeps its own copy of the project list** (`ProjectsData.ts`); adding a project means editing the CMS and that file.
  The alternative is Framer's native CMS filter and sort on a Collection List (less custom styling, one place to edit).
- **Code components render in the browser**, so keep headings and body text in normal Framer layers (good for SEO).

## 7. SEO and GEO in Framer (the live site)

Framer renders real HTML on its servers and gives every page a clean URL, so the pre-rendering the prototype needs is not an issue there. What to set up
(`framer/seo/` has the ready-made text):

| Item | Where | Notes |
|---|---|---|
| Page titles and descriptions | `seo/seo.csv` | Page settings > Title and Description, one row per page and per project. For the CMS Project pages, build the title and description from CMS fields (`{Title}: ... | Zeeshan Abid`). |
| Social share images | `seo/og/*.jpg` (1200x630) | Page settings > Social preview image. |
| Site-wide structured data | `seo/site-jsonld.html` | Site Settings > General > Custom Code > End of `<head>`. Replace the domain first. Needs a paid plan. Gives search engines and AI the "who, what, where" (designer, Toronto, services). |
| Per-project structured data | not provided | I could not confirm that Framer's custom code can read CMS fields, so project pages get the site-wide data plus good titles and text. Check in Framer; if it can, the project schema in `build-seo.js` is the template. |
| `llms.txt` / `llms-full.txt` | `seo/` | **Framer cannot serve arbitrary files at the site root** (as far as I know). Options: host them elsewhere and use a redirect, or skip: AI assistants mostly rely on page text and schema. Treat as optional. |
| Sitemap and robots | automatic | Framer generates `sitemap.xml`. Check the robots setting in Site Settings; decide whether to welcome AI crawlers (see `site/robots.txt` logic). |
| Headings | in each text layer | One H1 per page (set the tag on the text layer). Use H2 for section titles, H3 for card titles. The hero headline was removed, so give the home page a real H1 (can be visually small). |
| Image alt text | each image / CMS image | Describe what is shown; the prototype's alt text is in `site/js/data.js`. |
| Keep text in normal Framer text layers | whole site | Text inside code components is rendered in the browser and is less visible to crawlers. Use code components only for decoration and interaction. |
| Domain | Site Settings > Domains | Use one canonical domain (with or without www) and redirect the other. Do not let the GitHub preview be indexed (it is set to noindex). |
| Local signals | text + schema | "Toronto, Ontario, Canada" appears in the page text, titles, schema and footer. Consider a Google Business Profile if clients should find the business locally. |

Not done by any file here: Google Search Console / Bing Webmaster verification and submitting the sitemap (needs the live domain and your accounts).
