import { useState, useEffect } from 'react';
import { Game } from '../types';
import { games as fallbackGamesData } from './games';

// Helper to format fallback static games if JSON fetch is offline
const fallbackGames = fallbackGamesData.map((game, index) => {
  if (!game.id) {
    const slug = (game.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return {
      ...game,
      id: `game-gen-${index}-${slug}`
    };
  }
  return game;
});

export function useGameDataChunks() {
  const [loadedGames, setLoadedGames] = useState<Game[]>([]);
  const [isLoadingChunks, setIsLoadingChunks] = useState(true);
  const [loadedChunksCount, setLoadedChunksCount] = useState(0);
  const [totalChunksCount, setTotalChunksCount] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadChunks() {
      try {
        // Step 1: Fetch chunk_0.json for fast initial render
        const initialRes = await fetch('/data/chunks/chunk_0.json');
        if (!initialRes.ok) throw new Error('Failed to load initial chunk_0');
        const chunk0Data: Game[] = await initialRes.json();

        if (isMounted) {
          setLoadedGames(chunk0Data);
          setLoadedChunksCount(1);
        }

        // Step 2: Fetch manifest to discover remaining chunks
        const manifestRes = await fetch('/data/chunks/manifest.json');
        if (!manifestRes.ok) return;
        const manifest = await manifestRes.json();

        if (isMounted) {
          setTotalChunksCount(manifest.totalChunks || 1);
        }

        // Step 3: Progressive background fetch for remaining chunks (chunks 1 to N)
        for (let i = 1; i < manifest.totalChunks; i++) {
          if (!isMounted) break;

          // Yield to main thread briefly between chunk fetches
          await new Promise(res => setTimeout(res, 150));

          try {
            const chunkRes = await fetch(`/data/chunks/chunk_${i}.json`);
            if (chunkRes.ok) {
              const chunkData: Game[] = await chunkRes.json();
              if (isMounted) {
                setLoadedGames(prev => [...prev, ...chunkData]);
                setLoadedChunksCount(i + 1);
              }
            }
          } catch (err) {
            console.warn(`Failed to background fetch chunk_${i}`, err);
          }
        }
      } catch (err) {
        console.warn('Chunk loader falling back to static bundled game catalog:', err);
        if (isMounted) {
          setLoadedGames(fallbackGames);
          setLoadedChunksCount(1);
          setTotalChunksCount(1);
        }
      } finally {
        if (isMounted) {
          setIsLoadingChunks(false);
        }
      }
    }

    loadChunks();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    games: loadedGames,
    isLoadingChunks,
    loadedChunksCount,
    totalChunksCount
  };
}
