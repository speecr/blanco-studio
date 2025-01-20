import { supabase } from '../supabase';
import type { Contact } from '../../types';

function parseOwnedArtworks(data: any): any[] {
  try {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') return JSON.parse(data);
    return [];
  } catch (e) {
    console.error('Error parsing owned_artworks:', e);
    return [];
  }
}

export async function createContact(contact: Omit<Contact, 'id'>) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      artist_id: userData.user.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      instagram: contact.instagram,
      company: contact.company,
      role: contact.role,
      type: contact.type,
      status: contact.status,
      priority_score: contact.priority_score,
      total_purchases: contact.total_purchases,
      notes: contact.notes,
      owned_artworks: contact.owned_artworks || []
    }])
    .select()
    .single();

  if (error) throw error;
  return {
    ...data,
    owned_artworks: parseOwnedArtworks(data.owned_artworks)
  } as Contact;
}

export async function updateContact(id: string, contact: Partial<Contact>) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('contacts')
    .update({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      instagram: contact.instagram,
      company: contact.company,
      role: contact.role,
      type: contact.type,
      status: contact.status,
      priority_score: contact.priority_score,
      total_purchases: contact.total_purchases,
      notes: contact.notes,
      owned_artworks: contact.owned_artworks || []
    })
    .eq('id', id)
    .eq('artist_id', userData.user.id)
    .select()
    .single();

  if (error) throw error;
  return {
    ...data,
    owned_artworks: parseOwnedArtworks(data.owned_artworks)
  } as Contact;
}

export async function deleteContact(id: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)
    .eq('artist_id', userData.user.id);

  if (error) throw error;
}

export async function getContacts() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('artist_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return (data || []).map(contact => ({
    ...contact,
    owned_artworks: parseOwnedArtworks(contact.owned_artworks)
  })) as Contact[];
}