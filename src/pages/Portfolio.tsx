import React from 'react';
import { Plus, Image } from 'lucide-react';
import { useArtworks } from '../hooks/useArtworks';
import ArtworkList from '../components/portfolio/ArtworkList';
import NewArtworkDrawer from '../components/artwork/NewArtworkDrawer';
import SearchInput from '../components/SearchInput';
import { createArtwork, updateArtwork } from '../lib/supabase/artworks';

export default function Portfolio() {
  const { artworks, isLoading, error } = useArtworks();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showNewArtworkDrawer, setShowNewArtworkDrawer] = React.useState(false);
  const [filterVisibility, setFilterVisibility] = React.useState<'all' | 'active' | 'private'>('all');

  const handleNewArtwork = async (artwork: Omit<Artwork, 'id'>) => {
    try {
      await createArtwork(artwork);
      setShowNewArtworkDrawer(false);
      window.location.reload();
    } catch (err) {
      console.error('Error creating artwork:', err);
      alert('Failed to create artwork. Please try again.');
    }
  };

  const handleVisibilityToggle = async (id: string, visibility: 'active' | 'private') => {
    try {
      await updateArtwork(id, { visibility });
      window.location.reload();
    } catch (err) {
      console.error('Error updating visibility:', err);
      alert('Failed to update visibility. Please try again.');
    }
  };

  const filteredArtworks = React.useMemo(() => {
    if (!artworks) return [];
    
    let result = [...artworks];

    if (filterVisibility !== 'all') {
      result = result.filter(artwork => artwork.visibility === filterVisibility);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(artwork =>
        artwork.title.toLowerCase().includes(query) ||
        artwork.description?.toLowerCase().includes(query) ||
        artwork.medium?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [artworks, searchQuery, filterVisibility]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button
          onClick={() => setShowNewArtworkDrawer(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Artwork
        </button>
      </div>

      <div className="space-y-6 mb-8">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search artworks..."
        />

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setFilterVisibility('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filterVisibility === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterVisibility('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filterVisibility === 'active'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterVisibility('private')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filterVisibility === 'private'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Artworks</h3>
            <p className="text-gray-500 mb-4">
              Add your first artwork to get started
            </p>
            <button
              onClick={() => setShowNewArtworkDrawer(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            >
              Let's Go!
            </button>
          </div>
        ) : (
          <ArtworkList
            artworks={filteredArtworks}
            onVisibilityToggle={handleVisibilityToggle}
            onDelete={() => {}} // Add delete handler if needed
          />
        )}
      </div>

      {showNewArtworkDrawer && (
        <NewArtworkDrawer
          onSubmit={handleNewArtwork}
          onClose={() => setShowNewArtworkDrawer(false)}
        />
      )}
    </div>
  );
}