import React from 'react';
import { X, Info } from 'lucide-react';
import type { Commission } from '../../types';
import { useAuthStore } from '../../store';

interface EmailPopupProps {
  commission: Commission;
  onClose: () => void;
}

export default function EmailPopup({ commission, onClose }: EmailPopupProps) {
  const user = useAuthStore(state => state.user);
  const [formData, setFormData] = React.useState({
    to: commission.collector.email,
    subject: `Regarding your commission request`,
    body: `Dear ${commission.collector.name},\n\nThank you for your commission request. I wanted to follow up regarding...\n\nBest regards,\n${user?.name}`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a properly encoded mailto URL
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${encodeURIComponent(formData.to)}`;
    mailtoLink.search = new URLSearchParams({
      subject: formData.subject,
      body: formData.body
    }).toString().replace(/\+/g, '%20');

    // Try multiple approaches to open the email client
    try {
      // First try: window.open
      const opened = window.open(mailtoLink.href, '_blank');
      
      if (!opened) {
        // Second try: direct click
        mailtoLink.click();
      }
      
      // Close the popup after a short delay to ensure the email client has time to open
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (err) {
      console.error('Error opening email client:', err);
      // Final fallback: direct location change
      window.location.href = mailtoLink.href;
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Contact Collector</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Email will be sent from: {user?.email}</p>
              <p>For better email management and tracking, consider using an email service like:</p>
              <ul className="list-disc ml-4 mt-1">
                <li>Gmail</li>
                <li>Outlook</li>
                <li>A dedicated CRM system</li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="email"
              value={formData.to}
              onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              rows={8}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              required
            />
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
              Open in Email Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}