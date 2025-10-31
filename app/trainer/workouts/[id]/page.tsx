'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { ArrowLeft, Edit, Copy, Trash2, Calendar, User } from 'lucide-react';
import PDFExport from '@/components/PDFExport';

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getWorkoutById, getExerciseById, deleteWorkout, addWorkout } = useStore();
  
  const workoutId = params.id as string;
  const workout = getWorkoutById(workoutId);

  if (!workout) {
    return (
      <AuthGuard allowedRoles={['trainer']}>
        <div className="flex items-center justify-center min-h-screen">
          <p>Treino n?o encontrado</p>
        </div>
      </AuthGuard>
    );
  }

  const handleDuplicate = () => {
    const duplicated = {
      ...workout,
      id: `workout-${Date.now()}`,
      name: `${workout.name} (C?pia)`,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    addWorkout(duplicated);
    router.push('/trainer/workouts');
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      deleteWorkout(workoutId);
      router.push('/trainer/workouts');
    }
  };

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/trainer/workouts" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{workout.name}</h1>
                  <p className="text-sm text-gray-500">Detalhes do Treino</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/trainer/workouts/${workoutId}/edit`}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                  <span>Editar</span>
                </Link>
                <button
                  onClick={handleDuplicate}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  <span>Duplicar</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Info */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Aluno</p>
                  <p className="font-medium text-gray-900">{workout.studentName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Data de Cria??o</p>
                  <p className="font-medium text-gray-900">
                    {new Date(workout.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
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
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Exerc?cios ({workout.exercises.length})
              </h2>
              <PDFExport
                title={workout.name}
                data={workout}
                type="workout"
              />
            </div>
            <div className="space-y-4">
              {workout.exercises
                .sort((a, b) => a.order - b.order)
                .map((exercise, index) => {
                  const exData = getExerciseById(exercise.exerciseId);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {index + 1}. {exData?.name || exercise.exerciseId}
                          </h3>
                          {exData && (
                            <p className="text-sm text-gray-500">{exData.category}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-gray-500">S?ries</p>
                          <p className="font-medium text-gray-900">{exercise.sets}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Repeti??es</p>
                          <p className="font-medium text-gray-900">{exercise.reps}</p>
                        </div>
                        {exercise.weight && (
                          <div>
                            <p className="text-sm text-gray-500">Carga</p>
                            <p className="font-medium text-gray-900">{exercise.weight} kg</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">Descanso</p>
                          <p className="font-medium text-gray-900">{exercise.restSeconds}s</p>
                        </div>
                      </div>
                      {exercise.notes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded">
                          <p className="text-sm text-blue-700">{exercise.notes}</p>
                        </div>
                      )}
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
