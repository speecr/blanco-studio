import React from 'react';
import MessageList from '../components/messages/MessageList';
import ConversationView from '../components/messages/ConversationView';
import type { MessageDisplay } from '../types';
import { exampleMessages } from '../data/examples';

export default function Messages() {
  const [messages] = React.useState<MessageDisplay[]>(exampleMessages);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isMobileView] = React.useState(window.innerWidth < 768);

  const selectedMessage = messages.find(m => m.id === selectedId);

  const handleMessageClick = (id: string) => {
    setSelectedId(id);
  };

  const handleBack = () => {
    setSelectedId(null);
  };

  // Show conversation view on mobile when message is selected
  if (isMobileView && selectedId && selectedMessage) {
    return (
      <div className="h-[calc(100vh-4rem)]">
        <ConversationView
          conversation={selectedMessage}
          onBack={handleBack}
          onSendMessage={async (content) => {
            console.log('Send message:', content);
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] flex bg-white rounded-xl border border-gray-100">
      {/* Message List - Full width on mobile, 1/3 width on desktop */}
      <div className={`${selectedId ? 'hidden md:block md:w-1/3' : 'w-full'} border-r border-gray-100`}>
        <MessageList
          messages={messages}
          searchQuery={searchQuery}
          selectedId={selectedId}
          onSearchChange={setSearchQuery}
          onMessageClick={handleMessageClick}
        />
      </div>

      {/* Conversation View - Hidden on mobile unless selected, 2/3 width on desktop */}
      {selectedId && selectedMessage && (
        <div className="hidden md:block md:w-2/3">
          <ConversationView
            conversation={selectedMessage}
            onBack={handleBack}
            onSendMessage={async (content) => {
              console.log('Send message:', content);
            }}
          />
        </div>
      )}
    </div>
  );
}