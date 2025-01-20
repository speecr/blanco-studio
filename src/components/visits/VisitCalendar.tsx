import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import type { StudioVisit } from '../../types';

interface VisitCalendarProps {
  visits: StudioVisit[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function VisitCalendar({ visits, selectedDate, onDateSelect }: VisitCalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasVisitOnDate = (date: Date) => {
    return visits.some(visit => {
      const visitDate = new Date(visit.date);
      return isSameDay(visitDate, date);
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          const hasVisit = hasVisitOnDate(day);
          const isSelected = isSameDay(selectedDate, day);
          
          return (
            <button
              key={i}
              onClick={() => onDateSelect(day)}
              className={`h-10 flex items-center justify-center rounded-lg text-sm relative ${
                isSelected
                  ? 'bg-black text-white'
                  : hasVisit
                  ? 'bg-gray-100 text-gray-900'
                  : 'hover:bg-gray-50'
              }`}
            >
              {format(day, 'd')}
              {hasVisit && !isSelected && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}