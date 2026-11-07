import * as React from "react"
import { createPortal } from "react-dom"
import { addPropertyControls, ControlType } from "framer"

/**
 * Photo gallery for projects with many images (e.g. the tango photos): masonry columns + click-to-enlarge viewer
 * (arrow keys and Esc work). Works without a CMS gallery field: add the photos under "Photos".
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
type Props = {
    photos: string[]
    alt: string
    columns: number
    gap: number
    radius: number
    enlarge: boolean
    style?: React.CSSProperties
}

export default function PhotoGallery(props: Props) {
    const { photos, alt, columns, gap, radius, enlarge, style } = props
    const list = (photos || []).filter(Boolean)
    const [open, setOpen] = React.useState<number>(-1)
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])
    React.useEffect(() => {
        if (open < 0) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(-1)
            if (e.key === "ArrowRight") setOpen((i) => (i + 1) % list.length)
            if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + list.length) % list.length)
        }
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)
        return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev }
    }, [open, list.length])

    if (!list.length) {
        return <div style={{ padding: 24, textAlign: "center", color: "#888", border: "1px dashed #555", borderRadius: radius, ...style }}>Add photos in the properties panel</div>
    }
    const btn: React.CSSProperties = { position: "fixed", width: 44, height: 44, borderRadius: 22, border: "1px solid #666", background: "#222", color: "#fff", fontSize: 22, cursor: "pointer", lineHeight: 1 }
    return (
        <div style={{ width: "100%", columnCount: columns, columnGap: gap, ...style }}>
            {list.map((src, i) => (
                <figure key={i} style={{ margin: `0 0 ${gap}px`, breakInside: "avoid", borderRadius: radius, overflow: "hidden", background: "#1f1f1f" }}>
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        onClick={enlarge ? () => setOpen(i) : undefined}
                        style={{ display: "block", width: "100%", height: "auto", cursor: enlarge ? "zoom-in" : "default" }}
                    />
                </figure>
            ))}
            {mounted && open >= 0 &&
                createPortal(
                    <div role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(-1)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(10,10,10,.94)", display: "grid", placeItems: "center", padding: 24 }}>
                        <img src={list[open]} alt={alt} style={{ maxWidth: "min(100%,1500px)", maxHeight: "100%", borderRadius: 8 }} onClick={(e) => e.stopPropagation()} />
                        <button type="button" aria-label="Close" onClick={() => setOpen(-1)} style={{ ...btn, top: 14, right: 14 }}>×</button>
                        {list.length > 1 && <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length) }} style={{ ...btn, left: 14, top: "50%" }}>‹</button>}
                        {list.length > 1 && <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length) }} style={{ ...btn, right: 14, top: "50%" }}>›</button>}
                    </div>,
                    document.body
                )}
        </div>
    )
}

PhotoGallery.defaultProps = { photos: [], alt: "Photo", columns: 3, gap: 16, radius: 12, enlarge: true }

addPropertyControls(PhotoGallery, {
    photos: { type: ControlType.Array, title: "Photos", control: { type: ControlType.Image } },
    alt: { type: ControlType.String, title: "Alt text" },
    columns: { type: ControlType.Number, title: "Columns", min: 1, max: 6, step: 1 },
    gap: { type: ControlType.Number, title: "Gap", min: 0, max: 48, step: 2 },
    radius: { type: ControlType.Number, title: "Radius", min: 0, max: 40, step: 1 },
    enlarge: { type: ControlType.Boolean, title: "Click to enlarge" },
})
