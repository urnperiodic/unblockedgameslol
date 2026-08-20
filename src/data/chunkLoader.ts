// src/data/chunkLoader.ts
import { useState, useEffect } from 'react';
import { Game } from '../types';

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : './';

type Manifest = {
  totalChunks: number;
  chunkSize?: number;
  // optional extra metadata can go here in future
};

const jsonPath = (name: string) => `${BASE}data/games/${name}`;

const memoryCache = new Map<string, Game[] | Manifest>();

async function fetchJson<T>(url: string): Promise<T> {
  // memory cache look-up
  if (memoryCache.has(url)) {
    return memoryCache.get(url) as T;
  }
  const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = await res.json();
  memoryCache.set(url, data);
  return data as T;
}

export function useGameDataChunks() {
  const [games, setGames] = useState<Game[]>([]);
  const [loadedChunksCount, setLoadedChunksCount] = useState(0);
  const [totalChunksCount, setTotalChunksCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // Try to load manifest first
        const manifestUrl = jsonPath('manifest.json');
        let manifest: Manifest | null = null;

        try {
          manifest = await fetchJson<Manifest>(manifestUrl);
        } catch (err) {
          // If manifest missing, assume at least chunk0 exists.
          console.warn('Could not load manifest, falling back to guess totalChunks=1', err);
        }

        // Determine first chunk name
        const firstChunkName = 'games-0.json';
        const firstChunkUrl = jsonPath(firstChunkName) as string;

        // Load first chunk immediately (this mirrors the old chunk0 behavior)
        const firstChunk = await fetchJson<Game[]>(firstChunkUrl);
        if (!mounted) return;
        setGames(firstChunk || []);
        setLoadedChunksCount(1);
        setTotalChunksCount(manifest?.totalChunks ?? 1);

        // Background load remaining chunks progressively
        const total = manifest?.totalChunks ?? 1;
        // If total is 1, nothing more to load.
        if (total <= 1) return;

        // Progressive loader: stagger loads to avoid blocking UI and network spike
        for (let i = 1; i < total; i++) {
          if (!mounted) break;
          // slight delay between requests so UI remains responsive
          await new Promise(res => setTimeout(res, 150));

          const url = jsonPath(`games-${i}.json`);
          try {
            const c = await fetchJson<Game[]>(url);
            if (!mounted) break;
            // append chunk to games
            setGames(prev => [...prev, ...(Array.isArray(c) ? c : [])]);
            setLoadedChunksCount(prev => prev + 1);
          } catch (err) {
            console.warn(`Failed to load ${url}:`, err);
          }
        }
      } catch (err) {
        console.error('Failed to initialize game chunks', err);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    games,
    loadedChunksCount,
    totalChunksCount: totalChunksCount ?? 0
  };
}
