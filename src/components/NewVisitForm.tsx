import React from 'react';
import { X } from 'lucide-react';
import type { StudioVisit, Artwork, CommunicationChannel, VisitStatus } from '../types';

interface NewVisitFormProps {
  artworks: Artwork[];
  onSubmit: (visit: Omit<StudioVisit, 'id'>) => void;
  onClose: () => void;
}

const communicationChannels: CommunicationChannel[] = [
  'email',
  'sms',
  'instagram',
  'mailing_list',
  'whatsapp',
];

export default function NewVisitForm({ artworks, onSubmit, onClose }: NewVisitFormProps) {
  const [formData, setFormData] = React.useState({
    collector: {
      id: '',
      name: '',
      email: '',
      phone: '',
      communicationChannels: [] as CommunicationChannel[],
    },
    date: new Date(),
    time: '10:00',
    status: 'pending' as VisitStatus,
    reason: '',
    interestedArtwork: {
      id: '',
      title: '',
      image: '',
    },
    notes: '',
    reminders: {
      email: true,
      sms: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleArtworkSelect = (artworkId: string) => {
    const artwork = artworks.find(a => a.id === artworkId);
    if (artwork) {
      setFormData(prev => ({
        ...prev,
        interestedArtwork: {
          id: artwork.id,
          title: artwork.title,
          image: artwork.images[0],
        },
      }));
    }
  };

  const toggleCommunicationChannel = (channel: CommunicationChannel) => {
    setFormData(prev => ({
      ...prev,
      collector: {
        ...prev.collector,
        communicationChannels: prev.collector.communicationChannels.includes(channel)
          ? prev.collector.communicationChannels.filter(c => c !== channel)
          : [...prev.collector.communicationChannels, channel],
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Schedule Studio Visit</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Channels
              </label>
              <div className="flex flex-wrap gap-2">
                {communicationChannels.map(channel => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleCommunicationChannel(channel)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formData.collector.communicationChannels.includes(channel)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {channel.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date.toISOString().split('T')[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interested Artwork
              </label>
              <select
                value={formData.interestedArtwork.id}
                onChange={(e) => handleArtworkSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select artwork</option>
                {artworks.map(artwork => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Visit
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminders
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.reminders.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      reminders: { ...prev.reminders, email: e.target.checked },
                    }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">SMS reminders</span>
                </label>
              </div>
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
                Schedule Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}