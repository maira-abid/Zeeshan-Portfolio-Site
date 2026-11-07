import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Tall designs (the email newsletters, magazine layouts, app screens) shown as scrollable frames: up to three in one row at the width of the
 * text column, each with a 6 px gap of panel colour around the picture and a small "Scroll to explore" line. They stack on small phones.
 * Use the TRIMMED images from framer/assets/tall/ (the white side margins of the emails are already cut off, so each email fills its frame).
 * Follows the light / dark switch when "Follow theme" is on.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
type Img = { src: string; srcSet?: string; alt?: string }
type Item = { image?: Img; imageFile: string; alt: string }
type Props = {
    items: Item[]
    imageBase: string
    maxHeight: number
    hint: string
    framePanel: string
    frameLine: string
    hintColor: string
    scrollbar: string
    followTheme: boolean
    fontFamily: string
    style?: React.CSSProperties
}

export default function ScrollFrames(props: Props) {
    const { items, imageBase, maxHeight, hint, framePanel, frameLine, hintColor, scrollbar, followTheme, fontFamily, style } = props
    const v = (name: string, fallback: string) => (followTheme ? `var(${name}, ${fallback})` : fallback)
    const base = imageBase ? imageBase.replace(/\/?$/, "/") : ""
    const pick = (it: Item) => (it.image && it.image.src ? it.image.src : it.imageFile ? (/^https?:|^\//.test(it.imageFile) ? it.imageFile : base + it.imageFile) : "")
    const cols = Math.max(1, Math.min(items.length, 3))
    return (
        <div style={{ width: "100%", fontFamily, ...style }}>
            <style>{`
                .zk-sf { display:grid; gap:14px; grid-template-columns:repeat(${cols}, minmax(0,1fr)); align-items:start; ${cols === 1 ? "max-width:480px;" : ""} }
                .zk-sf-scroll { max-height:min(78vh, ${maxHeight}px); overflow-y:auto; overscroll-behavior:contain; padding:6px; scrollbar-width:thin; scrollbar-color:${scrollbar} transparent; }
                .zk-sf-scroll img { display:block; width:100%; height:auto; -webkit-user-drag:none; user-select:none; }
                .zk-sf-scroll:focus-visible { outline:3px solid ${scrollbar}; outline-offset:3px; }
                @media (max-width: 599px) { .zk-sf { grid-template-columns:minmax(0,420px); } }
            `}</style>
            <div className="zk-sf">
                {items.map((it, i) => {
                    const src = pick(it)
                    return (
                        <figure key={i} style={{ margin: 0, border: `1px solid ${v("--zk-line", frameLine)}`, borderRadius: 12, overflow: "hidden", background: v("--zk-card", framePanel) }}>
                            <div className="zk-sf-scroll" tabIndex={0} role="region" aria-label={`${it.alt || "Design"} (scrollable)`}>
                                {src ? <img src={src} alt={it.alt} loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} /> : <div style={{ padding: 40, textAlign: "center", opacity: 0.6 }}>Add an image</div>}
                            </div>
                            {hint && (
                                <figcaption style={{ padding: 8, textAlign: "center", borderTop: `1px solid ${v("--zk-line", frameLine)}`, font: `700 11px ${fontFamily}`, letterSpacing: ".18em", textTransform: "uppercase", color: v("--zk-accent", hintColor) }}>
                                    {hint}
                                </figcaption>
                            )}
                        </figure>
                    )
                })}
            </div>
        </div>
    )
}

ScrollFrames.defaultProps = {
    items: [],
    imageBase: "",
    maxHeight: 680,
    hint: "Scroll to explore",
    framePanel: "#262626",
    frameLine: "#3B3B3B",
    hintColor: "#CBA6FF",
    scrollbar: "#8F00FF",
    followTheme: true,
    fontFamily: "Raleway, sans-serif",
}

addPropertyControls(ScrollFrames, {
    items: {
        type: ControlType.Array,
        title: "Designs",
        maxCount: 3,
        control: {
            type: ControlType.Object,
            controls: {
                image: { type: ControlType.ResponsiveImage, title: "Image" },
                imageFile: { type: ControlType.String, title: "Image file" },
                alt: { type: ControlType.String, title: "Alt text" },
            },
        },
    },
    imageBase: { type: ControlType.String, title: "Image base URL", description: "Where framer/assets/tall/ is hosted" },
    maxHeight: { type: ControlType.Number, title: "Max height", min: 300, max: 1200, step: 10 },
    hint: { type: ControlType.String, title: "Hint" },
    framePanel: { type: ControlType.Color, title: "Frame" },
    frameLine: { type: ControlType.Color, title: "Frame line" },
    hintColor: { type: ControlType.Color, title: "Hint colour" },
    scrollbar: { type: ControlType.Color, title: "Scrollbar" },
    followTheme: { type: ControlType.Boolean, title: "Follow theme" },
    fontFamily: { type: ControlType.String, title: "Font family" },
})
