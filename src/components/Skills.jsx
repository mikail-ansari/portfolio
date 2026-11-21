import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="03 / Skills" title="Technical skills" intro="A practical mix of web development, IT systems, print production and business data.">
      <div className="grid gap-5 md:grid-cols-2">
        {site.skills.map((cat, i) => (
          <Reveal key={cat.title} delay={(i % 2) * 0.07}>
            <article className="card h-full rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-neon/20 text-cyan ring-1 ring-cyan/20">
                  <Icon name={cat.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{cat.title}</h3>
                  <p className="text-sm text-muted">{cat.blurb}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${cat.title} skills`}>
                {cat.items.map((s) => (
                  <li key={s} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-fg transition-colors hover:border-cyan/40 hover:bg-cyan/[0.06]">
                    {s}
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
