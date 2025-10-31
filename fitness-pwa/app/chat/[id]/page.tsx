'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import Card from '@/components/Card';
import { mockChats } from '@/lib/mockData';
import { Message } from '@/types';

export default function ChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chat = mockChats.find(c => c.id === chatId);
  const [messages, setMessages] = useState<Message[]>(chat?.messages || []);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) {
    return null;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: 'current-user',
      senderName: 'Você',
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-4 border-b border-[var(--dark-border)] flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-[var(--dark-card)] rounded-xl transition-colors"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full flex items-center justify-center text-black font-bold">
            {chat.participantName.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-white">{chat.participantName}</h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === 'current-user' || message.senderId === 'trainer';
          
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl p-4 ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-black'
                      : 'bg-[var(--dark-card)] text-white border border-[var(--dark-border)]'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[var(--dark-card)] border-t border-[var(--dark-border)]">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 bg-[var(--dark-bg)] border border-[var(--dark-border)] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--neon-cyan)]/50 transition-all"
          >
            <Send size={24} className="text-black" />
          </button>
        </form>
      </div>
    </div>
  );
}
