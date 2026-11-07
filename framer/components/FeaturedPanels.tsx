import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Featured Work: full-screen panels that slide over one another as you scroll. Each panel is led by the result it delivered
 * (big number), then the project title, the one-line outcome, the category tags and a 4:3 picture. The whole panel is one link.
 * Every panel uses white text on its own colour (taken from the work). On phones the panels become normal stacked cards.
 *
 * Add or change panels in the property panel ("Panels"). The six defaults below are written by tools/export-framer.js from site/js/data.js.
 * Pictures: either drop an image into "Image", or put the file name (e.g. carswitch.webp) in "Image file" with "Image base URL" pointing at
 * the hosted framer/assets/featured/ folder.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
type Img = { src: string; srcSet?: string; alt?: string }
type Item = {
    kicker: string
    metric: string
    words: string
    title: string
    outcome: string
    chips: string
    href: string
    panel: string
    text: string
    image?: Img
    imageFile: string
    imagePos: string
    alt: string
}
type Props = {
    items: Item[]
    imageBase: string
    borderColor: string
    fontFamily: string
    style?: React.CSSProperties
}

// <generated:items>
const DEFAULT_ITEMS: Item[] = [
    {
        "kicker": "Animation that gets noticed",
        "metric": "35k",
        "words": "views, 30% fewer queries",
        "title": "CarSwitch Animations",
        "outcome": "35k views, 30% fewer queries and 50% more website visits.",
        "chips": "Animations / Videos, Social Media",
        "href": "/projects/carswitch",
        "panel": "#c97c00",
        "text": "#ffffff",
        "imageFile": "carswitch.webp",
        "imagePos": "64% 50%",
        "alt": "CarSwitch animation frame: a seller character beside the question \"Looking to sell your car?\""
    },
    {
        "kicker": "A hard message made simple",
        "metric": "−40%",
        "words": "common COVID-19 queries",
        "title": "Evercare Hospital Animations",
        "outcome": "Cut common COVID-19 queries by 40% with explainers averaging 20K views.",
        "chips": "Animations / Videos, Social Media",
        "href": "/projects/evercare",
        "panel": "#14367a",
        "text": "#ffffff",
        "imageFile": "evercare.webp",
        "imagePos": "50% 50%",
        "alt": "Evercare Hospital explainer animation frame: a woman working at home in a red cape"
    },
    {
        "kicker": "A brand that sells",
        "metric": "#1",
        "words": "selling brand for a year",
        "title": "Pizza Now",
        "outcome": "The highest-selling brand on the Byte app for a year, driving 50–60% of daily sales.",
        "chips": "Branding",
        "href": "/projects/pizza-now",
        "panel": "#17763a",
        "text": "#ffffff",
        "imageFile": "pizza-now.webp",
        "imagePos": "50% 50%",
        "alt": "Pizza Now pizza boxes"
    },
    {
        "kicker": "A campaign that converts",
        "metric": "3x",
        "words": "sales in five days",
        "title": "Collegiate Survival Sale",
        "outcome": "Tripled sales and sold 60% of the stock in five days.",
        "chips": "Digital Marketing, Social Media",
        "href": "/projects/collegiate-survival-sale",
        "panel": "#d3202b",
        "text": "#ffffff",
        "imageFile": "collegiate-survival-sale.webp",
        "imagePos": "50% 50%",
        "alt": "Collegiate Survival Sale campaign on social media and devices"
    },
    {
        "kicker": "A launch that gets orders",
        "metric": "150–200",
        "words": "orders a day",
        "title": "Breakfast Box",
        "outcome": "150–200 orders a day for the four months after launch.",
        "chips": "Branding",
        "href": "/projects/breakfast-box",
        "panel": "#dc6b8e",
        "text": "#ffffff",
        "imageFile": "breakfast-box.webp",
        "imagePos": "0% 50%",
        "alt": "Breakfast Box branding with the logo on a plate of breakfast"
    },
    {
        "kicker": "A sale that stands out",
        "metric": "+60–70%",
        "words": "Black Friday sales",
        "title": "Black Friday Sale",
        "outcome": "Lifted Black Friday product sales by 60–70%.",
        "chips": "Digital Marketing, Social Media",
        "href": "/projects/black-friday",
        "panel": "#14a074",
        "text": "#ffffff",
        "imageFile": "black-friday.webp",
        "imagePos": "50% 50%",
        "alt": "Black Friday sale social posts"
    }
]
// </generated:items>

