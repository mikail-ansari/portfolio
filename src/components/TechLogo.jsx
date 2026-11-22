import { Layers, Printer, PenTool, FolderTree } from "lucide-react";

const glyphs = { layers: Layers, printer: Printer, pen: PenTool, folder: FolderTree };

/** Renders a technology's real logo, an inline single-colour logo, a monogram badge, or a glyph. */
export default function TechLogo({ t, className = "h-full w-full" }) {
  if (t.logo) return <img src={t.logo} alt="" draggable="false" className={`${className} object-contain`} loading="lazy" />;
  if (t.iconPath)
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-fg`} aria-hidden="true">
        <path d={t.iconPath} />
      </svg>
    );
  if (t.badge)
    return (
      <span
        className={`${className} grid place-items-center rounded-[22%] font-display text-[1.7em] font-extrabold leading-none`}
        style={{ background: t.badge.bg, color: t.badge.fg, boxShadow: `inset 0 0 0 2px ${t.badge.fg}55` }}
        aria-hidden="true"
      >
        {t.badge.text}
      </span>
    );
  const G = glyphs[t.glyph] || Layers;
  return (
    <span className={`${className} grid place-items-center rounded-[22%] border border-neon/40 bg-violet/15 text-neon`} aria-hidden="true">
      <G className="h-1/2 w-1/2" strokeWidth={1.8} />
    </span>
  );
}
