import { uploadArtworkImage } from '../../lib/supabase/artworks';

export async function handleImageUpload(files: FileList, artworkId: string) {
  const uploadPromises = Array.from(files).map(file => uploadArtworkImage(file, artworkId));
  const urls = await Promise.all(uploadPromises);
  return urls;
}

export function validateImage(file: File) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
  }

  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }
}