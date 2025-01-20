import React from 'react';
import { X, Smartphone, Mail, Share2, Plus } from 'lucide-react';

interface ImportContactsModalProps {
  onClose: () => void;
}

export default function ImportContactsModal({ onClose }: ImportContactsModalProps) {
  const importOptions = [
    {
      icon: Smartphone,
      title: 'Phone Contacts',
      description: 'Import contacts from your device contact book',
      action: () => console.log('Import from phone'),
      available: true,
    },
    {
      icon: Mail,
      title: 'Email Provider',
      description: 'Sync contacts from Gmail, Outlook, or other email providers',
      action: () => console.log('Import from email'),
      available: true,
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Import from Instagram, LinkedIn, or other social platforms',
      action: () => console.log('Import from social'),
      available: true,
    },
    {
      icon: Plus,
      title: 'Request New Source',
      description: "Let us know what other platforms you'd like to import from",
      action: () => console.log('Request new source'),
      available: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Import Contacts</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {importOptions.map(({ icon: Icon, title, description, action, available }) => (
              <button
                key={title}
                onClick={action}
                disabled={!available}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left flex items-start gap-4"
              >
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Need help importing contacts?{' '}
            <button className="text-indigo-600 hover:text-indigo-700">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}