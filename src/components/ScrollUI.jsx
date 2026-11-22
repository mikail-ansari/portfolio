import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "../lib/smooth.jsx";

/** Top scroll-progress bar + a back-to-top button with a progress ring. */
export default function ScrollUI() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [show, setShow] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <m.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet via-neon to-lime" />
      <AnimatePresence>
        {show && (
          <m.button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            data-cursor="Top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            className="glass fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full text-fg hover:border-lime sm:bottom-7 sm:right-7"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="none" stroke="var(--line)" strokeWidth="2" />
              <m.circle cx="24" cy="24" r="22" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
            </svg>
            <ArrowUp size={18} aria-hidden="true" />
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
