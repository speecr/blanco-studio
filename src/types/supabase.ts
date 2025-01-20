export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url: string | null
          website: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      artworks: {
        Row: {
          id: string
          title: string
          description: string | null
          artist_id: string
          created_at: string
          updated_at: string
          images: string[]
          price: number | null
          status: 'available' | 'sold' | 'reserved'
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          artist_id: string
          created_at?: string
          updated_at?: string
          images: string[]
          price?: number | null
          status?: 'available' | 'sold' | 'reserved'
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          artist_id?: string
          created_at?: string
          updated_at?: string
          images?: string[]
          price?: number | null
          status?: 'available' | 'sold' | 'reserved'
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          type: 'collector' | 'gallery' | 'curator'
          status: 'active' | 'potential' | 'inactive'
          notes: string | null
          created_at: string
          updated_at: string
          artist_id: string
          priority_score: number
          owned_artworks: Json[] | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          type: 'collector' | 'gallery' | 'curator'
          status: 'active' | 'potential' | 'inactive'
          notes?: string | null
          created_at?: string
          updated_at?: string
          artist_id: string
          priority_score?: number
          owned_artworks?: Json[] | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          type?: 'collector' | 'gallery' | 'curator'
          status?: 'active' | 'potential' | 'inactive'
          notes?: string | null
          created_at?: string
          updated_at?: string
          artist_id?: string
          priority_score?: number
          owned_artworks?: Json[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}