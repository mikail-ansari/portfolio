import { useEffect, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Award, GraduationCap, MapPin } from "lucide-react";
import { site } from "../config/site.js";
import { gsap } from "../lib/gsap.js";
import SectionHeading from "./SectionHeading.jsx";

const rise = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10%" }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

export default function About() {
  const root = useRef(null);
  const reduce = useReducedMotion();
  const words = site.about.statement.split(" ");

  // scroll-scrubbed typography: each word lights up as you read down the statement
  useEffect(() => {
    const ctx = gsap.context(() => {
      const w = gsap.utils.toArray(".about-word");
      if (reduce) return gsap.set(w, { opacity: 1 });
      gsap.fromTo(w, { opacity: 0.14 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ".about-statement", start: "top 82%", end: "bottom 48%", scrub: true } });
      gsap.to(".about-badge", { rotate: 360, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  const edu = site.education;
  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="about-title" index="01" eyebrow="About" title="Hello," outlineWord="I'm Mikail" />

        <p className="about-statement display max-w-5xl text-[clamp(1.7rem,4.6vw,3.9rem)] leading-[1.02]">
          {words.map((w, i) => (
            <span key={i} className="about-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          {/* offset paragraphs */}
          <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg lg:col-span-6 lg:col-start-2">
            {site.about.paragraphs.map((p, i) => (
              <m.p key={i} {...rise} transition={{ ...rise.transition, delay: i * 0.08 }}>
                {p}
              </m.p>
            ))}
          </div>

          {/* facts as a staggered stack */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:gap-y-0">
            {site.about.facts.map((f, i) => (
              <m.li key={f.label} {...rise} transition={{ ...rise.transition, delay: i * 0.08 }} className="border-t border-line pt-4 lg:py-5">
                <p className="eyebrow">{f.label}</p>
                <p className="display mt-2 text-xl leading-tight text-fg sm:text-2xl">{f.value}</p>
              </m.li>
            ))}
          </ul>
        </div>

        {/* education: editorial block */}
        <m.div {...rise} className="relative mt-24 overflow-hidden rounded-[2rem] border border-line p-7 sm:p-12 lg:mt-32" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--violet) 22%, transparent), transparent 60%)" }}>
          <div className="about-badge pointer-events-none absolute -right-14 -top-14 hidden h-52 w-52 sm:block" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-lime font-mono" fontSize="14" letterSpacing="5">
                <textPath href="#circ">GEORGIAN COLLEGE · DIPLOMA 2025 · DEAN'S LIST ·</textPath>
              </text>
            </svg>
          </div>
          <p className="eyebrow flex items-center gap-2">
            <GraduationCap size={16} aria-hidden="true" /> Education
          </p>
          <h3 className="display mt-5 text-[clamp(2.2rem,7vw,5.2rem)] text-fg">{edu.school}</h3>
          <p className="mt-4 max-w-2xl text-xl font-medium text-fg sm:text-2xl">{edu.program}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span>{edu.detail}</span>
            <span className="font-mono">{edu.period}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {edu.location}
            </span>
          </div>
          <ul className="mt-7 flex flex-wrap gap-3">
            {edu.honors.map((h) => (
              <li key={h} className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-onlime">
                <Award size={16} aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  );
}
