import React from 'react';
import { X } from 'lucide-react';
import type { Artwork } from '../../types';
import ImageUpload from './ImageUpload';

interface NewArtworkDrawerProps {
  onSubmit: (artwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const artworkTypes = [
  'painting',
  'sculpture',
  'photography',
  'digital',
  'other',
] as const;

export default function NewArtworkDrawer({ onSubmit, onClose }: NewArtworkDrawerProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    type: 'painting' as typeof artworkTypes[number],
    medium: '',
    dimensions: {
      height: 0,
      width: 0,
      depth: undefined as number | undefined,
      unit: 'in' as const,
    },
    year: new Date().getFullYear(),
    images: [] as string[],
    listingPrice: undefined as number | undefined,
    visibility: 'private' as const,
    status: 'available' as const,
    currentOwner: 'Artist',
    editionInfo: undefined as { number: number; size: number } | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      <div 
        className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl flex flex-col transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Add New Artwork</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form id="newArtworkForm" onSubmit={handleSubmit} className="p-6 space-y-8">
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData(prev => ({ ...prev, images }))}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as typeof artworkTypes[number] }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  required
                >
                  {artworkTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medium
                </label>
                <input
                  type="text"
                  value={formData.medium}
                  onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions
              </label>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height</label>
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: { ...prev.dimensions, height: Number(e.target.value) }
                    }))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width</label>
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: { ...prev.dimensions, width: Number(e.target.value) }
                    }))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Depth</label>
                  <input
                    type="number"
                    value={formData.dimensions.depth || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: { ...prev.dimensions, depth: e.target.value ? Number(e.target.value) : undefined }
                    }))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Unit</label>
                  <select
                    value={formData.dimensions.unit}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: { ...prev.dimensions, unit: e.target.value as 'in' | 'cm' }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="in">inches</option>
                    <option value="cm">centimeters</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Price
                </label>
                <input
                  type="number"
                  value={formData.listingPrice || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    listingPrice: e.target.value ? Number(e.target.value) : undefined 
                  }))}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  visibility: e.target.value as 'active' | 'private' 
                }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="private">Private</option>
                <option value="active">Active</option>
              </select>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="newArtworkForm"
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg"
            >
              Add Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}