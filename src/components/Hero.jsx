import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { site } from "../config/site.js";
import { tech, heroFloaters } from "../config/tech.js";
import { gsap } from "../lib/gsap.js";
import { LinkedinIcon } from "./icons.jsx";
import Magnetic from "./Magnetic.jsx";
import Particles from "./Particles.jsx";
import SplitText from "./SplitText.jsx";
import TechLogo from "./TechLogo.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

export const resumeHref = `${import.meta.env.BASE_URL}${site.resume.file}`;

/** If WebGL is unavailable the hero simply shows the CSS orb instead of crashing the page. */
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <div className="h-full w-full rounded-full opacity-60" style={{ background: "radial-gradient(closest-side, var(--violet), transparent)" }} /> : this.props.children;
  }
}

function RoleCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % site.roles.length), 2300);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) return <p className="font-mono text-sm text-limetext sm:text-base">{site.roles.join(" / ")}</p>;
  return (
    <p className="flex items-center gap-3 font-mono text-sm sm:text-base" aria-live="off">
      <span className="text-muted">{"> I'm a"}</span>
      <span className="relative inline-flex h-7 min-w-[29ch] overflow-hidden sm:h-8">
        <AnimatePresence mode="wait" initial={false}>
          <m.span key={site.roles[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 top-0 whitespace-nowrap font-semibold text-limetext">
            {site.roles[i]}
          </m.span>
        </AnimatePresence>
      </span>
      <span className="caret h-5 w-[3px] bg-lime" aria-hidden="true" />
    </p>
  );
}

// where each floating logo sits (percent of the hero) and how strongly it reacts to the mouse
const spots = [
  { l: "47%", t: "15%", s: 54, d: 22, r: "8deg", dur: "7s" },
  { l: "89%", t: "11%", s: 58, d: 26, r: "-6deg", dur: "6s" },
  { l: "63%", t: "84%", s: 52, d: 34, r: "10deg", dur: "8s" },
  { l: "93%", t: "58%", s: 56, d: 18, r: "-9deg", dur: "7.5s" },
  { l: "78%", t: "90%", s: 46, d: 30, r: "6deg", dur: "6.5s" },
  { l: "36%", t: "9%", s: 44, d: 24, r: "-8deg", dur: "9s" },
  { l: "79%", t: "3%", s: 42, d: 20, r: "7deg", dur: "7s" },
  { l: "95%", t: "34%", s: 46, d: 28, r: "-5deg", dur: "8.5s" },
  { l: "52%", t: "93%", s: 44, d: 16, r: "9deg", dur: "6.8s" },
];

export default function Hero({ ready }) {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const content = useRef(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setShowScene(true), 150);
      return () => clearTimeout(t);
    }
  }, [ready]);

  // mouse parallax for floating logos (CSS vars: no re-renders) + scroll parallax for the copy
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const move = (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(3));
      el.style.setProperty("--py", cy.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) {
      window.addEventListener("pointermove", move, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.to(content.current, { yPercent: -12, opacity: 0.15, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, [reduce]);

  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } });
  const floaters = heroFloaters.map((id) => tech.find((t) => t.id === id));

  return (
    <section ref={root} id="home" aria-label="Introduction" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8" style={{ "--px": 0, "--py": 0 }}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_50%_45%,#000_30%,transparent)]">
          <Particles />
        </div>
      </div>

      {/* 3D centrepiece */}
      <div className="pointer-events-none absolute -right-[18%] top-[14%] -z-[5] h-[62vh] w-[92vw] opacity-35 sm:-right-[6%] sm:w-[62vw] sm:opacity-90 lg:right-[2%] lg:top-[8%] lg:h-[84vh] lg:w-[50vw] lg:opacity-100">
        {showScene && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <m.div className="h-full w-full" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                <HeroScene />
              </m.div>
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      {/* floating technology logos */}
      <ul className="pointer-events-none absolute inset-0 -z-[4]" aria-hidden="true">
        {floaters.map((t, i) => {
          const sp = spots[i % spots.length];
          return (
            <li key={t.id} className={`absolute opacity-50 sm:opacity-100 ${i > 3 ? "hidden sm:block" : ""}`} style={{ left: sp.l, top: sp.t, transform: `translate3d(calc(var(--px) * ${sp.d}px), calc(var(--py) * ${sp.d}px), 0)` }}>
              <m.div initial={reduce ? false : { opacity: 0, scale: 0.4 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.9 + i * 0.09, type: "spring", stiffness: 160, damping: 14 }}>
                <div className="float glass grid place-items-center rounded-2xl p-2.5 shadow-lg" style={{ "--r": sp.r, "--dur": sp.dur, "--delay": `${i * -0.7}s`, width: sp.s, height: sp.s }}>
                  <TechLogo t={t} className="h-full w-full" />
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>

      <div ref={content} className="relative z-10 mx-auto w-full max-w-7xl">
        <m.p {...fade(0)} className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-lime" aria-hidden="true" /> Portfolio · {new Date().getFullYear()}
        </m.p>

        <h1 className="display text-[clamp(2.8rem,9.4vw,8.8rem)] leading-[0.86]" aria-label={site.name}>
          <span className="block text-fg">
            <SplitText text="MD MIKAIL" play={ready} delay={0.05} stagger={0.045} />
          </span>
          <span className="block">
            <span className="outline-accent">
              <SplitText text="ANSARI" play={ready} delay={0.45} stagger={0.05} />
            </span>
            <span className="grad-text">.</span>
          </span>
        </h1>

        <m.div {...fade(0.9)} className="mt-8 max-w-4xl">
          <p className="display text-[clamp(1rem,2.05vw,1.7rem)] leading-[1.15]">
            <span className="text-limetext">{site.headline[0]}</span>
            <br />
            <span className="text-fg">{site.headline[1]}</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{site.intro}</p>
        </m.div>

        <m.div {...fade(1.05)} className="mt-6">
          <RoleCycler />
        </m.div>

        <m.div {...fade(1.2)} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
          <Magnetic>
            <a href="#projects" data-cursor="Go" className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold uppercase tracking-wide text-onlime transition-shadow hover:shadow-[0_0_40px_-6px_var(--lime)]">
              View My Work <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-fg/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-fg transition-colors hover:border-lime hover:bg-lime/10">
              Let's Connect <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="grid h-[52px] w-[52px] place-items-center rounded-full border border-line text-fg transition-colors hover:border-lime hover:text-limetext">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </Magnetic>
        </m.div>

        <m.p {...fade(1.35)} className="mt-10 flex items-center gap-2 font-mono text-xs text-muted">
          <MapPin size={14} aria-hidden="true" /> {site.location}
        </m.p>
      </div>
    </section>
  );
}
