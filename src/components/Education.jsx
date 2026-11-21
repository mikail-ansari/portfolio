import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";
import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

export default function Education() {
  return (
    <Section id="education" eyebrow="05 / Education" title="Education">
      <div className="grid gap-5">
        {site.education.map((e) => (
          <Reveal key={e.school + e.program}>
            <article className="card flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-neon/20 text-cyan ring-1 ring-cyan/20">
                  <GraduationCap size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{e.program}</h3>
                  <p className="mt-1 text-[15px] text-cyan">{e.school}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5"><Calendar size={14} aria-hidden="true" />{e.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{e.location}</span>
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {e.honors.map((h) => (
                  <li key={h} className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-cyan">
                    <Award size={15} aria-hidden="true" /> {h}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
