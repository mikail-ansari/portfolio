import { forwardRef, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { site } from "../config/site.js";
import { tech, techCategories } from "../config/tech.js";
import SectionHeading from "./SectionHeading.jsx";
import TechLogo from "./TechLogo.jsx";

// organic, slightly different blob shapes so the wall never looks like a grid of boxes
const blobs = [
  "58% 42% 55% 45% / 48% 56% 44% 52%",
  "44% 56% 40% 60% / 56% 42% 58% 44%",
  "52% 48% 62% 38% / 42% 58% 42% 58%",
  "40% 60% 48% 52% / 58% 44% 56% 42%",
  "60% 40% 44% 56% / 46% 54% 46% 54%",
];

const Orb = forwardRef(function Orb({ t, i }, liRef) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [on, setOn] = useState(false);

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - py) * 22, ry: (px - 0.5) * 22, gx: px * 100, gy: py * 100 });
  };

  return (
    <m.li ref={liRef} layout={!reduce} initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.6 }} transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.025 }} className={`${i % 3 === 1 ? "sm:mt-8" : ""} ${i % 3 === 2 ? "sm:mt-3" : ""}`} style={{ perspective: 700 }}>
      <button
        ref={ref}
        type="button"
        aria-label={`${t.name}: ${t.description}`}
        onPointerMove={onMove}
        onPointerEnter={() => setOn(true)}
        onPointerLeave={() => {
          setOn(false);
          setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
        }}
        onFocus={() => setOn(true)}
        onBlur={() => setOn(false)}
        data-cursor="Hover"
        className="group relative block aspect-square w-full overflow-hidden border border-line bg-bg2/70 text-left transition-[border-color,box-shadow] duration-300 hover:border-lime focus-visible:border-lime"
        style={{
          borderRadius: blobs[i % blobs.length],
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform .18s ease-out, border-color .3s, box-shadow .3s",
          boxShadow: on ? "0 0 46px -10px var(--lime)" : "none",
        }}
      >
        {/* light that follows the pointer */}
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, color-mix(in srgb, var(--lime) 28%, transparent), transparent 62%)` }} />
        {/* logo: floats gently, springs on hover */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="float block h-[42%] w-[42%] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-[26%] group-hover:scale-[0.78] group-focus-visible:-translate-y-[26%] group-focus-visible:scale-[0.78]" style={{ "--dur": `${5 + (i % 4)}s`, "--delay": `${i * -0.5}s`, "--fy": "-7px" }}>
            <TechLogo t={t} />
          </span>
        </span>
        {/* name + short description */}
        <span className="absolute inset-x-0 bottom-[13%] flex flex-col items-center px-6 text-center">
          <span className="text-[12px] font-bold leading-tight text-fg sm:text-[13px]">{t.name}</span>
          <span className="max-h-0 overflow-hidden text-[11px] leading-snug text-muted opacity-0 transition-all duration-500 group-hover:mt-1 group-hover:max-h-14 group-hover:opacity-100 group-focus-visible:mt-1 group-focus-visible:max-h-14 group-focus-visible:opacity-100">{t.description}</span>
        </span>
      </button>
    </m.li>
  );
});

export default function Skills() {
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const list = cat === "All" ? tech : tech.filter((t) => t.category === cat);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="skills-title" index="03" eyebrow="Skills" title="Tools I" outlineWord="work with" />
        <p className="-mt-6 mb-10 max-w-xl text-muted sm:-mt-8">Hover, tap or focus a logo to see what I use it for. No made-up skill bars: just the tools that are part of my everyday work.</p>

        {/* filter chips */}
        <div role="tablist" aria-label="Filter technologies" className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {techCategories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c ? "border-lime text-onlime" : "border-line text-muted hover:text-fg"}`}>
              {cat === c && <m.span layoutId="skill-chip" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c}</span>
              <span className="relative ml-2 font-mono text-[11px] opacity-60">{c === "All" ? tech.length : tech.filter((t) => t.category === c).length}</span>
            </button>
          ))}
        </div>

        <m.ul layout={false} className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" aria-label="Technologies and software">
          <AnimatePresence mode="popLayout">
            {list.map((t, i) => (
              <Orb key={t.id} t={t} i={i} />
            ))}
          </AnimatePresence>
        </m.ul>

        {/* extra strengths */}
        <div className="mt-20">
          <p className="eyebrow mb-5">Also in the toolbox</p>
          <ul className="flex flex-wrap gap-2.5">
            {site.toolbox.map((s, i) => (
              <m.li key={s} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-lime hover:text-fg">
                {s}
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
