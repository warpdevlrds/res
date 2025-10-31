'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import BottomNav from '@/components/BottomNav';
import { mockChats } from '@/lib/mockData';

export default function ChatPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 pb-8 border-b border-[var(--dark-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black gradient-text mb-6">Mensagens</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar conversas..."
              className="pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-3">
        {filteredChats.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <MessageCircle size={64} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma conversa encontrada</p>
          </motion.div>
        ) : (
          filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover onClick={() => router.push(`/chat/${chat.id}`)}>
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full flex items-center justify-center text-black font-bold text-xl">
                      {chat.participantName.charAt(0)}
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--neon-pink)] rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-white truncate">
                        {chat.participantName}
                      </h3>
                      <span className="text-xs text-gray-400 ml-2">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      chat.unreadCount > 0 ? 'text-white font-semibold' : 'text-gray-400'
                    }`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
