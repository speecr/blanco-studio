import React from 'react';
import { Plus, Grid, CalendarDays, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { StudioVisit } from '../types';
import NewVisitForm from '../components/visits/NewVisitForm';
import VisitSettings from '../components/visits/VisitSettings';
import VisitList from '../components/visits/VisitList';
import VisitCalendar from '../components/visits/VisitCalendar';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store';

export default function StudioVisits() {
  const user = useAuthStore(state => state.user);
  const [visits, setVisits] = React.useState<StudioVisit[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showNewVisitForm, setShowNewVisitForm] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Load studio visits
  React.useEffect(() => {
    async function loadVisits() {
      if (!user?.id) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('studio_visits')
          .select('*')
          .eq('artist_id', user.id)
          .order('date', { ascending: true });

        if (fetchError) throw fetchError;

        setVisits(data || []);
      } catch (err) {
        console.error('Error loading studio visits:', err);
        setError('Failed to load studio visits');
      } finally {
        setIsLoading(false);
      }
    }

    loadVisits();
  }, [user?.id]);

  const handleNewVisit = async (visit: Omit<StudioVisit, 'id'>) => {
    if (!user?.id) return;

    try {
      const { data, error: insertError } = await supabase
        .from('studio_visits')
        .insert([{
          artist_id: user.id,
          collector_info: {
            name: visit.collector.name,
            email: visit.collector.email,
            phone: visit.collector.phone,
          },
          date: visit.date,
          time: visit.time,
          status: visit.status,
          reason: visit.reason,
          notes: visit.notes,
          reminders: visit.reminders,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setVisits(prev => [...prev, data]);
      setShowNewVisitForm(false);
    } catch (err) {
      console.error('Error creating studio visit:', err);
      alert('Failed to create studio visit. Please try again.');
    }
  };

  const handleStatusChange = async (id: string, status: StudioVisit['status']) => {
    try {
      const { error: updateError } = await supabase
        .from('studio_visits')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;

      setVisits(prev => prev.map(visit => 
        visit.id === id ? { ...visit, status } : visit
      ));
    } catch (err) {
      console.error('Error updating visit status:', err);
      alert('Failed to update visit status. Please try again.');
    }
  };

  const filteredVisits = React.useMemo(() => {
    if (viewMode === 'calendar') {
      return visits.filter(visit => {
        const visitDate = new Date(visit.date);
        return format(visitDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      });
    }
    return visits;
  }, [visits, viewMode, selectedDate]);

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
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Studio Visits</h1>
          <button
            onClick={() => setShowNewVisitForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden md:inline">Schedule Visit</span>
            <span className="md:hidden">New</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-center md:justify-start bg-gray-100 rounded-lg p-1 self-center md:self-start">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-md ${
              viewMode === 'calendar'
                ? 'bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {visits.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Studio Visits</h3>
            <p className="text-gray-500 mb-4">
              Schedule your first studio visit to get started
            </p>
            <button
              onClick={() => setShowNewVisitForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              Let's Go!
            </button>
          </div>
        ) : viewMode === 'calendar' ? (
          <div className="space-y-6">
            <VisitCalendar
              visits={visits}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            <VisitList
              visits={filteredVisits}
              onStatusChange={handleStatusChange}
            />
          </div>
        ) : (
          <VisitList
            visits={filteredVisits}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Forms */}
      {showNewVisitForm && (
        <NewVisitForm
          onSubmit={handleNewVisit}
          onClose={() => setShowNewVisitForm(false)}
        />
      )}

      {showSettings && (
        <VisitSettings
          settings={{
            email: { enabled: true, frequency: [24, 72] },
            sms: { enabled: true, frequency: [2, 24] },
          }}
          onSubmit={(settings) => {
            console.log('Settings update:', settings);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}