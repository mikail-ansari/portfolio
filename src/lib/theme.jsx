import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext({ theme: "dark", toggle: () => {}, setTheme: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export const palettes = {
  dark: { violet: "#7c3aed", neon: "#b87bff", lime: "#c8ff3e", bg: "#07060b", ink: "#f4f1fb" },
  light: { violet: "#8b5cf6", neon: "#a78bfa", lime: "#9bd80f", bg: "#faf6ee", ink: "#17131f" },
};

function apply(t) {
  document.documentElement.setAttribute("data-theme", t);
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute("content", t === "light" ? "#faf6ee" : "#07060b");
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");

  const commit = useCallback((t) => {
    apply(t);
    setThemeState(t);
    try {
      localStorage.setItem("ma-theme", t); // remembered for returning visitors
    } catch {
      /* storage can be unavailable (private mode) – theme still works for this visit */
    }
  }, []);

  /**
   * Animated switch: a circular reveal from the toggle button where the browser supports
   * View Transitions; otherwise a short colour cross-fade. Skipped for reduced motion.
   */
  const setTheme = useCallback(
    (next, origin) => {
      if (next === theme) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return commit(next);

      if (document.startViewTransition && origin) {
        const x = origin.x,
          y = origin.y;
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const t = document.startViewTransition(() => commit(next));
        t.ready
          .then(() =>
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
              { duration: 750, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }
            )
          )
          .catch(() => {});
        return;
      }
      const el = document.documentElement;
      el.classList.add("theme-anim");
      commit(next);
      setTimeout(() => el.classList.remove("theme-anim"), 500);
    },
    [theme, commit]
  );

  const toggle = useCallback((origin) => setTheme(theme === "dark" ? "light" : "dark", origin), [theme, setTheme]);

  // follow the OS setting only until the visitor makes their own choice
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("ma-theme");
    } catch {
      /* ignore */
    }
    if (saved) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const on = (e) => {
      apply(e.matches ? "light" : "dark");
      setThemeState(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
