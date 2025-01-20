import React from 'react';
import { format } from 'date-fns';
import { MessageSquare, Calendar, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Commission } from '../types';

interface CommissionCardProps {
  commission: Commission;
  onStatusChange: (id: string, status: Commission['status']) => void;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  review: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  in_progress: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-purple-100 text-purple-800',
  deferred: 'bg-gray-100 text-gray-800',
  declined: 'bg-red-100 text-red-800',
};

export default function CommissionCard({ commission, onStatusChange }: CommissionCardProps) {
  const navigate = useNavigate();

  const handleMessageThreadClick = () => {
    if (commission.messageThreadId) {
      navigate('/dashboard/messages');
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Commission for {commission.collector.name}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[commission.status]
                }`}
              >
                {commission.status.replace('_', ' ').charAt(0).toUpperCase() + 
                 commission.status.slice(1).replace('_', ' ')}
              </span>
              {commission.priority === 'urgent' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgent
                </span>
              )}
            </div>
          </div>
          <select
            value={commission.status}
            onChange={(e) => onStatusChange(commission.id, e.target.value as Commission['status'])}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            <option value="new">New</option>
            <option value="review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="deferred">Deferred</option>
            <option value="declined">Declined</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Request Details</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {commission.requestDetails.type}
              </p>
              {commission.requestDetails.medium && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Medium:</span> {commission.requestDetails.medium}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Dimensions:</span>{' '}
                {commission.requestDetails.dimensions.height} × {commission.requestDetails.dimensions.width}
                {commission.requestDetails.dimensions.depth && ` × ${commission.requestDetails.dimensions.depth}`}{' '}
                {commission.requestDetails.dimensions.unit}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Description:</span>{' '}
                {commission.requestDetails.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {commission.referenceArtwork && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Reference Artwork</h4>
                <div className="flex items-center gap-3">
                  <img
                    src={commission.referenceArtwork.image}
                    alt={commission.referenceArtwork.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600">{commission.referenceArtwork.title}</p>
                </div>
              </div>
            )}

            {commission.requestDetails.timeline?.requestedCompletion && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Requested completion:{' '}
                {formatDate(commission.requestDetails.timeline.requestedCompletion)}
              </div>
            )}

            {commission.price && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                Price: ${commission.price.toLocaleString()}
                {commission.deposit && ` (${commission.deposit.toLocaleString()} deposit)`}
              </div>
            )}

            {commission.messageThreadId && (
              <button
                onClick={handleMessageThreadClick}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <MessageSquare className="w-4 h-4" />
                View Message Thread
              </button>
            )}
          </div>
        </div>

        {commission.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{commission.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}