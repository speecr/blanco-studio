// Static example data for demo purposes
export const exampleArtworks = [
  {
    id: '1',
    title: 'Urban Reflections',
    description: 'A contemporary interpretation of city life through abstract forms and vibrant colors',
    type: 'painting',
    medium: 'Oil on Canvas',
    dimensions: { height: 48, width: 36, unit: 'in' },
    year: 2024,
    images: ['https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8'],
    listingPrice: 2800,
    visibility: 'active',
    currentOwner: 'Artist',
  },
  {
    id: '2',
    title: 'Serenity in Blue',
    description: 'Abstract exploration of movement and tranquility using various shades of blue',
    type: 'painting',
    medium: 'Acrylic on Canvas',
    dimensions: { height: 60, width: 40, unit: 'in' },
    year: 2024,
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262'],
    listingPrice: 3200,
    visibility: 'active',
    currentOwner: 'Artist',
  },
  {
    id: '3',
    title: 'Bronze Dreams',
    description: 'Contemporary sculpture exploring organic forms',
    type: 'sculpture',
    medium: 'Bronze',
    dimensions: { height: 24, width: 12, depth: 12, unit: 'in' },
    year: 2024,
    images: ['https://images.unsplash.com/photo-1544531586-fde5298cdd40'],
    listingPrice: 4500,
    visibility: 'private',
    currentOwner: 'Artist',
  },
];

export const exampleContacts = [
  {
    id: '1',
    name: 'Sarah Thompson',
    email: 'sarah@gallery.com',
    phone: '+1234567890',
    type: 'gallery',
    status: 'active',
    priority_score: 85,
    total_purchases: 3,
    notes: 'Leading contemporary gallery in NYC',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    owned_artworks: [
      {
        id: '1',
        title: 'Urban Reflections',
        image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8',
        purchaseDate: new Date('2024-01-15').toISOString(),
        purchasePrice: 2800,
      },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@collector.com',
    phone: '+1987654321',
    type: 'collector',
    status: 'active',
    priority_score: 92,
    total_purchases: 2,
    notes: 'Corporate collection manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    owned_artworks: [],
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@curator.com',
    phone: '+1122334455',
    type: 'curator',
    status: 'potential',
    priority_score: 75,
    total_purchases: 0,
    notes: 'Independent curator specializing in abstract art',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    owned_artworks: [],
  },
];

export const exampleMessages = [
  {
    id: '1',
    sender: {
      name: 'Sarah Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    preview: 'I\'m very interested in "Urban Reflections". Could we schedule a viewing?',
    timestamp: '2 hours ago',
    unread: true,
    messages: [
      {
        fromMe: false,
        content: 'I\'m very interested in "Urban Reflections". Could we schedule a viewing?',
        timestamp: '2 hours ago',
      }
    ],
  },
  {
    id: '2',
    sender: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    preview: 'Looking forward to our studio visit next week. Quick question about the commission...',
    timestamp: '5 hours ago',
    unread: false,
    messages: [
      {
        fromMe: false,
        content: 'Looking forward to our studio visit next week. Quick question about the commission...',
        timestamp: '5 hours ago',
      }
    ],
  },
  {
    id: '3',
    sender: {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    preview: 'Would love to feature your work in our upcoming exhibition. Let\'s discuss the details.',
    timestamp: '1 day ago',
    unread: true,
    messages: [
      {
        fromMe: false,
        content: 'Would love to feature your work in our upcoming exhibition. Let\'s discuss the details.',
        timestamp: '1 day ago',
      }
    ],
  },
];

export const exampleCommissions = [
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',  // Using UUID format
    collector: {
      name: 'Sarah Thompson',
      email: 'sarah@gallery.com',
      phone: '+1234567890',
    },
    requestDetails: {
      type: 'painting',
      medium: 'Oil on Canvas',
      dimensions: { height: 48, width: 36, unit: 'in' },
      description: 'Looking for a piece similar to Urban Reflections but with warmer tones',
      timeline: {
        requestedCompletion: new Date('2024-05-15').toISOString(),
      },
    },
    price: 3500,
    status: 'in_progress',
    priority: 'normal',
    notes: 'Client prefers warm earth tones',
  },
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0852',  // Using UUID format
    collector: {
      name: 'Michael Chen',
      email: 'michael@collector.com',
      phone: '+1987654321',
    },
    requestDetails: {
      type: 'sculpture',
      medium: 'Bronze',
      dimensions: { height: 24, width: 12, depth: 12, unit: 'in' },
      description: 'Interested in a custom sculpture for office lobby',
      timeline: {
        requestedCompletion: new Date('2024-06-30').toISOString(),
      },
    },
    price: 5000,
    status: 'review',
    priority: 'urgent',
    notes: 'Need to discuss material options',
  },
];

export const exampleInvoices = [
  {
    id: '1',
    number: 'INV-2024-001',
    artwork: exampleArtworks[0],
    buyer: exampleContacts[0],
    amount: 2800,
    status: 'paid',
    dueDate: new Date('2024-04-25').toISOString(),
    shipping: { required: true, cost: 350 },
  },
  {
    id: '2',
    number: 'INV-2024-002',
    artwork: exampleArtworks[1],
    buyer: exampleContacts[1],
    amount: 3200,
    status: 'pending',
    dueDate: new Date('2024-04-09').toISOString(),
    shipping: { required: true, cost: 400 },
  },
];

export const exampleStudioVisits = [
  {
    id: '1',
    collector: exampleContacts[0],
    date: '2024-04-02',
    time: '14:00',
    status: 'confirmed',
    reason: 'Interested in recent works for upcoming exhibition',
    reminders: { email: true, sms: true },
  },
  {
    id: '2',
    collector: exampleContacts[1],
    date: '2024-04-09',
    time: '11:00',
    status: 'pending',
    reason: 'Collection review for corporate office',
    reminders: { email: true, sms: false },
  },
];

// Add back the example shipments
export const exampleShipments = [
  {
    id: 'i290f1ee-6c54-4b01-90e6-d701748f0851',  // Using UUID format
    artwork: exampleArtworks[0],
    buyer: exampleContacts[0],
    trackingNumber: '1Z999AA1234567890',
    carrier: 'UPS',
    status: 'shipped',
    shippingAddress: {
      street: '123 Art St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US',
    },
    estimatedDelivery: new Date('2024-03-31').toISOString(),
  },
  {
    id: 'i290f1ee-6c54-4b01-90e6-d701748f0852',  // Using UUID format
    artwork: exampleArtworks[1],
    buyer: exampleContacts[1],
    trackingNumber: '1Z999BB1234567890',
    carrier: 'FedEx',
    status: 'preparing',
    shippingAddress: {
      street: '456 Gallery Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90012',
      country: 'US',
    },
    estimatedDelivery: new Date('2024-04-02').toISOString(),
  },
];