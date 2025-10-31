'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function StudentHistoryPage() {
  const { user, workoutExecutions, getWorkoutById, getExerciseById, initializeMockData } = useStore();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const myExecutions = workoutExecutions.filter((e) => e.studentId === user?.id);

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Hist?rico de Treinos</h1>
              <Link href="/student/dashboard" className="text-primary-600 hover:text-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {myExecutions.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum treino executado ainda</p>
              <Link
                href="/student/dashboard"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ver Treinos Dispon?veis
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myExecutions
                .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                .map((execution) => {
                  const workout = getWorkoutById(execution.workoutId);
                  const duration = execution.endTime
                    ? Math.round(
                        (new Date(execution.endTime).getTime() -
                          new Date(execution.startTime).getTime()) /
                          60000
                      )
                    : null;

                  return (
                    <div
                      key={execution.id}
                      className="bg-white rounded-lg shadow p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {workout?.name || 'Treino'}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {format(new Date(execution.startTime), "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })}
                            </div>
                            {duration && (
                              <>
                                <span>?</span>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {duration} minutos
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <CheckCircle className="w-6 h-6 text-success-600" />
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Exerc?cios Executados:</h4>
                        {execution.exercises.map((exercise, idx) => {
                          const exData = getExerciseById(exercise.exerciseId);
                          const completedSets = exercise.sets.filter((s) => s.completed).length;

                          return (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-900">
                                  {exData?.name || exercise.exerciseId}
                                </p>
                                <span className="text-sm text-gray-600">
                                  {completedSets}/{exercise.sets.length} s?ries
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                                {exercise.sets.map((set, setIdx) => (
                                  <div key={setIdx} className="flex items-center space-x-2">
                                    {set.completed ? (
                                      <CheckCircle className="w-4 h-4 text-success-600" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-gray-400" />
                                    )}
                                    <span>
                                      {set.reps} reps {set.weight && `@ ${set.weight}kg`}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {execution.notes && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">{execution.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
