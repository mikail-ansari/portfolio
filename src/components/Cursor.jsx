import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Custom cursor (dot + trailing ring). Only mounts on devices with a precise pointer and hover,
 * and never for reduced-motion visitors. Elements can opt in to a label with data-cursor="View".
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hover: false, label: "", down: false, text: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce;
    setEnabled(ok);
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      const labelEl = t.closest?.("[data-cursor]");
      const interactive = t.closest?.("a, button, [role='button'], summary, label, [data-cursor]");
      const text = t.closest?.("input, textarea");
      setState((s) => ({ ...s, hover: !!interactive, label: labelEl?.dataset.cursor || "", text: !!text }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;
  const big = state.hover || state.label;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]">
      <m.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <m.div
          className="grid place-items-center rounded-full border border-lime"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: state.label ? 84 : big ? 56 : 34,
            height: state.label ? 84 : big ? 56 : 34,
            scale: state.down ? 0.85 : 1,
            opacity: state.text ? 0 : 1,
            backgroundColor: state.label ? "var(--lime)" : "rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {state.label && <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-onlime">{state.label}</span>}
        </m.div>
      </m.div>
      <m.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" style={{ opacity: state.text ? 0 : 1 }} />
      </m.div>
    </div>
  );
}
