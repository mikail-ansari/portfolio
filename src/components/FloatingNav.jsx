import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../config/site.js";
import { useSmoothScroll } from "../lib/smooth.jsx";
import MALogo from "./MALogo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Logo({ onClick }) {
  const [k, setK] = useState(0);
  return (
    <a href="#home" aria-label="Md Mikail Ansari – back to top" onClick={onClick} onMouseEnter={() => setK((v) => v + 1)} className="grid h-10 w-12 place-items-center">
      <MALogo key={k} draw={k > 0} duration={0.9} className="w-9" strokeWidth={11} />
    </a>
  );
}

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { stop, start } = useSmoothScroll();

  // highlight the section currently in view
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // mobile menu: Escape closes it, page scroll is paused while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      start();
    };
  }, [open, stop, start]);

  return (
    <>
      {/* ---------- desktop / tablet floating pill ---------- */}
      <m.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block">
        <nav aria-label="Primary" className="glass flex items-center gap-1 rounded-full p-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]">
          <Logo />
          <ul className="flex items-center">
            {navLinks.filter((l) => l.id !== "home").map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id} className="relative">
                  <a href={`#${l.id}`} aria-current={on ? "true" : undefined} className={`relative z-10 block rounded-full px-3 py-2 text-[13px] font-medium transition-colors lg:px-4 ${on ? "text-onlime" : "text-muted hover:text-fg"}`}>
                    <span className="hidden xl:inline">{l.label}</span>
                    <span className="xl:hidden">{l.short}</span>
                  </a>
                  {on && <m.span layoutId="nav-indicator" className="absolute inset-0 z-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                </li>
              );
            })}
          </ul>
          <ThemeToggle className="ml-1" />
        </nav>
      </m.header>

      {/* ---------- mobile bar ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="glass rounded-full">
            <Logo onClick={() => setOpen(false)} />
          </div>
          <div className="glass flex items-center gap-1 rounded-full p-1.5">
            <ThemeToggle />
            <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" className="grid h-10 w-10 place-items-center rounded-full bg-lime text-onlime">
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div id="mobile-menu" role="dialog" aria-label="Menu" initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }} animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }} exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-bg px-7 pb-10 pt-24 md:hidden">
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <m.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="border-b border-line">
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} aria-current={active === l.id ? "true" : undefined} className="flex items-baseline gap-4 py-3.5">
                    <span className="font-mono text-xs text-limetext">0{i + 1}</span>
                    <span className={`display text-[clamp(1.4rem,7vw,2.1rem)] ${active === l.id ? "text-limetext" : "text-fg"}`}>{l.label}</span>
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
