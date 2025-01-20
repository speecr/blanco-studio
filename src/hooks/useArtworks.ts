import { useState, useEffect } from 'react';
import { getArtworks } from '../lib/supabase/artworks';
import type { Artwork } from '../types';

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await getArtworks();
        setArtworks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load artworks');
      } finally {
        setIsLoading(false);
      }
    }

    loadArtworks();
  }, []);

  return { artworks, isLoading, error };
}