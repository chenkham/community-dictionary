const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'apps', 'web', 'public');
const svg = fs.readFileSync(path.join(pub, 'icon.svg'));

// Maskable version: full-bleed (no rounded corners, content fits within safe zone).
const maskableSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0891B2"/>
      <stop offset="100%" stop-color="#0077B6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <text x="256" y="305" text-anchor="middle" font-family="serif" font-weight="bold" font-size="170" fill="white">TK</text>
</svg>`);

(async () => {
  // Standard icons (any)
  await sharp(svg).resize(192, 192).png().toFile(path.join(pub, 'logo-192.png'));
  await sharp(svg).resize(512, 512).png().toFile(path.join(pub, 'logo-512.png'));

  // Maskable icons (full-bleed, content in safe zone)
  await sharp(maskableSvg).resize(192, 192).png().toFile(path.join(pub, 'logo-192-maskable.png'));
  await sharp(maskableSvg).resize(512, 512).png().toFile(path.join(pub, 'logo-512-maskable.png'));

  // iOS apple-touch-icon
  await sharp(svg).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));

  // Favicon (32x32)
  await sharp(svg).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'));

  console.log('Generated:',
    'logo-192.png, logo-512.png,',
    'logo-192-maskable.png, logo-512-maskable.png,',
    'apple-touch-icon.png, favicon-32.png');
})();
