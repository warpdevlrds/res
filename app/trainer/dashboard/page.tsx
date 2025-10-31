'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Users, Calendar, BarChart3, TrendingUp, Activity } from 'lucide-react';
import NotificationCenter from '@/components/NotificationCenter';

export default function TrainerDashboardPage() {
  const { user, getTrainerStudents, workouts, workoutExecutions, initializeMockData } = useStore();
  const router = useRouter();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const students = getTrainerStudents();
  const totalWorkouts = workouts.length;
  const completedWorkouts = workouts.filter(w => w.completed).length;
  const activeStudents = students.length;
  const recentExecutions = workoutExecutions.slice(0, 5);

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Ol?, {user?.name}</p>
              </div>
              <nav className="flex space-x-4">
                <Link href="/trainer/students" className="text-primary-600 hover:text-primary-700">
                  Alunos
                </Link>
                <Link href="/trainer/workouts" className="text-primary-600 hover:text-primary-700">
                  Treinos
                </Link>
                <Link href="/trainer/exercises" className="text-primary-600 hover:text-primary-700">
                  Exerc?cios
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{activeStudents}</p>
                </div>
                <Users className="w-12 h-12 text-primary-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Treinos Criados</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalWorkouts}</p>
                </div>
                <Calendar className="w-12 h-12 text-primary-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Treinos Conclu?dos</p>
                  <p className="text-3xl font-bold text-success-600 mt-2">{completedWorkouts}</p>
                </div>
                <Activity className="w-12 h-12 text-success-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclus?o</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">A??es R?pidas</h2>
              <div className="space-y-3">
                <Link
                  href="/trainer/workouts/new"
                  className="block w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                >
                  Criar Novo Treino
                </Link>
                <Link
                  href="/trainer/students/new"
                  className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                >
                  Adicionar Novo Aluno
                </Link>
                <Link
                  href="/trainer/exercises"
                  className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                >
                  Biblioteca de Exerc?cios
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alunos Recentes</h2>
              {students.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum aluno cadastrado</p>
              ) : (
                <div className="space-y-3">
                  {students.slice(0, 5).map((student) => (
                    <Link
                      key={student.id}
                      href={`/trainer/students/${student.id}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                      <span className="text-sm text-gray-400">?</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h2>
            {recentExecutions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
            ) : (
              <div className="space-y-3">
                {recentExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Treino executado por {execution.studentId}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(execution.startTime).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <BarChart3 className="w-5 h-5 text-primary-600" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
