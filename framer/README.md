# Copying the site into Framer

Framer cannot import an HTML/CSS/JS site, so the local build (`site/`) is the design reference and this folder holds
everything that can be pasted or imported into Framer:

```
framer/
  cms/categories.csv  industries.csv  projects.csv   -> CMS "Import from CSV"
  components/BackgroundPattern.tsx                   -> checkerboard fade + icon pattern
  components/ClientTicker.tsx                        -> client ticker
  components/ProjectsExplorer.tsx                    -> the whole Projects page body (filters + sort + grid)
  components/ProjectsData.ts                         -> data used by ProjectsExplorer
```

Regenerate the CSVs and data file after editing `site/js/data.js`: `cd tools && node export-framer.js`.

**Tested:** the three components compile with TypeScript (strict) and render with React using a stand-in for the `framer`
module. **Not yet tested inside Framer itself** (no access to the project from here), so expect small tweaks when first pasted.

## 1. Set up the project

1. **Colour styles**: Violet Ray `#8F00FF`, Violet soft `#7352A0` (checker/icons), Violet light `#C9A0FF` (text on dark),
   Carbon Black `#1B1B1B`, Ink `#131313`, Panel `#242424`, Line `#3A3A3A`, Grey `#E5E5E5`, White.
2. **Fonts**: upload the TTFs from `brand/Typefaces/` (Magazine Letter, Kingthings Extortion, Jockey Full of Bourbon, Hit Me Punk 04).
   Raleway is already in Framer's font list. Custom fonts need a paid Framer plan.
3. **Text styles**: Body = Raleway 17/1.7. H1/H2 headings = Magazine Letter. Write-up subheadings (H2 in project pages) =
   Kingthings Extortion, large. Stat numbers = Hit Me Punk 04. Logo placeholder = Jockey Full of Bourbon.
4. **Breakpoints**: Desktop 1240 content width, Tablet 960, Phone 640 (matches `css/style.css`).

## 2. CMS (Framer > CMS)

1. Create **Categories** and **Industries** collections (fields: Title, Slug, Order). Import `cms/categories.csv`, `cms/industries.csv`.
2. Create **Projects** with fields: Title, Slug, Client (text), Categories (multi-reference), Industries (multi-reference),
   Summary (plain text), Thumbnail (image), Lead video (link), Write-up (formatted text), Write-up coming soon (toggle), Featured (toggle, used on the Home page),
   Images (optional gallery). Import `cms/projects.csv`.
   - The CSV has Categories/Industries as comma-separated names so Framer can match them to the reference collections;
     if Framer does not map them, set them once by hand (12 projects).
   - `Write-up` is HTML (headings, paragraphs, stat lists, Vimeo links) for a Formatted text field.
   - Image columns hold file paths on this computer. Upload the images (from `site/assets/img/`) in Framer and attach them.
3. Pages: create a **Projects detail page** (`/projects/:slug`) with the layout from the local site: H1 title, a row for
   Client / Industry / Category, the lead video or image, then the Write-up rich text. Add icon + violet badge to the H2 style.
   Vimeo embeds: paste the Vimeo link into a Framer Video/Embed element bound to the CMS field.

## 3. Build the pages

| Page | Build |
|---|---|
| **Home** | Hero: Framer Video (silent, loop, autoplay) with overlay text and two buttons (filled "View Projects", outline "About Me"). Then **ClientTicker** (or Framer's Ticker with logos). Then a "Featured Work" section: a **Collection List** (3-column grid, card = thumbnail, tag chips, title link, client) filtered by a "Featured" toggle on the Projects CMS (6 projects: CarSwitch, Evercare, Pizza Now, Collegiate Survival Sale, Breakfast Box, Black Friday). Below it a "Browse by category" row of links to `/projects?category=...` and a "View all projects" button. |
| **Projects** | Heading + **ProjectsExplorer** (paste component; set *Project path* `/projects`). For images either host `site/assets/img/thumbs/` somewhere public and enter it as *Image base URL*, or put full Framer image URLs in the `thumb` field of `ProjectsData.ts`. |
| **About** | Image (headshot) + text. Link "versatile art-style" to `/projects` and "Drop me a message" to `/contact` (text is in `site/js/data.js`). |
| **Contact** | Framer's built-in **Form** component with First name, Last name, Email, Subject, Message; set the notification email in the form settings. |
| **Global** | Header (logo centre, tabs Home / Projects / About Me / Contact) and footer (page links + Behance, Vimeo, LinkedIn, Instagram with icons) as shared components. |

Background: drop **BackgroundPattern** at the top of each page, behind everything (`Position: Absolute`, width 100%,
height about 2400, Fade height about 2400 on Home and 760 elsewhere).

## 4. Components: how to add

1. Framer > Assets > Code > **New file**, name it exactly as the file here (e.g. `BackgroundPattern`).
2. Replace its contents with the matching file from `components/`.
3. For ProjectsExplorer also create the code file `ProjectsData` (paste `ProjectsData.ts`). If the import line at the top of
   `ProjectsExplorer.tsx` shows an error, use the path Framer suggests for your `ProjectsData` file.
4. Drag the component from Assets onto the canvas; the right-hand panel shows the colours, sizes and text as controls.

## 5. Known limits / decisions to confirm

- ProjectsExplorer keeps its own copy of the project list (`ProjectsData.ts`) instead of reading the CMS live; adding a
  project means updating both. Alternative: use Framer's native CMS filtering/sorting on a Collection List (fewer moving parts,
  less custom styling). Say which you prefer.
- Pages built with code components render in the browser, so keep headings and text in normal Framer layers for SEO.
- Video: host on Vimeo and embed rather than uploading large MP4s (the compressed files in `site/assets/video/` total about 30 MB).
