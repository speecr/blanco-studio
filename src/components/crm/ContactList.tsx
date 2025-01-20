import React from 'react';
import type { Contact } from '../../types';

interface ContactListProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
}

export default function ContactList({ contacts, onContactClick }: ContactListProps) {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={() => onContactClick(contact)}
          className="w-full bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <img
              src={contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}`}
              alt={contact.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    contact.type === 'collector'
                      ? 'bg-purple-100 text-purple-800'
                      : contact.type === 'gallery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {contact.total_purchases} purchases
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}