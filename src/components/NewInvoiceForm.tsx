import React from 'react';
import { X, Info } from 'lucide-react';
import type { Invoice, Artwork } from '../types';

interface NewInvoiceFormProps {
  artworks: Artwork[];
  onSubmit: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'number'>) => void;
  onClose: () => void;
}

const carrierOptions = [
  'FedEx',
  'UPS',
  'DHL',
  'USPS',
  'Malca-Amit',
  'Masterpiece International',
  'Dietl International',
];

export default function NewInvoiceForm({ artworks, onSubmit, onClose }: NewInvoiceFormProps) {
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

  const [addressSuggestions, setAddressSuggestions] = React.useState<string[]>([]);
  const [carrierSuggestions, setCarrierSuggestions] = React.useState<string[]>([]);

  // Simulated address autocomplete
  const handleAddressInput = (value: string) => {
    setFormData(prev => ({
      ...prev,
      buyer: { ...prev.buyer, address: value },
    }));

    // Simulate address suggestions
    if (value.length > 3) {
      setAddressSuggestions([
        `${value} Street, New York, NY`,
        `${value} Avenue, Brooklyn, NY`,
        `${value} Boulevard, Queens, NY`,
      ]);
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleCarrierInput = (value: string) => {
    setFormData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, carrier: value },
    }));

    // Filter carrier suggestions
    const filtered = carrierOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setCarrierSuggestions(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      seller: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@artist.com',
      },
      smartContract: formData.generateCertificate ? {
        address: `0x${Math.random().toString(16).slice(2)}`,
        network: 'ethereum',
        certificateId: `CERT-${Date.now()}`,
      } : undefined,
    });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artwork
              </label>
              <select
                value={formData.artwork.id}
                onChange={(e) => handleArtworkSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collector Name
                </label>
                <input
                  type="text"
                  value={formData.buyer.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    buyer: { ...prev.buyer, name: e.target.value },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collector Email
                </label>
                <input
                  type="email"
                  value={formData.buyer.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    buyer: { ...prev.buyer, email: e.target.value },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collector Phone
              </label>
              <input
                type="tel"
                value={formData.buyer.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  buyer: { ...prev.buyer, phone: e.target.value },
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collector Address
                </label>
                <input
                  type="text"
                  value={formData.buyer.address}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {addressSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-auto">
                    {addressSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            buyer: { ...prev.buyer, address: suggestion },
                          }));
                          setAddressSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Apt, Floor, etc.)
                </label>
                <input
                  type="text"
                  value={formData.buyer.addressLine2}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    buyer: { ...prev.buyer, addressLine2: e.target.value },
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate.toISOString().split('T')[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: new Date(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.shipping.required}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, required: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">Requires shipping</span>
              </label>
            </div>

            {formData.shipping.required && (
              <div className="space-y-4 pl-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.shipping.localDelivery}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shipping: { ...prev.shipping, localDelivery: e.target.checked },
                      }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">Local Delivery</span>
                  </label>
                </div>

                {formData.shipping.localDelivery && (
                  <div className="pl-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.shipping.requestBlancoService}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          shipping: { ...prev.shipping, requestBlancoService: e.target.checked },
                        }))}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        Request Blanco last-mile service (not guaranteed)
                      </span>
                    </label>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price of shipping
                  </label>
                  <input
                    type="number"
                    value={formData.shipping.cost}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, cost: Number(e.target.value) },
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carrier
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.carrier}
                    onChange={(e) => handleCarrierInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {carrierSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-auto">
                      {carrierSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              shipping: { ...prev.shipping, carrier: suggestion },
                            }));
                            setCarrierSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tracking number
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.trackingNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, trackingNumber: e.target.value },
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Invoice['status'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.purchasedThroughMarketplace}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    purchasedThroughMarketplace: e.target.checked,
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Purchased through Blanco marketplace
                </span>
              </label>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.generateCertificate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      generateCertificate: e.target.checked,
                    }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900 font-medium">
                    Generate digital certificate of authenticity
                  </span>
                </label>
                <p className="mt-1 text-xs text-gray-500 flex items-start gap-1 ml-6">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  The digital certificate verifies the authenticity of your work and ensures you receive
                  royalties from all future secondary market sales.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
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
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}