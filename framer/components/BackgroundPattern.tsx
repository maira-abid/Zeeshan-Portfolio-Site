import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Checkerboard that fades away down the page, with an optional SPARSE scatter of card-suit / bolt / star outlines
 * (the site uses the suits only on Home, About and Contact; the checkerboard is on every page).
 * Place it at the top of a page, behind everything, full width (e.g. height 2400 on Home, 760 on other pages).
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
const PATHS = {
    heart: "M12 21.8C5 15.6 2.2 12.4 2.2 8.6 2.2 5.6 4.4 3.4 7.2 3.4c1.9 0 3.6 1 4.8 2.9 1.2-1.9 2.9-2.9 4.8-2.9 2.8 0 5 2.2 5 5.2 0 3.8-2.8 7-9.8 13.2z",
    club: "M12 2a4.2 4.2 0 0 0-3 7.1 4.5 4.5 0 1 0 2.3 8.2c-.1 2.2-.9 3.9-2.5 4.7h6.4c-1.6-.8-2.4-2.5-2.5-4.7a4.5 4.5 0 1 0 2.3-8.2A4.2 4.2 0 0 0 12 2z",
    diamond: "M12 1.8l7 10.2-7 10.2L5 12z",
    spade: "M12 1.8C9.6 5.6 4 9.1 4 13.6a4.1 4.1 0 0 0 7.2 2.7c-.1 2.4-.9 4.4-2.7 5.5h7c-1.8-1.1-2.6-3.1-2.7-5.5A4.1 4.1 0 0 0 20 13.6C20 9.1 14.4 5.6 12 1.8z",
    bolt: "M10 1.8h8l-4 7h4.5L6 22.2l3-9H5z",
    star: "M12 2l2.9 6.9 7.5.5-5.8 4.8 1.9 7.3L12 17.5l-6.5 4 1.9-7.3L1.6 9.4l7.5-.5z",
}

// 900 x 900 tile, 8 outlines + 3 faint filled shapes: far fewer icons than a dense wallpaper
function suitTile(color: string) {
    const defs = Object.entries(PATHS).map(([id, d]) => `<path id="${id}" d="${d}"/>`).join("")
    const outline: [string, string][] = [
        ["spade", "translate(60 70) rotate(-12) scale(3.2)"],
        ["bolt", "translate(610 40) rotate(18) scale(2.8)"],
        ["heart", "translate(330 300) rotate(-10) scale(2.4)"],
        ["star", "translate(760 360) rotate(14) scale(2.6)"],
        ["diamond", "translate(120 520) rotate(8) scale(2.2)"],
        ["club", "translate(470 610) rotate(-16) scale(3)"],
        ["spade", "translate(800 760) rotate(10) scale(2.2)"],
        ["heart", "translate(230 800) rotate(-6) scale(2.8)"],
    ]
    const filled: [string, string][] = [
        ["star", "translate(430 110) rotate(-6) scale(1.6)"],
        ["bolt", "translate(30 330) rotate(8) scale(1.5)"],
        ["club", "translate(660 560) rotate(12) scale(1.5)"],
    ]
    const use = (a: [string, string][]) => a.map(([id, t]) => `<use href="#${id}" transform="${t}"/>`).join("")
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><defs>${defs}</defs>` +
        `<g fill="none" stroke="${color}" stroke-width="1.1" stroke-linejoin="round" opacity=".18">${use(outline)}</g>` +
        `<g fill="${color}" opacity=".06">${use(filled)}</g></svg>`
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
}

type Props = {
    background: string
    checkerColor: string
    checkerDark: string
    checkerSize: number
    checkerOpacity: number
    fadeHeight: number
    fade: boolean
    showSuits: boolean
    suitColor: string
    followTheme: boolean
    style?: React.CSSProperties
}

export default function BackgroundPattern(props: Props) {
    const { background, checkerColor, checkerDark, checkerSize, checkerOpacity, fadeHeight, fade, showSuits, suitColor, followTheme, style } = props
    // With "Follow theme" the page colour and the checker's second square follow the light / dark switch (CSS variables from ThemeSwitch).
    const v = (name: string, fallback: string) => (followTheme ? `var(${name}, ${fallback})` : fallback)
    const mask = fade ? "linear-gradient(to bottom, #000 0, rgba(0,0,0,.5) 30%, transparent 100%)" : undefined
    return (
        <div aria-hidden="true" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: v("--zk-page", background), pointerEvents: "none", ...style }}>
            {showSuits && <div style={{ position: "absolute", inset: 0, backgroundImage: suitTile(suitColor), backgroundSize: "900px 900px" }} />}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: fade ? fadeHeight : "100%",
                    opacity: v("--zk-checker-opacity", String(checkerOpacity)) as unknown as number,
                    background: `conic-gradient(${checkerColor} 25%, ${v("--zk-page", checkerDark)} 0 50%, ${checkerColor} 0 75%, ${v("--zk-page", checkerDark)} 0) 0 0 / ${checkerSize}px ${checkerSize}px`,
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
            />
        </div>
    )
}

BackgroundPattern.defaultProps = {
    background: "#1B1B1B",
    checkerColor: "#8F00FF", // Violet Ray; the squares are 104 px on every page
    checkerDark: "#1B1B1B",
    checkerSize: 104,
    checkerOpacity: 0.32,
    fadeHeight: 2400,
    fade: true,
    showSuits: false,
    suitColor: "#A77FE0",
    followTheme: true,
}

addPropertyControls(BackgroundPattern, {
    background: { type: ControlType.Color, title: "Background" },
    checkerColor: { type: ControlType.Color, title: "Checker" },
    checkerDark: { type: ControlType.Color, title: "Checker dark" },
    checkerSize: { type: ControlType.Number, title: "Tile size", min: 40, max: 240, step: 4 },
    checkerOpacity: { type: ControlType.Number, title: "Opacity", min: 0, max: 1, step: 0.02 },
    fade: { type: ControlType.Boolean, title: "Fade out", description: "Off = a plain strip (the new site's footer strip: height 24)" },
    fadeHeight: { type: ControlType.Number, title: "Fade height", min: 300, max: 6000, step: 50, hidden: (p: Props) => !p.fade },
    followTheme: { type: ControlType.Boolean, title: "Follow theme" },
    showSuits: { type: ControlType.Boolean, title: "Sparse suits" },
    suitColor: { type: ControlType.Color, title: "Suit color", hidden: (p: Props) => !p.showSuits },
})
