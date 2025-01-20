import React from 'react';
import { Plus, Users } from 'lucide-react';
import type { Contact } from '../types';
import NewContactForm from '../components/NewContactForm';
import SearchInput from '../components/SearchInput';
import { createContact, updateContact, deleteContact, getContacts } from '../lib/supabase/contacts';
import LetterAvatar from '../components/LetterAvatar';
import ContactDetail from '../components/crm/ContactDetail';

export default function CRM() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showNewContactForm, setShowNewContactForm] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);

  React.useEffect(() => {
    async function loadContacts() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error('Error loading contacts:', err);
        setError('Failed to load contacts');
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, []);

  const handleNewContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact = await createContact(contact);
      setContacts(prev => [newContact, ...prev]);
      setShowNewContactForm(false);
    } catch (err) {
      console.error('Error creating contact:', err);
      alert('Failed to create contact. Please try again.');
    }
  };

  const handleUpdateContact = async (updatedContact: Contact) => {
    try {
      const result = await updateContact(updatedContact.id, updatedContact);
      setContacts(prev => prev.map(c => c.id === updatedContact.id ? result : c));
      setSelectedContact(result);
    } catch (err) {
      console.error('Error updating contact:', err);
      alert('Failed to update contact. Please try again.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      setSelectedContact(null);
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const filteredContacts = React.useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.type.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-2rem)]">
      {/* Main Content */}
      <div className="h-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
            <button
              onClick={() => setShowNewContactForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </button>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search contacts..."
          />
        </div>

        <div className="p-6">
          {contacts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Contacts</h3>
              <p className="text-gray-500 mb-4">
                Add your first contact to get started
              </p>
              <button
                onClick={() => setShowNewContactForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
              >
                Let's Go!
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredContacts.map(contact => (
                    <tr
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <LetterAvatar name={contact.name} size="sm" />
                          <span className="font-medium text-gray-900">{contact.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contact.type === 'collector'
                            ? 'bg-purple-100 text-purple-800'
                            : contact.type === 'gallery'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contact.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : contact.status === 'potential'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{contact.email || '—'}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{contact.phone || '—'}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{contact.company || '—'}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{contact.priority_score}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{contact.total_purchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination info */}
              <div className="p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-right">
                  Showing {filteredContacts.length} of {contacts.length} contacts
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Sidebar */}
      {selectedContact && (
        <div className="fixed inset-y-0 right-0 w-1/3 bg-white border-l border-gray-100 shadow-xl z-40">
          <ContactDetail
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onUpdate={handleUpdateContact}
            onDelete={handleDeleteContact}
          />
        </div>
      )}

      {/* New Contact Form */}
      {showNewContactForm && (
        <NewContactForm
          onSubmit={handleNewContact}
          onClose={() => setShowNewContactForm(false)}
        />
      )}
    </div>
  );
}