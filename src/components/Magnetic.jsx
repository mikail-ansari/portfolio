import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Wrap a button/link so it is gently pulled toward the pointer. No-op for touch / reduced motion. */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce) return <span className={`inline-block ${className}`}>{children}</span>;

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <m.span ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block ${className}`}>
      {children}
    </m.span>
  );
}
