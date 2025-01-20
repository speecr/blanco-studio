import React from 'react';
import MobileHeader from './MobileHeader';

interface MobileContainerProps {
  title: string;
  showBack?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export default function MobileContainer({ title, showBack, action, children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 md:bg-transparent">
      <MobileHeader title={title} showBack={showBack} action={action} />
      <div className="p-4 pb-20 md:p-0">{children}</div>
    </div>
  );
}