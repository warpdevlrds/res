'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, TrendingUp } from 'lucide-react';
import Button from '@/components/Button';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      router.push('/auth');
    }
  }, [router]);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--neon-cyan)] opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--neon-purple)] opacity-10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-6 rounded-3xl">
              <Dumbbell size={64} className="text-black" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-center mb-4 gradient-text"
        >
          FitPro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center mb-12 text-lg"
        >
          Transforme seu corpo, supere seus limites
        </motion.p>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 bg-[var(--dark-card)] p-4 rounded-2xl border border-[var(--dark-border)]"
          >
            <div className="bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-3 rounded-xl">
              <Dumbbell size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-white">Treinos Personalizados</h3>
              <p className="text-sm text-gray-400">Criados para seus objetivos</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 bg-[var(--dark-card)] p-4 rounded-2xl border border-[var(--dark-border)]"
          >
            <div className="bg-gradient-to-br from-[var(--neon-pink)] to-[var(--neon-orange)] p-3 rounded-xl">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Acompanhe seu Progresso</h3>
              <p className="text-sm text-gray-400">Visualize sua evolução</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 bg-[var(--dark-card)] p-4 rounded-2xl border border-[var(--dark-border)]"
          >
            <div className="bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-yellow)] p-3 rounded-xl">
              <Zap size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-white">Motivação Constante</h3>
              <p className="text-sm text-gray-400">Mantenha-se no caminho certo</p>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button onClick={handleGetStarted} size="lg" fullWidth>
            Começar Agora
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
