import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { site } from "../config/site.js";
import { useSmoothScroll } from "../lib/smooth.jsx";
import PlaceholderArt from "./PlaceholderArt.jsx";
import SectionHeading from "./SectionHeading.jsx";

const items = site.studio.items;
const cats = ["All", ...site.studio.categories];

function useColumns() {
  const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 560 ? 2 : 1);
  const [n, setN] = useState(get);
  useEffect(() => {
    const on = () => setN(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return n;
}

function Art({ item, label = true }) {
  const idx = items.findIndex((x) => x.id === item.id);
  return item.image ? <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" /> : <PlaceholderArt category={item.category} seed={idx} label={label && item.placeholder} />;
}

const Tile = forwardRef(function Tile({ item, onOpen }, ref) {
  const reduce = useReducedMotion();
  const btn = useRef(null);
  const seen = useInView(btn, { once: true, margin: "0px 0px -5% 0px" });
  return (
    <m.li ref={ref} layout={!reduce} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <button ref={btn} type="button" onClick={(e) => onOpen(item, e.currentTarget)} data-cursor="View" aria-label={`Open ${item.title} (${item.category}) in the gallery`} className="group relative block w-full overflow-hidden rounded-[1.4rem] border border-line text-left" style={{ aspectRatio: item.ratio }}>
        {/* animated image reveal: a curtain lifts off the artwork when it scrolls into view */}
        <m.div className="h-full w-full" initial={false} animate={reduce || seen ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : { clipPath: "inset(100% 0 0 0)", scale: 1.15 }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
            <Art item={item} />
          </div>
        </m.div>
        {/* hover overlay */}
        <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="eyebrow !text-lime">{item.category}</span>
          <span className="display mt-1 text-xl leading-tight text-white">{item.title}</span>
          <Maximize2 size={18} className="absolute right-5 top-5 text-white" aria-hidden="true" />
        </span>
      </button>
    </m.li>
  );
});

function Lightbox({ list, index, setIndex, onClose }) {
  const item = list[index];
  const closeRef = useRef(null);
  const go = useCallback((d) => setIndex((i) => (i + d + list.length) % list.length), [list.length, setIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        const f = [...document.querySelectorAll("#lightbox button")];
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <m.div id="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} – gallery preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="font-mono text-xs tracking-widest">
          {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close preview" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:border-lime hover:text-lime">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <button type="button" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label="Previous image" className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white hover:border-lime hover:text-lime sm:left-6">
          <ChevronLeft aria-hidden="true" />
        </button>
        <AnimatePresence mode="wait">
          <m.div key={item.id} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={(_, i) => Math.abs(i.offset.x) > 80 && go(i.offset.x < 0 ? 1 : -1)} initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="max-h-full overflow-hidden rounded-2xl" style={{ aspectRatio: item.ratio, height: "min(100%, 72vh)" }} onClick={(e) => e.stopPropagation()}>
            <Art item={item} />
          </m.div>
        </AnimatePresence>
        <button type="button" onClick={(e) => (e.stopPropagation(), go(1))} aria-label="Next image" className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white hover:border-lime hover:text-lime sm:right-6">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="px-5 py-5 text-center text-white sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow !text-lime">{item.category}</p>
        <p className="display mt-1 text-2xl">{item.title}</p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-white/70">{item.description}</p>
      </div>
    </m.div>
  );
}

export default function Studio() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null); // index within the filtered list
  const returnFocus = useRef(null);
  const cols = useColumns();
  const { stop, start } = useSmoothScroll();

  const list = useMemo(() => (cat === "All" ? items : items.filter((i) => i.category === cat)), [cat]);
  const columns = useMemo(() => {
    const c = Array.from({ length: cols }, () => []);
    list.forEach((it, i) => c[i % cols].push(it));
    return c;
  }, [list, cols]);

  const openItem = (item, el) => {
    returnFocus.current = el;
    setOpen(list.findIndex((x) => x.id === item.id));
  };
  const close = useCallback(() => {
    setOpen(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (open === null) return;
    stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      start();
    };
  }, [open, stop, start]);

  return (
    <section id="studio" aria-labelledby="studio-title" className="relative px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="studio-title" index="04" eyebrow="Creative Studio" title="Creative" outlineWord="studio" />
        <p className="-mt-6 mb-10 max-w-2xl text-muted sm:-mt-8">Graphic design, print and production work sits right next to the code. The tiles below are placeholders for now. Each one is tagged, and swapping in real work is a one-line change in the config.</p>

        <div role="tablist" aria-label="Filter gallery by category" className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c ? "border-lime text-onlime" : "border-line text-muted hover:text-fg"}`}>
              {cat === c && <m.span layoutId="studio-chip" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <div className="grid items-start gap-5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-live="polite">
          {columns.map((col, ci) => (
            <ul key={ci} className="flex flex-col gap-5" style={{ marginTop: cols > 1 && ci % 2 === 1 ? "3rem" : 0 }}>
              <AnimatePresence mode="popLayout">
                {col.map((it) => (
                  <Tile key={it.id} item={it} onOpen={openItem} />
                ))}
              </AnimatePresence>
            </ul>
          ))}
        </div>
      </div>

      <AnimatePresence>{open !== null && list[open] && <Lightbox list={list} index={open} setIndex={setOpen} onClose={close} />}</AnimatePresence>
    </section>
  );
}
