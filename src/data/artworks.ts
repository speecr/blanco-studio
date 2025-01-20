import type { Artwork } from '../types';

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    description: 'A vibrant exploration of color and form',
    year: 2024,
    type: 'painting',
    medium: 'Oil on Canvas',
    dimensions: {
      height: 36,
      width: 48,
      unit: 'in',
    },
    images: ['https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop'],
    listingPrice: 2500,
    visibility: 'active',
    currentOwner: 'Artist',
    artistId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Urban Dreams',
    description: 'Cityscape at twilight',
    year: 2024,
    type: 'painting',
    medium: 'Acrylic on Canvas',
    dimensions: {
      height: 40,
      width: 60,
      unit: 'in',
    },
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'],
    listingPrice: 3200,
    visibility: 'private',
    currentOwner: 'Artist',
    artistId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];