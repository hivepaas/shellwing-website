// Renders og-image.svg to public/og-image.png, the image a shared link to
// shellwing.app shows, and the logo to the favicons and the touch icon.
// Run from landing/: node og/render.mjs
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

await sharp('og/og-image.svg', { density: 72 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');
console.log('public/og-image.png written');

const logo = (size) =>
  sharp('public/logo.svg', { density: 300 })
    .resize(size, size)
    .png({ compressionLevel: 9 });

await logo(32).toFile('public/favicon-32x32.png');
await logo(180).toFile('public/apple-touch-icon.png');

// favicon.ico: one 32×32 PNG in an ICO wrapper (a 6-byte header, a 16-byte
// entry, then the PNG as is), which every browser reads.
const png = await logo(32).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // an icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18); // where the image starts
writeFileSync('public/favicon.ico', Buffer.concat([header, png]));
console.log(
  'public/favicon-32x32.png, apple-touch-icon.png and favicon.ico written'
);
