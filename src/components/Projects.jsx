import { ExternalLink } from "lucide-react";
import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon, GithubIcon } from "./icons.jsx";

function ProjectCard({ p, index }) {
  const hasLinks = p.github || p.demo;
  return (
    <Reveal delay={(index % 3) * 0.06} className="h-full">
      <article className="card group flex h-full flex-col overflow-hidden rounded-2xl">
        {/* Screenshot, or a clean placeholder until you add one */}
        {p.image ? (
          <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="aspect-[16/9] w-full border-b border-line object-cover" />
        ) : (
          <div className="relative grid aspect-[16/9] place-items-center border-b border-line bg-[radial-gradient(70%_80%_at_50%_0%,rgba(34,211,238,0.10),transparent)]">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-white/[0.04] text-cyan">
              <Icon name={p.icon} size={26} />
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
            {p.placeholder && (
              <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">Placeholder</span>
            )}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.description}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t} className="rounded-md bg-cyan/[0.08] px-2.5 py-1 font-mono text-[11px] text-cyan">{t}</li>
            ))}
          </ul>
          {hasLinks && (
            <div className="mt-5 flex gap-4 border-t border-line pt-4 text-sm">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-white">
                  <GithubIcon className="h-4 w-4" /> Code<span className="sr-only"> for {p.title} (opens in a new tab)</span>
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-white">
                  <ExternalLink size={15} aria-hidden="true" /> Live demo<span className="sr-only"> of {p.title} (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="04 / Projects"
      title="Selected work"
      intro="Project areas I work in. Real case studies, screenshots and links are being added as they are ready."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
