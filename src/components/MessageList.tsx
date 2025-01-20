import React from 'react';
import SearchInput from './SearchInput';
import type { MessageDisplay } from '../types';

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
  const filteredMessages = React.useMemo(() => {
    if (!searchQuery.trim()) return messages;
    
    const query = searchQuery.toLowerCase();
    return messages.filter(
      message =>
        message.sender.name.toLowerCase().includes(query) ||
        message.preview.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search messages..."
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageClick(message.id)}
            className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
              message.unread ? 'border-l-4 border-indigo-500' : ''
            } ${selectedId === message.id ? 'ring-2 ring-indigo-500' : ''}`}
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
        ))}
      </div>
    </div>
  );
}