import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  className?: string;
}

export default function StatCard({ label, value, change, icon: Icon, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-900" />
        </div>
        {change && <span className="text-sm text-gray-500">{change}</span>}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}