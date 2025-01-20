import React from 'react';
import type { Artwork } from '../../types';

interface ArtworkFormProps {
  artwork: Artwork;
  onSubmit: (artwork: Artwork) => void;
  isSaving?: boolean;
}

export default function ArtworkForm({ artwork, onSubmit, isSaving }: ArtworkFormProps) {
  const [formData, setFormData] = React.useState(artwork);
  const artworkTypes = ['painting', 'sculpture', 'photography', 'digital', 'other'] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="editArtworkForm" onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Form fields remain the same */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Artwork['type'] }))}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium
          </label>
          <input
            type="text"
            value={formData.medium || ''}
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
              required
            >
              <option value="in">inches</option>
              <option value="cm">centimeters</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            status: e.target.value as Artwork['status']
          }))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          required
        >
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="in_progress">In Progress</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Visibility
        </label>
        <select
          value={formData.visibility}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            visibility: e.target.value as 'active' | 'private' 
          }))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          required
        >
          <option value="private">Private</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}