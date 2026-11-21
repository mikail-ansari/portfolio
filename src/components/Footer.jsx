import { site } from "../config/site.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with React, Vite &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="hover:text-white">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="hover:text-white">
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          <a href="#home" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
