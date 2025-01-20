import { useState, useEffect } from 'react';
import { getArtwork, updateArtwork, deleteArtwork } from '../lib/supabase/artworks';
import type { Artwork } from '../types';

export function useArtwork(id: string) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtwork() {
      try {
        const data = await getArtwork(id);
        setArtwork(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load artwork');
      } finally {
        setIsLoading(false);
      }
    }

    loadArtwork();
  }, [id]);

  const save = async (updatedArtwork: Partial<Artwork>) => {
    try {
      const data = await updateArtwork(id, updatedArtwork);
      setArtwork(data);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save artwork');
    }
  };

  const remove = async () => {
    try {
      await deleteArtwork(id);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete artwork');
    }
  };

  return { artwork, isLoading, error, save, remove };
}