import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, Palette, FileText, Users, LogOut,
  Settings, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store';
import { supabase } from '../lib/supabase';

export default function MobileMenu() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.add('translate-x-full');
      menu.classList.remove('translate-x-0');
    }
  };

  const menuItems = [
    { icon: Palette, label: 'Commissions', path: '/dashboard/commissions' },
    { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' },
    { icon: Users, label: 'CRM', path: '/dashboard/crm' },
    { icon: Settings, label: 'Settings', path: '/dashboard/profile' },
  ];

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 bg-black bg-opacity-50 transform translate-x-full transition-all duration-300 ease-in-out z-50 md:hidden"
      onClick={closeMenu}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button onClick={closeMenu} className="p-2 text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto">
          <div className="py-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile & Sign Out */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}