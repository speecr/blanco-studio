import { supabase } from '../supabase';
import type { Artwork } from '../../types';

function convertToFrontend(data: any): Artwork {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    artistId: data.artist_id,
    type: data.type,
    medium: data.medium,
    dimensions: data.dimensions || { height: 0, width: 0, unit: 'in' },
    year: data.year,
    images: data.images || [],
    listingPrice: data.listing_price,
    visibility: data.visibility || 'private',
    status: data.status || 'available',
    currentOwner: data.current_owner || 'Artist',
    editionInfo: data.edition_info,
    lastSale: data.last_sale,
    createdAt: data.created_at ? new Date(data.created_at) : undefined,
    updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
  };
}

function convertToDatabase(artwork: Partial<Artwork>) {
  const {
    artistId,
    currentOwner,
    editionInfo,
    lastSale,
    createdAt,
    updatedAt,
    listingPrice,
    ...rest
  } = artwork;

  return {
    ...rest,
    artist_id: artistId,
    current_owner: currentOwner,
    edition_info: editionInfo,
    last_sale: lastSale,
    listing_price: listingPrice,
    dimensions: artwork.dimensions ? {
      height: Number(artwork.dimensions.height) || 0,
      width: Number(artwork.dimensions.width) || 0,
      depth: Number(artwork.dimensions.depth) || undefined,
      unit: artwork.dimensions.unit || 'in'
    } : undefined
  };
}

export async function getArtworks() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('artist_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(convertToFrontend);
}

export async function getArtwork(id: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .eq('artist_id', userData.user.id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Artwork not found');
  return convertToFrontend(data);
}

export async function createArtwork(artwork: Omit<Artwork, 'id'>) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const dbArtwork = convertToDatabase({
    ...artwork,
    artistId: userData.user.id,
    visibility: artwork.visibility || 'private',
    status: artwork.status || 'available',
    currentOwner: 'Artist'
  });

  const { data, error } = await supabase
    .from('artworks')
    .insert(dbArtwork)
    .select()
    .single();

  if (error) throw error;
  return convertToFrontend(data);
}

export async function updateArtwork(id: string, artwork: Partial<Artwork>) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const dbArtwork = convertToDatabase(artwork);

  const { data, error } = await supabase
    .from('artworks')
    .update(dbArtwork)
    .eq('id', id)
    .eq('artist_id', userData.user.id)
    .select()
    .single();

  if (error) throw error;
  return convertToFrontend(data);
}

export async function deleteArtwork(id: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id)
    .eq('artist_id', userData.user.id);

  if (error) throw error;
}

export async function uploadArtworkImage(file: File, artworkId: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const fileExt = file.name.split('.').pop();
  const filePath = `${userData.user.id}/${artworkId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('artwork-images')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('artwork-images')
    .getPublicUrl(data.path);

  return publicUrl;
}