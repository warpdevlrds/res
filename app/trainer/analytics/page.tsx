'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
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

export default function TrainerAnalyticsPage() {
  const { getTrainerStudents, workouts, workoutExecutions, initializeMockData } = useStore();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const students = getTrainerStudents();
  
  // Mock data para gr?ficos
  const completionData = [
    { name: 'Sem 1', completion: 85 },
    { name: 'Sem 2', completion: 78 },
    { name: 'Sem 3', completion: 92 },
    { name: 'Sem 4', completion: 88 },
  ];

  const studentActivity = students.map((student) => {
    const studentWorkouts = workouts.filter((w) => w.studentId === student.id);
    const completed = studentWorkouts.filter((w) => w.completed).length;
    return {
      name: student.name.split(' ')[0],
      treinos: studentWorkouts.length,
      concluidos: completed,
    };
  });

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Analytics e Relat?rios</h1>
              <Link
                href="/trainer/dashboard"
                className="text-primary-600 hover:text-primary-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
                </div>
                <Users className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Treinos Totais</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{workouts.length}</p>
                </div>
                <Activity className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclus?o</p>
                  <p className="text-3xl font-bold text-success-600 mt-2">
                    {workouts.length > 0
                      ? Math.round(
                          (workouts.filter((w) => w.completed).length / workouts.length) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-success-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Treinos Executados</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {workoutExecutions.length}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Taxa de Conclus?o Semanal
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="#2563eb"
                    strokeWidth={2}
                    name="Conclus?o %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Atividade por Aluno
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="treinos" fill="#2563eb" name="Treinos" />
                  <Bar dataKey="concluidos" fill="#16a34a" name="Conclu?dos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student List with Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estat?sticas por Aluno</h2>
            <div className="space-y-4">
              {students.map((student) => {
                const studentWorkouts = workouts.filter((w) => w.studentId === student.id);
                const completed = studentWorkouts.filter((w) => w.completed).length;
                const completionRate =
                  studentWorkouts.length > 0
                    ? Math.round((completed / studentWorkouts.length) * 100)
                    : 0;

                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Treinos</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {studentWorkouts.length}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Conclu?dos</p>
                        <p className="text-lg font-semibold text-success-600">{completed}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Taxa</p>
                        <p className="text-lg font-semibold text-gray-900">{completionRate}%</p>
                      </div>
                      <Link
                        href={`/trainer/students/${student.id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Ver Detalhes ?
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
