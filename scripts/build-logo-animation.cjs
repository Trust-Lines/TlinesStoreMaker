// Builds public/images/logo-animation/logo-animated.svg and .gif from the two source logos in ./source.
// Run from the repo root: node scripts/build-logo-animation.cjs
const fs = require("fs");
const sharp = require("sharp");

const dir = "public/images/logo-animation/";
const paths = (file) => [...fs.readFileSync(dir + "source/" + file, "utf8").matchAll(/<path [^>]*\/>/g)].map((m) => m[0]);
const p666 = paths("group-666.svg");
const p667 = paths("group-667.svg");

const mark = p666.slice(0, 2); // the box mark is identical in both files
const textA = p666.slice(2); // "T Lines / STORE MAKER"
const textB = p667.slice(0, -2); // "STORE / MAKER"
if (p667.slice(-2).join() !== mark.join()) throw new Error("marks differ");

const W = 358, H = 95;

// ---- animated SVG (CSS keyframes, 6.3 s loop: 2.5 s hold, old text out 0.3 s, new text in 0.35 s, 2.5 s hold, ...)
const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="T Lines Store Maker">
<style>
.a{animation:a 6.3s ease-in-out infinite}
.b{animation:b 6.3s ease-in-out infinite;opacity:0}
@keyframes a{0%,39.68%{opacity:1;transform:translateY(0)}44.44%{opacity:0;transform:translateY(-12px)}94.44%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
@keyframes b{0%,44.44%{opacity:0;transform:translateY(12px)}50%{opacity:1;transform:translateY(0)}89.68%{opacity:1;transform:translateY(0)}94.44%{opacity:0;transform:translateY(-12px)}100%{opacity:0;transform:translateY(12px)}}
@media (prefers-reduced-motion:reduce){.a,.b{animation:none}.a{opacity:1}.b{opacity:0}}
</style>
<g>${mark.join("")}</g>
<g class="a">${textA.join("")}</g>
<g class="b">${textB.join("")}</g>
</svg>
`;
fs.writeFileSync(dir + "logo-animated.svg", svg);
// cream ink for the coral and sage top bars
fs.writeFileSync(dir + "logo-animated-cream.svg", svg.replaceAll("#2E4437", "#FFF4E0"));

// ---- GIF (solid gold background; a GIF cannot be transparent with soft edges)
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const frameSvg = (aOpacity, aY, bOpacity, bY) => `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="${W}" height="${H}" fill="#F7C56B"/>
<g>${mark.join("")}</g>
<g opacity="${aOpacity}" transform="translate(0 ${aY})">${textA.join("")}</g>
<g opacity="${bOpacity}" transform="translate(0 ${bY})">${textB.join("")}</g>
</svg>`;

const frames = []; // { svg, delay }
const OUT = 8, IN = 9, D = 12;
const hold = (aOp, aY, bOp, bY) => frames.push({ svg: frameSvg(aOp, aY, bOp, bY), delay: 2500 });
const swap = (fromIsA) => {
  for (let i = 1; i <= OUT; i++) {
    const t = ease(i / (OUT + 1));
    frames.push({ svg: fromIsA ? frameSvg(1 - t, -D * t, 0, D) : frameSvg(0, D, 1 - t, -D * t), delay: 38 });
  }
  for (let i = 1; i <= IN; i++) {
    const t = ease(i / (IN + 1));
    frames.push({ svg: fromIsA ? frameSvg(0, -D, t, D * (1 - t)) : frameSvg(t, D * (1 - t), 0, -D), delay: 38 });
  }
};
hold(1, 0, 0, D);
swap(true);
hold(0, -D, 1, 0);
swap(false);

(async () => {
  const buffers = [];
  for (const f of frames) {
    buffers.push(await sharp(Buffer.from(f.svg), { density: 216 }).flatten({ background: "#F7C56B" }).png().toBuffer());
  }
  const meta = await sharp(buffers[0]).metadata();
  console.log("frame size", meta.width, "x", meta.height, "frames", buffers.length);
  await sharp(buffers, { join: { animated: true } })
    .gif({ delay: frames.map((f) => f.delay), loop: 0, colours: 24, dither: 0, effort: 10 })
    .toFile(dir + "logo-animated.gif");
  const out = await sharp(dir + "logo-animated.gif", { animated: true }).metadata();
  console.log("gif pages", out.pages, "size", fs.statSync(dir + "logo-animated.gif").size);
  // a few still frames for a quick look
  await sharp(buffers[0]).toFile(process.env.TEMP + "/scan/logo-f-a.png");
  await sharp(buffers[5]).toFile(process.env.TEMP + "/scan/logo-f-mid.png");
  await sharp(buffers[10]).toFile(process.env.TEMP + "/scan/logo-f-mid2.png");
  await sharp(buffers[19]).toFile(process.env.TEMP + "/scan/logo-f-b.png");
})();
