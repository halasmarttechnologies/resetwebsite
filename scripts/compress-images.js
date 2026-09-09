const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      results.push({ fullPath, size: stat.size, ext: path.extname(file).toLowerCase() });
    }
  });
  return results;
}

async function run() {
  const files = getFiles('public');
  console.log(`Found ${files.length} images in public/`);
  let initialTotal = 0;
  let finalTotal = 0;

  for (const file of files) {
    const origBuffer = fs.readFileSync(file.fullPath);
    const origSize = origBuffer.length;
    initialTotal += origSize;
    const origSizeKB = (origSize / 1024).toFixed(1);

    try {
      const meta = await sharp(origBuffer).metadata();
      let pipeline = sharp(origBuffer);

      // Resize if excessive resolution (> 1920px)
      if (meta.width && (meta.width > 1920 || meta.height > 1920)) {
        pipeline = pipeline.resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      let buffer;
      if (file.ext === '.jpg' || file.ext === '.jpeg') {
        buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      } else if (file.ext === '.webp') {
        buffer = await pipeline.webp({ quality: 80, effort: 6 }).toBuffer();
      } else if (file.ext === '.png') {
        if (!meta.hasAlpha) {
          buffer = await pipeline.png({ quality: 80, compressionLevel: 9, palette: true, effort: 8 }).toBuffer();
        } else {
          buffer = await pipeline.png({ compressionLevel: 9, effort: 8 }).toBuffer();
        }
      }

      if (buffer && buffer.length < origSize) {
        fs.writeFileSync(file.fullPath, buffer);
        const newSizeKB = (buffer.length / 1024).toFixed(1);
        finalTotal += buffer.length;
        console.log(`[Compressed] ${file.fullPath}: ${origSizeKB} KB -> ${newSizeKB} KB (-${Math.round((1 - buffer.length / origSize) * 100)}%)`);
      } else {
        finalTotal += origSize;
        console.log(`[Skipped] ${file.fullPath}: already optimal (${origSizeKB} KB)`);
      }

      // If it is a photo PNG without alpha, ensure high quality .webp sibling exists
      if (file.ext === '.png' && !meta.hasAlpha) {
        const webpPath = file.fullPath.replace(/\.png$/i, '.webp');
        const webpBuf = await sharp(origBuffer).webp({ quality: 80, effort: 6 }).toBuffer();
        fs.writeFileSync(webpPath, webpBuf);
        console.log(`  + WebP sibling: ${webpPath} (${(webpBuf.length / 1024).toFixed(1)} KB)`);
      }

    } catch (err) {
      console.error(`Error processing ${file.fullPath}:`, err.message);
      finalTotal += origSize;
    }
  }

  console.log('\n=============================');
  console.log(`Initial total size: ${(initialTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Final total size:   ${(finalTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total saved:        ${((initialTotal - finalTotal) / (1024 * 1024)).toFixed(2)} MB (${Math.round((1 - finalTotal / initialTotal) * 100)}% reduction)`);
  console.log('=============================\n');
}

run();
