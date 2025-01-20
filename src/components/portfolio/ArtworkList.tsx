import React from 'react';
import type { Artwork } from '../../types';
import ArtworkCard from './ArtworkCard';

interface ArtworkListProps {
  artworks: Artwork[];
  onVisibilityToggle: (id: string, visibility: 'active' | 'private') => void;
  onDelete: (id: string) => void;
}

export default function ArtworkList({ artworks, onVisibilityToggle, onDelete }: ArtworkListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onVisibilityToggle={onVisibilityToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}