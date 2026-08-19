import fs from 'fs';
import path from 'path';
import { games } from '../src/data/games.ts';

const CHUNK_SIZE = 500;
const outputDir = path.join(process.cwd(), 'src', 'data', 'chunks');

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
console.log(`Generating ${totalChunks} TypeScript chunk files for native Vite code-splitting...`);

for (let i = 0; i < totalChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(processedGames.length, (i + 1) * CHUNK_SIZE);
  const chunkData = processedGames.slice(start, end);
  const fileName = `chunk${i}.ts`;
  const filePath = path.join(outputDir, fileName);

  const content = `import { Game } from '../../types';\n\nexport const chunk${i}: Game[] = ${JSON.stringify(chunkData, null, 2)};\n`;
  fs.writeFileSync(filePath, content);
  console.log(`Wrote ${fileName} (${chunkData.length} games)`);
}

console.log('Successfully generated TypeScript game chunks!');
