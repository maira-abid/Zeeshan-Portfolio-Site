import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * Floating background elements: neutral grey, small and faint, in three sizes (big / medium / small), a random mix on every load.
 * They sit still on screen, drift in slow spirals, move away from the mouse, and FREEZE while the page is scrolling.
 *
 * HOW TO USE IN FRAMER
 *  1. Drop the component on the page, set its Position to "Fixed", size 100% x 100vh, and send it to the very back
 *     (below all other layers). Do not scale/rotate its parents: the layer must stay pinned to the screen.
 *  2. Optional: add the cut-out artwork (framer/assets/ambient/*.webp) under "Artwork" to mix it with the drawn shapes.
 *  3. Use "Count" to make a page quieter (About: about 5) or busier (Home: about 15).
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
const SHAPES: Record<string, string> = {
    spade: "M12 1.8C9.6 5.6 4 9.1 4 13.6a4.1 4.1 0 0 0 7.2 2.7c-.1 2.4-.9 4.4-2.7 5.5h7c-1.8-1.1-2.6-3.1-2.7-5.5A4.1 4.1 0 0 0 20 13.6C20 9.1 14.4 5.6 12 1.8z",
    heart: "M12 21.8C5 15.6 2.2 12.4 2.2 8.6 2.2 5.6 4.4 3.4 7.2 3.4c1.9 0 3.6 1 4.8 2.9 1.2-1.9 2.9-2.9 4.8-2.9 2.8 0 5 2.2 5 5.2 0 3.8-2.8 7-9.8 13.2z",
    club: "M12 2a4.2 4.2 0 0 0-3 7.1 4.5 4.5 0 1 0 2.3 8.2c-.1 2.2-.9 3.9-2.5 4.7h6.4c-1.6-.8-2.4-2.5-2.5-4.7a4.5 4.5 0 1 0 2.3-8.2A4.2 4.2 0 0 0 12 2z",
    diamond: "M12 1.8l7 10.2-7 10.2L5 12z",
    bolt: "M10 1.8h8l-4 7h4.5L6 22.2l3-9H5z",
    star: "M12 2l2.9 6.9 7.5.5-5.8 4.8 1.9 7.3L12 17.5l-6.5 4 1.9-7.3L1.6 9.4l7.5-.5z",
    sparkle: "M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5-.9-5.6-4.9-9.6-10.5-10.5C7.1 11.1 11.1 7.1 12 1.5z",
    cursor: "M5 2.5l14.5 8.2-6.3 1.8 3.7 6.6-2.8 1.6-3.7-6.6-4.5 4.7z",
    play: "M7 3.5l13 8.5-13 8.5z",
    triangle: "M12 3l10 17.5H2z",
    bubble: "M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5H11l-5.5 4.5V17h-2A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4z",
    flame: "M12 1.8c.6 3.8 5.4 6.2 5.4 11.2a5.4 5.4 0 0 1-10.8 0c0-2.6 1.4-4.2 2.7-5.8.4 1.9 1.3 3 2.2 3.2C11 7.6 10.4 4.6 12 1.8z",
    ring: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    plus: "M12 3.5v17M3.5 12h17",
    zigzag: "M1.5 15.5l5-8 5 8 5-8 5 8",
    zigzagband: "M1.5 7l4-4 4 4 4-4 4 4 4-4M1.5 13l4-4 4 4 4-4 4 4 4-4M1.5 19l4-4 4 4 4-4 4 4 4-4",
    bezier: "M3.5 19.5C6 4 17 20 20.5 4.5",
    spiral: (() => {
        let d = ""
        for (let a = 0; a <= 4.5 * Math.PI; a += 0.12) {
            const r = 1.2 + (9.3 * a) / (4.5 * Math.PI)
            d += (d ? "L" : "M") + (12 + r * Math.cos(a)).toFixed(2) + " " + (12 + r * Math.sin(a)).toFixed(2)
        }
        return d
    })(),
    checkerstrip: "M2 6h20v10H2zM2 11h20M7 6v10M12 6v10M17 6v10",
}
const SPIN = new Set(["spiral"])
const SIZE: Record<string, [number, number]> = { big: [110, 180], medium: [56, 96], small: [26, 48] }
const OPAC: Record<string, number> = { big: 0.14, medium: 0.18, small: 0.24 }

type Props = {
    count: number
    sizeScale: number
    opacity: number
    color: string
    artwork: string[]
    artworkShare: number
    style?: React.CSSProperties
}
type Item = { kind: "shape" | "img"; name: string; src: string; tier: string; size: number; x: number; y: number; depth: number; phase: number; speed: number; orbit: number; spin: boolean; w: number; h: number }

function build(count: number, scale: number, artwork: string[], share: number): Item[] {
    const names = Object.keys(SHAPES)
    const spread = (n: number) => {
        const a = Array.from({ length: n }, (_, i) => (i + Math.random()) / n)
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
        return a
    }
    const xs = spread(count), ys = spread(count)
    const tiers = [["big", 0.18], ["medium", 0.34], ["small", 0.48]] as const
    return Array.from({ length: count }, (_, i) => {
        let r = Math.random(), tier = "small"
        for (const [t, p] of tiers) { if (r < p) { tier = t; break } r -= p }
        const [lo, hi] = SIZE[tier]
        const size = (lo + Math.random() * (hi - lo)) * scale
        const useImg = artwork.length > 0 && Math.random() < share
        return {
            kind: (useImg ? "img" : "shape") as Item["kind"], name: names[Math.floor(Math.random() * names.length)], src: artwork[Math.floor(Math.random() * Math.max(artwork.length, 1))] || "",
            tier, size, x: xs[i], y: ys[i], depth: 0.4 + Math.random() * 0.6, phase: Math.random() * 6.283,
            speed: (0.16 + Math.random() * 0.3) * (Math.random() < 0.5 ? -1 : 1), orbit: (tier === "big" ? 12 : 16) + Math.random() * (tier === "big" ? 18 : 28),
            spin: false, w: size, h: size,
        }
    }).map((it) => ({ ...it, spin: it.kind === "shape" && SPIN.has(it.name) }))
}

export default function AmbientElements(props: Props) {
    const { count, sizeScale, opacity, color, artwork, artworkShare, style } = props
    const box = React.useRef<HTMLDivElement>(null)
    const els = React.useRef<(HTMLDivElement | null)[]>([])
    const [items, setItems] = React.useState<Item[]>([])
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    // build the random mix on the client only (so the server/preview render and the page agree)
    React.useEffect(() => { setItems(build(count, sizeScale, artwork || [], artworkShare)) }, [count, sizeScale, artwork, artworkShare])

    React.useEffect(() => {
        const host = box.current
        if (!host || !items.length || isCanvas) return
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let W = host.clientWidth, H = host.clientHeight, mx = -9999, my = -9999, paused = false, calm: any = 0, vt = 0, last = 0, raf = 0
        const draw = (t: number) => {
            items.forEach((it, i) => {
                const el = els.current[i]
                if (!el) return
                let x = it.x * Math.max(W - it.size, 0), y = it.y * Math.max(H - it.size, 0), rot = 0
                const o = (el as any).__o || ((el as any).__o = { x: 0, y: 0 })
                if (!reduce) {
                    const ang = t * it.speed + it.phase, rad = it.orbit * (0.55 + 0.45 * Math.sin(t * 0.22 + it.phase))
                    x += Math.cos(ang) * rad; y += Math.sin(ang) * rad
                    if (it.spin) rot = (t * it.speed * 40) % 360
                    const rect = host.getBoundingClientRect()
                    const dx = x + it.size / 2 - (mx - rect.left), dy = y + it.size / 2 - (my - rect.top), d = Math.hypot(dx, dy), R = 120 + it.size * 0.6
                    let tx = 0, ty = 0
                    if (d < R && d > 0) { const f = (1 - d / R) * 90 * it.depth; tx = (dx / d) * f; ty = (dy / d) * f }
                    o.x += (tx - o.x) * 0.12; o.y += (ty - o.y) * 0.12
                }
                el.style.transform = `translate3d(${(x + o.x).toFixed(1)}px,${(y + o.y).toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`
            })
        }
        const loop = (ts: number) => {
            const dt = last ? Math.min((ts - last) / 1000, 0.1) : 0
            last = ts
            if (!paused) { vt += dt; draw(vt) } // frozen while the page scrolls
            raf = requestAnimationFrame(loop)
        }
        const onScroll = () => { paused = true; clearTimeout(calm); calm = setTimeout(() => { paused = false }, 220) }
        const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") { mx = e.clientX; my = e.clientY } }
        const onResize = () => { W = host.clientWidth; H = host.clientHeight; draw(vt) }
        const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); last = 0 } else if (!reduce) raf = requestAnimationFrame(loop) }
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("pointermove", onMove, { passive: true })
        window.addEventListener("resize", onResize)
        document.addEventListener("visibilitychange", onVis)
        draw(0)
        if (!reduce) raf = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(raf); clearTimeout(calm)
            window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onMove)
            window.removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", onVis)
        }
    }, [items, isCanvas])

    return (
        <div ref={box} aria-hidden="true" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", color, ...style }}>
            {items.map((it, i) => {
                const op = (it.kind === "img" ? OPAC[it.tier] : OPAC[it.tier]) * opacity
                return (
                    <div key={i} ref={(el) => { els.current[i] = el }} style={{ position: "absolute", left: 0, top: 0, willChange: "transform" }}>
                        {it.kind === "img" && it.src ? (
                            <img src={it.src} alt="" style={{ display: "block", width: it.size, height: "auto", maxHeight: it.size, objectFit: "contain", opacity: op * 0.9, filter: "grayscale(1)" }} />
                        ) : (
                            <svg width={it.size} height={it.size} viewBox="0 0 24 24" style={{ display: "block", opacity: op }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                                <path d={SHAPES[it.name]} />
                            </svg>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

AmbientElements.defaultProps = { count: 10, sizeScale: 1, opacity: 1, color: "#E5E5E5", artwork: [], artworkShare: 0.4 }

addPropertyControls(AmbientElements, {
    count: { type: ControlType.Number, title: "Count", min: 0, max: 30, step: 1 },
    sizeScale: { type: ControlType.Number, title: "Size", min: 0.4, max: 1.5, step: 0.05 },
    opacity: { type: ControlType.Number, title: "Opacity", min: 0, max: 2, step: 0.05 },
    color: { type: ControlType.Color, title: "Color" },
    artwork: { type: ControlType.Array, title: "Artwork", control: { type: ControlType.Image } },
    artworkShare: { type: ControlType.Number, title: "Artwork mix", min: 0, max: 1, step: 0.05, hidden: (p: Props) => !p.artwork || p.artwork.length === 0 },
})
