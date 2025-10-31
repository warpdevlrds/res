'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Target, TrendingUp, Calendar, MessageCircle } from 'lucide-react';
import ProgressCharts from '@/components/ProgressCharts';
import Chat from '@/components/Chat';
import PDFExport from '@/components/PDFExport';

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getTrainerStudents, getStudentWorkouts, workoutExecutions, progressMetrics } = useStore();
  
  const studentId = params.id as string;
  const students = getTrainerStudents();
  const student = students.find((s) => s.id === studentId);
  const workouts = getStudentWorkouts(studentId);
  const executions = workoutExecutions.filter((e) => e.studentId === studentId);
  const metrics = progressMetrics.filter((m) => m.studentId === studentId);

  if (!student) {
    return (
      <AuthGuard allowedRoles={['trainer']}>
        <div className="flex items-center justify-center min-h-screen">
          <p>Aluno n?o encontrado</p>
        </div>
      </AuthGuard>
    );
  }

  const completionRate =
    workouts.length > 0
      ? Math.round((workouts.filter((w) => w.completed).length / workouts.length) * 100)
      : 0;

  const progressData = metrics
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      date: new Date(m.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
      value: m.weight || 0,
    }));

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/trainer/students" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="text-sm text-gray-500">Perfil do Aluno</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informa??es</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{student.phone}</span>
                  </div>
                )}
                {student.level && (
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{student.level}</span>
                  </div>
                )}
                {student.goals && student.goals.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Objetivos:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.goals.map((goal, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estat?sticas</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Treinos Totais</p>
                  <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Treinos Conclu?dos</p>
                  <p className="text-2xl font-bold text-success-600">
                    {workouts.filter((w) => w.completed).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclus?o</p>
                  <p className="text-2xl font-bold text-primary-600">{completionRate}%</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">A??es</h2>
              <div className="space-y-3">
                <Link
                  href={`/trainer/workouts/new?studentId=${studentId}`}
                  className="block w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  Criar Treino
                </Link>
                <Link
                  href={`/trainer/students/${studentId}/chat`}
                  className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Mensagens</span>
                </Link>
                <PDFExport
                  title={`Relat?rio_${student.name}`}
                  data={{
                    studentName: student.name,
                    period: '?ltimo m?s',
                    metrics: {
                      'Treinos Totais': workouts.length,
                      'Treinos Conclu?dos': workouts.filter((w) => w.completed).length,
                      'Taxa de Conclus?o': `${completionRate}%`,
                    },
                  }}
                  type="progress"
                />
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          {progressData.length > 0 && (
            <div className="mb-8">
              <ProgressCharts
                data={progressData}
                type="line"
                title="Evolu??o de Peso"
                valueLabel="Peso (kg)"
                color="#2563eb"
              />
            </div>
          )}

          {/* Recent Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Treinos Recentes</h2>
            {workouts.length === 0 ? (
              <p className="text-gray-500">Nenhum treino atribu?do ainda</p>
            ) : (
              <div className="space-y-3">
                {workouts.slice(0, 5).map((workout) => (
                  <Link
                    key={workout.id}
                    href={`/trainer/workouts/${workout.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{workout.name}</p>
                        <p className="text-sm text-gray-600">
                          {workout.exercises.length} exerc?cios
                        </p>
                      </div>
                      {workout.completed ? (
                        <span className="px-2 py-1 text-xs bg-success-100 text-success-800 rounded">
                          Conclu?do
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          Pendente
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
