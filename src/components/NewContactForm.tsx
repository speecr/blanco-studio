import React from 'react';
import { X } from 'lucide-react';
import type { Contact } from '../types';

interface NewContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void;
  onClose: () => void;
}

export default function NewContactForm({ onSubmit, onClose }: NewContactFormProps) {
  const [formData, setFormData] = React.useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    company: '',
    role: '',
    type: 'collector',
    status: 'potential',
    priority_score: 0,
    total_purchases: 0,
    notes: '',
    owned_artworks: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Add New Contact</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-8.5rem)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Contact['type'] }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                required
              >
                <option value="collector">Collector</option>
                <option value="gallery">Gallery</option>
                <option value="curator">Curator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Contact['status'] }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="potential">Potential</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
              placeholder="@username"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority Score
            </label>
            <input
              type="number"
              value={formData.priority_score}
              onChange={(e) => setFormData(prev => ({ ...prev, priority_score: Number(e.target.value) }))}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Purchases
            </label>
            <input
              type="number"
              value={formData.total_purchases}
              onChange={(e) => setFormData(prev => ({ ...prev, total_purchases: Number(e.target.value) }))}
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
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
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}