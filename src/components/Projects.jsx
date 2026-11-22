import { useRef } from "react";
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "../config/site.js";
import { GithubIcon } from "./icons.jsx";
import PlaceholderArt from "./PlaceholderArt.jsx";
import SectionHeading from "./SectionHeading.jsx";

/** Browser-style preview that tilts toward the pointer and catches a moving glare. */
function Preview({ p, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${gx}% ${gy}%, rgba(255,255,255,.22), transparent 45%)`;

  const move = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="w-full">
      <m.div ref={ref} onPointerMove={move} onPointerLeave={reset} data-cursor={p.demo ? "Open" : "Preview"} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative overflow-hidden rounded-2xl border border-line bg-bg2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 border-b border-line bg-bg/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-fg/5 px-3 py-1 font-mono text-[11px] text-muted">{p.demo ? p.demo.replace(/^https?:\/\//, "") : "preview coming soon"}</span>
        </div>
        <div className="relative aspect-[16/10]">
          {p.image ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="h-full w-full object-cover" /> : <PlaceholderArt category={p.category === "Web Design" ? "App UI" : p.category} seed={i + 2} label={p.placeholder} />}
          <m.div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
        </div>
      </m.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="projects-title" index="05" eyebrow="Projects" title="Selected" outlineWord="work" />
        <p className="-mt-6 mb-16 max-w-2xl text-muted sm:-mt-8">The areas I work in. Cards marked "Placeholder" are project categories waiting for real case studies, screenshots and links, not finished client projects.</p>

        <ol className="space-y-24 sm:space-y-32">
          {site.projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.title}>
                <m.article initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                    <Preview p={p} i={i} />
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:text-right" : ""}`}>
                    <p className={`display outline text-[clamp(4rem,10vw,8rem)] leading-none transition-all duration-500 group-hover:text-lime group-hover:[-webkit-text-stroke-color:var(--lime)] ${flip ? "lg:ml-auto" : ""}`}>{String(i + 1).padStart(2, "0")}</p>
                    <div className={`mt-4 flex flex-wrap items-center gap-3 ${flip ? "lg:justify-end" : ""}`}>
                      <h3 className="display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1] text-fg">{p.title}</h3>
                      {p.placeholder && <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">Placeholder</span>}
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-muted">{p.description}</p>
                    <ul className={`mt-5 flex flex-wrap gap-2 ${flip ? "lg:justify-end" : ""}`} aria-label="Technologies">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-fg transition-all group-hover:border-neon/60 group-hover:bg-violet/10">
                          {t}
                        </li>
                      ))}
                    </ul>
                    {(p.github || p.demo) && (
                      <div className={`mt-6 flex flex-wrap gap-3 ${flip ? "lg:justify-end" : ""}`}>
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-onlime">
                            Live demo <ArrowUpRight size={16} aria-hidden="true" />
                            <span className="sr-only">of {p.title} (opens in a new tab)</span>
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold text-fg hover:border-lime">
                            <GithubIcon className="h-4 w-4" /> Source code
                            <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </m.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
