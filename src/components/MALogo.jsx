import { useId } from "react";
import { m } from "framer-motion";

/** Animated "MA" monogram. `draw` animates the strokes; `delay` offsets the animation. */
export default function MALogo({ className = "", draw = false, duration = 1.4, delay = 0, strokeWidth = 9 }) {
  const id = useId();
  const common = {
    fill: "none",
    stroke: `url(#${id})`,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const anim = draw
    ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration, delay, ease: [0.65, 0, 0.35, 1] } }
    : {};
  return (
    <svg viewBox="0 0 136 84" className={className} role="img" aria-label="MA logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--neon)" />
          <stop offset="0.55" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--lime)" />
        </linearGradient>
      </defs>
      <m.path d="M8 76 V10 L36 50 L64 10 V76" {...common} {...anim} />
      <m.path d="M72 76 L100 10 L128 76 M82 54 H118" {...common} {...anim} transition={draw ? { ...anim.transition, delay: delay + 0.25 } : undefined} />
    </svg>
  );
}
