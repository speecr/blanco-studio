import React from 'react';
import { Save } from 'lucide-react';

export default function MarketplaceSettingsForm() {
  const [formData, setFormData] = React.useState({
    profile: {
      public: true,
      bio: '',
      displayName: '',
      location: '',
      website: '',
      customLinks: [
        { label: 'Portfolio', url: '' },
        { label: 'Instagram', url: '' },
      ],
    },
    features: {
      studioVisits: true,
      commissions: true,
      directMessaging: true,
      showPrices: true,
    },
    preferences: {
      autoApproveBookings: false,
      showAvailability: true,
      notifyNewFollowers: true,
      featuredWorks: [],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving marketplace settings:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields with consistent styling */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.profile.public}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, public: e.target.checked },
            }))}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
          <span className="text-sm text-gray-700">
            Make profile public on marketplace
          </span>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            value={formData.profile.displayName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, displayName: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            value={formData.profile.bio}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, bio: e.target.value },
            }))}
            rows={4}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={formData.profile.location}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, location: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            value={formData.profile.website}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, website: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
        <div className="space-y-3">
          {Object.entries(formData.features).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  features: { ...prev.features, [key]: e.target.checked },
                }))}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
        <div className="space-y-3">
          {Object.entries(formData.preferences).map(([key, value]) => (
            key !== 'featuredWorks' && (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, [key]: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            )
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
}