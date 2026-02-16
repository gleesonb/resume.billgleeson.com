import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => Promise<string>;
  initialMessages?: ChatMessageType[];
}

const ChatDrawer = ({
  isOpen,
  onClose,
  onSendMessage,
  initialMessages = [],
}: ChatDrawerProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await onSendMessage(content);

      // Add assistant message
      const assistantMessage: ChatMessageType = {
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    // Floating chat button
    return (
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent-teal hover:bg-accent-teal/90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="text-background" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-amber flex items-center justify-center">
              <MessageCircle size={20} className="text-background" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Chat with Bill</h2>
              <p className="text-sm text-text-secondary">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-text-secondary text-sm">
                Start a conversation with Bill...
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber text-background flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-4 py-2 rounded-lg bg-card">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={messages.length === 0 && !isLoading}
        />
      </div>
    </div>
  );
};

export default ChatDrawer;
