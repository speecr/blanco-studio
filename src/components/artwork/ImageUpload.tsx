import React from 'react';
import { Upload, X } from 'lucide-react';
import { uploadArtworkImage } from '../../lib/supabase/storage';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(file => uploadArtworkImage(file));
      const newImages = await Promise.all(uploadPromises);
      onChange([...images, ...newImages]);
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image}
              alt={`Artwork ${index + 1}`}
              className="w-full h-full object-cover rounded-lg bg-gray-50"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
        
        <label className={`aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Upload className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}