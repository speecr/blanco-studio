import React from 'react';

interface LetterAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LetterAvatar({ name, size = 'md' }: LetterAvatarProps) {
  const letter = name.charAt(0).toUpperCase();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  // Ensure aspect ratio is always square and border radius is circular
  return (
    <div 
      className={`${sizeClasses[size]} aspect-square rounded-full bg-white border-2 border-black flex items-center justify-center font-medium text-black shrink-0`}
    >
      {letter}
    </div>
  );
}