// Generates static social-share assets committed to public/:
//   - og.png            (1200×630 Open Graph / Twitter card)
//   - apple-touch-icon.png (180×180, rasterized favicon)
//
// Run locally with `pnpm og`. The output is committed, so CI never needs
// resvg or network fonts — this keeps the rendered text deterministic
// across build environments. Re-run only when the name/tagline/mark change.

import { Resvg } from "@resvg/resvg-js";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const fontDir = join(__dirname, ".fonts");

const FONTS = {
  regular: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
  bold: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
};

async function loadFont(name, url) {
  const path = join(fontDir, `inter-${name}.ttf`);
  if (existsSync(path)) return readFile(path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(fontDir, { recursive: true });
  await writeFile(path, buf);
  return buf;
}

// Hero DAG geometry — same nodes/edges as the homepage constellation, so the
// share card reads as the same artifact.
const EDGES = [
  [780, 120, 940, 200], [940, 200, 1080, 160], [940, 200, 1020, 320],
  [780, 120, 700, 280], [700, 280, 840, 360], [840, 360, 1020, 320],
  [1020, 320, 1100, 460], [840, 360, 920, 520], [920, 520, 1100, 460],
  [700, 280, 620, 460], [620, 460, 920, 520],
];
const NODES = [
  [780, 120, 2.6], [940, 200, 3.2], [1080, 160, 2.4], [700, 280, 2.6],
  [1020, 320, 2.8], [840, 360, 3.0], [1100, 460, 2.4], [620, 460, 2.6],
  [920, 520, 2.8],
];

// Constellation lives in a 1200×800 space; drop it into the right of the card.
const cx = 70, cy = 30, cs = 0.62; // translate x/y + scale
const tx = (x) => (x * cs + cx).toFixed(1);
const ty = (y) => (y * cs + cy).toFixed(1);

const edges = EDGES.map(
  ([x1, y1, x2, y2]) =>
    `<line x1="${tx(x1)}" y1="${ty(y1)}" x2="${tx(x2)}" y2="${ty(y2)}" />`
).join("");
const nodes = NODES.map(
  ([x, y, r]) => `<circle cx="${tx(x)}" cy="${ty(y)}" r="${(r * cs).toFixed(1)}" />`
).join("");

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0a0a0a" stop-opacity="1"/>
      <stop offset="0.46" stop-color="#0a0a0a" stop-opacity="0.96"/>
      <stop offset="0.72" stop-color="#0a0a0a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0a0a0a" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a"/>

  <g stroke="#e7e3da" stroke-opacity="0.13" stroke-width="1" fill="none">${edges}</g>
  <g fill="#e7e3da" fill-opacity="0.22">${nodes}</g>
  <circle cx="${tx(940)}" cy="${ty(200)}" r="${(6.5 * cs).toFixed(1)}" fill="#e88b5f" fill-opacity="0.7"/>

  <rect width="760" height="630" fill="url(#veil)"/>

  <!-- site mark -->
  <g transform="translate(80, 150)">
    <line x1="11" y1="10" x2="20" y2="14.5" stroke="#8c8c88" stroke-width="2" stroke-linecap="round"/>
    <line x1="11" y1="29" x2="20" y2="24.5" stroke="#8c8c88" stroke-width="2" stroke-linecap="round"/>
    <circle cx="7" cy="9" r="4" fill="none" stroke="#dcdcd6" stroke-width="2"/>
    <circle cx="7" cy="30" r="4" fill="none" stroke="#dcdcd6" stroke-width="2"/>
    <circle cx="26" cy="19.5" r="5.5" fill="#e88b5f"/>
  </g>

  <text x="80" y="270" font-family="Inter" font-weight="400" font-size="22" letter-spacing="3" fill="#9ca3af">MASTER'S STUDENT · HUMAN AND AI · UTN NÜRNBERG</text>

  <text x="78" y="372" font-family="Inter" font-weight="700" font-size="96" fill="#ffffff">Xiaochuan Li<tspan fill="#e88b5f">.</tspan></text>

  <text x="80" y="452" font-family="Inter" font-weight="400" font-size="31" fill="#c9cdd4">Causal inference × interpretability —</text>
  <text x="80" y="498" font-family="Inter" font-weight="400" font-size="31" fill="#7e8590">stability is necessary, but not sufficient for grounding.</text>

  <rect x="0" y="624" width="1200" height="6" fill="#e88b5f"/>
</svg>`;

async function render(svg, width, fonts, out) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontBuffers: fonts, defaultFontFamily: "Inter", loadSystemFonts: false },
  });
  await writeFile(join(root, "public", out), resvg.render().asPng());
  console.log(`wrote public/${out}`);
}

const [regular, bold] = await Promise.all([
  loadFont("regular", FONTS.regular),
  loadFont("bold", FONTS.bold),
]);

await render(og, 1200, [regular, bold], "og.png");

const favicon = await readFile(join(root, "public", "favicon.svg"), "utf8");
await render(favicon, 180, [regular, bold], "apple-touch-icon.png");
