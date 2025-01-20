import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Home, Image, Calendar, FileText, Users, LogOut, Palette, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const artistMenuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Image, label: 'Portfolio', path: '/dashboard/portfolio' },
    { icon: Calendar, label: 'Studio Visits', path: '/dashboard/studio-visits' },
    { icon: Palette, label: 'Commissions', path: '/dashboard/commissions' },
    { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' },
    { icon: Users, label: 'CRM', path: '/dashboard/crm' },
  ];

  return (
    <nav className="bg-white border-r border-gray-100 h-screen w-64 fixed left-0 top-0 p-4">
      <div className="flex flex-col h-full">
        <Link to="/dashboard" className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-black">
            BLANCO
          </h1>
        </Link>

        <div className="flex-1">
          {artistMenuItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                location.pathname === path
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <Link
            to="/dashboard/profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 ${
              location.pathname === '/dashboard/profile'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <Settings className="w-5 h-5" />
          </Link>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 w-full rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}