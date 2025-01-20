import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import type { Artwork } from '../../types';

interface ArtworkCardProps {
  artwork: Artwork;
  onVisibilityToggle: (id: string, visibility: 'active' | 'private') => void;
}

export default function ArtworkCard({ artwork, onVisibilityToggle }: ArtworkCardProps) {
  const formatDimensions = () => {
    const { height, width, depth, unit } = artwork.dimensions;
    return depth
      ? `${height} × ${width} × ${depth} ${unit}`
      : `${height} × ${width} ${unit}`;
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
  };

  return (
    <Link
      to={`/dashboard/portfolio/${artwork.id}`}
      className="block bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden group"
    >
      <div className="aspect-square relative">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className="w-full h-full object-cover bg-gray-50"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onVisibilityToggle(artwork.id, artwork.visibility === 'active' ? 'private' : 'active');
            }}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          >
            {artwork.visibility === 'active' ? (
              <Eye className="w-5 h-5 text-black" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-black">
          {artwork.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">{artwork.year}</p>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[artwork.status]}`}>
            {artwork.status.charAt(0).toUpperCase() + artwork.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{artwork.medium}</span>
          <span>{formatDimensions()}</span>
        </div>
        {artwork.listingPrice && (
          <p className="mt-3 text-lg font-medium text-gray-900">
            ${artwork.listingPrice.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}