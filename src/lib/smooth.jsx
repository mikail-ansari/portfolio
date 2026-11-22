import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "./gsap.js";

const Ctx = createContext({ scrollTo: () => {}, stop: () => {}, start: () => {} });
export const useSmoothScroll = () => useContext(Ctx);

/**
 * Lenis smooth scrolling wired into GSAP ScrollTrigger.
 * Disabled entirely for visitors who prefer reduced motion (native scrolling is used instead).
 */
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  const scrollTo = useCallback((target, opts = {}) => {
    const l = lenisRef.current;
    if (l) {
      l.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
    } else {
      const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "auto" });
    }
  }, []);
  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  // any in-page link (#about, #contact …) glides to its section
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      scrollTo(id === "home" ? 0 : el);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
