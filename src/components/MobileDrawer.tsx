import React from 'react';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MobileDrawer({ isOpen, onClose, title, children }: MobileDrawerProps) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}