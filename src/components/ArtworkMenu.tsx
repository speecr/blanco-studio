import React from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArtworkMenuProps {
  artworkId: string;
  onDelete: () => void;
}

export default function ArtworkMenu({ artworkId, onDelete }: ArtworkMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    navigate(`/dashboard/portfolio/edit/${artworkId}`);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Artwork</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this artwork? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}