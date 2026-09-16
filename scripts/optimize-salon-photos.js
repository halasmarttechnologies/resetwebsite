const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'imagess');
const outputSalonDir = path.join(__dirname, '..', 'public', 'images', 'salon');

if (!fs.existsSync(outputSalonDir)) {
  fs.mkdirSync(outputSalonDir, { recursive: true });
}

// Map of canonical file names to semantic names
const semanticMap = {
  'A7R09032.jpg': 'salon-lounge-interior',
  'A7R09036.jpg': 'salon-rotunda-boutique',
  'A7R09034.jpg': 'salon-chairs-floor',
  'A7R09048.jpg': 'salon-armchair-neon',
  'A7R09050.jpg': 'boutique-bag-showcase',
  'A7R09051.jpg': 'boutique-sneaker-showcase',
  'RR6.jpg': 'lifestyle-triptych',
  'VDW.jpg': 'haircut-fade-triptych',
  'A7R01184.jpg': 'beard-sculpting-foil-shaver',
  'A7R01197.jpg': 'beard-razor-contouring',
  'A7R09911.jpg': 'haircut-skin-fade-profile',
  'A7R09916.jpg': 'barber-straight-razor-shave',
  'A7R09922.jpg': 'haircut-scissor-detailing',
  'A7R09929.jpg': 'beard-scissor-sculpting',
  'A7R09936.jpg': 'stylist-haircut-mirror',
  'A7R09888.jpg': 'haircut-curly-fade',
  'A7R09901.jpg': 'scissor-taper-styling',
  'A7R09905.jpg': 'stylist-client-satisfaction',
  'A7R01271.jpg': 'japanese-head-spa-halo',
  'A7R01277.jpg': 'japanese-head-spa-massage',
  'A7R09012.jpg': 'shampoo-wash-station',
  'A7R09030.jpg': 'scalp-rinse-treatment',
  'A7R01269.jpg': 'pedicure-luxury-soak',
  'A7R01270.jpg': 'pedicure-nail-care',
  'A7R01272.jpg': 'manicure-hand-grooming',
  'A7R01292.jpg': 'manicure-massage-care',
};

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  console.log(`Starting image optimization for ${files.length} items...`);

  let totalOrigBytes = 0;
  let totalOptBytes = 0;

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

    // Skip the spaced duplicates if identical, or normalize
    if (file.startsWith('mj')) continue;

    const sourcePath = path.join(inputDir, file);
    const stat = fs.statSync(sourcePath);
    totalOrigBytes += stat.size;

    console.log(`Processing: ${file} (${(stat.size / 1024 / 1024).toFixed(1)} MB)...`);

    try {
      const origBuffer = fs.readFileSync(sourcePath);
      const metadata = await sharp(origBuffer).metadata();

      // Determine max dimension (1920px max for high-res web displays)
      const maxDim = 1920;

      // 1. Create WebP version in public/images/salon/<semantic>.webp
      const semanticName = semanticMap[file] || path.parse(file).name.toLowerCase();
      const salonWebpPath = path.join(outputSalonDir, `${semanticName}.webp`);
      const salonJpgPath = path.join(outputSalonDir, `${semanticName}.jpg`);

      const webpBuffer = await sharp(origBuffer)
        .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toBuffer();

      const jpgBuffer = await sharp(origBuffer)
        .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(salonWebpPath, webpBuffer);
      fs.writeFileSync(salonJpgPath, jpgBuffer);

      // 2. Also optimize in-place the original file in public/imagess/ so any direct reference is lightweight!
      fs.writeFileSync(sourcePath, jpgBuffer);

      // And write a sibling .webp in public/imagess/
      const imagessWebpPath = path.join(inputDir, `${path.parse(file).name}.webp`);
      fs.writeFileSync(imagessWebpPath, webpBuffer);

      totalOptBytes += jpgBuffer.length + webpBuffer.length;
      console.log(`  -> Saved as ${semanticName}.webp (${(webpBuffer.length / 1024).toFixed(1)} KB) & jpg (${(jpgBuffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error on ${file}:`, err.message);
    }
  }

  // Also handle the mj duplicates cleanly
  if (fs.existsSync(path.join(inputDir, 'mj  (1).jpg'))) {
    fs.unlinkSync(path.join(inputDir, 'mj  (1).jpg'));
  }
  if (fs.existsSync(path.join(inputDir, 'mj  (2).jpg'))) {
    fs.unlinkSync(path.join(inputDir, 'mj  (2).jpg'));
  }
  if (fs.existsSync(path.join(inputDir, 'mj.jpg'))) {
    fs.unlinkSync(path.join(inputDir, 'mj.jpg'));
  }

  console.log('\n======================================');
  console.log(`Original total size: ${(totalOrigBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimized total size: ${(totalOptBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimization completed successfully!`);
  console.log('======================================\n');
}

optimizeImages();
