import { useId } from "react";

/**
 * Generated placeholder artwork used until you add real images.
 * Each category gets its own motif so the gallery still reads as an editorial wall,
 * and every tile carries a visible "Placeholder" tag so it is never mistaken for client work.
 */
export default function PlaceholderArt({ category, seed = 0, label = true, className = "" }) {
  const id = useId().replace(/:/g, "");
  const rot = (seed * 37) % 60;
  const hue = [
    ["var(--violet)", "var(--lime)"],
    ["var(--neon)", "var(--violet)"],
    ["var(--lime)", "var(--violet)"],
  ][seed % 3];

  const motif = () => {
    switch (category) {
      case "Print Design":
        return (
          <g>
            <rect x="90" y="110" width="220" height="280" rx="6" fill="#fff" opacity=".92" />
            <rect x="110" y="135" width="120" height="14" rx="3" fill={hue[0]} />
            <rect x="110" y="160" width="170" height="6" rx="3" fill="#0003" />
            <rect x="110" y="174" width="150" height="6" rx="3" fill="#0003" />
            <rect x="110" y="215" width="180" height="110" rx="4" fill={`url(#g${id})`} />
            {[[90, 110], [310, 110], [90, 390], [310, 390]].map(([x, y], i) => (
              <path key={i} d={`M${x - 14} ${y}h10M${x} ${y - 14}v10`} stroke="#000" strokeWidth="1.5" />
            ))}
            {["#00b7eb", "#e6007e", "#ffd400", "#111"].map((c, i) => (
              <circle key={c} cx={125 + i * 22} cy="355" r="7" fill={c} />
            ))}
          </g>
        );
      case "Digital Artwork":
        return (
          <g fill="none" strokeWidth="2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <ellipse key={i} cx="200" cy="250" rx={30 + i * 22} ry={70 + i * 12} stroke={i % 2 ? hue[0] : hue[1]} opacity={0.9 - i * 0.1} transform={`rotate(${rot + i * 14} 200 250)`} />
            ))}
            <circle cx="200" cy="250" r="26" fill={hue[1]} stroke="none" />
          </g>
        );
      case "Marketing Materials":
        return (
          <g>
            <rect x="60" y="80" width="280" height="340" rx="10" fill="#fff" opacity=".93" />
            <rect x="80" y="105" width="150" height="26" rx="4" fill={hue[0]} />
            <rect x="80" y="145" width="220" height="10" rx="4" fill="#0003" />
            <rect x="80" y="165" width="190" height="10" rx="4" fill="#0003" />
            <circle cx="270" cy="285" r="52" fill={hue[1]} />
            <rect x="80" y="250" width="110" height="70" rx="6" fill={`url(#g${id})`} />
            <rect x="80" y="355" width="120" height="38" rx="19" fill="#111" />
          </g>
        );
      case "Print Production":
        return (
          <g>
            <rect x="40" y="70" width="320" height="360" fill="#fff" opacity=".92" />
            {["#00b7eb", "#e6007e", "#ffd400", "#111", "#00b7eb88", "#e6007e88", "#ffd40088", "#1118"].map((c, i) => (
              <rect key={i} x={55 + i * 37} y="85" width="32" height="28" fill={c} />
            ))}
            <circle cx="200" cy="260" r="62" fill="none" stroke="#111" strokeWidth="2" />
            <path d="M200 180v160M120 260h160" stroke="#111" strokeWidth="2" />
            <circle cx="200" cy="260" r="26" fill="none" stroke="#e6007e" strokeWidth="2" />
            <rect x="55" y="395" width="290" height="22" fill={`url(#g${id})`} />
          </g>
        );
      case "Web Design":
        return (
          <g>
            <rect x="38" y="110" width="324" height="280" rx="12" fill="#0d0b14" stroke="#fff3" />
            <path d="M38 142h324" stroke="#fff3" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={58 + i * 16} cy="126" r="4.5" fill={["#ff5f57", "#febc2e", "#28c840"][i]} />
            ))}
            <rect x="62" y="170" width="150" height="20" rx="4" fill="#fff" opacity=".9" />
            <rect x="62" y="200" width="200" height="9" rx="4" fill="#fff6" />
            <rect x="62" y="218" width="170" height="9" rx="4" fill="#fff6" />
            <rect x="62" y="246" width="92" height="30" rx="15" fill={hue[1]} />
            <rect x="62" y="300" width="276" height="70" rx="8" fill={`url(#g${id})`} opacity=".9" />
          </g>
        );
      case "App UI":
        return (
          <g>
            <rect x="60" y="128" width="280" height="14" rx="7" fill="#fff" opacity=".9" />
            <rect x="60" y="154" width="200" height="8" rx="4" fill="#fff" opacity=".45" />
            <rect x="60" y="172" width="170" height="8" rx="4" fill="#fff" opacity=".45" />
            <rect x="60" y="198" width="96" height="30" rx="15" fill={hue[1]} />
            <rect x="60" y="248" width="86" height="96" rx="10" fill={`url(#g${id})`} />
            <rect x="157" y="248" width="86" height="96" rx="10" fill="#fff" opacity=".14" />
            <rect x="254" y="248" width="86" height="96" rx="10" fill="#fff" opacity=".14" />
          </g>
        );
      default: // Graphic Design
        return (
          <g>
            <circle cx="150" cy="220" r="96" fill={hue[1]} />
            <rect x="170" y="190" width="150" height="150" rx="12" fill={hue[0]} transform={`rotate(${rot - 20} 245 265)`} opacity=".92" />
            <path d="M70 380 L180 300 L260 400 Z" fill="#fff" opacity=".9" />
            <text x="60" y="140" fontSize="70" fontWeight="800" fill="#fff" fontFamily="Syne Variable, sans-serif">
              Aa
            </text>
          </g>
        );
    }
  };

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={hue[0]} />
            <stop offset="1" stopColor={hue[1]} />
          </linearGradient>
          <radialGradient id={`b${id}`} cx="30%" cy="20%" r="90%">
            <stop offset="0" stopColor={hue[0]} stopOpacity=".55" />
            <stop offset="1" stopColor="#0b0912" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#b${id})`} />
        {motif()}
      </svg>
      {label && <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">Placeholder</span>}
    </div>
  );
}
