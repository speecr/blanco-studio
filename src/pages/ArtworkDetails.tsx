import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';
import { useArtwork } from '../hooks/useArtwork';

export default function ArtworkDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artwork, isLoading, error } = useArtwork(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{error || 'Artwork not found'}</p>
      </div>
    );
  }

  const formatDimensions = () => {
    const { height, width, depth, unit } = artwork.dimensions;
    return depth
      ? `${height} × ${width} × ${depth} ${unit}`
      : `${height} × ${width} ${unit}`;
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/dashboard/portfolio')}
          className="inline-flex items-center text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </button>
        <button
          onClick={() => navigate(`/dashboard/portfolio/edit/${artwork.id}`)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Artwork
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="aspect-[3/2] bg-gray-50">
          <img
            src={artwork.images[0]}
            alt={artwork.title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="p-8">
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{artwork.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[artwork.status]}`}>
                {artwork.status.charAt(0).toUpperCase() + artwork.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Year</dt>
                    <dd className="text-base text-gray-900">{artwork.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Medium</dt>
                    <dd className="text-base text-gray-900">{artwork.medium}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Dimensions</dt>
                    <dd className="text-base text-gray-900">{formatDimensions()}</dd>
                  </div>
                  {artwork.listingPrice && (
                    <div>
                      <dt className="text-sm text-gray-500">Price</dt>
                      <dd className="text-base text-gray-900">${artwork.listingPrice.toLocaleString()}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-base text-gray-900 whitespace-pre-line">
                  {artwork.description}
                </p>
              </div>
            </div>

            {artwork.editionInfo && (
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Edition Information</h3>
                <p className="text-base text-gray-900">
                  Edition {artwork.editionInfo.number} of {artwork.editionInfo.size}
                </p>
              </div>
            )}

            {artwork.lastSale && (
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Sale History</h3>
                <div className="space-y-2">
                  <p className="text-base text-gray-900">
                    Last sold on {new Date(artwork.lastSale.date).toLocaleDateString()} for ${artwork.lastSale.price.toLocaleString()}
                  </p>
                  {artwork.lastSale.certificateId && (
                    <p className="text-sm text-gray-500">
                      Certificate ID: {artwork.lastSale.certificateId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}