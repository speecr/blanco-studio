import React from 'react';
import { X } from 'lucide-react';

interface ReminderSettings {
  email: {
    enabled: boolean;
    frequency: number[];
  };
  sms: {
    enabled: boolean;
    frequency: number[];
  };
}

interface VisitSettingsProps {
  settings: ReminderSettings;
  onSubmit: (settings: ReminderSettings) => void;
  onClose: () => void;
}

export default function VisitSettings({ settings, onSubmit, onClose }: VisitSettingsProps) {
  const [formData, setFormData] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Reminder Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Email Reminders</h3>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={formData.email.enabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    email: { ...prev.email, enabled: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Enable email reminders</span>
              </label>
              {formData.email.enabled && (
                <div className="space-y-2">
                  {formData.email.frequency.map((hours, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="number"
                        value={hours}
                        onChange={(e) => {
                          const newFrequency = [...formData.email.frequency];
                          newFrequency[index] = Number(e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            email: { ...prev.email, frequency: newFrequency },
                          }));
                        }}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                        min="1"
                        max="168"
                      />
                      <span className="text-sm text-gray-600">hours before visit</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">SMS Reminders</h3>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={formData.sms.enabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    sms: { ...prev.sms, enabled: e.target.checked },
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Enable SMS reminders</span>
              </label>
              {formData.sms.enabled && (
                <div className="space-y-2">
                  {formData.sms.frequency.map((hours, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="number"
                        value={hours}
                        onChange={(e) => {
                          const newFrequency = [...formData.sms.frequency];
                          newFrequency[index] = Number(e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            sms: { ...prev.sms, frequency: newFrequency },
                          }));
                        }}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                        min="1"
                        max="168"
                      />
                      <span className="text-sm text-gray-600">hours before visit</span>
                    </div>
                  ))}
                </div>
              )}
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
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}