import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap.js";

/**
 * Fixed page backdrop: two drifting colour glows with scroll parallax, plus a soft
 * light that follows the mouse (disabled for reduced motion / touch devices).
 */
export default function Backdrop() {
  const root = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.to(".bd-a", { yPercent: -35, xPercent: 12, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 } });
        gsap.to(".bd-b", { yPercent: 40, xPercent: -14, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.4 } });
      }
    }, el);

    let raf = 0,
      tx = innerWidth / 2,
      ty = innerHeight / 3,
      cx = tx,
      cy = ty;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(loop);
    };
    if (fine && !reduce) {
      window.addEventListener("mousemove", move, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, [reduce]);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ "--mx": "50%", "--my": "30%" }}>
      <div className="bd-a absolute -left-[20%] -top-[15%] h-[75vmax] w-[75vmax] rounded-full" style={{ background: "radial-gradient(closest-side, var(--glow-a), transparent)" }} />
      <div className="bd-b absolute -right-[25%] top-[35%] h-[65vmax] w-[65vmax] rounded-full" style={{ background: "radial-gradient(closest-side, var(--glow-b), transparent)" }} />
      {/* mouse-following light */}
      <div className="absolute inset-0 opacity-90" style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), color-mix(in srgb, var(--neon) 16%, transparent), transparent 60%)" }} />
    </div>
  );
}
