import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import type { Message } from '../../types';

interface ConversationViewProps {
  conversation: Message;
  onBack: () => void;
  onSendMessage: (content: string) => Promise<void>;
}

export default function ConversationView({ conversation, onBack, onSendMessage }: ConversationViewProps) {
  const [newMessage, setNewMessage] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      await onSendMessage(newMessage);
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
  }, [conversation]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Conversation Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-100">
        <button
          onClick={onBack}
          className="md:hidden p-2 -m-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={conversation.sender.avatar}
          alt={conversation.sender.name}
          className="w-10 h-10 rounded-full bg-gray-50"
        />
        <div>
          <h2 className="font-medium text-gray-900">{conversation.sender.name}</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                msg.fromMe
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-6 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}