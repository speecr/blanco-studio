import React from 'react';
import { Plus, FileText } from 'lucide-react';
import type { Invoice } from '../types';
import InvoiceList from '../components/invoices/InvoiceList';
import NewInvoiceForm from '../components/invoices/NewInvoiceForm';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store';

export default function Invoices() {
  const user = useAuthStore(state => state.user);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showNewInvoiceForm, setShowNewInvoiceForm] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<Invoice['status'] | 'all'>('all');

  // Load invoices
  React.useEffect(() => {
    async function loadInvoices() {
      if (!user?.id) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('invoices')
          .select('*, artwork:artworks(*)')
          .eq('seller_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setInvoices(data || []);
      } catch (err) {
        console.error('Error loading invoices:', err);
        setError('Failed to load invoices');
      } finally {
        setIsLoading(false);
      }
    }

    loadInvoices();
  }, [user?.id]);

  const handleNewInvoice = async (invoice: Omit<Invoice, 'id' | 'seller_id' | 'number' | 'created_at' | 'updated_at'>) => {
    if (!user?.id) return;

    try {
      // Generate invoice number
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;

      const { data, error: insertError } = await supabase
        .from('invoices')
        .insert([{
          seller_id: user.id,
          number: invoiceNumber,
          artwork_id: invoice.artwork_id,
          buyer_info: invoice.buyer_info,
          amount: invoice.amount,
          status: invoice.status,
          due_date: invoice.due_date,
          shipping: invoice.shipping,
          notes: invoice.notes,
        }])
        .select('*, artwork:artworks(*)')
        .single();

      if (insertError) throw insertError;

      setInvoices(prev => [data, ...prev]);
      setShowNewInvoiceForm(false);
    } catch (err) {
      console.error('Error creating invoice:', err);
      alert('Failed to create invoice. Please try again.');
    }
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading invoice:', invoice.number);
  };

  const filteredInvoices = React.useMemo(() => {
    if (filterStatus === 'all') return invoices;
    return invoices.filter(invoice => invoice.status === filterStatus);
  }, [invoices, filterStatus]);

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
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={() => setShowNewInvoiceForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Create Invoice</span>
          <span className="md:hidden">New</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 overflow-x-auto pb-2 md:pb-0">
        <div className="flex gap-2 min-w-max">
          {['all', 'draft', 'pending', 'paid', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as Invoice['status'] | 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'All Invoices'
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Invoices</h3>
            <p className="text-gray-500 mb-4">
              Create your first invoice to get started
            </p>
            <button
              onClick={() => setShowNewInvoiceForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              Let's Go!
            </button>
          </div>
        ) : (
          <InvoiceList
            invoices={filteredInvoices}
            onDownload={handleDownloadInvoice}
          />
        )}
      </div>

      {/* Forms */}
      {showNewInvoiceForm && (
        <NewInvoiceForm
          onSubmit={handleNewInvoice}
          onClose={() => setShowNewInvoiceForm(false)}
        />
      )}
    </div>
  );
}