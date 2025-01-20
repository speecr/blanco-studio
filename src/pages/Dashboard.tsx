import React from 'react';
import { BarChart, Users, DollarSign, Calendar } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ActiveListings from '../components/dashboard/ActiveListings';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useArtworks } from '../hooks/useArtworks';

export default function Dashboard() {
  const { artworks, isLoading } = useArtworks();
  const activeArtworks = artworks?.filter(artwork => artwork.visibility === 'active') || [];

  const stats = [
    {
      label: 'Total Sales',
      value: '$24,500',
      change: '+12%',
      icon: DollarSign,
    },
    {
      label: 'Active Collectors',
      value: '24',
      change: '+4',
      icon: Users,
    },
    {
      label: 'Upcoming Visits',
      value: '3',
      change: 'This week',
      icon: Calendar,
    },
    {
      label: 'Revenue Growth',
      value: '38%',
      change: 'vs last month',
      icon: BarChart,
    },
  ];

  const recentActivities = [
    { id: '1', text: 'New studio visit request from John Doe', time: '2h ago' },
    { id: '2', text: 'Artwork "Urban Dreams" was marked as sold', time: '5h ago' },
    { id: '3', text: 'New message from Sarah regarding commission', time: '1d ago' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Grid - Scrollable on mobile */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
            className="min-w-[240px] md:min-w-0 flex-shrink-0"
          />
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        <ActiveListings artworks={activeArtworks} />
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}