import { supabase } from '../supabase';

export async function uploadArtworkImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `artworks/${fileName}`;

  const { data, error } = await supabase.storage
    .from('artwork-images')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('artwork-images')
    .getPublicUrl(filePath);

  return publicUrl;
}