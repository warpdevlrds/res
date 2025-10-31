'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Play, Calendar, Clock, CheckCircle, Circle, Activity } from 'lucide-react';
import NotificationCenter from '@/components/NotificationCenter';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, getStudentWorkouts, initializeMockData } = useStore();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const workouts = getStudentWorkouts(user?.id || '');
  const todayWorkouts = workouts.filter(
    (w) => w.scheduledDate && format(new Date(w.scheduledDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  const upcomingWorkouts = workouts
    .filter((w) => !w.completed && w.scheduledDate && new Date(w.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate || '').getTime() - new Date(b.scheduledDate || '').getTime());

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meus Treinos</h1>
                <p className="text-sm text-gray-500">Ol?, {user?.name}</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/student/history" className="text-primary-600 hover:text-primary-700">
                  Hist?rico
                </Link>
                <Link href="/student/progress" className="text-primary-600 hover:text-primary-700">
                  Progresso
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Today's Workouts */}
          {todayWorkouts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Treinos de Hoje</h2>
              <div className="space-y-4">
                {todayWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-white rounded-lg shadow-lg p-6 border-2 border-primary-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{workout.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {workout.scheduledDate &&
                              format(new Date(workout.scheduledDate), "HH:mm", { locale: ptBR })}
                          </div>
                          <span>?</span>
                          <span>{workout.exercises.length} exerc?cios</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {workout.exercises.slice(0, 3).map((exercise, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {exercise.exerciseId}
                            </span>
                          ))}
                          {workout.exercises.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              + {workout.exercises.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/student/workout/${workout.id}`}
                        className="ml-4 flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                        <span>Iniciar Treino</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Workouts */}
          {upcomingWorkouts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pr?ximos Treinos</h2>
              <div className="space-y-4">
                {upcomingWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-white rounded-lg shadow p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {workout.scheduledDate &&
                              format(new Date(workout.scheduledDate), "dd 'de' MMMM '?s' HH:mm", {
                                locale: ptBR,
                              })}
                          </div>
                          <span>?</span>
                          <span>{workout.exercises.length} exerc?cios</span>
                        </div>
                      </div>
                      {workout.completed ? (
                        <CheckCircle className="w-6 h-6 text-success-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Workouts */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Todos os Treinos</h2>
            {workouts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum treino atribu?do ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                          {workout.completed && (
                            <span className="px-2 py-1 text-xs bg-success-100 text-success-800 rounded">
                              Conclu?do
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          {workout.scheduledDate && (
                            <>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {format(new Date(workout.scheduledDate), "dd/MM/yyyy '?s' HH:mm", {
                                  locale: ptBR,
                                })}
                              </div>
                              <span>?</span>
                            </>
                          )}
                          <span>{workout.exercises.length} exerc?cios</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {workout.exercises.slice(0, 4).map((exercise, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {exercise.exerciseId}
                            </span>
                          ))}
                          {workout.exercises.length > 4 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              + {workout.exercises.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      {!workout.completed && (
                        <Link
                          href={`/student/workout/${workout.id}`}
                          className="ml-4 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>Iniciar</span>
                        </Link>
                      )}
                    </div>
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
