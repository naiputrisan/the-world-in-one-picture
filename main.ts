// The World in One Picture — a make.fun news-image-20261118 entry.
//
// The entry is the poster beside this file, entry.png: one image that sums up
// the world news of Wednesday 18 November 2026. This program is the delivery
// step: it checks the image against the competition's limits, then copies it
// byte-for-byte to the output directory, where the grader picks it up.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only, no network.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576; // 1 MiB
const MAX_DIM = 1024;

// Dimensions come straight from the image header, so the size cap is checked
// against the real pixels, never trusted from the file name.
// PNG: width and height are big-endian uint32s in the IHDR chunk, at byte
// offsets 16 and 20. JPEG: walk the marker segments until a start-of-frame
// marker (SOF0/SOF1/SOF2) shows up; its payload holds height, then width.
function readDimensions(buf, png) {
  if (png) {
    if (buf.length < 24) return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  let off = 2; // skip the SOI marker
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) return null;
    const marker = buf[off + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
    }
    const len = buf.readUInt16BE(off + 2);
    if (len < 2) return null;
    off += 2 + len;
  }
  return null;
}

function abort(message) {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// The image ships with this program; resolve it relative to this file so the
// entry works from any working directory.
const image = readFileSync(new URL('./entry.png', import.meta.url));

// Format is recognised by magic bytes, never by the file name: the gate takes
// PNG or JPEG bytes in entry.png either way.
const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const isPng =
  image.length >= 8 && pngMagic.every((byte, i) => image[i] === byte);
const isJpeg =
  image.length >= 3 &&
  image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;

if (!isPng && !isJpeg) {
  abort('entry.png is neither a PNG nor a JPEG image (bad magic bytes)');
}
if (image.length > MAX_BYTES) {
  abort(`entry.png is ${image.length} bytes, over the ${MAX_BYTES}-byte limit`);
}
const dims = readDimensions(image, isPng);
if (!dims) {
  abort('entry.png header could not be parsed for its dimensions');
}
if (dims.width > MAX_DIM || dims.height > MAX_DIM) {
  abort(
    `entry.png is ${dims.width}x${dims.height}, over the ${MAX_DIM}x${MAX_DIM} limit`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, image);

console.log(
  `main.ts: copied ${image.length} bytes (${isPng ? 'PNG' : 'JPEG'}, ` +
    `${dims.width}x${dims.height}) to ${outPath}`,
);
