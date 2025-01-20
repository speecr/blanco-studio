import React from 'react';
import { X } from 'lucide-react';
import type { Commission, ArtworkType } from '../../types';

interface NewCommissionFormProps {
  onSubmit: (commission: Omit<Commission, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function NewCommissionForm({ onSubmit, onClose }: NewCommissionFormProps) {
  const [formData, setFormData] = React.useState({
    collector: {
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
  });

  // Add handlers for number inputs
  const handleNumberFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      e.target.value = '';
    }
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.value = '0';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      {/* Drawer container */}
      <div 
        className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">New Commission Request</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto">
            <form id="newCommissionForm" onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Form fields remain the same */}
              {/* Collector Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Collector Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      value={formData.collector.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        collector: { ...prev.collector, name: e.target.value },
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      value={formData.collector.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        collector: { ...prev.collector, email: e.target.value },
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    value={formData.collector.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      collector: { ...prev.collector, phone: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>
              </div>

              {/* Commission Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Commission Details</h3>
                <div>
                  <label className="block text-sm text-gray-600">Type</label>
                  <select
                    value={formData.requestDetails.type}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      requestDetails: {
                        ...prev.requestDetails,
                        type: e.target.value as ArtworkType,
                      },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                    required
                  >
                    <option value="painting">Painting</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="photography">Photography</option>
                    <option value="digital">Digital</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Medium</label>
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
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Dimensions</label>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">Height</label>
                      <input
                        type="number"
                        value={formData.requestDetails.dimensions.height || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          requestDetails: {
                            ...prev.requestDetails,
                            dimensions: {
                              ...prev.requestDetails.dimensions,
                              height: Number(e.target.value) || 0,
                            },
                          },
                        }))}
                        onFocus={handleNumberFocus}
                        onBlur={handleNumberBlur}
                        min="0"
                        step="0.1"
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Width</label>
                      <input
                        type="number"
                        value={formData.requestDetails.dimensions.width || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          requestDetails: {
                            ...prev.requestDetails,
                            dimensions: {
                              ...prev.requestDetails.dimensions,
                              width: Number(e.target.value) || 0,
                            },
                          },
                        }))}
                        onFocus={handleNumberFocus}
                        onBlur={handleNumberBlur}
                        min="0"
                        step="0.1"
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Depth</label>
                      <input
                        type="number"
                        value={formData.requestDetails.dimensions.depth || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          requestDetails: {
                            ...prev.requestDetails,
                            dimensions: {
                              ...prev.requestDetails.dimensions,
                              depth: e.target.value ? Number(e.target.value) : undefined,
                            },
                          },
                        }))}
                        onFocus={handleNumberFocus}
                        onBlur={handleNumberBlur}
                        min="0"
                        step="0.1"
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Unit</label>
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
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                      >
                        <option value="in">inches</option>
                        <option value="cm">centimeters</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Description</label>
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
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Requested Completion</label>
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
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Pricing and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Price (if discussed)</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      price: e.target.value ? Number(e.target.value) : undefined,
                    }))}
                    onFocus={handleNumberFocus}
                    onBlur={handleNumberBlur}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Deposit Amount</label>
                  <input
                    type="number"
                    value={formData.deposit || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      deposit: e.target.value ? Number(e.target.value) : undefined,
                    }))}
                    onFocus={handleNumberFocus}
                    onBlur={handleNumberBlur}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    priority: e.target.value as Commission['priority'],
                  }))}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="rush">Rush</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Footer with buttons */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="newCommissionForm"
                className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg"
              >
                Create Commission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}