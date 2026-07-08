// Rasterizes public/icon-source.svg into the PNG app icons referenced by
// index.html and manifest.webmanifest. Run with: npm run icons
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const SOURCE = resolve(publicDir, "icon-source.svg");
const OUTPUTS = [
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-16.png", size: 16 },
];

const svg = await readFile(SOURCE);

for (const { file, size } of OUTPUTS) {
  const png = await sharp(svg, { density: 512 })
    .resize(size, size)
    .png()
    .toBuffer();
  await writeFile(resolve(publicDir, file), png);
  console.log(`✓ ${file} (${size}×${size})`);
}
