/** [top (near-black), middle, bottom] */
const PALETTES = [
  ["#0c0605", "#b8321a", "#e0702a"], // ember
  ["#05070f", "#1a3fb0", "#3b82f6"], // ocean
  ["#050a06", "#0f7a3a", "#22c55e"], // green
  ["#0c0706", "#c2561f", "#e8894a"], // peach
  ["#08050f", "#5a2fb8", "#a855f7"], // violet
];

export const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Stable hash so the same course always gets the same palette (SSR-safe). */
function hashString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function getCoursePalette(title: string) {
  const [top, mid, bottom] = PALETTES[hashString(title) % PALETTES.length];
  return {
    top,
    mid,
    bottom,
    background: `linear-gradient(180deg, ${top} 0%, ${mid} 65%, ${bottom} 100%)`,
  };
}