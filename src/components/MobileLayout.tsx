import React from 'react';
import MobileNavigation from './MobileNavigation';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();
  const hideNavigation = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="md:hidden min-h-screen bg-gray-50">
      <div className="pb-16">{children}</div>
      {!hideNavigation && (
        <>
          <MobileNavigation />
          <MobileMenu />
        </>
      )}
    </div>
  );
}