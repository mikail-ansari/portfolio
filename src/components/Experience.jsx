import { MapPin, Calendar } from "lucide-react";
import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02 / Experience" title="Professional experience" intro="Roles across production, systems, data and frontend development.">
      <ol className="relative ml-3 border-l border-line sm:ml-4">
        {site.experience.map((job, i) => (
          <li key={job.title + job.period} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-ink ${
                job.current ? "bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.18)]" : "bg-neon/70"
              }`}
            />
            <Reveal delay={i * 0.05}>
              <article className="card rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{job.title}</h3>
                    <p className="mt-1 text-[15px] text-cyan">{job.company}</p>
                  </div>
                  {job.current && (
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs text-cyan">Current</span>
                  )}
                </div>
                <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={14} aria-hidden="true" />{job.period}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{job.location}</span>
                </p>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[15px] leading-relaxed text-muted md:grid-cols-2">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
