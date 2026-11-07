import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * The light / dark switch: a round half-moon button. Dark is the default; the choice is remembered on the visitor's device.
 *
 * HOW THE THEME REACHES THE PAGE: the button sets CSS variables on the <html> element (--zk-page, --zk-text, --zk-card, ...) and a
 * data-theme="light" attribute. The code components in this folder (ClientTicker, BackgroundPattern, ProjectsExplorer, ScrollFrames) use those
 * variables when "Follow theme" is on. For ordinary Framer layers, put var(--zk-page) and friends in the colour fields (see framer/README.md,
 * "Light and dark version"), or use Framer's own colour-style light / dark modes if your plan has them: both ways work with this switch.
 * To avoid a flash of the wrong theme on load, paste framer/custom-code/theme-head.html into Site Settings > Custom Code > Start of <head>.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
type Props = {
    size: number
    color: string
    startWith: "dark" | "light" | "system"
    style?: React.CSSProperties
}

// Light = the style-guide colours: That Other Grey page, White cards, Carbon Black text, Violet Ray accents.
const THEMES = {
    dark: {
        "--zk-page": "#1B1B1B", "--zk-text": "#FFFFFF", "--zk-soft": "#E9E9E9", "--zk-muted": "#B5B5B5", "--zk-card": "#262626", "--zk-hover": "#313131",
        "--zk-line": "#3B3B3B", "--zk-surface": "rgba(27,27,27,.88)", "--zk-surface-strong": "rgba(27,27,27,.92)", "--zk-accent": "#CBA6FF",
        "--zk-ticker": "rgba(229,229,229,.78)", "--zk-footer": "#1B1B1B", "--zk-checker-opacity": ".32",
    },
    light: {
        "--zk-page": "#E5E5E5", "--zk-text": "#1B1B1B", "--zk-soft": "#2B2B2B", "--zk-muted": "#4F4F4F", "--zk-card": "#FFFFFF", "--zk-hover": "#D4D4D4",
        "--zk-line": "#BDBDBD", "--zk-surface": "rgba(255,255,255,.9)", "--zk-surface-strong": "rgba(255,255,255,.92)", "--zk-accent": "#8F00FF",
        "--zk-ticker": "rgba(27,27,27,.8)", "--zk-footer": "#E5E5E5", "--zk-checker-opacity": ".22",
    },
}
const KEY = "zk-theme"

function apply(mode: "dark" | "light") {
    const root = document.documentElement
    const t = THEMES[mode] as Record<string, string>
    Object.keys(t).forEach((k) => root.style.setProperty(k, t[k]))
    if (mode === "light") root.setAttribute("data-theme", "light")
    else root.removeAttribute("data-theme")
}

export default function ThemeSwitch(props: Props) {
    const { size, color, startWith, style } = props
    const [mode, setMode] = React.useState<"dark" | "light">("dark")
    React.useEffect(() => {
        let m: "dark" | "light" = startWith === "light" ? "light" : "dark"
        try {
            const saved = localStorage.getItem(KEY)
            if (saved === "light" || saved === "dark") m = saved
            else if (startWith === "system" && window.matchMedia("(prefers-color-scheme: light)").matches) m = "light"
        } catch (e) { /* storage blocked: use the start value */ }
        setMode(m)
        apply(m)
    }, [startWith])
    const toggle = () => {
        const next = mode === "light" ? "dark" : "light"
        setMode(next)
        apply(next)
        try { localStorage.setItem(KEY, next) } catch (e) { /* ignore */ }
    }
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={mode === "light" ? "Switch to the dark version" : "Switch to the light version"}
            style={{ width: size, height: size, display: "grid", placeItems: "center", padding: 0, borderRadius: "50%", border: `1.5px solid ${color}`, background: "transparent", color, cursor: "pointer", ...style }}
        >
            <svg viewBox="0 0 24 24" width={size * 0.48} height={size * 0.48} aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" />
            </svg>
        </button>
    )
}

ThemeSwitch.defaultProps = { size: 42, color: "#FFFFFF", startWith: "dark" }

addPropertyControls(ThemeSwitch, {
    size: { type: ControlType.Number, title: "Size", min: 28, max: 64, step: 1 },
    color: { type: ControlType.Color, title: "Icon colour", description: "Use white on the home hero, Carbon Black on light pages" },
    startWith: { type: ControlType.Enum, title: "First visit", options: ["dark", "light", "system"], optionTitles: ["Dark (approved look)", "Light", "Follow the device"] },
})
