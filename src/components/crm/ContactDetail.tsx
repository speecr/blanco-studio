import React from 'react';
import { X, Instagram, Star, Save, Mail, Phone } from 'lucide-react';
import type { Contact } from '../../types';
import LetterAvatar from '../LetterAvatar';

interface ContactDetailProps {
  contact: Contact;
  onClose: () => void;
  onUpdate: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactDetail({ contact, onClose, onUpdate, onDelete }: ContactDetailProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<Contact>(contact);

  // Only update form data when contact changes
  React.useEffect(() => {
    if (!isEditing) {
      setFormData(contact);
    }
  }, [contact, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating contact:', err);
      alert('Failed to update contact. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData(contact);
    setIsEditing(false);
  };

  const handleEmailClick = () => {
    // Create a properly encoded mailto URL
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${encodeURIComponent(contact.email || '')}`;
    mailtoLink.search = new URLSearchParams({
      subject: 'Saying Hi!',
    }).toString().replace(/\+/g, '%20');

    // Try multiple approaches to open the email client
    try {
      // First try: window.open
      const opened = window.open(mailtoLink.href, '_blank');
      
      if (!opened) {
        // Second try: direct click
        mailtoLink.click();
      }
    } catch (err) {
      console.error('Error opening email client:', err);
      // Final fallback: direct location change
      window.location.href = mailtoLink.href;
    }
  };

  const handlePhoneClick = () => {
    // For iOS, we'll use a special format that allows both call and message
    const phoneNumber = contact.phone?.replace(/\D/g, '') || '';
    const iOSLink = `sms:${phoneNumber}&body=`;
    
    // Try to open the messaging app
    window.location.href = iOSLink;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <LetterAvatar name={contact.name} size="lg" />
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-semibold text-gray-900 border-2 border-gray-200 rounded-lg px-2 py-1 focus:border-black focus:ring-black"
                required
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
            )}
          </div>

          {/* Contact Buttons */}
          {!isEditing && contact && (
            <div className="mt-4 flex gap-2">
              {contact.email && (
                <button
                  onClick={handleEmailClick}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </button>
              )}
              {contact.phone && (
                <button
                  onClick={handlePhoneClick}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Text Me
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500">Type</label>
                {isEditing ? (
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Contact['type'] }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  >
                    <option value="collector">Collector</option>
                    <option value="gallery">Gallery</option>
                    <option value="curator">Curator</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    contact.type === 'collector'
                      ? 'bg-purple-100 text-purple-800'
                      : contact.type === 'gallery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Status</label>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Contact['status'] }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  >
                    <option value="active">Active</option>
                    <option value="potential">Potential</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    contact.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : contact.status === 'potential'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{contact.email || '—'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{contact.phone || '—'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Instagram</label>
                {isEditing ? (
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Instagram className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.instagram || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                      className="block w-full pl-10 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                      placeholder="@username"
                    />
                  </div>
                ) : contact.instagram ? (
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <Instagram className="h-4 w-4 text-gray-400" />
                    <a
                      href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-black"
                    >
                      {contact.instagram}
                    </a>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">—</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{contact.company || '—'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{contact.role || '—'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Stats</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500">Priority Score</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.priority_score}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority_score: Number(e.target.value) }))}
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <div className="mt-1 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{contact.priority_score}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Total Purchases</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.total_purchases}
                    onChange={(e) => setFormData(prev => ({ ...prev, total_purchases: Number(e.target.value) }))}
                    min="0"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{contact.total_purchases}</p>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Notes</h3>
            {isEditing ? (
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="block w-full rounded-lg border-2 border-gray-200 focus:border-black focus:ring-black"
              />
            ) : (
              <p className="text-sm text-gray-900 whitespace-pre-line">{contact.notes || '—'}</p>
            )}
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-2 text-sm font-medium text-black bg-white border border-black hover:bg-gray-50 rounded-lg"
              >
                Edit Info
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={() => onDelete(contact.id)}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
        >
          Delete Contact
        </button>
      </div>
    </div>
  );
}