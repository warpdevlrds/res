'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Target, Calendar, TrendingUp, Users, Plus } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import BottomNav from '@/components/BottomNav';
import { mockWorkouts, mockStudents } from '@/lib/mockData';

export default function DashboardPage() {
  const router = useRouter();
  const [userMode, setUserMode] = useState<'student' | 'trainer'>('student');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const mode = localStorage.getItem('userMode') as 'student' | 'trainer';
    const name = localStorage.getItem('userName') || 'Usuário';
    if (!mode) {
      router.push('/auth');
      return;
    }
    setUserMode(mode);
    setUserName(name);
  }, [router]);

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 pb-8 border-b border-[var(--dark-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-400 text-sm capitalize">{currentDate}</p>
          <h1 className="text-3xl font-black mt-2">
            Olá, <span className="gradient-text">{userName}</span>
          </h1>
          <p className="text-gray-400 mt-1">
            {userMode === 'student' ? 'Pronto para treinar hoje?' : 'Gerencie seus alunos'}
          </p>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card gradient>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[var(--neon-orange)] to-[var(--neon-pink)] p-3 rounded-xl">
                <Flame size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {userMode === 'student' ? '7' : '24'}
                </p>
                <p className="text-xs text-gray-400">
                  {userMode === 'student' ? 'Dias de Streak' : 'Alunos Ativos'}
                </p>
              </div>
            </div>
          </Card>

          <Card gradient>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-3 rounded-xl">
                <Target size={24} className="text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {userMode === 'student' ? '45' : '156'}
                </p>
                <p className="text-xs text-gray-400">
                  {userMode === 'student' ? 'Treinos Feitos' : 'Treinos Criados'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        {userMode === 'trainer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus size={24} className="text-[var(--neon-cyan)]" />
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => router.push('/workouts')}>
                Criar Treino
              </Button>
              <Button variant="outline">Adicionar Aluno</Button>
            </div>
          </motion.div>
        )}

        {/* Today's Workout / Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            {userMode === 'student' ? (
              <>
                <Calendar size={24} className="text-[var(--neon-cyan)]" />
                Treino de Hoje
              </>
            ) : (
              <>
                <Users size={24} className="text-[var(--neon-cyan)]" />
                Seus Alunos
              </>
            )}
          </h2>

          {userMode === 'student' ? (
            <Card hover gradient onClick={() => router.push('/workout/1')}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {mockWorkouts[0].name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {mockWorkouts[0].exercises.length} exercícios • {mockWorkouts[0].duration} min
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] text-xs rounded-full">
                      {mockWorkouts[0].difficulty}
                    </span>
                    <span className="px-3 py-1 bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] text-xs rounded-full">
                      {mockWorkouts[0].category}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-4 rounded-2xl">
                  <Calendar size={32} className="text-black" />
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {mockStudents.slice(0, 4).map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full flex items-center justify-center text-black font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{student.name}</h3>
                          <p className="text-sm text-gray-400">
                            {student.workoutsCompleted} treinos • {student.currentStreak} dias
                          </p>
                        </div>
                      </div>
                      <TrendingUp size={20} className="text-[var(--neon-green)]" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Workouts */}
        {userMode === 'student' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={24} className="text-[var(--neon-cyan)]" />
              Outros Treinos
            </h2>
            <div className="space-y-3">
              {mockWorkouts.slice(1, 4).map((workout, index) => (
                <Card
                  key={workout.id}
                  hover
                  onClick={() => router.push(`/workout/${workout.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">{workout.name}</h3>
                      <p className="text-sm text-gray-400">
                        {workout.exercises.length} exercícios • {workout.duration} min
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] text-xs rounded-full">
                      {workout.difficulty}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
