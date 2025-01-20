import React from 'react';
import { format } from 'date-fns';
import { Mail, Phone, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Commission } from '../../types';
import LetterAvatar from '../LetterAvatar';

interface CommissionListProps {
  commissions: Commission[];
  onStatusChange: (id: string, status: Commission['status']) => void;
  onContactCollector: (commission: Commission) => void;
}

export default function CommissionList({ commissions, onStatusChange, onContactCollector }: CommissionListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {commissions.map((commission) => (
        <div
          key={commission.id}
          onClick={() => navigate(`/dashboard/commissions/${commission.id}`)}
          className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden cursor-pointer"
        >
          <div className="p-4">
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Commission from {commission.collector_info.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {commission.request_details.timeline?.requestedCompletion && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {format(new Date(commission.request_details.timeline.requestedCompletion), 'MMM d, yyyy')}
                    </span>
                  )}
                  {commission.price && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {commission.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={commission.status}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    onStatusChange(commission.id, e.target.value as Commission['status']);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    commission.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : commission.status === 'declined'
                      ? 'bg-red-100 text-red-800'
                      : commission.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <option value="new">New</option>
                  <option value="review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="deferred">Deferred</option>
                  <option value="declined">Declined</option>
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    onContactCollector(commission);
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Contact Collector
                </button>
              </div>
            </div>

            {/* Commission Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Request Details</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Type:</span> {commission.request_details.type}
                  </p>
                  {commission.request_details.medium && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Medium:</span> {commission.request_details.medium}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dimensions:</span>{' '}
                    {commission.request_details.dimensions.height} × {commission.request_details.dimensions.width}
                    {commission.request_details.dimensions.depth && ` × ${commission.request_details.dimensions.depth}`}{' '}
                    {commission.request_details.dimensions.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Description:</span>{' '}
                    {commission.request_details.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <a
                    href={`mailto:${commission.collector_info.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Mail className="w-4 h-4" />
                    {commission.collector_info.email}
                  </a>
                  {commission.collector_info.phone && (
                    <a
                      href={`tel:${commission.collector_info.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <Phone className="w-4 h-4" />
                      {commission.collector_info.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {commission.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                <p className="text-sm text-gray-600">{commission.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}