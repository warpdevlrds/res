'use client';

import { useStore } from '@/store/store';
import { Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function WorkoutList() {
  const { workouts } = useStore();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Treinos Criados</h2>

      {workouts.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum treino criado ainda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {workout.name}
                  </h3>
                  <p className="text-sm text-gray-600">Aluno: {workout.studentName}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(workout.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(workout.date), "HH:mm")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {workout.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Exerc?cios ({workout.exercises.length}):
                </p>
                <div className="space-y-2">
                  {workout.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={exercise.id} className="text-sm text-gray-600">
                      {index + 1}. {exercise.name} - {exercise.sets} s?ries ? {exercise.reps} reps
                    </div>
                  ))}
                  {workout.exercises.length > 3 && (
                    <p className="text-sm text-gray-500">
                      + {workout.exercises.length - 3} exerc?cios
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
