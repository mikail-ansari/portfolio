import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="Where technology meets operations">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
          {site.about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {site.about.highlights.map((h) => (
              <li key={h.label} className="card flex items-center gap-4 rounded-xl p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan">
                  <Icon name={h.icon} size={18} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{h.label}</p>
                  <p className="text-[15px] text-white">{h.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
