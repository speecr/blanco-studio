export interface StudioVisit {
  id: string;
  artist_id: string;
  collector_info: {
    name: string;
    email: string;
    phone?: string;
  };
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  notes?: string;
  reminders: {
    email: boolean;
    sms: boolean;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Commission {
  id: string;
  artist_id: string;
  collector_info: {
    name: string;
    email: string;
    phone?: string;
  };
  request_details: {
    type: 'painting' | 'sculpture' | 'photography' | 'digital' | 'other';
    medium?: string;
    dimensions: {
      height: number;
      width: number;
      depth?: number;
      unit: 'in' | 'cm';
    };
    description: string;
    timeline?: {
      requestedCompletion: string;
    };
  };
  price?: number;
  deposit?: number;
  status: 'new' | 'review' | 'accepted' | 'in_progress' | 'completed' | 'deferred' | 'declined';
  priority: 'normal' | 'urgent' | 'rush';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Invoice {
  id: string;
  number: string;
  artwork_id?: string;
  seller_id: string;
  buyer_info: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    addressLine2?: string;
  };
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  due_date: string;
  shipping?: {
    required: boolean;
    localDelivery?: boolean;
    cost: number;
    carrier?: string;
    trackingNumber?: string;
  };
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  instagram?: string;
  company?: string;
  role?: string;
  type: 'collector' | 'gallery' | 'curator';
  status: 'active' | 'potential' | 'inactive';
  priority_score: number;
  total_purchases: number;
  notes?: string;
  owned_artworks?: any[];
  created_at?: string;
  updated_at?: string;
}