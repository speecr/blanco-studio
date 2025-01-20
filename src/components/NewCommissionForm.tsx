import React from 'react';
import { X } from 'lucide-react';
import type { Commission, ArtworkType } from '../types';

interface NewCommissionFormProps {
  onSubmit: (commission: Omit<Commission, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const artworkTypes: ArtworkType[] = [
  'painting',
  'sculpture',
  'edition',
  'photography',
  'digital',
  'installation',
  'other',
];

export default function NewCommissionForm({ onSubmit, onClose }: NewCommissionFormProps) {
  const [formData, setFormData] = React.useState({
    collector: {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
    },
    requestDetails: {
      type: 'painting' as ArtworkType,
      medium: '',
      dimensions: {
        height: 0,
        width: 0,
        depth: undefined as number | undefined,
        unit: 'in' as const,
      },
      description: '',
      timeline: {
        requestedCompletion: new Date(),
      },
    },
    price: undefined as number | undefined,
    deposit: undefined as number | undefined,
    status: 'new' as Commission['status'],
    priority: 'normal' as Commission['priority'],
    notes: '',
    source: 'marketplace' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">New Commission Request</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collector Name
                </label>
                <input
                  type="text"
                  value={formData.collector.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    collector: { ...prev.collector, name: e.target.value },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.collector.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    collector: { ...prev.collector, email: e.target.value },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.collector.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  collector: { ...prev.collector, phone: e.target.value },
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artwork Type
              </label>
              <select
                value={formData.requestDetails.type}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requestDetails: {
                    ...prev.requestDetails,
                    type: e.target.value as ArtworkType,
                  },
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                value={formData.requestDetails.medium}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requestDetails: {
                    ...prev.requestDetails,
                    medium: e.target.value,
                  },
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="number"
                  value={formData.requestDetails.dimensions.height}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestDetails: {
                      ...prev.requestDetails,
                      dimensions: {
                        ...prev.requestDetails.dimensions,
                        height: Number(e.target.value),
                      },
                    },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  value={formData.requestDetails.dimensions.width}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestDetails: {
                      ...prev.requestDetails,
                      dimensions: {
                        ...prev.requestDetails.dimensions,
                        width: Number(e.target.value),
                      },
                    },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  value={formData.requestDetails.dimensions.unit}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestDetails: {
                      ...prev.requestDetails,
                      dimensions: {
                        ...prev.requestDetails.dimensions,
                        unit: e.target.value as 'in' | 'cm',
                      },
                    },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="in">inches</option>
                  <option value="cm">centimeters</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.requestDetails.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requestDetails: {
                    ...prev.requestDetails,
                    description: e.target.value,
                  },
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Completion
                </label>
                <input
                  type="date"
                  value={formData.requestDetails.timeline.requestedCompletion.toISOString().split('T')[0]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requestDetails: {
                      ...prev.requestDetails,
                      timeline: {
                        ...prev.requestDetails.timeline,
                        requestedCompletion: new Date(e.target.value),
                      },
                    },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    priority: e.target.value as Commission['priority'],
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="rush">Rush</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (if discussed)
                </label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    price: e.target.value ? Number(e.target.value) : undefined,
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Amount
                </label>
                <input
                  type="number"
                  value={formData.deposit || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    deposit: e.target.value ? Number(e.target.value) : undefined,
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  notes: e.target.value,
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

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
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Create Commission
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}