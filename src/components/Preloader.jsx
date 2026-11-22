import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import MALogo from "./MALogo.jsx";

const ease = [0.76, 0, 0.24, 1];

/**
 * Creative preloader: the MA monogram draws itself while a counter runs to 100,
 * then three coloured curtains wipe upward to reveal the site.
 */
export default function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const total = reduce ? 350 : 2100;
    const start = performance.now();
    let raf;
    const loop = (now) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else {
        setExit(true);
        setTimeout(onDone, reduce ? 250 : 1100);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduce]);

  if (reduce) {
    return (
      <m.div className="fixed inset-0 z-[100] grid place-items-center bg-bg" animate={{ opacity: exit ? 0 : 1 }} transition={{ duration: 0.25 }} role="status" aria-label="Loading">
        <MALogo className="w-28" />
      </m.div>
    );
  }

  const panel = (color, delay, z) => (
    <m.div className="absolute inset-0" style={{ background: color, zIndex: z }} initial={{ y: 0 }} animate={{ y: exit ? "-101%" : 0 }} transition={{ duration: 0.85, ease, delay }} />
  );

  return (
    <div className="fixed inset-0 z-[100]" role="status" aria-label="Loading">
      {panel("var(--lime)", 0.18, 1)}
      {panel("var(--violet)", 0.09, 2)}
      <m.div className="absolute inset-0 z-[3] grid place-items-center bg-bg" initial={{ y: 0 }} animate={{ y: exit ? "-101%" : 0 }} transition={{ duration: 0.85, ease }}>
        <div className="flex flex-col items-center">
          <MALogo draw duration={1.5} className="w-40 sm:w-52" strokeWidth={8} />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">Loading experience</p>
          <p className="display mt-3 text-6xl tabular-nums text-fg sm:text-7xl" aria-hidden="true">
            {String(count).padStart(2, "0")}
          </p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-line">
            <div className="h-full bg-lime" style={{ width: `${count}%` }} />
          </div>
        </div>
      </m.div>
    </div>
  );
}
