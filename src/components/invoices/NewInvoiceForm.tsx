import React from 'react';
import { X } from 'lucide-react';
import type { Invoice } from '../../types';
import { useArtworks } from '../../hooks/useArtworks';

interface NewInvoiceFormProps {
  onSubmit: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'number'>) => void;
  onClose: () => void;
}

export default function NewInvoiceForm({ onSubmit, onClose }: NewInvoiceFormProps) {
  const { artworks } = useArtworks();
  const [formData, setFormData] = React.useState({
    artwork: {
      id: '',
      title: '',
      image: '',
    },
    buyer: {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      address: '',
      addressLine2: '',
    },
    amount: 0,
    status: 'pending' as Invoice['status'],
    dueDate: new Date(),
    notes: '',
    purchasedThroughMarketplace: false,
    generateCertificate: true,
    shipping: {
      required: false,
      localDelivery: false,
      requestBlancoService: false,
      cost: 0,
      carrier: '',
      trackingNumber: '',
    },
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

  const handleArtworkSelect = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId);
    if (artwork) {
      setFormData(prev => ({
        ...prev,
        artwork: {
          id: artwork.id,
          title: artwork.title,
          image: artwork.images[0],
        },
        amount: artwork.listingPrice || 0,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Artwork Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artwork
            </label>
            <select
              value={formData.artwork.id}
              onChange={(e) => handleArtworkSelect(e.target.value)}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              required
            >
              <option value="">Select artwork</option>
              {artworks.map(artwork => (
                <option key={artwork.id} value={artwork.id}>
                  {artwork.title} - ${artwork.listingPrice?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Buyer Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Buyer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={formData.buyer.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    buyer: { ...prev.buyer, name: e.target.value },
                  }))}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={formData.buyer.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    buyer: { ...prev.buyer, email: e.target.value },
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
                value={formData.buyer.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  buyer: { ...prev.buyer, phone: e.target.value },
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Address</label>
              <input
                type="text"
                value={formData.buyer.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  buyer: { ...prev.buyer, address: e.target.value },
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Address Line 2 (Optional)</label>
              <input
                type="text"
                value={formData.buyer.addressLine2}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  buyer: { ...prev.buyer, addressLine2: e.target.value },
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              />
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  amount: Number(e.target.value) || 0,
                }))}
                onFocus={handleNumberFocus}
                onBlur={handleNumberBlur}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={formData.dueDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dueDate: new Date(e.target.value),
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                required
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.shipping.required}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  shipping: { ...prev.shipping, required: e.target.checked },
                }))}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-900">Requires shipping</span>
            </label>

            {formData.shipping.required && (
              <div className="mt-4 space-y-4 pl-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.shipping.localDelivery}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping: { ...prev.shipping, localDelivery: e.target.checked },
                      }))}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="ml-2 text-sm text-gray-900">Local Delivery</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Shipping Cost</label>
                  <input
                    type="number"
                    value={formData.shipping.cost || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, cost: Number(e.target.value) || 0 },
                    }))}
                    onFocus={handleNumberFocus}
                    onBlur={handleNumberBlur}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Carrier</label>
                  <input
                    type="text"
                    value={formData.shipping.carrier}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, carrier: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                  <input
                    type="text"
                    value={formData.shipping.trackingNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, trackingNumber: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>

          {/* Submit Buttons */}
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
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}