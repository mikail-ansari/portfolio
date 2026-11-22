import { useEffect, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { site } from "../config/site.js";
import { gsap } from "../lib/gsap.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  const root = useRef(null);
  const reduce = useReducedMotion();

  // GSAP: the timeline line draws as you scroll and each node lights up when reached
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".tl-fill", { scaleY: 1 });
        gsap.set(".tl-dot", { backgroundColor: "var(--lime)" });
        return;
      }
      gsap.fromTo(".tl-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: ".tl-list", start: "top 65%", end: "bottom 65%", scrub: true } });
      gsap.utils.toArray(".tl-item").forEach((el) => {
        gsap.to(el.querySelector(".tl-dot"), { backgroundColor: "var(--lime)", scale: 1.25, duration: 0.3, scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } });
        gsap.fromTo(el.querySelector(".tl-years"), { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="relative px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="experience-title" index="02" eyebrow="Experience" title="The" outlineWord="journey" />

        <ol className="tl-list relative ml-2 sm:ml-0">
          {/* the line */}
          <span className="absolute bottom-0 left-[7px] top-2 w-px bg-line lg:left-[calc(33.333%-1px)]" aria-hidden="true">
            <span className="tl-fill absolute inset-0 origin-top bg-gradient-to-b from-violet via-neon to-lime" />
          </span>

          {site.experience.map((job, i) => (
            <li key={job.title + job.period} className="tl-item relative grid gap-4 pb-16 pl-9 last:pb-0 lg:grid-cols-3 lg:gap-12 lg:pl-0">
              <span className="tl-dot absolute left-0 top-2.5 h-[15px] w-[15px] rounded-full border-2 border-bg bg-muted lg:left-[calc(33.333%-7px)]" aria-hidden="true" />

              {/* big year label */}
              <div className="overflow-hidden lg:pr-12 lg:text-right">
                <p className="tl-years display outline text-[clamp(2.6rem,5.2vw,4.4rem)] leading-[0.95]" aria-label={job.years}>
                  {job.years.split(" — ").map((part, k) => (
                    <span key={k} className="block" aria-hidden="true">
                      {k > 0 && <span className="mr-2 inline-block h-[3px] w-[0.5em] translate-y-[-0.18em] bg-lime align-middle" />}
                      {part}
                    </span>
                  ))}
                </p>
                <p className="mt-3 font-mono text-xs text-muted">{job.period}</p>
              </div>

              {/* content */}
              <m.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="group lg:col-span-2 lg:pl-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="display text-[clamp(1.4rem,3vw,2.3rem)] leading-[1.02] text-fg">{job.title}</h3>
                  {job.current && <span className="rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-onlime">Current</span>}
                </div>
                <p className="mt-2 text-lg font-semibold text-accent">{job.company}</p>
                <p className="mt-1 flex items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 lg:hidden">
                    <Calendar size={14} aria-hidden="true" />
                    {job.period}
                  </span>
                </p>
                <p className="mt-5 text-lg italic text-fg/80">{job.blurb}</p>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[15px] leading-relaxed text-muted xl:grid-cols-2">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-lime transition-transform group-hover:rotate-[225deg]" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </m.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
