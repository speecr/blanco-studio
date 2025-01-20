import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, MessageSquare, Calendar, MoreHorizontal } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around h-16">
        <NavItem
          to="/dashboard"
          icon={Home}
          label="Home"
          active={isActive('/dashboard')}
        />
        <NavItem
          to="/dashboard/portfolio"
          icon={Image}
          label="Portfolio"
          active={isActive('/dashboard/portfolio')}
        />
        <NavItem
          to="/dashboard/messages"
          icon={MessageSquare}
          label="Messages"
          active={isActive('/dashboard/messages')}
        />
        <NavItem
          to="/dashboard/studio-visits"
          icon={Calendar}
          label="Visits"
          active={isActive('/dashboard/studio-visits')}
        />
        <button
          onClick={() => document.getElementById('mobile-menu')?.classList.remove('translate-x-full')}
          className="flex flex-col items-center justify-center w-1/5 py-1 text-gray-600"
        >
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavItem({ to, icon: Icon, label, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center w-1/5 py-1 ${
        active ? 'text-indigo-600' : 'text-gray-600'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}