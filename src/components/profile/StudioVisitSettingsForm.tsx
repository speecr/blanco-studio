import React from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store';

export default function StudioVisitSettingsForm() {
  const user = useAuthStore(state => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    availability: {
      monday: { enabled: true, start: '09:00', end: '17:00' },
      tuesday: { enabled: true, start: '09:00', end: '17:00' },
      wednesday: { enabled: true, start: '09:00', end: '17:00' },
      thursday: { enabled: true, start: '09:00', end: '17:00' },
      friday: { enabled: true, start: '09:00', end: '17:00' },
      saturday: { enabled: false, start: '09:00', end: '17:00' },
      sunday: { enabled: false, start: '09:00', end: '17:00' },
    },
    visitDuration: 60,
    bufferTime: 30,
    noShowFee: {
      enabled: false,
      amount: 0,
    },
    publicBooking: false,
    advanceNotice: 24,
    maxBookingsPerDay: 4,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          studio_visit_settings: formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
    } catch (err) {
      console.error('Error saving studio visit settings:', err);
      setError('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Availability Schedule */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Availability Schedule</h3>
        <div className="space-y-4">
          {days.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4">
              <label className="w-32 flex items-center">
                <input
                  type="checkbox"
                  checked={formData.availability[key].enabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      [key]: { ...prev.availability[key], enabled: e.target.checked },
                    },
                  }))}
                  className="rounded border-gray-300 text-black focus:ring-black mr-2"
                />
                {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={formData.availability[key].start}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      [key]: { ...prev.availability[key], start: e.target.value },
                    },
                  }))}
                  disabled={!formData.availability[key].enabled}
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors disabled:bg-gray-100"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={formData.availability[key].end}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      [key]: { ...prev.availability[key], end: e.target.value },
                    },
                  }))}
                  disabled={!formData.availability[key].enabled}
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors disabled:bg-gray-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visit Duration and Buffer Time */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Visit Duration (minutes)
          </label>
          <select
            value={formData.visitDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, visitDuration: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Buffer Time Between Visits (minutes)
          </label>
          <select
            value={formData.bufferTime}
            onChange={(e) => setFormData(prev => ({ ...prev, bufferTime: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
      </div>

      {/* No-Show Fee */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.noShowFee.enabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              noShowFee: { ...prev.noShowFee, enabled: e.target.checked },
            }))}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
          <span className="text-sm font-medium text-gray-700">
            Charge a fee for no-shows
          </span>
        </label>
        {formData.noShowFee.enabled && (
          <div className="mt-2">
            <label className="block text-sm text-gray-600">Fee Amount ($)</label>
            <input
              type="number"
              value={formData.noShowFee.amount}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                noShowFee: { ...prev.noShowFee, amount: Number(e.target.value) },
              }))}
              min="0"
              step="5"
              className="mt-1 block w-48 rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
        )}
      </div>

      {/* Additional Settings */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.publicBooking}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                publicBooking: e.target.checked,
              }))}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm font-medium text-gray-700">
              Allow public booking through marketplace profile
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-500 ml-6">
            When enabled, collectors can book studio visits directly through your marketplace profile
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Required Advance Notice (hours)
          </label>
          <select
            value={formData.advanceNotice}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              advanceNotice: Number(e.target.value),
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          >
            <option value="12">12 hours</option>
            <option value="24">24 hours</option>
            <option value="48">48 hours</option>
            <option value="72">72 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Bookings Per Day
          </label>
          <select
            value={formData.maxBookingsPerDay}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              maxBookingsPerDay: Number(e.target.value),
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          >
            <option value="2">2 visits</option>
            <option value="3">3 visits</option>
            <option value="4">4 visits</option>
            <option value="5">5 visits</option>
            <option value="6">6 visits</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}