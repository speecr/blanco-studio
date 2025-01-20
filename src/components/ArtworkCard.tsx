import React from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, DollarSign } from 'lucide-react';
import type { Artwork } from '../types';
import ArtworkMenu from './ArtworkMenu';

interface ArtworkCardProps {
  artwork: Artwork;
  onVisibilityToggle?: (id: string, visibility: 'active' | 'private') => void;
  onDelete?: (id: string) => void;
}

export default function ArtworkCard({ artwork, onVisibilityToggle, onDelete }: ArtworkCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDimensions = () => {
    const { height, width, depth, unit } = artwork.dimensions;
    return depth
      ? `${height} × ${width} × ${depth} ${unit}`
      : `${height} × ${width} ${unit}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <button
            onClick={() => onVisibilityToggle?.(artwork.id, artwork.visibility === 'active' ? 'private' : 'active')}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50"
          >
            {artwork.visibility === 'active' ? (
              <Eye className="w-5 h-5 text-green-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <ArtworkMenu 
            artworkId={artwork.id} 
            onDelete={() => onDelete?.(artwork.id)} 
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
            <p className="text-sm text-gray-500">{artwork.year}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {artwork.type}
          </span>
          {artwork.editionInfo && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
              Edition {artwork.editionInfo.number}/{artwork.editionInfo.size}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{artwork.medium}</p>
          <p className="text-sm text-gray-600">{formatDimensions()}</p>
        </div>

        {artwork.listingPrice && (
          <div className="flex items-center gap-1 text-lg font-medium text-gray-900 mb-2">
            <DollarSign className="w-5 h-5" />
            {artwork.listingPrice.toLocaleString()}
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full gap-1 text-sm text-gray-600 hover:text-gray-900 mt-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Description</h4>
                <p className="text-sm text-gray-600">{artwork.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Current Owner</h4>
                <p className="text-sm text-gray-600">{artwork.currentOwner}</p>
              </div>

              {artwork.lastSale && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Last Sale</h4>
                  <div className="text-sm text-gray-600">
                    <p>Date: {artwork.lastSale.date.toLocaleDateString()}</p>
                    <p>Price: ${artwork.lastSale.price.toLocaleString()}</p>
                    {artwork.lastSale.certificateId && (
                      <p>Certificate ID: {artwork.lastSale.certificateId}</p>
                    )}
                  </div>
                </div>
              )}

              {artwork.lastSale?.trackingInfo && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Provenance</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {artwork.lastSale.trackingInfo.provenance.map((entry, i) => (
                      <li key={i}>{entry}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}