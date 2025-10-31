'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award, Settings, LogOut, Edit, Camera } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userMode, setUserMode] = useState<'student' | 'trainer'>('student');

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Usuário';
    const mode = localStorage.getItem('userMode') as 'student' | 'trainer';
    setUserName(name);
    setUserMode(mode);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth');
  };

  const stats = userMode === 'student'
    ? [
        { label: 'Treinos Completos', value: '45', icon: '💪' },
        { label: 'Dias de Streak', value: '7', icon: '🔥' },
        { label: 'Calorias Queimadas', value: '1.2k', icon: '⚡' },
        { label: 'Tempo Total', value: '32h', icon: '⏱️' },
      ]
    : [
        { label: 'Alunos Ativos', value: '24', icon: '👥' },
        { label: 'Treinos Criados', value: '156', icon: '📋' },
        { label: 'Avaliações', value: '4.9', icon: '⭐' },
        { label: 'Anos de Experiência', value: '8', icon: '🏆' },
      ];

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] pb-24">
      {/* Header with Profile Picture */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 pb-12 border-b border-[var(--dark-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          {/* Profile Picture */}
          <div className="relative mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full flex items-center justify-center text-black font-black text-5xl">
              {userName.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full hover:shadow-lg hover:shadow-[var(--neon-cyan)]/50 transition-all">
              <Camera size={20} className="text-black" />
            </button>
          </div>

          <h1 className="text-3xl font-black gradient-text mb-2">{userName}</h1>
          <p className="text-gray-400 mb-4">
            {userMode === 'student' ? 'Aluno' : 'Personal Trainer'}
          </p>

          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit size={16} />
            Editar Perfil
          </Button>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award size={24} className="text-[var(--neon-cyan)]" />
            Estatísticas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} gradient className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User size={24} className="text-[var(--neon-cyan)]" />
            Informações da Conta
          </h2>
          
          <div className="space-y-3">
            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--neon-cyan)]/20 rounded-xl">
                  <Mail size={20} className="text-[var(--neon-cyan)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-semibold">usuario@email.com</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--neon-purple)]/20 rounded-xl">
                  <Calendar size={20} className="text-[var(--neon-purple)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Membro desde</p>
                  <p className="text-white font-semibold">Setembro 2025</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--neon-pink)]/20 rounded-xl">
                  <Award size={20} className="text-[var(--neon-pink)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Plano</p>
                  <p className="text-white font-semibold">Premium</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings size={24} className="text-[var(--neon-cyan)]" />
            Configurações
          </h2>
          
          <div className="space-y-3">
            <Card hover>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Notificações</span>
                <div className="w-12 h-6 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-black rounded-full ml-auto"></div>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Modo Escuro</span>
                <div className="w-12 h-6 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-black rounded-full ml-auto"></div>
                </div>
              </div>
            </Card>

            <Card hover>
              <span className="text-white font-semibold">Privacidade</span>
            </Card>

            <Card hover>
              <span className="text-white font-semibold">Ajuda e Suporte</span>
            </Card>

            <Card hover>
              <span className="text-white font-semibold">Sobre o App</span>
            </Card>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleLogout}
            variant="outline"
            fullWidth
            size="lg"
            className="flex items-center justify-center gap-2 border-[var(--neon-pink)] text-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-white"
          >
            <LogOut size={20} />
            Sair da Conta
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
