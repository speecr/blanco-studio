import React from 'react';
import { X } from 'lucide-react';
import type { StudioVisit } from '../../types';

interface NewVisitFormProps {
  onSubmit: (visit: Omit<StudioVisit, 'id'>) => void;
  onClose: () => void;
}

export default function NewVisitForm({ onSubmit, onClose }: NewVisitFormProps) {
  const [formData, setFormData] = React.useState({
    collector: {
      name: '',
      email: '',
      phone: '',
    },
    date: new Date(),
    time: '10:00',
    status: 'pending' as StudioVisit['status'],
    reason: '',
    notes: '',
    reminders: {
      email: true,
      sms: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: formData.date.toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Schedule Studio Visit</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Collector Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Collector Name
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
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

          {/* Visit Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={formData.date.toISOString().split('T')[0]}
                onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Visit
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>

          {/* Reminders */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Reminders</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, email: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-600">Email reminders</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.reminders.sms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, sms: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-600">SMS reminders</span>
              </label>
            </div>
          </div>

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
              Schedule Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}