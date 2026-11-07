import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Auto-scrolling client strip (names as text; swap for real logos with Framer's built-in Ticker when they arrive).
 * Separator: a violet diamond (original site) or the four card suits in turn (new site). Pauses on hover; still when the visitor prefers reduced motion.
 * Follows the light / dark switch (CSS variables from ThemeSwitch) when "Follow theme" is on.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
type Props = {
    names: string[]
    separator: "diamond" | "suits"
    speed: number
    gap: number
    fontSize: number
    textColor: string
    markColor: string
    background: string
    borderColor: string
    label: string
    labelColor: string
    fontFamily: string
    followTheme: boolean
    style?: React.CSSProperties
}

const SUIT = {
    spade: "M12 1.8C9.6 5.6 4 9.1 4 13.6a4.1 4.1 0 0 0 7.2 2.7c-.1 2.4-.9 4.4-2.7 5.5h7c-1.8-1.1-2.6-3.1-2.7-5.5A4.1 4.1 0 0 0 20 13.6C20 9.1 14.4 5.6 12 1.8z",
    heart: "M12 21.8C5 15.6 2.2 12.4 2.2 8.6 2.2 5.6 4.4 3.4 7.2 3.4c1.9 0 3.6 1 4.8 2.9 1.2-1.9 2.9-2.9 4.8-2.9 2.8 0 5 2.2 5 5.2 0 3.8-2.8 7-9.8 13.2z",
    club: "M12 2a4.2 4.2 0 0 0-3 7.1 4.5 4.5 0 1 0 2.3 8.2c-.1 2.2-.9 3.9-2.5 4.7h6.4c-1.6-.8-2.4-2.5-2.5-4.7a4.5 4.5 0 1 0 2.3-8.2A4.2 4.2 0 0 0 12 2z",
    diamond: "M12 1.8l7 10.2-7 10.2L5 12z",
}
const ORDER: (keyof typeof SUIT)[] = ["spade", "heart", "club", "diamond"]

export default function ClientTicker(props: Props) {
    const { names, separator, speed, gap, fontSize, textColor, markColor, background, borderColor, label, labelColor, fontFamily, followTheme, style } = props
    const v = (name: string, fallback: string) => (followTheme ? `var(${name}, ${fallback})` : fallback)
    // seconds for one full loop: more names or a slower speed = longer
    const duration = Math.max(10, (names.length * 220) / Math.max(speed, 1))
    const mark = (i: number) => {
        const size = fontSize * 0.75
        return separator === "suits" ? (
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
                <path d={SUIT[ORDER[i % 4]]} fill={v("--zk-accent", markColor)} />
            </svg>
        ) : (
            <span aria-hidden="true" style={{ flex: "none", width: fontSize * 0.42, height: fontSize * 0.42, background: markColor, transform: "rotate(45deg)" }} />
        )
    }
    const group = (hidden: boolean) => (
        <ul aria-hidden={hidden || undefined} style={{ display: "flex", alignItems: "center", flex: "none", margin: 0, padding: 0, listStyle: "none" }}>
            {names.map((n, i) => (
                <li
                    key={i}
                    style={{
                        display: "flex", alignItems: "center", gap, paddingRight: gap, whiteSpace: "nowrap", fontFamily, fontWeight: 800,
                        letterSpacing: "0.12em", textTransform: "uppercase", fontSize, color: v("--zk-ticker", textColor),
                    }}
                >
                    <span>{n}</span>
                    {mark(i)}
                </li>
            ))}
        </ul>
    )
    return (
        <section
            aria-label="Clients"
            style={{ width: "100%", padding: "26px 0 22px", background: v("--zk-surface-strong", background), borderTop: `1px solid ${v("--zk-line", borderColor)}`, borderBottom: `1px solid ${v("--zk-line", borderColor)}`, overflow: "hidden", ...style }}
        >
            <style>{`
                @keyframes zk-ticker { to { transform: translateX(-50%); } }
                .zk-ticker-track { display:flex; width:max-content; animation: zk-ticker ${duration}s linear infinite; }
                .zk-ticker:hover .zk-ticker-track { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .zk-ticker-track { animation: none; } }
            `}</style>
            {label && (
                <p style={{ margin: "0 0 16px", textAlign: "center", fontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: v("--zk-muted", labelColor) }}>
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
    // the client's list of 11, alphabetical
    names: ["Breakfast Box", "Byte Technology Systems", "CarSwitch", "Colabs", "Evercare Hospital", "Generation (Pvt) Ltd", "Multiverse", "Pizza Now", "Start-up Grind", "Treble App", "Uncle Tetsu"],
    separator: "diamond",
    speed: 60,
    gap: 48,
    fontSize: 24,
    textColor: "rgba(229,229,229,.78)",
    markColor: "#8F00FF",
    background: "rgba(27,27,27,.92)",
    borderColor: "#3B3B3B",
    label: "Brands I've worked with",
    labelColor: "#B5B5B5",
    fontFamily: "Raleway, sans-serif",
    followTheme: true,
}

addPropertyControls(ClientTicker, {
    names: { type: ControlType.Array, title: "Clients", control: { type: ControlType.String } },
    separator: { type: ControlType.Enum, title: "Separator", options: ["diamond", "suits"], optionTitles: ["Diamond (original site)", "Card suits (new site)"] },
    label: { type: ControlType.String, title: "Label" },
    speed: { type: ControlType.Number, title: "Speed", min: 10, max: 200, step: 5 },
    gap: { type: ControlType.Number, title: "Gap", min: 12, max: 120, step: 2 },
    fontSize: { type: ControlType.Number, title: "Font size", min: 12, max: 48, step: 1 },
    fontFamily: { type: ControlType.String, title: "Font family" },
    textColor: { type: ControlType.Color, title: "Text" },
    markColor: { type: ControlType.Color, title: "Separator" },
    background: { type: ControlType.Color, title: "Background" },
    borderColor: { type: ControlType.Color, title: "Border" },
    labelColor: { type: ControlType.Color, title: "Label color" },
    followTheme: { type: ControlType.Boolean, title: "Follow theme" },
})
