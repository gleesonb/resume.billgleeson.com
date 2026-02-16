import { supabase } from '../lib/supabase';
import { useChatStore } from './useChatStore';
import { ChatMessage } from '../types';

// Generate a persistent session ID for the chat
const SESSION_ID = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15);

interface SendMessageOptions {
  onSuccess?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
}

export function useChat() {
  const { messages, isTyping, addMessage, setTyping, clearMessages } = useChatStore();

  const sendMessage = async (userMessage: string, options?: SendMessageOptions) => {
    // Add user message to the store
    const userMsg: ChatMessage = { role: 'user', content: userMessage };
    addMessage(userMsg);

    // Set typing state
    setTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: userMessage,
          session_id: SESSION_ID,
          history: messages,
        },
      });

      if (error) throw error;

      // Add assistant response to the store
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.response || data.message || '',
      };
      addMessage(assistantMsg);

      options?.onSuccess?.(assistantMsg);
    } catch (error) {
      const err = error as Error;
      console.error('Error sending message:', err);
      options?.onError?.(err);
    } finally {
      setTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
}
