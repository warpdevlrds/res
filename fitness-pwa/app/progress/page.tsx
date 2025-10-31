'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Award, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/Card';
import BottomNav from '@/components/BottomNav';
import { mockProgressData } from '@/lib/mockData';

export default function ProgressPage() {
  const weightData = mockProgressData.map(d => ({
    date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    peso: d.weight,
  }));

  const workoutData = mockProgressData.map(d => ({
    date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    treinos: d.workouts,
  }));

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 pb-8 border-b border-[var(--dark-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black gradient-text mb-2">Seu Progresso</h1>
          <p className="text-gray-400">Acompanhe sua evolução</p>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card gradient>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-cyan)] p-3 rounded-xl">
                <TrendingDown size={24} className="text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">-2.5kg</p>
                <p className="text-xs text-gray-400">Peso perdido</p>
              </div>
            </div>
          </Card>

          <Card gradient>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[var(--neon-orange)] to-[var(--neon-pink)] p-3 rounded-xl">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">+15%</p>
                <p className="text-xs text-gray-400">Força ganho</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weight Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card gradient>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Evolução de Peso</h2>
              <TrendingDown className="text-[var(--neon-green)]" size={24} />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="peso"
                    stroke="#00f0ff"
                    strokeWidth={3}
                    fill="url(#colorWeight)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Workout Frequency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card gradient>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Frequência de Treinos</h2>
              <Calendar className="text-[var(--neon-purple)]" size={24} />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="treinos"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award size={24} className="text-[var(--neon-yellow)]" />
            Conquistas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-sm text-gray-400">Dias de Streak</p>
            </Card>

            <Card className="text-center">
              <div className="text-4xl mb-2">💪</div>
              <p className="text-2xl font-bold text-white">45</p>
              <p className="text-sm text-gray-400">Treinos Completos</p>
            </Card>

            <Card className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-white">1.2k</p>
              <p className="text-sm text-gray-400">Calorias Queimadas</p>
            </Card>

            <Card className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-sm text-gray-400">Taxa de Conclusão</p>
            </Card>
          </div>
        </motion.div>

        {/* Personal Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target size={24} className="text-[var(--neon-cyan)]" />
            Recordes Pessoais
          </h2>
          
          <div className="space-y-3">
            {[
              { exercise: 'Supino Reto', weight: '85kg', date: '28 Out' },
              { exercise: 'Agachamento', weight: '120kg', date: '25 Out' },
              { exercise: 'Levantamento Terra', weight: '140kg', date: '22 Out' },
            ].map((record, index) => (
              <Card key={index} hover>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{record.exercise}</h3>
                    <p className="text-sm text-gray-400">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text">{record.weight}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
