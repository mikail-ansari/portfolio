import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme.jsx";

/** Animated day/night switch. The page reveals the new theme in a circle from the button. */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      aria-pressed={!dark}
      title={dark ? "Day mode" : "Night mode"}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line text-fg transition-colors hover:border-lime ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
        >
          {dark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
