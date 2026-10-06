// Generates the raster assets search engines and social networks ask for:
//   src/app/opengraph-image.jpg / twitter-image.jpg  1200x630 share card (hero photo + logo)
//   src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (16/32/48)
//   public/images/brand/logo.png                     logo for structured data (Organization.logo)
//   public/images/figma/hero-photo.webp               lighter hero poster (LCP image)
// Run from the repo root: node scripts/build-seo-assets.cjs
const fs = require("fs");
const sharp = require("sharp");

const GOLD = "#F7C56B";
const FOREST = "#2E4437";

(async () => {
  // ---- hero poster as webp
  await sharp("public/images/figma/hero-photo.png").webp({ quality: 82 }).toFile("public/images/figma/hero-photo.webp");

  // ---- share card: hero photo, forest wash from the left, cream logo
  const logo = await sharp(fs.readFileSync("public/images/figma/topbar-logo-cream-v2.svg"), { density: 288 })
    .resize({ width: 460 })
    .png()
    .toBuffer();
  const wash = Buffer.from(
    `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${FOREST}" stop-opacity="0.88"/><stop offset="0.6" stop-color="${FOREST}" stop-opacity="0.45"/><stop offset="1" stop-color="${FOREST}" stop-opacity="0.1"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`,
  );
  const card = await sharp("public/images/figma/hero-photo.webp")
    .resize(1200, 630, { fit: "cover", position: "right" })
    .composite([
      { input: wash },
      { input: logo, left: 70, top: 630 - 70 - (await sharp(logo).metadata()).height },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync("src/app/opengraph-image.jpg", card);
  fs.writeFileSync("src/app/twitter-image.jpg", card);

  // ---- icons: the box mark in forest on gold
  const markSvg = fs.readFileSync("public/images/logo-animation/source/group-666.svg", "utf8");
  const markPaths = [...markSvg.matchAll(/<path [^>]*\/>/g)].slice(0, 2).map((m) => m[0]).join("");
  const icon = (size) => {
    const mark = Math.round(size * 0.62);
    const x = Math.round((size - mark * (97 / 95)) / 2);
    const y = Math.round((size - mark) / 2);
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="${GOLD}"/><svg x="${x}" y="${y}" width="${Math.round(mark * (97 / 95))}" height="${mark}" viewBox="0 0 97 95">${markPaths}</svg></svg>`;
    return sharp(Buffer.from(svg), { density: 144 }).resize(size, size).png().toBuffer();
  };
  fs.writeFileSync("src/app/icon.png", await icon(512));
  fs.writeFileSync("src/app/apple-icon.png", await icon(180));

  // favicon.ico: PNG images inside an ICO container (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => icon(s)));
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const o = 6 + i * 16;
    header[o] = s;
    header[o + 1] = s;
    header[o + 2] = 0;
    header[o + 3] = 0;
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(pngs[i].length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += pngs[i].length;
  });
  fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...pngs]));

  // ---- logo for structured data (forest logo on white, raster)
  fs.mkdirSync("public/images/brand", { recursive: true });
  await sharp(fs.readFileSync("public/images/figma/topbar-logo.svg"), { density: 288 })
    .resize({ width: 800 })
    .flatten({ background: "#ffffff" })
    .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "#ffffff" })
    .png()
    .toFile("public/images/brand/logo.png");

  console.log("seo assets done");
})();
