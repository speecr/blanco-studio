import React from 'react';
import type { MessageDisplay } from '../types';

interface MessageItemProps {
  message: MessageDisplay;
  onClick?: (id: string) => void;
}

export default function MessageItem({ message, onClick }: MessageItemProps) {
  return (
    <div
      onClick={() => onClick?.(message.id)}
      className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
        message.unread ? 'border-l-4 border-indigo-500' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-900">
              {message.sender.name}
            </h3>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
          <p className="text-sm text-gray-600 truncate">{message.preview}</p>
        </div>
      </div>
    </div>
  );
}