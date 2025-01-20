import React from 'react';
import { Plus, Clock } from 'lucide-react';
import type { Commission } from '../types';
import CommissionList from '../components/commissions/CommissionList';
import NewCommissionForm from '../components/commissions/NewCommissionForm';
import EmailPopup from '../components/commissions/EmailPopup';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store';

export default function Commissions() {
  const user = useAuthStore(state => state.user);
  const [commissions, setCommissions] = React.useState<Commission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showNewCommissionForm, setShowNewCommissionForm] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<Commission['status'] | 'all'>('all');
  const [selectedCommission, setSelectedCommission] = React.useState<Commission | null>(null);

  // Load commissions
  React.useEffect(() => {
    async function loadCommissions() {
      if (!user?.id) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('commissions')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setCommissions(data || []);
      } catch (err) {
        console.error('Error loading commissions:', err);
        setError('Failed to load commissions');
      } finally {
        setIsLoading(false);
      }
    }

    loadCommissions();
  }, [user?.id]);

  const handleNewCommission = async (commission: Omit<Commission, 'id' | 'artist_id' | 'created_at' | 'updated_at'>) => {
    if (!user?.id) return;

    try {
      const { data, error: insertError } = await supabase
        .from('commissions')
        .insert([{
          artist_id: user.id,
          collector_info: {
            name: commission.collector_info.name,
            email: commission.collector_info.email,
            phone: commission.collector_info.phone,
          },
          request_details: commission.request_details,
          price: commission.price,
          deposit: commission.deposit,
          status: commission.status,
          priority: commission.priority,
          notes: commission.notes,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setCommissions(prev => [data, ...prev]);
      setShowNewCommissionForm(false);
    } catch (err) {
      console.error('Error creating commission:', err);
      alert('Failed to create commission. Please try again.');
    }
  };

  const handleStatusChange = async (id: string, status: Commission['status']) => {
    try {
      const { error: updateError } = await supabase
        .from('commissions')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;

      setCommissions(prev => prev.map(commission => 
        commission.id === id ? { ...commission, status } : commission
      ));
    } catch (err) {
      console.error('Error updating commission status:', err);
      alert('Failed to update commission status. Please try again.');
    }
  };

  const filteredCommissions = React.useMemo(() => {
    if (filterStatus === 'all') return commissions;
    return commissions.filter(commission => commission.status === filterStatus);
  }, [commissions, filterStatus]);

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
        <h1 className="text-2xl font-bold text-gray-900">Commission Requests</h1>
        <button
          onClick={() => setShowNewCommissionForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">New Commission</span>
          <span className="md:hidden">New</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 overflow-x-auto pb-2 md:pb-0">
        <div className="flex gap-2 min-w-max">
          {['all', 'new', 'review', 'accepted', 'in_progress', 'completed', 'deferred', 'declined'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as Commission['status'] | 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'All Requests'
                : status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredCommissions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Commission Requests</h3>
            <p className="text-gray-500 mb-4">
              Create your first commission request to get started
            </p>
            <button
              onClick={() => setShowNewCommissionForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              Let's Go!
            </button>
          </div>
        ) : (
          <CommissionList
            commissions={filteredCommissions}
            onStatusChange={handleStatusChange}
            onContactCollector={setSelectedCommission}
          />
        )}
      </div>

      {/* Forms */}
      {showNewCommissionForm && (
        <NewCommissionForm
          onSubmit={handleNewCommission}
          onClose={() => setShowNewCommissionForm(false)}
        />
      )}

      {selectedCommission && (
        <EmailPopup
          commission={selectedCommission}
          onClose={() => setSelectedCommission(null)}
        />
      )}
    </div>
  );
}