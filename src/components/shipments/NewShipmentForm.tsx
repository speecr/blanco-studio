import React from 'react';
import { X } from 'lucide-react';
import type { Shipment } from '../../types';
import { useArtworks } from '../../hooks/useArtworks';

interface NewShipmentFormProps {
  onSubmit: (shipment: Omit<Shipment, 'id' | 'createdAt'>) => Promise<void>;
  onClose: () => void;
}

export default function NewShipmentForm({ onSubmit, onClose }: NewShipmentFormProps) {
  const { artworks } = useArtworks();
  const [formData, setFormData] = React.useState({
    artwork_id: '',
    buyer: {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
    },
    carrier: '',
    tracking_number: '',
    shipping_address: {
      street: '',
      unit: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
    },
    estimated_delivery: '',
    special_instructions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Form implementation */}
      </div>
    </div>
  );
}