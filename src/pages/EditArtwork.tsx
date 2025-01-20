import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, AlertCircle } from 'lucide-react';
import { useArtwork } from '../hooks/useArtwork';
import { validateArtwork } from '../utils/validation';
import ImageUpload from '../components/artwork/ImageUpload';
import ArtworkForm from '../components/artwork/ArtworkForm';
import DeleteConfirmation from '../components/artwork/DeleteConfirmation';

export default function EditArtwork() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artwork, isLoading, error: loadError, save, remove } = useArtwork(id!);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (loadError || !artwork) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{loadError || 'Artwork not found'}</p>
      </div>
    );
  }

  const handleSubmit = async (updatedArtwork: Artwork) => {
    setError(null);
    setIsSaving(true);

    try {
      const validationErrors = validateArtwork(updatedArtwork);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      await save(updatedArtwork);
      navigate(`/dashboard/portfolio/${artwork.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save artwork');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await remove();
      navigate('/dashboard/portfolio');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete artwork');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Artwork</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
          <div className="text-sm text-red-800 whitespace-pre-line">{error}</div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <ImageUpload
            images={artwork.images}
            onChange={(images) => save({ ...artwork, images })}
          />
        </div>

        <ArtworkForm
          artwork={artwork}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}