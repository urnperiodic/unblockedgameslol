import { useState, useEffect } from 'react';
import { Game } from '../types';
import { chunk0 } from './chunks/chunk0';

export function useGameDataChunks() {
  // Start immediately with chunk0 (500 curated games) so there is NEVER a blank screen
  const [loadedGames, setLoadedGames] = useState<Game[]>(chunk0);
  const [loadedChunksCount, setLoadedChunksCount] = useState(1);
  const totalChunksCount = 6;

  useEffect(() => {
    let isMounted = true;

    async function loadRemainingChunks() {
      // Dynamic ES imports for progressive background loading
      const chunkLoaders = [
        () => import('./chunks/chunk1'),
        () => import('./chunks/chunk2'),
        () => import('./chunks/chunk3'),
        () => import('./chunks/chunk4'),
        () => import('./chunks/chunk5')
      ];

      for (let i = 0; i < chunkLoaders.length; i++) {
        if (!isMounted) break;

        // Yield to main UI thread briefly before loading next chunk
        await new Promise(res => setTimeout(res, 200));

        try {
          const mod = await chunkLoaders[i]();
          const chunkKey = `chunk${i + 1}` as keyof typeof mod;
          const chunkData = mod[chunkKey] as Game[];

          if (isMounted && Array.isArray(chunkData)) {
            setLoadedGames(prev => [...prev, ...chunkData]);
            setLoadedChunksCount(i + 2);
          }
        } catch (err) {
          console.warn(`Failed to dynamically load chunk ${i + 1}:`, err);
        }
      }
    }

    loadRemainingChunks();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    games: loadedGames,
    loadedChunksCount,
    totalChunksCount
  };
}
