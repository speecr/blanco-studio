import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface App {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  pricing: {
    type: 'free' | 'paid' | 'trial';
    amount?: number;
    period?: 'monthly' | 'yearly';
  };
}

const apps: App[] = [
  {
    id: '1',
    name: 'ArtistBooks',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=80&h=80&fit=crop&q=80',
    description: 'Professional accounting software designed specifically for artists and galleries',
    category: 'Accounting',
    rating: 4.8,
    reviews: 128,
    pricing: {
      type: 'paid',
      amount: 29,
      period: 'monthly'
    }
  },
  {
    id: '2',
    name: 'ArtCrate Pro',
    logo: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=80&h=80&fit=crop&q=80',
    description: 'Advanced crating and packaging solutions with custom dimensions and materials',
    category: 'Packaging',
    rating: 4.9,
    reviews: 89,
    pricing: {
      type: 'paid',
      amount: 49,
      period: 'monthly'
    }
  },
  {
    id: '3',
    name: 'StudioMetrics',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&q=80',
    description: 'Analytics and insights for your art business with detailed performance metrics',
    category: 'Analytics',
    rating: 4.7,
    reviews: 256,
    pricing: {
      type: 'trial',
      amount: 39,
      period: 'monthly'
    }
  },
  {
    id: '4',
    name: 'ArtTax Helper',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80&h=80&fit=crop&q=80',
    description: 'Simplified tax preparation and filing for artists and creative professionals',
    category: 'Accounting',
    rating: 4.6,
    reviews: 152,
    pricing: {
      type: 'free'
    }
  },
  {
    id: '5',
    name: 'ArtSupply Pro',
    logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=80&h=80&fit=crop&q=80',
    description: 'Premium art supplies delivered to your studio with wholesale pricing',
    category: 'Supplies',
    rating: 4.9,
    reviews: 342,
    pricing: {
      type: 'free'
    }
  }
];

export default function Apps() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  // Create unique categories array without duplicates
  const categories = ['all', ...new Set(['supplies', ...apps.map(app => app.category.toLowerCase())])];

  const filteredApps = apps.filter(app => 
    selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory
  );

  const renderPricing = (pricing: App['pricing']) => {
    if (pricing.type === 'free') return 'Free';
    if (pricing.type === 'trial') return `${pricing.amount}$/mo (Free Trial)`;
    return `${pricing.amount}$/${pricing.period === 'monthly' ? 'mo' : 'yr'}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Explore Partners</h1>
      </div>

      <div className="mb-6 flex gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              selectedCategory === category
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <img
                src={app.logo}
                alt={app.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {app.category}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">{app.description}</p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(app.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {app.rating} ({app.reviews} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {renderPricing(app.pricing)}
              </span>
              <button
                onClick={() => {/* Handle app details/installation */}}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn More
                <ExternalLink className="ml-1.5 w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}