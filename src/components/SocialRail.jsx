import { Mail } from "lucide-react";
import { site } from "../config/site.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

/** Floating social icons down the left edge (wide screens only). Empty links are not rendered. */
export default function SocialRail() {
  const item = "grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-lime hover:text-limetext";
  return (
    <aside aria-label="Social links" className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-3 2xl:flex">
      <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={item}>
        <LinkedinIcon className="h-[17px] w-[17px]" />
      </a>
      {site.social.github && (
        <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={item}>
          <GithubIcon className="h-[17px] w-[17px]" />
        </a>
      )}
      {site.contact.email && (
        <a href={`mailto:${site.contact.email}`} aria-label="Email me" className={item}>
          <Mail size={17} aria-hidden="true" />
        </a>
      )}
      <span className="mt-1 h-24 w-px bg-gradient-to-b from-line to-transparent" aria-hidden="true" />
    </aside>
  );
}
