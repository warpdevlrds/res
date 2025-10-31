'use client';

import { useState, useEffect } from 'react';
import { useStore, Workout, Exercise } from '@/store/store';
import { LogOut, Play, Pause, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';

export default function StudentDashboard() {
  const { user, workouts, updateExercise, updateWorkout, logout } = useStore();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const myWorkouts = workouts.filter(w => w.studentId === user?.id);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const startRest = (seconds: number) => {
    setRestTimer(seconds);
    setIsResting(true);
  };

  const completeExercise = (exerciseId: string) => {
    if (!selectedWorkout) return;

    const exercise = selectedWorkout.exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
      startRest(exercise.restSeconds);
    } else {
      // Marcar exerc?cio como completo
      updateExercise(selectedWorkout.id, exerciseId, { completed: true });
      setCurrentSet(1);

      // Pr?ximo exerc?cio
      const nextIndex = selectedWorkout.exercises.findIndex(e => e.id === exerciseId) + 1;
      if (nextIndex < selectedWorkout.exercises.length) {
        setCurrentExerciseIndex(nextIndex);
        const nextExercise = selectedWorkout.exercises[nextIndex];
        if (nextExercise.restSeconds > 0) {
          startRest(nextExercise.restSeconds);
        }
      } else {
        // Treino completo
        updateWorkout(selectedWorkout.id, { completed: true });
        alert('Parab?ns! Treino completo! ??');
        setSelectedWorkout(null);
      }
    }
  };

  const resetWorkout = () => {
    if (!selectedWorkout) return;
    selectedWorkout.exercises.forEach(ex => {
      updateExercise(selectedWorkout.id, ex.id, { completed: false });
    });
    updateWorkout(selectedWorkout.id, { completed: false });
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setRestTimer(0);
    setIsResting(false);
  };

  const currentExercise = selectedWorkout?.exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meus Treinos</h1>
              <p className="text-sm text-gray-600">Ol?, {user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedWorkout ? (
          /* Workouts List */
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Treinos Dispon?veis</h2>
            {myWorkouts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                Voc? ainda n?o tem treinos atribu?dos. Entre em contato com seu personal trainer.
              </p>
            ) : (
              <div className="space-y-4">
                {myWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedWorkout(workout);
                      setCurrentExerciseIndex(0);
                      setCurrentSet(1);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{workout.name}</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(workout.date), "dd/MM/yyyy '?s' HH:mm")}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {workout.exercises.length} exerc?cios
                        </p>
                      </div>
                      {workout.completed ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium">Conclu?do</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                          <Play className="w-4 h-4" />
                          Iniciar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Active Workout */
          <div className="space-y-6">
            {/* Workout Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedWorkout.name}</h2>
                <button
                  onClick={() => {
                    setSelectedWorkout(null);
                    setCurrentExerciseIndex(0);
                    setCurrentSet(1);
                    setRestTimer(0);
                    setIsResting(false);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Voltar
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Exerc?cio {currentExerciseIndex + 1} de {selectedWorkout.exercises.length}
                </span>
                <span>?</span>
                <span>
                  {selectedWorkout.exercises.filter(e => e.completed).length} completos
                </span>
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`flex-1 h-2 rounded ${
                        exercise.completed
                          ? 'bg-green-600'
                          : index === currentExerciseIndex
                          ? 'bg-primary-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Rest Timer */}
            {isResting && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <p className="text-lg font-semibold text-gray-800 mb-2">Descanso</p>
                <p className="text-4xl font-bold text-yellow-600">{restTimer}s</p>
                <button
                  onClick={() => {
                    setIsResting(false);
                    setRestTimer(0);
                  }}
                  className="mt-4 text-yellow-700 hover:text-yellow-800 text-sm"
                >
                  Pular descanso
                </button>
              </div>
            )}

            {/* Current Exercise */}
            {currentExercise && !isResting && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold mb-2">{currentExercise.name}</h3>
                  {currentExercise.weight && (
                    <p className="text-xl text-gray-600">{currentExercise.weight} kg</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">S?rie</p>
                    <p className="text-2xl font-bold text-primary-700">
                      {currentSet}/{currentExercise.sets}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Repeti??es</p>
                    <p className="text-2xl font-bold text-green-700">{currentExercise.reps}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Descanso</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {currentExercise.restSeconds}s
                    </p>
                  </div>
                </div>

                {currentExercise.notes && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">{currentExercise.notes}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => completeExercise(currentExercise.id)}
                    className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                  >
                    {currentSet < currentExercise.sets ? 'Marcar S?rie' : 'Concluir Exerc?cio'}
                  </button>
                  <button
                    onClick={resetWorkout}
                    className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Exercises List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Exerc?cios do Treino</h3>
              <div className="space-y-2">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      exercise.completed
                        ? 'bg-green-50 border-green-200'
                        : index === currentExerciseIndex
                        ? 'bg-primary-50 border-primary-200'
                        : 'bg-gray-50 border-gray-200'
                    } border`}
                  >
                    <div className="flex items-center gap-3">
                      {exercise.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-gray-600">
                          {exercise.sets}x{exercise.reps}
                          {exercise.weight && ` - ${exercise.weight}kg`}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{exercise.restSeconds}s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
