import React from 'react';

interface Activity {
  id: string;
  text: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <h2 className="p-6 font-semibold text-gray-900 border-b border-gray-100">
        Recent Activity
      </h2>
      <div className="divide-y divide-gray-100">
        {activities.map(activity => (
          <div key={activity.id} className="p-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">{activity.text}</p>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}