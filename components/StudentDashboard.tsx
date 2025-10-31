'use client';

import { useState } from 'react';
import { useStore, Workout, Exercise } from '@/store/store';
import { Play, CheckCircle, Circle, Clock, LogOut, User as UserIcon } from 'lucide-react';
import WorkoutExecution from '@/components/WorkoutExecution';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function StudentDashboard() {
  const { user, workouts, logout } = useStore();
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const myWorkouts = workouts.filter(w => w.studentId === user?.id);
  const todayWorkouts = myWorkouts.filter(
    (w) => format(new Date(w.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  const upcomingWorkouts = myWorkouts
    .filter((w) => new Date(w.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (activeWorkout) {
    return (
      <WorkoutExecution
        workout={activeWorkout}
        onBack={() => setActiveWorkout(null)}
        onComplete={() => {
          // Marcar treino como conclu?do
          setActiveWorkout(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-600 p-2 rounded-full">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ol?, {user?.name || 'Aluno'}</h1>
                <p className="text-sm text-gray-500">Seus Treinos</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Today's Workouts */}
        {todayWorkouts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Treinos de Hoje</h2>
            <div className="space-y-4">
              {todayWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white rounded-lg shadow p-6 border-2 border-primary-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {workout.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {workout.exercises.length} exerc?cios
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveWorkout(workout)}
                      className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      <span>Iniciar Treino</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Workouts */}
        {upcomingWorkouts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pr?ximos Treinos</h2>
            <div className="space-y-4">
              {upcomingWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white rounded-lg shadow p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {workout.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(workout.date), "dd 'de' MMMM '?s' HH:mm", {
                            locale: ptBR,
                          })}
                        </div>
                        <span>{workout.exercises.length} exerc?cios</span>
                      </div>
                    </div>
                    {workout.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Todos os Treinos</h2>
          {myWorkouts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">Nenhum treino atribu?do ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                        {workout.completed && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                            Conclu?do
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(workout.date), "dd/MM/yyyy '?s' HH:mm", {
                            locale: ptBR,
                          })}
                        </div>
                        <span>{workout.exercises.length} exerc?cios</span>
                      </div>
                      <div className="space-y-1">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <div key={exercise.id} className="text-sm text-gray-600">
                            {index + 1}. {exercise.name} - {exercise.sets} s?ries ? {exercise.reps}{' '}
                            reps
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <p className="text-sm text-gray-500">
                            + {workout.exercises.length - 3} exerc?cios
                          </p>
                        )}
                      </div>
                    </div>
                    {!workout.completed && (
                      <button
                        onClick={() => setActiveWorkout(workout)}
                        className="ml-4 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        <span>Iniciar</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
