import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * A result number that counts up when it scrolls into view (e.g. "35k", "+60–70%", "150–200", "#1", "−40%"). Every number inside the text
 * counts from 0 to its value; symbols, units and the dash stay. Shows the final value straight away for visitors who prefer reduced motion,
 * and for crawlers (the real text is the first thing rendered).
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
type Props = {
    value: string
    duration: number
    fontSize: number
    weight: number
    color: string
    fontFamily: string
    style?: React.CSSProperties
}

const NUM = /\d+(?:\.\d+)?/g

export default function CountUp(props: Props) {
    const { value, duration, fontSize, weight, color, fontFamily, style } = props
    const ref = React.useRef<HTMLSpanElement>(null)
    const [shown, setShown] = React.useState(value)
    React.useEffect(() => {
        setShown(value)
        if (typeof window === "undefined" || !ref.current) return
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const nums = value.match(NUM)
        if (!nums) return
        let raf = 0
        const run = () => {
            const t0 = performance.now()
            const tick = (now: number) => {
                const p = Math.min(1, (now - t0) / Math.max(200, duration))
                const e = 1 - Math.pow(1 - p, 3)
                let i = 0
                setShown(value.replace(NUM, (m) => {
                    const target = parseFloat(nums[i++])
                    const dec = (m.split(".")[1] || "").length
                    return (target * e).toFixed(dec)
                }))
                if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }
        const io = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { io.disconnect(); run() } }, { threshold: 0.4 })
        io.observe(ref.current)
        return () => { io.disconnect(); cancelAnimationFrame(raf) }
    }, [value, duration])
    return (
        <span ref={ref} aria-label={value} style={{ font: `${weight} ${fontSize}px/1 ${fontFamily}`, color, letterSpacing: "-0.02em", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", ...style }}>
            <span aria-hidden="true">{shown}</span>
        </span>
    )
}

CountUp.defaultProps = { value: "35k", duration: 1200, fontSize: 96, weight: 900, color: "#FFFFFF", fontFamily: "Raleway, sans-serif" }

addPropertyControls(CountUp, {
    value: { type: ControlType.String, title: "Value" },
    duration: { type: ControlType.Number, title: "Duration (ms)", min: 300, max: 4000, step: 100 },
    fontSize: { type: ControlType.Number, title: "Size", min: 16, max: 200, step: 1 },
    weight: { type: ControlType.Number, title: "Weight", min: 400, max: 900, step: 100 },
    color: { type: ControlType.Color, title: "Colour" },
    fontFamily: { type: ControlType.String, title: "Font family" },
})
