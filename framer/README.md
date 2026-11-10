# Copying the site into Framer

> **Out of date in places (09-Nov-2026):** the website has since dropped the floating elements, the checker is now very subtle black/grey or white/grey, all corners are square, the cursor is a simple inverting dot, the Projects page has no side panel (categories across the top, industry after the client name), the home page has a headline, left-aligned copy and the ticker at the bottom, and the About copy changed. See the main README ("Feedback of 09-Nov-2026") and update this pack in the single Framer pass.

Framer cannot import an HTML/CSS/JS site, so the local build (`site/`) is the design reference and this folder holds everything that can be
pasted, imported or uploaded into Framer. Regenerate the exports after editing `site/js/data.js`:
`cd tools && node export-framer.js` (and `node extract-ambient.js` if the background artwork changes). Updated for the design as of
7 Nov 2026 (client style guide, light version, new project-page layout).

```
framer/
  cms/categories.csv  industries.csv  projects.csv     -> CMS "Import from CSV" (8 categories, 8 industries, 9 projects)
  cms/privacy-policy.html                              -> text of the Privacy Policy page (paste into a Framer page)
  components/                                          -> code components (Assets > Code > New file), see section 5
      BackgroundPattern.tsx  checkerboard (104 px) that fades down the page
      AmbientElements.tsx    floating grey background elements (pinned, freeze on scroll)
      ClientTicker.tsx       client strip (violet diamonds)
      FeaturedPanels.tsx     Home: full-screen panels that slide over one another
      ProjectsExplorer.tsx + ProjectsData.ts   Projects page: filters + sort + grid
      ScrollFrames.tsx       email newsletters / magazines / app screens as scrolling frames
      ThemeSwitch.tsx        the light / dark switch
      CountUp.tsx            optional: result numbers that count up
      PhotoGallery.tsx       masonry gallery (only needed if the hidden Tango Photos project is shown again)
  custom-code/theme-head.html      -> Site Settings > Custom Code > Start of <head>   (no flash of the wrong theme)
  custom-code/protect-images.html  -> Site Settings > Custom Code > End of <body>     (right-click / drag block on images)
  assets/thumbs/*.webp     the 4:3 card thumbnails (9)         -> CMS "Thumbnail"
  assets/featured/*.webp   the 6 home-panel pictures           -> FeaturedPanels / CMS "Home panel: image"
  assets/tall/*.webp       emails (trimmed), magazines, app screens -> ScrollFrames
  assets/ambient/*.webp    cut-out artwork                     -> AmbientElements "Artwork"
  seo/                     titles + descriptions, share images, structured data, llms.txt
```

## What was tested, and what was not

- **Tested:** all nine components pass TypeScript strict mode, and each renders without errors (server-side, with a stand-in for the `framer`
  module) with the expected content: 6 home panels, 11 client names, 9 project cards (no hidden project), 3 scroll frames in a row, the switch
  button, the count-up text. Earlier rounds also ran the ambient layer, gallery, filters and ticker in a real browser.
- **Not tested:** inside Framer itself (no access to your Framer project from here). Expect small adjustments on first paste (the import line in
  `ProjectsExplorer.tsx`, how Framer lists the property controls). **The theme switch is the least certain piece**: see section 6.

## 1. Set up the project

