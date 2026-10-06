// Builds the cream client-logo strip shown under the home hero (Figma frame 768:9042, sage
// bar) from the single-logo files in public/images/figma/clients/logos/client-NN.svg, in
// the order below, recoloured cream:
//   public/images/figma/clients/clients-strip-v2-cream.svg
// Run from the repo root: node scripts/build-clients-strip.cjs
// The strip carries half a gap of padding on each side, so two copies placed side by side
// (the marquee) repeat with exactly the gap between logos. The gold C-store bar does not use
// this file; it lists the same logo files itself (cStoreClientLogos in src/lib/content.ts).
const fs = require("fs");
const path = require("path");

// Figma order, left to right (client-NN.svg numbers).
const ORDER = [1, 4, 20, 15, 19, 14, 17, 7, 16, 18, 12, 11, 21, 5, 3, 9, 2, 6, 8, 10, 22, 23, 13];

const GAP = 1341; // Figma gap between logos
const CONTENT_H = 1170.742; // tallest logo; logos are centred on this
const PAD_Y = 200;
const HEIGHT = 102; // final strip height (same as the previous strip)
const dir = "public/images/figma/clients/logos/";

if (new Set(ORDER).size !== 23) throw new Error("ORDER must list each of the 23 logos once");

const logos = ORDER.map((n) => {
  const svg = fs.readFileSync(path.join(dir, `client-${String(n).padStart(2, "0")}.svg`), "utf8");
  const head = svg.match(/<svg[^>]*>/)[0];
  const w = parseFloat(head.match(/width="([\d.]+)"/)[1]);
  const h = parseFloat(head.match(/height="([\d.]+)"/)[1]);
  let inner = svg.slice(head.length, svg.lastIndexOf("</svg>"));
  // Figma layer names (id="Vector"...) repeat across logos; keep only ids that something references.
  const used = new Set([...inner.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]));
  inner = inner.replace(/\sid="([^"]*)"/g, (m, id) => (used.has(id) ? m : ""));
  return { w, h, inner };
});

let x = GAP / 2;
let body = "";
for (const l of logos) {
  const y = PAD_Y + (CONTENT_H - l.h) / 2;
  body += `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})">${l.inner.replace(/\s+/g, " ")}</g>\n`;
  x += l.w + GAP;
}
const totalW = x - GAP; // x ends one full gap after the last logo; keep only half of it
const totalH = PAD_Y * 2 + CONTENT_H;
const outW = Math.round((totalW * HEIGHT) / totalH);

const svg = `<svg width="${outW}" height="${HEIGHT}" viewBox="0 0 ${totalW.toFixed(2)} ${totalH.toFixed(2)}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${body.replaceAll("#547255", "#FFF4E0")}</svg>\n`;
fs.writeFileSync("public/images/figma/clients/clients-strip-v2-cream.svg", svg);
console.log("strip", outW, "x", HEIGHT, "viewBox", totalW.toFixed(1), "x", totalH.toFixed(1));
