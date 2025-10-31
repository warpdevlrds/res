'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import BottomNav from '@/components/BottomNav';
import { mockWorkouts } from '@/lib/mockData';

export default function WorkoutsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 pb-8 border-b border-[var(--dark-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black gradient-text mb-6">Treinos</h1>
          
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar treinos..."
                className="pl-12"
              />
            </div>
            <button className="p-3 bg-[var(--dark-card)] border border-[var(--dark-border)] rounded-2xl hover:border-[var(--neon-cyan)] transition-colors">
              <Filter size={20} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Create Workout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={() => {}}
            variant="secondary"
            fullWidth
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            <Plus size={24} />
            Criar Novo Treino
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Todos', 'Força', 'Cardio', 'Flexibilidade', 'HIIT'].map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-black'
                    : 'bg-[var(--dark-card)] text-gray-400 border border-[var(--dark-border)] hover:border-[var(--neon-cyan)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Workouts List */}
        <div className="space-y-4">
          {mockWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card hover gradient onClick={() => router.push(`/workout/${workout.id}`)}>
                <div className="flex gap-4">
                  {/* Workout Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-[var(--neon-cyan)]/30 to-[var(--neon-purple)]/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">💪</span>
                  </div>

                  {/* Workout Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] text-xs rounded-full font-semibold">
                        {workout.exercises.length} exercícios
                      </span>
                      <span className="px-3 py-1 bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] text-xs rounded-full font-semibold">
                        {workout.duration} min
                      </span>
                      <span className="px-3 py-1 bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] text-xs rounded-full font-semibold capitalize">
                        {workout.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