1. **Colour styles** (all from the client's style guide PDF). Dark (the default): Violet Ray `#8F00FF`, Carbon Black `#1B1B1B` (page), Panel `#262626`,
   Line `#3B3B3B`, That Other Grey `#E5E5E5`, White, Violet light `#CBA6FF` (small violet text on dark). Light: page That Other Grey `#E5E5E5`,
   cards White, text Carbon Black, violet `#8F00FF` for accents and violet text, Line `#BDBDBD`. Section 6 has the full table.
2. **Fonts**: **Raleway only** (it is in Framer's font list; the PDF names no other typeface). The only other face is *Jockey Full of Bourbon*
   for the **placeholder logo**; it goes when the real logo is supplied. Do not use the punk font or the earlier display faces.
   Custom fonts need a paid Framer plan and a licence check.
3. **Text styles**: Body = Raleway 17/1.7. Page headings = Raleway 800. Stat and result numbers = Raleway 800/900. Small labels = Raleway 800, uppercase, letter-spacing .16-.24em.
4. **Breakpoints**: Desktop (content width 1240), Tablet 960, Phone 640.

## 2. CMS (Framer > CMS)

1. Create **Categories** and **Industries** (Title, Slug, Order) and import the two CSVs.
2. Create **Projects** with these fields and import `projects.csv` (the CSV headers match):
   Title, Slug, Client, Categories and Industries (multi-reference), Summary, Thumbnail (image), Lead video (link), Write-up (formatted text),
   Write-up coming soon (toggle), Featured (toggle), **Key results (one line)**, and the six **Home panel** fields (kicker, big number, after
   number, outcome, colour, text colour, image, image focus) used by the Featured Work panels.
   - If Framer does not map the comma-separated Categories/Industries names to the references, set them by hand once (9 projects).
   - `Write-up` is HTML (headings, paragraphs, stat lists, Vimeo links). The image columns are file paths on this computer: upload the pictures
     from **this folder's `assets/`** (thumbs, featured, tall) and from `site/assets/img/` for the rest. Framer makes its own sizes.
   - **Tango Photos is hidden at the owner's request** and is not in the CSV. To show it again, remove `hidden: true` in `site/js/data.js`, re-run the export, and use PhotoGallery.
3. **Project page template** (`/projects/:slug`), one steady layout for every project:
   H1 title, the Client / Industry / Category row and summary, then the **Key results line** (a single row of the published figures, e.g.
   "+60-70% product sales over Black Friday · 4.67% email click rate"; hide it when the field is empty), then the lead picture, then each chapter
   (Introduction, Challenge, Role, Approach, Outcome...) as **title on the left, text and pictures on the right** (Framer Stack with two columns).
   Tall designs (emails etc.) go in a **ScrollFrames** component inside the right-hand column.

## 3. Pages

| Page | Build |
|---|---|
| **Home** | Hero: Framer Video (silent, loop, autoplay, small MP4), overlay text, buttons "View Projects" (filled) and "About Me" (outline). **ClientTicker** (diamond separator). **FeaturedPanels** (the six Featured projects, white text on each project's colour). A "Browse by category" row linking to `/projects?category=...` and a "View all projects" button. |
| **Projects** | Heading + **ProjectsExplorer** (Project path `/projects`). Images: host `assets/thumbs/` somewhere public and set *Image base URL*, or put full Framer image URLs in the `thumb` fields of `ProjectsData.ts`. Tags on thumbnails are Carbon Black at 65% with white text (the component does this). |
| **About** | Headshot + text (placeholder until supplied); link "versatile art-style" to `/projects` and "Drop me a message" to `/contact`. |
| **Contact** | Left: a "Based in Toronto" card (location, "Open to new roles and projects", live Toronto time is optional and needs a small code snippet), Find me online (Behance, Vimeo, LinkedIn, Instagram) and "Helpful to include". Right: Framer's built-in **Form**: First name, Last name, Email, Subject, Message; set the notification email. Add "By sending this message you agree to the use of your details to reply to you, as described in the Privacy Policy" linking to `/privacy`. |
| **Privacy** | A text page; paste `cms/privacy-policy.html`. Add the privacy contact email (placeholder until supplied). Link it in the footer. |
| **Global** | Header (logo centre; Home / Projects / About Me / Contact; **ThemeSwitch** top right) and footer (page links, Privacy Policy, Behance / Vimeo / LinkedIn / Instagram) as shared components. The footer is dark in the dark version and grey in the light version. |

## 4. Background (matches the website)

- **Checkerboard on every page**: **BackgroundPattern** at the top, behind everything: Violet Ray squares, **104 px on every page** (same size everywhere),
  height about 2400 on Home and 760 elsewhere. The sparse card-suit scatter was removed from the site, so leave "Sparse suits" off.
- **Floating elements** (kept, but fewer): **AmbientElements** on Home, Projects, About, Contact and Privacy (not on project pages). Set its **Position to Fixed**,
  width 100%, height 100vh, send it to the back. Counts used on the site: Home 15, Projects 9, About 5, Contact 11, Privacy 5. The floating-icon scroll behaviour
  from the client's feedback list was deliberately not changed.

## 5. Adding components

1. Assets > Code > New file, named exactly like the file here (`BackgroundPattern`, `AmbientElements`, `ClientTicker`, `FeaturedPanels`, `ScrollFrames`,
   `ThemeSwitch`, `CountUp`, `PhotoGallery`, `ProjectsData`, `ProjectsExplorer`).
2. Replace the contents with the matching file from `components/`.
3. If the import line at the top of `ProjectsExplorer.tsx` shows an error, use the path Framer suggests for your `ProjectsData` file.
4. Drag the component from Assets onto the canvas; colours, sizes and text appear as controls in the right-hand panel.
5. **FeaturedPanels**: the six panels are already filled in (title, number, outcome, colour, tags, link). Drop each picture from `assets/featured/` into its "Image" control, or
   put the hosted folder in "Image base URL". **ScrollFrames**: add up to three pictures from `assets/tall/` (emails: `black-friday-email-*.webp`, `collegiate-survival-sale-email-*.webp`).

## 6. Light and dark version (the switch)

The website has a light/dark switch (half-moon button, top right). Dark is the default and the approved look; the choice is remembered on the visitor's device.

| Token | Dark | Light |
|---|---|---|
| Page (`--zk-page`) | `#1B1B1B` | `#E5E5E5` (That Other Grey) |
| Cards, fields, frames (`--zk-card`) | `#262626` | `#FFFFFF` |
| Text (`--zk-text`) | `#FFFFFF` | `#1B1B1B` (Carbon Black) |
| Body copy (`--zk-soft`) / muted (`--zk-muted`) | `#E9E9E9` / `#B5B5B5` | `#2B2B2B` / `#4F4F4F` |
| Lines (`--zk-line`) | `#3B3B3B` | `#BDBDBD` |
| Violet text and marks (`--zk-accent`) | `#CBA6FF` | `#8F00FF` |
| Footer (`--zk-footer`) | `#1B1B1B` | `#E5E5E5` |

Unchanged in both versions: the home hero video with its white header and buttons, the six coloured panels (white text), the tags on thumbnails, and every violet button.
In the light version the neon lime accents become violet (lime cannot be read on a light page).

**How to wire it in Framer** (two routes, either works with the switch):
1. **CSS variables** (recommended): add **ThemeSwitch** to the header, paste `custom-code/theme-head.html` into *Start of `<head>`*, then in colour fields of normal layers
   type `var(--zk-page)`, `var(--zk-text)`, `var(--zk-card)` and so on. The code components here already use the variables when "Follow theme" is on.
2. **Framer's own light/dark colour styles**, if your plan has them: define each style in both modes from the table above. ThemeSwitch can then be replaced by Framer's own toggle.

**Not confirmed:** I could not check inside Framer that colour fields accept `var(--...)` or that custom code can be added on your plan. If route 1 is not possible, use route 2 or ship the dark version only (the code components still look correct without the switch).

## 7. Custom code snippets (paid plan)

- `custom-code/theme-head.html`: applies the saved theme before the page paints (keep its palette identical to `THEMES` in `ThemeSwitch.tsx`).
- `custom-code/protect-images.html`: blocks right-click "open image in new tab / save image" and dragging images out, on the whole site. **A deterrent, not a lock**: screenshots and
  developer tools still work. The real protection is what you upload: web-size copies (1200 px wide at most), never the full-size originals.

## 8. What Framer does differently from the website (decide early)

- **Project page chapters**: the website shows the title in a left column and the text and pictures in a right column, with stroked icon badges. A Framer CMS rich-text field gives
  headings, paragraphs and inline images, but not icon badges or text/picture side-by-side sections. Options: (a) accept a simpler rich-text layout; (b) build one hand-made layout per
  project (more control, more work, not driven by the CMS). Tell me which.
- **Tall scrolling designs** (emails, magazines, app screens): ScrollFrames (not CMS-driven: pictures are added in its properties).
- **Featured panels** are code (FeaturedPanels), so their text is rendered in the browser and is less visible to crawlers than normal layers. The same facts are in the project pages.
- **Random mix on every load** (floating elements): Framer cannot do this natively; AmbientElements does it in code, so it only shows in Preview/published site.
- **Videos**: embed Vimeo links (Embed component) instead of uploading large MP4s. The hero reel should be a small, silent MP4.
- **Privacy policy**: generic template, not legal advice; have it reviewed.
- **ProjectsExplorer keeps its own copy of the project list** (`ProjectsData.ts`); adding a project means editing the CMS and that file. The alternative is Framer's native CMS filter and sort on a Collection List.
- **Code components render in the browser**, so keep headings and body text in normal Framer layers (good for SEO).

## 9. SEO and GEO in Framer (the live site)

Framer renders real HTML on its servers and gives every page a clean URL, so the pre-rendering the prototype needs is not an issue there. What to set up
(`framer/seo/` has the ready-made text):

| Item | Where | Notes |
|---|---|---|
| Page titles and descriptions | `seo/seo.csv` | Page settings > Title and Description, one row per page and per project. For the CMS Project pages, build the title and description from CMS fields (`{Title}: ... | Zeeshan Abid`). |
| Social share images | `seo/og/*.jpg` (1200x630) | Page settings > Social preview image. The home, Projects, About, Contact and Privacy pages use one three-picture collage (Pizza Now, Collegiate Survival Sale, CarSwitch); project pages use their own picture. |
| Site-wide structured data | `seo/site-jsonld.html` | Site Settings > General > Custom Code > End of `<head>`. Replace the domain first. Needs a paid plan. Gives search engines and AI the "who, what, where" (designer, Toronto, services). |
| Per-project structured data | not provided | I could not confirm that Framer's custom code can read CMS fields, so project pages get the site-wide data plus good titles and text. Check in Framer; if it can, the project schema in `tools/build-seo.js` is the template. |
| `llms.txt` / `llms-full.txt` | `seo/` | **Framer cannot serve arbitrary files at the site root** (as far as I know). Host them elsewhere and redirect, or skip: AI assistants mostly rely on page text and schema. Optional. |
| Sitemap and robots | automatic | Framer generates `sitemap.xml`. Check the robots setting in Site Settings; decide whether to welcome AI crawlers (see `site/robots.txt` logic). |
| Headings | in each text layer | One H1 per page (set the tag on the text layer). H2 for section titles, H3 for card titles. The home hero has no visible headline, so give the home page a real H1 (can be visually small). |
| Image alt text | each image / CMS image | Describe what is shown; the prototype's alt text is in `site/js/data.js`. |
| Keep text in normal Framer text layers | whole site | Text inside code components is rendered in the browser and is less visible to crawlers. |
| Domain | Site Settings > Domains | One canonical domain (with or without www) and redirect the other. Do not let the GitHub preview be indexed (it is set to noindex). |
| Local signals | text + schema | "Toronto, Ontario, Canada" appears in the page text, titles, schema and footer. Consider a Google Business Profile. |

Not done by any file here: Google Search Console / Bing Webmaster verification and submitting the sitemap (needs the live domain and your accounts).

## 10. Checklist for the single Framer pass

1. Colour styles (dark + light), Raleway, breakpoints.
2. CMS: import the three CSVs, upload thumbs and the other pictures, set references if needed.
3. Add the ten code files; build Home, Projects, About, Contact, Privacy, and the Project template.
4. Header and footer components; ThemeSwitch (decide route 1 or 2 in section 6).
5. Custom code: theme-head, protect-images, site-jsonld; page titles, descriptions and share images from `seo/`.
6. Replace placeholders: real logo, headshot, contact email, social links, domain.
7. Publish, then check the live site in dark and light on a phone and a laptop.
