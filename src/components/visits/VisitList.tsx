import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import type { StudioVisit } from '../../types';
import LetterAvatar from '../LetterAvatar';

interface VisitListProps {
  visits: StudioVisit[];
  onStatusChange: (id: string, status: StudioVisit['status']) => void;
}

export default function VisitList({ visits, onStatusChange }: VisitListProps) {
  return (
    <div className="space-y-4">
      {visits.map((visit) => {
        // Extract collector info from the new structure
        const collectorName = visit.collector_info?.name || 'Unknown';
        const collectorEmail = visit.collector_info?.email;
        const collectorPhone = visit.collector_info?.phone;

        return (
          <div
            key={visit.id}
            className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <LetterAvatar name={collectorName} />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {collectorName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(visit.date), 'MMM d, yyyy')}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{visit.time}</span>
                    </div>
                  </div>
                </div>
                <select
                  value={visit.status}
                  onChange={(e) => onStatusChange(visit.id, e.target.value as StudioVisit['status'])}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    visit.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : visit.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : visit.status === 'completed'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {visit.reason && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Reason for Visit</h4>
                  <p className="text-sm text-gray-600">{visit.reason}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {collectorEmail && (
                  <a
                    href={`mailto:${collectorEmail}`}
                    className="hover:text-gray-900"
                  >
                    {collectorEmail}
                  </a>
                )}
                {collectorPhone && (
                  <a
                    href={`tel:${collectorPhone}`}
                    className="hover:text-gray-900"
                  >
                    {collectorPhone}
                  </a>
                )}
              </div>

              {visit.notes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{visit.notes}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}