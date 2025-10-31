'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Flame, TrendingUp, Home } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function WorkoutCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
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
          className="absolute top-20 left-10 w-96 h-96 bg-[var(--neon-cyan)] opacity-20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--neon-purple)] opacity-20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Trophy Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--neon-yellow)] to-[var(--neon-orange)] rounded-full blur-2xl"
            />
            <div className="relative bg-gradient-to-br from-[var(--neon-yellow)] to-[var(--neon-orange)] p-8 rounded-full">
              <Trophy size={80} className="text-black" />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black gradient-text mb-4">
            Parabéns!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Treino Concluído com Sucesso
          </p>
          <p className="text-gray-400">
            Você está cada vez mais perto dos seus objetivos!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <Card gradient>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[var(--neon-orange)] to-[var(--neon-pink)] p-3 rounded-xl">
                  <Flame size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Calorias Queimadas</p>
                  <p className="text-2xl font-bold text-white">320 kcal</p>
                </div>
              </div>
            </div>
          </Card>

          <Card gradient>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-3 rounded-xl">
                  <TrendingUp size={24} className="text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Duração do Treino</p>
                  <p className="text-2xl font-bold text-white">62 min</p>
                </div>
              </div>
            </div>
          </Card>

          <Card gradient>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-yellow)] p-3 rounded-xl">
                  <Trophy size={24} className="text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Novo Streak</p>
                  <p className="text-2xl font-bold text-white">8 dias 🔥</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-purple)]/10 border-[var(--neon-cyan)] mb-8">
            <p className="text-center text-gray-300 italic">
              "O sucesso é a soma de pequenos esforços repetidos dia após dia."
            </p>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Voltar ao Início
          </Button>
          
          <Button
            onClick={() => router.push('/progress')}
            variant="outline"
            size="lg"
            fullWidth
          >
            Ver Meu Progresso
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
