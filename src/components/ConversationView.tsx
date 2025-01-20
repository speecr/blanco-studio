import React from 'react';
import { format } from 'date-fns';
import { Calendar, FileText, Truck, X, Send } from 'lucide-react';
import type { Message } from '../types';
import { exampleMessages } from '../data/examples';

interface ConversationViewProps {
  conversationId: string;
  onClose: () => void;
  onSendMessage: (content: string, recipientId: string) => Promise<void>;
}

export default function ConversationView({ conversationId, onClose, onSendMessage }: ConversationViewProps) {
  const [newMessage, setNewMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Get the selected message from example data
  const selectedMessage = exampleMessages.find(m => m.id === conversationId);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      await onSendMessage(newMessage, conversationId);
      setNewMessage('');
      scrollToBottom();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  if (!selectedMessage) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedMessage.sender.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Example conversation */}
        <div className="flex justify-start mb-4">
          <div className="max-w-[70%] bg-gray-100 rounded-lg p-3">
            <p className="text-sm">{selectedMessage.preview}</p>
            <p className="text-xs mt-1 opacity-75">{selectedMessage.timestamp}</p>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="max-w-[70%] bg-indigo-600 text-white rounded-lg p-3">
            <p className="text-sm">Thank you for your interest! I'd be happy to schedule a viewing.</p>
            <p className="text-xs mt-1 opacity-75">Just now</p>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}