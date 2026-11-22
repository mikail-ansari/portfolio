import SplitText from "./SplitText.jsx";

/** Big scroll-triggered section title with a mono index label. */
export default function SectionHeading({ id, index, eyebrow, title, outlineWord, className = "" }) {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <span>{index}</span>
        <span className="h-px w-10 bg-lime" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="display mt-5 text-[clamp(2.1rem,8vw,6.5rem)] text-fg">
        <SplitText text={title} />
        {outlineWord && (
          <>
            {" "}
            <span className="outline-accent">
              <SplitText text={outlineWord} delay={0.15} />
            </span>
          </>
        )}
      </h2>
    </div>
  );
}
