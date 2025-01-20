import React from 'react';
import { Search } from 'lucide-react';
import type { MessageDisplay } from '../../types';
import LetterAvatar from '../LetterAvatar';

interface MessageListProps {
  messages: MessageDisplay[];
  searchQuery: string;
  selectedId: string | null;
  onSearchChange: (query: string) => void;
  onMessageClick: (id: string) => void;
}

export default function MessageList({
  messages,
  searchQuery,
  selectedId,
  onSearchChange,
  onMessageClick,
}: MessageListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => onMessageClick(message.id)}
              className={`w-full text-left p-6 hover:bg-gray-50 transition-colors ${
                selectedId === message.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <LetterAvatar name={message.sender.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {message.sender.name}
                    </h3>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                </div>
                {message.unread && (
                  <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}