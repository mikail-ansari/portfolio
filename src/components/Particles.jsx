import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { palettes, useTheme } from "../lib/theme.jsx";

/**
 * Interactive particle field. Nodes drift, connect when close and are gently pushed away
 * from the pointer. Pauses off-screen / in background tabs; one still frame for reduced motion.
 */
export default function Particles() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const pal = palettes[theme];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0,
      raf = 0,
      visible = true,
      nodes = [];
    const mouse = { x: -999, y: -999 };

    const hexA = (hex, a) => {
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    const init = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(80, Math.max(26, (w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
        c: Math.random() < 0.18 ? pal.lime : pal.neon,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxD = 130;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD) {
            ctx.strokeStyle = hexA(pal.violet, (1 - d / maxD) * 0.35);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = hexA(n.c, 0.85);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (visible && !document.hidden) {
        for (const n of nodes) {
          const dx = n.x - mouse.x,
            dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 0) {
            n.x += (dx / d) * 1.4;
            n.y += (dy / d) * 1.4;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        draw();
      }
      raf = requestAnimationFrame(step);
    };

    init();
    draw();
    if (!reduce) raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        init();
        draw();
      }, 150);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce, theme]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
