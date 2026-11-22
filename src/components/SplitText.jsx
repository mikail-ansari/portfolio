import { m, useReducedMotion } from "framer-motion";

/**
 * Masked per-character reveal. Plays when scrolled into view, or when `play` flips to true
 * (used by the hero once the preloader is gone). The text stays readable to screen readers.
 */
export default function SplitText({ text, className = "", delay = 0, stagger = 0.03, play, as: Tag = "span", once = true }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let n = 0;
  const trigger = play === undefined ? { whileInView: "show", viewport: { once, margin: "-8% 0px" } } : { animate: play ? "show" : "hide" };

  return (
    <Tag className={className} aria-label={text}>
      <m.span initial="hide" {...trigger} className="inline" aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...w].map((c) => {
              const i = n++;
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <m.span
                    className="inline-block"
                    variants={{ hide: { y: reduce ? 0 : "115%", opacity: reduce ? 0 : 1 }, show: { y: 0, opacity: 1 } }}
                    transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
                  >
                    {c}
                  </m.span>
                </span>
              );
            })}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
