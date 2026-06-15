import { useId } from "react";

const clamp = (n) => Math.max(0, Math.min(255, n));
function shade(hex, amt) {
  const h = (hex || "#1F62E0").replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const f = (c) => (amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  const to = (c) => clamp(Math.round(c)).toString(16).padStart(2, "0");
  return "#" + to(f(r)) + to(f(g)) + to(f(b));
}

function motif(texture, c) {
  const { dark, darker, light, lighter, mid, base } = c;
  const els = [];
  switch (texture) {
    case "knit":
      for (let r = 0; r < 9; r++) {
        const y = r * 15;
        let pts = "";
        for (let col = 0; col <= 8; col++) pts += `${col * 16},${y + (col % 2 ? 11 : 0)} `;
        els.push(
          <polyline
            key={"k" + r}
            points={pts}
            fill="none"
            stroke={r % 2 ? dark : darker}
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.55"
          />
        );
      }
      break;
    case "jacquard":
      for (let i = -6; i < 18; i++) {
        els.push(
          <line key={"ja" + i} x1={i * 12} y1="0" x2={i * 12 + 120} y2="120" stroke={dark} strokeWidth="1.3" opacity="0.4" />
        );
        els.push(
          <line key={"jb" + i} x1={i * 12} y1="0" x2={i * 12 - 120} y2="120" stroke={darker} strokeWidth="1.3" opacity="0.4" />
        );
      }
      for (let a = 0; a < 8; a++)
        for (let b = 0; b < 8; b++) {
          const x = a * 16 + 8;
          const y = b * 16 + 8;
          els.push(
            <rect key={`jd${a}-${b}`} x={x - 2.4} y={y - 2.4} width="4.8" height="4.8" transform={`rotate(45 ${x} ${y})`} fill={light} opacity="0.5" />
          );
        }
      break;
    case "weave":
      for (let i = 0; i < 10; i++)
        els.push(<rect key={"wv" + i} x={i * 12} y="0" width="6" height="120" fill={i % 2 ? dark : mid} opacity="0.5" />);
      for (let j = 0; j < 10; j++)
        els.push(<rect key={"wh" + j} x="0" y={j * 12} width="120" height="6" fill={j % 2 ? darker : dark} opacity="0.42" />);
      break;
    case "roto": {
      const hues = [base, shade(base, 0.4), shade(base, -0.3), "#E2A019", "#1F8A8A", "#C0392B", shade(base, 0.62)];
      for (let i = 0; i < 12; i++)
        els.push(<rect key={"ro" + i} x={i * 10} y="0" width="10" height="120" fill={hues[i % hues.length]} opacity="0.85" />);
      for (let i = -2; i < 16; i++)
        els.push(<line key={"rl" + i} x1={i * 14} y1="-10" x2={i * 14 + 40} y2="130" stroke={lighter} strokeWidth="1" opacity="0.18" />);
      break;
    }
    case "thread":
      els.push(<rect key="body" x="34" y="18" width="52" height="84" rx="6" fill={mid} />);
      for (let i = 0; i < 22; i++)
        els.push(<line key={"t" + i} x1="34" y1={22 + i * 3.7} x2="86" y2={22 + i * 3.7} stroke={i % 2 ? light : lighter} strokeWidth="1.7" opacity="0.75" />);
      els.push(<rect key="f1" x="28" y="11" width="64" height="11" rx="3.5" fill={darker} />);
      els.push(<rect key="f2" x="28" y="98" width="64" height="11" rx="3.5" fill={darker} />);
      els.push(<path key="loose" d="M86 40 C 106 50 100 72 90 82" stroke={dark} strokeWidth="2.2" fill="none" strokeLinecap="round" />);
      break;
    case "yarn":
    default:
      for (let i = -1; i < 17; i++) {
        const x = i * 8;
        els.push(
          <path key={"y" + i} d={`M ${x} -6 C ${x + 5} 30 ${x - 5} 60 ${x + 5} 92 S ${x} 126 ${x} 126`} stroke={i % 2 ? dark : darker} strokeWidth="3.4" fill="none" strokeLinecap="round" opacity="0.5" />
        );
      }
      for (let i = 0; i < 17; i++) {
        const x = i * 8 + 2.5;
        els.push(<path key={"yh" + i} d={`M ${x} -6 C ${x + 5} 30 ${x - 5} 60 ${x + 5} 92 S ${x} 126 ${x} 126`} stroke={light} strokeWidth="0.9" fill="none" opacity="0.3" />);
      }
      break;
  }
  return els;
}

export function ProductVisual({ texture = "yarn", color, accent = "#1F62E0", className = "" }) {
  const id = useId().replace(/:/g, "");
  const base = color || accent;
  const c = {
    base,
    mid: shade(base, -0.1),
    dark: shade(base, -0.34),
    darker: shade(base, -0.54),
    light: shade(base, 0.52),
    lighter: shade(base, 0.78),
  };
  const bgTop = texture === "thread" ? shade(base, 0.7) : shade(base, 0.35);
  const bgBot = texture === "thread" ? shade(base, 0.45) : shade(base, -0.18);

  return (
    <svg
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${texture} swatch`}
    >
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bgTop} />
          <stop offset="1" stopColor={bgBot} />
        </linearGradient>
        <radialGradient id={`vg${id}`} cx="0.5" cy="0.4" r="0.8">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="120" height="120" fill={`url(#bg${id})`} />
      {motif(texture, c)}
      <rect x="0" y="0" width="120" height="120" fill={`url(#vg${id})`} />
    </svg>
  );
}
