import fs from 'fs';
import path from 'path';

const chunksDir = path.join(process.cwd(), 'src', 'data', 'chunks');
const outDir = path.join(process.cwd(), 'public', 'data', 'games');

if (!fs.existsSync(chunksDir)) {
  console.error('Chunks directory not found:', chunksDir);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(chunksDir).filter(f => /^chunk\d+\.ts$/.test(f)).sort((a,b) => {
  const ai = parseInt(a.match(/chunk(\d+)\.ts/)?.[1] || '0', 10);
  const bi = parseInt(b.match(/chunk(\d+)\.ts/)?.[1] || '0', 10);
  return ai - bi;
});

if (files.length === 0) {
  console.error('No chunk*.ts files found in', chunksDir);
  process.exit(1);
}

let total = 0;

for (const file of files) {
  const filePath = path.join(chunksDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find first '[' after the "export const" token and the last closing '];'
  const exportIndex = content.indexOf('export const');
  if (exportIndex === -1) {
    console.warn('Skipping', file, '(no export const found)');
    continue;
  }
  const arrayStart = content.indexOf('[', exportIndex);
  const arrayEnd = content.lastIndexOf('];');
  if (arrayStart === -1 || arrayEnd === -1) {
    console.warn('Skipping', file, '(array boundaries not found)');
    continue;
  }

  const arrayText = content.slice(arrayStart, arrayEnd + 1);

  try {
    const parsed = JSON.parse(arrayText);
    const idxMatch = file.match(/chunk(\d+)\.ts/);
    const idx = idxMatch ? parseInt(idxMatch[1], 10) : total;
    const outFile = path.join(outDir, `games-${idx}.json`);
    fs.writeFileSync(outFile, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('Wrote', outFile, `(${parsed.length} games)`);
    total++;
  } catch (err) {
    console.error('Failed to parse JSON from', file, err);
  }
}

// Write manifest
const manifest = { totalChunks: total };
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Wrote manifest.json (totalChunks =', total + ')');
