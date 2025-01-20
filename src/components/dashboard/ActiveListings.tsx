import React from 'react';
import { Eye } from 'lucide-react';
import type { Artwork } from '../../types';

interface ActiveListingsProps {
  artworks: Artwork[];
}

export default function ActiveListings({ artworks }: ActiveListingsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <h2 className="p-6 font-semibold text-gray-900 border-b border-gray-100">
        Active Listings
      </h2>
      <div className="divide-y divide-gray-100">
        {artworks.map(artwork => (
          <div key={artwork.id} className="p-6">
            <div className="flex items-center gap-4">
              <img
                src={artwork.images[0]}
                alt={artwork.title}
                className="w-16 h-16 rounded-lg object-cover bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {artwork.title}
                </h3>
                <p className="text-sm text-gray-500">
                  ${artwork.listingPrice?.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">24</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}