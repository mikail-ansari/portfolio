import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { site } from "../config/site.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";
import NetworkBackground from "./NetworkBackground.jsx";

export const resumeHref = `${import.meta.env.BASE_URL}${site.resume.file}`;

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (d) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="home" aria-label="Introduction" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8">
      {/* background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(59,130,246,0.16),transparent),radial-gradient(50%_45%_at_85%_30%,rgba(34,211,238,0.10),transparent)]" />
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 opacity-80 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
          <NetworkBackground />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <m.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to IT, operations &amp; frontend opportunities
          </m.p>

          <m.h1 {...fade(0.08)} className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{site.name}</span>
          </m.h1>

          <m.p {...fade(0.16)} aria-label={site.roles.join(" | ")} className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-cyan sm:text-base">
            {site.roles.map((r, i) => (
              <span key={r} aria-hidden="true" className="whitespace-nowrap">
                {r}
                {i < site.roles.length - 1 && <span className="ml-3 text-cyan/40">|</span>}
              </span>
            ))}
          </m.p>

          <m.p {...fade(0.24)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.intro}
          </m.p>

          <m.div {...fade(0.32)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className={`${btnBase} bg-gradient-to-r from-cyan to-neon text-[#04141a] font-semibold hover:brightness-110 hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)]`}>
              View My Work <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={resumeHref} download={site.resume.downloadName} className={`${btnBase} border border-line bg-white/[0.04] text-white hover:border-cyan/50 hover:bg-white/[0.07]`}>
              <Download size={16} aria-hidden="true" /> Download Resume
            </a>
            <a href="#contact" className={`${btnBase} text-white hover:bg-white/[0.06]`}>
              <Mail size={16} aria-hidden="true" /> Contact Me
            </a>
          </m.div>

          <m.div {...fade(0.4)} className="mt-8 flex items-center gap-3">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-cyan/50 hover:text-white"
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
            {site.social.github && (
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-cyan/50 hover:text-white"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
            )}
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={15} aria-hidden="true" /> {site.location}
            </span>
          </m.div>
        </div>

        {/* "Currently" card, built only from facts in the config */}
        <m.aside {...fade(0.3)} aria-label="Current focus" className="glass hidden rounded-2xl p-6 shadow-2xl shadow-black/40 lg:block">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-xs text-muted">currently.config</span>
          </div>
          <dl className="mt-6 space-y-5 font-mono text-sm">
            {[
              ["role", site.experience[0].title],
              ["company", site.experience[0].company],
              ["tools", "FileMaker Pro · Windows · Active Directory"],
              ["focus", "Workflows · Systems · Web"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-widest text-cyan/80">{k}</dt>
                <dd className="mt-1 text-[15px] leading-snug text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </m.aside>
      </div>
    </section>
  );
}
