import { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const ChatInput = ({
  onSendMessage,
  isLoading = false,
  disabled = false,
}: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !isLoading && !disabled) {
      onSendMessage(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about Bill..."
          disabled={disabled || isLoading}
          rows={1}
          className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary resize-none focus:outline-none focus:border-accent-teal disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            minHeight: '44px',
            maxHeight: '120px',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || disabled}
          className="flex-shrink-0 w-11 h-11 bg-accent-teal hover:bg-accent-teal/90 disabled:bg-accent-teal/50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin text-background" />
          ) : (
            <Send size={20} className="text-background" />
          )}
        </button>
      </div>
      <p className="text-xs text-text-secondary mt-2">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
};

export default ChatInput;
