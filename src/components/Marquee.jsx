import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap.js";

/**
 * Endless text band. Scrolling the page speeds it up (GSAP ScrollTrigger velocity).
 * Static for reduced-motion visitors.
 */
export default function Marquee({ items, reverse = false, outline = false, className = "" }) {
  const track = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = track.current;
    const tween = gsap.fromTo(el, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, ease: "none", duration: 38, repeat: -1 });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 9);
        gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.2 }) });
      },
    });
    return () => {
      st.kill();
      tween.kill();
    };
  }, [reduce, reverse]);

  const group = (k) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k > 0 ? "true" : undefined}>
      {items.map((t, i) => (
        <span key={`${k}-${i}`} className="flex items-center">
          <span className={`display px-5 text-[clamp(2.6rem,8vw,6.5rem)] sm:px-8 ${outline ? "outline" : "text-fg"}`}>{t}</span>
          <span className="text-[clamp(1.4rem,3vw,2.4rem)] text-lime" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
