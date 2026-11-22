import { site } from "../config/site.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";
import Marquee from "./Marquee.jsx";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-line pt-10">
      <Marquee items={["Let's build something", "Say hello", "Creative technologist"]} outline reverse />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with React, Vite, GSAP &amp; Three.js.
        </p>
        <div className="flex items-center gap-5">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="hover:text-limetext">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="hover:text-limetext">
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          <a href="#home" className="font-mono text-xs uppercase tracking-widest hover:text-limetext">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
