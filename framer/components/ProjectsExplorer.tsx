import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
// In Framer: create a code file named "ProjectsData" (paste framer/components/ProjectsData.ts) and import it like this.
// If Framer shows a different import path in its code-file menu, use that one.
import { projects, categories, industries } from "./ProjectsData.js"

/**
 * The whole Projects page body: left filter column (All / Categories / Industries), sort dropdown and the thumbnail grid.
 * Tag chips on each thumbnail also filter. Cards link to /projects/<slug> (your CMS detail pages).
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
type Props = {
    basePath: string
    imageBase: string
    accent: string
    accentLight: string
    panel: string
    line: string
    text: string
    muted: string
    fontFamily: string
    displayFamily: string
    style?: React.CSSProperties
}
type Filter = { type: "all" | "category" | "industry"; id: string }
type Sort = "default" | "az" | "za"

export default function ProjectsExplorer(props: Props) {
    const { basePath, imageBase, accent, accentLight, panel, line, text, muted, fontFamily, displayFamily, style } = props
    // Colours follow the light/dark switch when ThemeSwitch + the theme snippet are on the page (CSS variables); otherwise the property values are used.
    const v = (name: string, fallback: string) => `var(${name}, ${fallback})`
    const c = {
        text: v("--zk-text", text), muted: v("--zk-muted", muted), panel: v("--zk-card", panel), line: v("--zk-line", line), accent: accent,
        accentText: v("--zk-accent", accentLight), side: v("--zk-surface", "rgba(27, 27, 27, .88)"), soft: v("--zk-soft", "#E5E5E5"), hover: v("--zk-hover", "#313131"),
    }
    const [filter, setFilter] = React.useState<Filter>({ type: "all", id: "" })
    const [sort, setSort] = React.useState<Sort>("default")

    // allow deep links like /projects?category=branding
    React.useEffect(() => {
        if (typeof window === "undefined") return
        const q = new URLSearchParams(window.location.search)
        if (q.get("category")) setFilter({ type: "category", id: q.get("category") as string })
        else if (q.get("industry")) setFilter({ type: "industry", id: q.get("industry") as string })
    }, [])

    const nameOf = (list: { id: string; name: string }[], id: string) => list.find((x) => x.id === id)?.name ?? id
    const countCat = (id: string) => projects.filter((p) => p.categories.includes(id)).length
    const countInd = (id: string) => projects.filter((p) => p.industries.includes(id)).length

    let list = projects.filter((p) =>
        filter.type === "category" ? p.categories.includes(filter.id) : filter.type === "industry" ? p.industries.includes(filter.id) : true
    )
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === "za") list = [...list].sort((a, b) => b.title.localeCompare(a.title))

    const label = filter.type === "category" ? nameOf(categories, filter.id) : filter.type === "industry" ? nameOf(industries, filter.id) : ""
    const src = (t: string) => (/^https?:|^\//.test(t) ? t : imageBase.replace(/\/?$/, "/") + t)

    const FilterBtn = (p: { label: string; n: number; active: boolean; onClick: () => void }) => (
        <button
            type="button"
            onClick={p.onClick}
            aria-pressed={p.active}
            className="zk-fbtn"
            style={{
                display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 12px", borderRadius: 10,
                border: 0, background: p.active ? accent : "transparent", // the selected item is purple only (no white tip)
                color: p.active ? "#fff" : p.n === 0 ? "#8C8C8C" : c.soft, font: `600 15px ${fontFamily}`, textAlign: "left", cursor: "pointer",
            }}
        >
            <span>{p.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.75 }}>{p.n}</span>
        </button>
    )
    const Heading = (p: { children: React.ReactNode }) => (
        <h2 style={{ margin: "24px 0 8px", padding: "0 12px", font: `800 12px ${fontFamily}`, letterSpacing: "0.24em", textTransform: "uppercase", color: c.accentText }}>{p.children}</h2>
    )
    const Chip = (p: { label: string; onClick: () => void; solid: boolean }) => (
        <button
            type="button"
            onClick={p.onClick}
            style={{
                // every tag is the same: Carbon Black at 65% with white text (not purple), a hairline border, so it reads on any thumbnail
                padding: "4px 11px", borderRadius: 999, border: "1px solid rgba(255,255,255,.16)",
                background: "rgba(27, 27, 27, .65)", color: "#fff", font: `700 11px ${fontFamily}`,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
            }}
        >
            {p.label}
        </button>
    )

    return (
        <div style={{ width: "100%", color: c.text, fontFamily, ...style }}>
            <style>{`
                .zk-grid { display:grid; grid-template-columns: 250px minmax(0,1fr); gap: 48px; align-items:start; }
                .zk-cards { display:grid; grid-template-columns: repeat(auto-fill, minmax(min(100%,285px),1fr)); gap: 32px; }
                .zk-fbtn:hover { background: ${c.hover}; }
                .zk-card:hover .zk-img { border-color: ${accent}; }
                .zk-card:hover .zk-img img { transform: scale(1.05); }
                .zk-title a { color: inherit; text-decoration: none; }
                .zk-title a:hover { text-decoration: underline; text-decoration-color: ${accent}; text-decoration-thickness: 3px; text-underline-offset: 4px; }
                @media (max-width: 960px) { .zk-grid { grid-template-columns: 1fr; } .zk-side { position: static !important; } }
            `}</style>
            <div className="zk-grid">
                <aside className="zk-side" aria-label="Filter projects" style={{ position: "sticky", top: 20, background: c.side, border: `1px solid ${c.line}`, borderRadius: 14, padding: "22px 20px" }}>
                    <Heading>Projects</Heading>
                    <FilterBtn label="All projects" n={projects.length} active={filter.type === "all"} onClick={() => setFilter({ type: "all", id: "" })} />
                    <Heading>Categories</Heading>
                    {categories.map((c) => (
                        <FilterBtn key={c.id} label={c.name} n={countCat(c.id)} active={filter.type === "category" && filter.id === c.id} onClick={() => setFilter({ type: "category", id: c.id })} />
                    ))}
                    <Heading>Industries</Heading>
                    {industries.map((c) => (
                        <FilterBtn key={c.id} label={c.name} n={countInd(c.id)} active={filter.type === "industry" && filter.id === c.id} onClick={() => setFilter({ type: "industry", id: c.id })} />
                    ))}
                </aside>

                <div>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 26, paddingBottom: 16, borderBottom: `1px solid ${c.line}` }}>
                        <p aria-live="polite" style={{ margin: 0, font: `600 15px ${fontFamily}`, color: c.soft }}>
                            <b style={{ color: c.accentText, fontWeight: 800 }}>{list.length}</b> {list.length === 1 ? "project" : "projects"}
                            {label && <> in <b style={{ color: c.accentText, fontWeight: 800 }}>{label}</b></>}
                        </p>
                        <label style={{ display: "inline-flex", alignItems: "center", gap: 10, font: `700 12px ${fontFamily}`, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>
                            Sort by
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as Sort)}
                                style={{ background: c.panel, border: `1px solid ${c.line}`, borderRadius: 999, padding: "10px 18px", font: `600 14px ${fontFamily}`, letterSpacing: 0, textTransform: "none", color: c.text, cursor: "pointer" }}
                            >
                                <option value="default">Featured</option>
                                <option value="az">Name: A → Z</option>
                                <option value="za">Name: Z → A</option>
                            </select>
                        </label>
                    </div>

                    {list.length === 0 ? (
                        <div style={{ padding: "60px 20px", textAlign: "center", border: `1px dashed ${c.line}`, borderRadius: 14, color: c.muted }}>
                            <h3 style={{ margin: 0, fontFamily: displayFamily, fontWeight: 800, fontSize: 28, color: c.text }}>Coming soon</h3>
                            <p>No projects here yet.</p>
                        </div>
                    ) : (
                        <div className="zk-cards">
                            {list.map((p) => (
                                <article key={p.slug} className="zk-card" style={{ position: "relative" }}>
                                    <a
                                        className="zk-img"
                                        href={`${basePath.replace(/\/$/, "")}/${p.slug}`}
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        style={{ display: "block", aspectRatio: "4 / 3", overflow: "hidden", borderRadius: 14, background: c.panel, border: `1px solid ${c.line}`, transition: "border-color .25s" }}
                                    >
                                        <img src={src(p.thumb)} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s" }} />
                                    </a>
                                    <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 6 }}>
                                        {p.categories.map((c) => (
                                            <Chip key={c} solid label={nameOf(categories, c)} onClick={() => setFilter({ type: "category", id: c })} />
                                        ))}
                                        {p.industries.map((c) => (
                                            <Chip key={c} solid={false} label={nameOf(industries, c)} onClick={() => setFilter({ type: "industry", id: c })} />
                                        ))}
                                    </div>
                                    <div style={{ padding: "14px 4px 0" }}>
                                        <h3 className="zk-title" style={{ margin: 0, font: `800 22px/1.2 ${fontFamily}` }}>
                                            <a href={`${basePath.replace(/\/$/, "")}/${p.slug}`}>{p.title}</a>
                                        </h3>
                                        <p style={{ margin: "4px 0 0", font: `500 14px/1.4 ${fontFamily}`, color: c.muted }}>{p.client}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

ProjectsExplorer.defaultProps = {
    basePath: "/projects",
    imageBase: "",
    accent: "#8F00FF",
    accentLight: "#CBA6FF",
    panel: "#262626",
    line: "#3B3B3B",
    text: "#FFFFFF",
    muted: "#B5B5B5",
    fontFamily: "Raleway, sans-serif",
    displayFamily: "Raleway, sans-serif",
}

addPropertyControls(ProjectsExplorer, {
    basePath: { type: ControlType.String, title: "Project path" },
    imageBase: { type: ControlType.String, title: "Image base URL", description: "Where the thumbs/ folder is hosted" },
    accent: { type: ControlType.Color, title: "Accent" },
    accentLight: { type: ControlType.Color, title: "Accent light" },
    panel: { type: ControlType.Color, title: "Panel" },
    line: { type: ControlType.Color, title: "Lines" },
    text: { type: ControlType.Color, title: "Text" },
    muted: { type: ControlType.Color, title: "Muted text" },
    fontFamily: { type: ControlType.String, title: "Body font" },
    displayFamily: { type: ControlType.String, title: "Display font" },
})
