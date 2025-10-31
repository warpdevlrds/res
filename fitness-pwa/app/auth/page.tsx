'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, User, GraduationCap } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { UserMode } from '@/types';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedMode, setSelectedMode] = useState<UserMode | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMode) return;
    
    localStorage.setItem('userMode', selectedMode);
    localStorage.setItem('userName', formData.name || formData.email);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-[var(--neon-cyan)] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--neon-purple)] rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-4 rounded-2xl">
            <Dumbbell size={40} className="text-black" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-center mb-2 gradient-text"
        >
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center mb-8"
        >
          {isLogin ? 'Entre para continuar' : 'Comece sua jornada fitness'}
        </motion.p>

        {/* Mode Selection */}
        {!isLogin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-400 mb-3 text-center">Selecione seu perfil:</p>
            <div className="grid grid-cols-2 gap-4">
              <Card
                hover
                onClick={() => setSelectedMode('student')}
                className={`cursor-pointer transition-all ${
                  selectedMode === 'student'
                    ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10'
                    : ''
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <GraduationCap
                    size={32}
                    className={selectedMode === 'student' ? 'text-[var(--neon-cyan)]' : 'text-gray-400'}
                  />
                  <span className={`font-semibold ${selectedMode === 'student' ? 'text-[var(--neon-cyan)]' : 'text-gray-400'}`}>
                    Aluno
                  </span>
                </div>
              </Card>

              <Card
                hover
                onClick={() => setSelectedMode('trainer')}
                className={`cursor-pointer transition-all ${
                  selectedMode === 'trainer'
                    ? 'border-[var(--neon-purple)] bg-[var(--neon-purple)]/10'
                    : ''
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User
                    size={32}
                    className={selectedMode === 'trainer' ? 'text-[var(--neon-purple)]' : 'text-gray-400'}
                  />
                  <span className={`font-semibold ${selectedMode === 'trainer' ? 'text-[var(--neon-purple)]' : 'text-gray-400'}`}>
                    Personal
                  </span>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Input
                    label="Nome completo"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button type="submit" fullWidth size="lg" className="mt-6">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setSelectedMode(null);
              }}
              className="text-sm text-gray-400 hover:text-[var(--neon-cyan)] transition-colors"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
