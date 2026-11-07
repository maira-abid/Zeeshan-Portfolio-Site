import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Checkerboard that fades away + subdued suit/bolt/star icon pattern.
 * Drop it on a page, set it to fill the page (position: absolute / top 0, width 100%, height e.g. 2400px)
 * and send it to the back.
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

function iconTile(color: string) {
    const defs = Object.entries(PATHS)
        .map(([id, d]) => `<path id="${id}" d="${d}"/>`)
        .join("")
    const outline = [
        ["spade", "translate(18 14) rotate(-14) scale(2.4)"],
        ["heart", "translate(170 6) rotate(10) scale(2)"],
        ["bolt", "translate(282 30) rotate(18) scale(2.6)"],
        ["diamond", "translate(84 112) rotate(-8) scale(2.3)"],
        ["star", "translate(226 120) rotate(14) scale(2.2)"],
        ["club", "translate(14 214) rotate(8) scale(2.2)"],
        ["heart", "translate(150 224) rotate(-18) scale(2.5)"],
        ["spade", "translate(292 218) rotate(12) scale(2)"],
        ["bolt", "translate(76 304) rotate(-10) scale(2)"],
        ["diamond", "translate(206 312) rotate(6) scale(1.9)"],
    ]
        .map(([id, t]) => `<use href="#${id}" transform="${t}"/>`)
        .join("")
    const filled = [
        ["star", "translate(110 40) rotate(-6) scale(1.5)"],
        ["club", "translate(330 128) rotate(10) scale(1.5)"],
        ["spade", "translate(48 170) rotate(16) scale(1.4)"],
        ["heart", "translate(272 300) rotate(-12) scale(1.4)"],
        ["bolt", "translate(338 330) rotate(8) scale(1.3)"],
    ]
        .map(([id, t]) => `<use href="#${id}" transform="${t}"/>`)
        .join("")
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360"><defs>${defs}</defs>` +
        `<g fill="none" stroke="${color}" stroke-width="1.1" stroke-linejoin="round" opacity=".2">${outline}</g>` +
        `<g fill="${color}" opacity=".07">${filled}</g></svg>`
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
}

type Props = {
    background: string
    checkerColor: string
    checkerDark: string
    checkerSize: number
    checkerOpacity: number
    fadeHeight: number
    showIcons: boolean
    iconColor: string
    style?: React.CSSProperties
}

export default function BackgroundPattern(props: Props) {
    const { background, checkerColor, checkerDark, checkerSize, checkerOpacity, fadeHeight, showIcons, iconColor, style } = props
    const mask = "linear-gradient(to bottom, #000 0, rgba(0,0,0,.5) 30%, transparent 100%)"
    return (
        <div
            aria-hidden="true"
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, pointerEvents: "none", ...style }}
        >
            {showIcons && (
                <div style={{ position: "absolute", inset: 0, backgroundImage: iconTile(iconColor), backgroundSize: "360px 360px" }} />
            )}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: fadeHeight,
                    opacity: checkerOpacity,
                    background: `conic-gradient(${checkerColor} 25%, ${checkerDark} 0 50%, ${checkerColor} 0 75%, ${checkerDark} 0) 0 0 / ${checkerSize}px ${checkerSize}px`,
                    WebkitMaskImage: mask,
                    maskImage: mask,
                }}
            />
        </div>
    )
}

BackgroundPattern.defaultProps = {
    background: "#1B1B1B",
    checkerColor: "#7352A0",
    checkerDark: "#0C0C0C",
    checkerSize: 104,
    checkerOpacity: 0.32,
    fadeHeight: 2400,
    showIcons: true,
    iconColor: "#A77FE0",
}

addPropertyControls(BackgroundPattern, {
    background: { type: ControlType.Color, title: "Background" },
    checkerColor: { type: ControlType.Color, title: "Checker" },
    checkerDark: { type: ControlType.Color, title: "Checker dark" },
    checkerSize: { type: ControlType.Number, title: "Tile size", min: 40, max: 240, step: 4 },
    checkerOpacity: { type: ControlType.Number, title: "Opacity", min: 0, max: 1, step: 0.02 },
    fadeHeight: { type: ControlType.Number, title: "Fade height", min: 300, max: 6000, step: 50 },
    showIcons: { type: ControlType.Boolean, title: "Icons" },
    iconColor: { type: ControlType.Color, title: "Icon color", hidden: (p: Props) => !p.showIcons },
})
