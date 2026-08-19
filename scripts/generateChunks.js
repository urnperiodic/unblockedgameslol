import fs from 'fs';
import path from 'path';
import { games } from '../src/data/games.ts';

const CHUNK_SIZE = 500;
const outputDir = path.join(process.cwd(), 'public', 'data', 'chunks');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process and add stable IDs & flags
const processedGames = games.map((game, index) => {
  if (!game.id) {
    const slug = (game.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return {
      ...game,
      id: `game-gen-${index}-${slug}`
    };
  }
  return game;
}).sort((a, b) => {
  const aAi = a.isAiGenerated === true || a.isAiGenerated === 'true';
  const bAi = b.isAiGenerated === true || b.isAiGenerated === 'true';
  if (aAi && !bAi) return 1;
  if (!aAi && bAi) return -1;

  const aFeatured = a.featured === true || a.featured === 'true';
  const bFeatured = b.featured === true || b.featured === 'true';
  if (aFeatured && !bFeatured) return -1;
  if (!aFeatured && bFeatured) return 1;
  return 0;
});

const totalChunks = Math.ceil(processedGames.length / CHUNK_SIZE);
console.log(`Splitting ${processedGames.length} games into ${totalChunks} chunks of ${CHUNK_SIZE}...`);

const chunkManifest = [];

for (let i = 0; i < totalChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(processedGames.length, (i + 1) * CHUNK_SIZE);
  const chunkData = processedGames.slice(start, end);
  const fileName = `chunk_${i}.json`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(chunkData));
  chunkManifest.push({
    index: i,
    fileName,
    count: chunkData.length,
    path: `/data/chunks/${fileName}`
  });
  console.log(`Wrote ${fileName} with ${chunkData.length} games (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
}

fs.writeFileSync(
  path.join(outputDir, 'manifest.json'),
  JSON.stringify({ totalGames: processedGames.length, totalChunks, chunks: chunkManifest }, null, 2)
);

console.log('Successfully generated JSON game data chunks and manifest!');
