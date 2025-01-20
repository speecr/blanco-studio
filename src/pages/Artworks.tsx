import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';

export default function Artworks() {
  const [artworks] = React.useState<Artwork[]>([
    {
      id: '1',
      title: 'Abstract Harmony',
      description: 'A vibrant exploration of color and form',
      price: 2500,
      images: ['https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop'],
      artistId: '1',
      medium: 'Oil on Canvas',
      dimensions: '36" x 48"',
      year: 2024,
      status: 'available',
    },
    {
      id: '2',
      title: 'Urban Dreams',
      description: 'Cityscape at twilight',
      price: 3200,
      images: ['https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=800&h=600&fit=crop'],
      artistId: '1',
      medium: 'Acrylic on Canvas',
      dimensions: '40" x 60"',
      year: 2024,
      status: 'reserved',
    },
    // Add more artwork data as needed
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Artworks</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Artwork
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search artworks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}