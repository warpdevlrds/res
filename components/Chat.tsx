'use client';

import { useState, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/store/store';
import { Notification } from '@/types';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface ChatProps {
  receiverId: string;
  receiverName: string;
}

export default function Chat({ receiverId, receiverName }: ChatProps) {
  const { user, addNotification } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carregar mensagens do localStorage
    const stored = localStorage.getItem(`chat-${user?.id}-${receiverId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [user?.id, receiverId]);

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      receiverId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    
    // Salvar no localStorage
    localStorage.setItem(`chat-${user.id}-${receiverId}`, JSON.stringify(updatedMessages));
    
    // Criar notifica??o para o receptor
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: receiverId,
      type: 'message',
      title: 'Nova Mensagem',
      message: `${user.name}: ${newMessage.substring(0, 50)}...`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    addNotification(notification);

    setNewMessage('');
    
    // Scroll para o final
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">{receiverName}</h3>
      </div>

      {/* Messages */}
      <div
        id="chat-messages"
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: '500px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Nenhuma mensagem ainda</p>
            <p className="text-sm mt-2">Comece a conversar!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwn
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-medium mb-1 opacity-75">{message.senderName}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
