import React from 'react';
import { X } from 'lucide-react';
import type { Shipment } from '../types';

interface NewShipmentFormProps {
  onSubmit: (shipment: Omit<Shipment, 'id' | 'createdAt'>) => Promise<void>;
  onClose: () => void;
}

export default function NewShipmentForm({ onSubmit, onClose }: NewShipmentFormProps) {
  const [formData, setFormData] = React.useState({
    artwork_id: '',
    buyer_id: '',
    carrier: '',
    tracking_number: '',
    shipping_address: {
      street: '',
      unit: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
    },
    estimated_delivery: '',
    special_instructions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Create New Shipment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Street Address</label>
                  <input
                    type="text"
                    value={formData.shipping_address.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping_address: {
                        ...prev.shipping_address,
                        street: e.target.value,
                      },
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Unit/Apt (optional)</label>
                  <input
                    type="text"
                    value={formData.shipping_address.unit}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping_address: {
                        ...prev.shipping_address,
                        unit: e.target.value,
                      },
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">City</label>
                    <input
                      type="text"
                      value={formData.shipping_address.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping_address: {
                          ...prev.shipping_address,
                          city: e.target.value,
                        },
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600">State</label>
                    <input
                      type="text"
                      value={formData.shipping_address.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping_address: {
                          ...prev.shipping_address,
                          state: e.target.value,
                        },
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.shipping_address.zip}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping_address: {
                          ...prev.shipping_address,
                          zip: e.target.value,
                        },
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600">Country</label>
                    <select
                      value={formData.shipping_address.country}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping_address: {
                          ...prev.shipping_address,
                          country: e.target.value,
                        },
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Carrier</label>
                <input
                  type="text"
                  value={formData.carrier}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    carrier: e.target.value,
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                <input
                  type="text"
                  value={formData.tracking_number}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tracking_number: e.target.value,
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Delivery Date</label>
              <input
                type="date"
                value={formData.estimated_delivery}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  estimated_delivery: e.target.value,
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
              <textarea
                value={formData.special_instructions}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  special_instructions: e.target.value,
                }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                Create Shipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}