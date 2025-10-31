'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { TrendingUp, Activity, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function StudentProgressPage() {
  const { user, workoutExecutions, getStudentWorkouts, initializeMockData } = useStore();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const workouts = getStudentWorkouts(user?.id || '');
  const completedWorkouts = workouts.filter((w) => w.completed).length;
  const totalExecutions = workoutExecutions.filter((e) => e.studentId === user?.id).length;

  // Mock data para gr?ficos
  const workoutFrequency = [
    { week: 'Sem 1', treinos: 3 },
    { week: 'Sem 2', treinos: 4 },
    { week: 'Sem 3', treinos: 5 },
    { week: 'Sem 4', treinos: 4 },
  ];

  const exerciseProgress = [
    { exercise: 'Supino', carga: 50, semana: 'Sem 1' },
    { exercise: 'Supino', carga: 55, semana: 'Sem 2' },
    { exercise: 'Supino', carga: 60, semana: 'Sem 3' },
    { exercise: 'Supino', carga: 65, semana: 'Sem 4' },
  ];

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Meu Progresso</h1>
              <Link href="/student/dashboard" className="text-primary-600 hover:text-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Treinos Completos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{completedWorkouts}</p>
                </div>
                <Activity className="w-12 h-12 text-primary-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Execu??es</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalExecutions}</p>
                </div>
                <Target className="w-12 h-12 text-success-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclus?o</p>
                  <p className="text-3xl font-bold text-success-600 mt-2">
                    {workouts.length > 0
                      ? Math.round((completedWorkouts / workouts.length) * 100)
                      : 0}
                    %
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-success-600" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Frequ?ncia de Treinos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="treinos" fill="#2563eb" name="Treinos por Semana" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Evolu??o de Carga
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={exerciseProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="carga"
                    stroke="#2563eb"
                    strokeWidth={2}
                    name="Carga (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Personal Records */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recordes Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Supino Reto</p>
                <p className="text-2xl font-bold text-gray-900">65 kg</p>
                <p className="text-xs text-gray-500 mt-1">4 s?ries ? 10 reps</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Agachamento</p>
                <p className="text-2xl font-bold text-gray-900">80 kg</p>
                <p className="text-xs text-gray-500 mt-1">4 s?ries ? 8 reps</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Barra Fixa</p>
                <p className="text-2xl font-bold text-gray-900">12 reps</p>
                <p className="text-xs text-gray-500 mt-1">3 s?ries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
