import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Auto-scrolling client ticker (text placeholders). When real logos arrive, use Framer's built-in Ticker
 * with the logos instead, or keep this for wordmarks.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
type Props = {
    names: string[]
    speed: number
    gap: number
    fontSize: number
    textColor: string
    starColor: string
    label: string
    labelColor: string
    fontFamily: string
    style?: React.CSSProperties
}

const STAR = "M12 2l2.9 6.9 7.5.5-5.8 4.8 1.9 7.3L12 17.5l-6.5 4 1.9-7.3L1.6 9.4l7.5-.5z"

export default function ClientTicker(props: Props) {
    const { names, speed, gap, fontSize, textColor, starColor, label, labelColor, fontFamily, style } = props
    // seconds for one full loop: more names or a slower speed = longer
    const duration = Math.max(10, (names.length * 220) / Math.max(speed, 1))
    const group = (hidden: boolean) => (
        <ul
            aria-hidden={hidden || undefined}
            style={{ display: "flex", alignItems: "center", flex: "none", margin: 0, padding: 0, listStyle: "none" }}
        >
            {names.map((n, i) => (
                <li
                    key={i}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap,
                        paddingRight: gap,
                        whiteSpace: "nowrap",
                        fontFamily,
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontSize,
                        color: textColor,
                    }}
                >
                    <span>{n}</span>
                    <svg width={fontSize * 0.75} height={fontSize * 0.75} viewBox="0 0 24 24" aria-hidden="true">
                        <path d={STAR} fill={starColor} />
                    </svg>
                </li>
            ))}
        </ul>
    )
    return (
        <section
            aria-label="Clients"
            style={{ width: "100%", padding: "26px 0 22px", background: "rgba(12, 12, 12,.92)", borderTop: "1px solid #333333", borderBottom: "1px solid #333333", overflow: "hidden", ...style }}
        >
            <style>{`
                @keyframes zk-ticker { to { transform: translateX(-50%); } }
                .zk-ticker-track { display:flex; width:max-content; animation: zk-ticker ${duration}s linear infinite; }
                .zk-ticker:hover .zk-ticker-track { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .zk-ticker-track { animation: none; } }
            `}</style>
            {label && (
                <p style={{ margin: "0 0 16px", textAlign: "center", fontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: labelColor }}>
                    {label}
                </p>
            )}
            <div
                className="zk-ticker"
                style={{
                    overflow: "hidden",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                    maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                }}
            >
                <div className="zk-ticker-track">
                    {group(false)}
                    {group(true)}
                </div>
            </div>
        </section>
    )
}

ClientTicker.defaultProps = {
    names: ["CarSwitch", "Evercare Hospital", "Byte", "Pizza Now", "Breakfast Box", "Generation", "Multiverse", "Milkyway", "Startup Grind", "COLABS", "Treble", "UT"],
    speed: 60,
    gap: 48,
    fontSize: 24,
    textColor: "rgba(229,229,229,.78)",
    starColor: "#5b2a99",
    label: "Brands I've worked with",
    labelColor: "#B5B5B5",
    fontFamily: "Raleway, sans-serif",
}

addPropertyControls(ClientTicker, {
    names: { type: ControlType.Array, title: "Clients", control: { type: ControlType.String } },
    label: { type: ControlType.String, title: "Label" },
    speed: { type: ControlType.Number, title: "Speed", min: 10, max: 200, step: 5 },
    gap: { type: ControlType.Number, title: "Gap", min: 12, max: 120, step: 2 },
    fontSize: { type: ControlType.Number, title: "Font size", min: 12, max: 48, step: 1 },
    fontFamily: { type: ControlType.String, title: "Font family" },
    textColor: { type: ControlType.Color, title: "Text" },
    starColor: { type: ControlType.Color, title: "Star" },
    labelColor: { type: ControlType.Color, title: "Label color" },
})