export default function FeaturedPanels(props: Props) {
    const { items, imageBase, borderColor, fontFamily, style } = props
    const base = imageBase ? imageBase.replace(/\/?$/, "/") : ""
    const pick = (it: Item) => (it.image && it.image.src ? it.image.src : it.imageFile ? (/^https?:|^\//.test(it.imageFile) ? it.imageFile : base + it.imageFile) : "")
    return (
        <section aria-label="Featured work" style={{ width: "100%", fontFamily, ...style }}>
            <style>{`
                .zk-fp { list-style:none; margin:0; padding:0; }
                .zk-fp-panel { position:sticky; top:0; z-index:1; min-height:100vh; display:flex; align-items:center; padding:clamp(28px,4vw,56px) 0; box-sizing:border-box; }
                .zk-fp-in { width:min(1240px, 100% - 2 * clamp(18px,4vw,40px)); margin-inline:auto; position:relative; display:grid; grid-template-columns:minmax(0,5fr) minmax(0,7fr); gap:clamp(24px,4vw,64px); align-items:center; }
                .zk-fp-kick { margin:0; font-size:12px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
                .zk-fp-kick b { margin-right:12px; padding:3px 8px; border:1.5px solid currentColor; font-weight:800; }
                .zk-fp-metric { margin:clamp(14px,2.5vw,30px) 0 0; font-weight:900; font-size:clamp(52px,7.4vw,112px); line-height:.95; letter-spacing:-.03em; white-space:nowrap; }
                .zk-fp-words { margin:8px 0 0; font-size:19px; font-weight:700; line-height:1.3; max-width:24ch; }
                .zk-fp h3 { margin:clamp(18px,3vw,34px) 0 0; font-weight:800; font-size:clamp(24px,2.6vw,36px); line-height:1.08; letter-spacing:-.005em; text-transform:uppercase; }
                .zk-fp-out { margin:10px 0 0; max-width:38ch; font-weight:600; line-height:1.5; }
                .zk-fp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:18px; }
                .zk-fp-chip { padding:4px 11px; border:1.5px solid currentColor; border-radius:999px; font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; line-height:1.5; }
                .zk-fp-link { position:absolute; inset:0; z-index:2; }
                .zk-fp-panel:hover h3 { text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:.14em; }
                .zk-fp-link:focus-visible { outline:4px solid ${borderColor}; outline-offset:-8px; }
                .zk-fp-img { aspect-ratio:4/3; overflow:hidden; background:rgba(0,0,0,.15); }
                .zk-fp-img img { display:block; width:100%; height:100%; object-fit:cover; -webkit-user-drag:none; user-select:none; }
                @media (max-width: 860px) {
                    .zk-fp-panel { position:relative; min-height:0; }
                    .zk-fp-in { grid-template-columns:minmax(0,1fr); }
                    .zk-fp-img { order:-1; }
                    .zk-fp-metric { font-size:clamp(52px,16vw,78px); }
                }
            `}</style>
            <ol className="zk-fp">
                {items.map((it, i) => {
                    const src = pick(it)
                    return (
                        <li key={i} className="zk-fp-panel" style={{ background: it.panel, color: it.text, borderTop: `2px solid ${borderColor}` }}>
                            <div className="zk-fp-in">
                                <div>
                                    <p className="zk-fp-kick"><b>{String(i + 1).padStart(2, "0")}</b> {it.kicker}</p>
                                    <p className="zk-fp-metric">{it.metric}</p>
                                    <p className="zk-fp-words">{it.words}</p>
                                    <h3>{it.title}</h3>
                                    <p className="zk-fp-out">{it.outcome}</p>
                                    <div className="zk-fp-chips">
                                        {it.chips.split(",").map((c) => c.trim()).filter(Boolean).map((c) => (
                                            <span key={c} className="zk-fp-chip">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="zk-fp-img" style={{ border: `2px solid ${borderColor}` }}>
                                    {src ? (
                                        <img src={src} alt={it.alt} loading={i === 0 ? "eager" : "lazy"} draggable={false} onContextMenu={(e) => e.preventDefault()} style={{ objectPosition: it.imagePos || "50% 50%" }} />
                                    ) : (
                                        <div style={{ display: "grid", placeItems: "center", height: "100%", font: `700 13px ${fontFamily}`, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.7 }}>Add an image</div>
                                    )}
                                </div>
                            </div>
                            {it.href && <a className="zk-fp-link" href={it.href} aria-label={`${it.title}: read the case study`} />}
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}

FeaturedPanels.defaultProps = {
    items: DEFAULT_ITEMS,
    imageBase: "",
    borderColor: "#1B1B1B",
    fontFamily: "Raleway, sans-serif",
}

addPropertyControls(FeaturedPanels, {
    items: {
        type: ControlType.Array,
        title: "Panels",
        control: {
            type: ControlType.Object,
            controls: {
                kicker: { type: ControlType.String, title: "Kicker" },
                metric: { type: ControlType.String, title: "Big number" },
                words: { type: ControlType.String, title: "After number" },
                title: { type: ControlType.String, title: "Title" },
                outcome: { type: ControlType.String, title: "Outcome", displayTextArea: true },
                chips: { type: ControlType.String, title: "Tags", description: "Comma separated" },
                href: { type: ControlType.Link, title: "Link" },
                panel: { type: ControlType.Color, title: "Panel colour" },
                text: { type: ControlType.Color, title: "Text colour" },
                image: { type: ControlType.ResponsiveImage, title: "Image" },
                imageFile: { type: ControlType.String, title: "Image file" },
                imagePos: { type: ControlType.String, title: "Image focus", description: "e.g. 64% 50%" },
                alt: { type: ControlType.String, title: "Alt text" },
            },
        },
    },
    imageBase: { type: ControlType.String, title: "Image base URL", description: "Where framer/assets/featured/ is hosted" },
    borderColor: { type: ControlType.Color, title: "Outline" },
    fontFamily: { type: ControlType.String, title: "Font family" },
})
