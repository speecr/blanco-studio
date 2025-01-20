import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  action?: React.ReactNode;
}

export default function MobileHeader({ title, showBack = false, action }: MobileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}