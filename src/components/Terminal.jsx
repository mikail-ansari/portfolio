import { useEffect, useRef, useState } from "react";
import { site } from "../config/site.js";
import { tech } from "../config/tech.js";
import { useTheme } from "../lib/theme.jsx";
import { useSmoothScroll } from "../lib/smooth.jsx";
import { resumeHref } from "./Hero.jsx";

const HELP = [
  ["help", "show this list"],
  ["whoami", "a quick intro"],
  ["about", "short bio"],
  ["experience", "where I've worked"],
  ["skills [category]", "tools & software"],
  ["education", "studies"],
  ["projects", "project areas"],
  ["contact", "get in touch"],
  ["resume", "download my resume"],
  ["goto <section>", "scroll to a section"],
  ["theme [dark|light]", "switch theme"],
  ["clear", "clear the screen"],
];
const SECTIONS = ["home", "about", "experience", "skills", "studio", "projects", "contact"];
const SUGGEST = ["help", "whoami", "experience", "skills", "resume", "theme"];

export default function Terminal() {
  const { theme, setTheme } = useTheme();
  const { scrollTo } = useSmoothScroll();
  const [lines, setLines] = useState([{ k: "sys", t: `MA-OS 1.0 — type "help" to see what I can do.` }]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const body = useRef(null);
  const inputRef = useRef(null);

  // keep the newest line visible inside the terminal only (never scroll the page)
  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const a = args.join(" ").toLowerCase();
    const out = (...t) => t.map((x) => ({ k: "out", t: x }));
    let res = [];

    switch (name.toLowerCase()) {
      case "help":
        res = HELP.map(([c, d]) => ({ k: "out", t: `${c.padEnd(22, " ")}${d}` }));
        break;
      case "whoami":
        res = out(site.name, site.roles.join(" · "), site.location);
        break;
      case "about":
        res = out(site.intro, "", ...site.about.paragraphs[0].match(/.{1,70}(\s|$)/g).map((s) => s.trim()));
        break;
      case "experience":
        res = site.experience.flatMap((j) => out(`${j.years.padEnd(10, " ")}${j.title}`, `${"".padEnd(10, " ")}${j.company} — ${j.period}`));
        break;
      case "skills": {
        const cats = [...new Set(tech.map((t) => t.category))];
        const c = cats.find((x) => x.toLowerCase() === a);
        if (a && !c) res = out(`unknown category "${a}". try: ${cats.join(", ").toLowerCase()}`);
        else res = (c ? [c] : cats).map((cat) => ({ k: "out", t: `${cat.padEnd(18, " ")}${tech.filter((t) => t.category === cat).map((t) => t.name).join(", ")}` }));
        break;
      }
      case "education":
        res = out(site.education.program, `${site.education.school} — ${site.education.detail}`, site.education.honors.join(", "));
        break;
      case "projects":
        res = site.projects.map((p) => ({ k: "out", t: `${p.placeholder ? "[placeholder] " : "[live]        "}${p.title}` }));
        break;
      case "contact":
      case "links":
        res = out(`linkedin  ${site.social.linkedin}`, site.social.github ? `github    ${site.social.github}` : null, site.contact.email ? `email     ${site.contact.email}` : null, "or scroll down and use the form →").filter((l) => l.t !== null);
        break;
      case "linkedin":
        window.open(site.social.linkedin, "_blank", "noopener,noreferrer");
        res = out("opening LinkedIn in a new tab…");
        break;
      case "resume": {
        const el = document.createElement("a");
        el.href = resumeHref;
        el.download = site.resume.downloadName;
        document.body.appendChild(el);
        el.click();
        el.remove();
        res = out(`downloading ${site.resume.downloadName}…`);
        break;
      }
      case "goto": {
        const id = SECTIONS.find((s) => s === a);
        if (id) {
          scrollTo(id === "home" ? 0 : document.getElementById(id));
          res = out(`scrolling to ${id}…`);
        } else res = out(`usage: goto <${SECTIONS.join("|")}>`);
        break;
      }
      case "theme": {
        const next = a === "dark" || a === "light" ? a : theme === "dark" ? "light" : "dark";
        const r = inputRef.current?.getBoundingClientRect();
        setTheme(next, r ? { x: r.left + 20, y: r.top } : undefined);
        res = out(`theme → ${next}`);
        break;
      }
      case "date":
        res = out(new Date().toString());
        break;
      case "echo":
        res = out(args.join(" "));
        break;
      case "ls":
        res = out(SECTIONS.map((s) => s + "/").join("  "));
        break;
      case "sudo":
        res = out("nice try. but I'm always happy to talk — try `contact`.");
        break;
      case "clear":
        setLines([]);
        return;
      default:
        res = out(`command not found: ${name}. type "help".`);
    }
    setLines((l) => [...l, { k: "in", t: cmd }, ...res]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    run(input);
    setHist((h) => [input, ...h]);
    setHi(-1);
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hi + 1, hist.length - 1);
      if (hist[n] !== undefined) {
        setHi(n);
        setInput(hist[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hi - 1;
      setHi(n);
      setInput(n >= 0 ? hist[n] : "");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0a0810] text-[#ece7f7] shadow-[0_30px_80px_-30px_rgba(124,58,237,0.5)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/50">mikail@portfolio: ~</span>
      </div>

      <div ref={body} onClick={() => inputRef.current?.focus({ preventScroll: true })} className="h-[300px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed" role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${l.k === "in" ? "text-white" : l.k === "sys" ? "text-[#c8ff3e]" : "text-[#b9b0d0]"}`}>
            {l.k === "in" && <span className="mr-2 text-[#c8ff3e]">❯</span>}
            {l.t}
          </div>
        ))}
        <form onSubmit={submit} className="mt-1 flex items-center">
          <label htmlFor="term-input" className="sr-only">
            Terminal command
          </label>
          <span className="mr-2 text-[#c8ff3e]" aria-hidden="true">
            ❯
          </span>
          <input id="term-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="type a command…" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/30" />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {SUGGEST.map((c) => (
          <button key={c} type="button" onClick={() => run(c)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70 transition-colors hover:border-[#c8ff3e] hover:text-[#c8ff3e]">
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
