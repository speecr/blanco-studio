import type { Artwork } from '../types';

export function validateArtwork(artwork: Partial<Artwork>) {
  const errors: string[] = [];

  if (!artwork.title?.trim()) {
    errors.push('Title is required');
  }

  if (!artwork.type) {
    errors.push('Type is required');
  }

  if (!artwork.images?.length) {
    errors.push('At least one image is required');
  }

  if (artwork.listingPrice && artwork.listingPrice < 0) {
    errors.push('Price cannot be negative');
  }

  if (artwork.year) {
    const currentYear = new Date().getFullYear();
    if (artwork.year < 1800 || artwork.year > currentYear) {
      errors.push(`Year must be between 1800 and ${currentYear}`);
    }
  }

  if (artwork.dimensions) {
    const { height, width, depth } = artwork.dimensions;
    if (height <= 0 || width <= 0 || (depth !== undefined && depth < 0)) {
      errors.push('Invalid dimensions');
    }
  }

  return errors;
}