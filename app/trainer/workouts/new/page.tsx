'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Workout, WorkoutExercise } from '@/types';

export default function WorkoutBuilderPage() {
  const router = useRouter();
  const { getTrainerStudents, exercises, addWorkout, initializeMockData } = useStore();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
  const [exerciseConfig, setExerciseConfig] = useState({
    sets: 3,
    reps: 12,
    weight: undefined as number | undefined,
    restSeconds: 60,
    notes: '',
  });

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const students = getTrainerStudents();
  const availableExercises = exercises.filter(
    (ex) => !workoutExercises.find((we) => we.exerciseId === ex.id)
  );

  const handleAddExercise = () => {
    if (selectedExerciseId && exerciseConfig.sets > 0 && exerciseConfig.reps > 0) {
      const newExercise: WorkoutExercise = {
        exerciseId: selectedExerciseId,
        sets: exerciseConfig.sets,
        reps: exerciseConfig.reps,
        weight: exerciseConfig.weight,
        restSeconds: exerciseConfig.restSeconds,
        notes: exerciseConfig.notes,
        order: workoutExercises.length + 1,
      };
      setWorkoutExercises([...workoutExercises, newExercise]);
      setSelectedExerciseId('');
      setExerciseConfig({
        sets: 3,
        reps: 12,
        weight: undefined,
        restSeconds: 60,
        notes: '',
      });
      setShowExerciseModal(false);
    }
  };

  const handleRemoveExercise = (order: number) => {
    setWorkoutExercises(
      workoutExercises
        .filter((e) => e.order !== order)
        .map((e, idx) => ({ ...e, order: idx + 1 }))
    );
  };

  const handleSaveWorkout = () => {
    if (!workoutName || !selectedStudent || workoutExercises.length === 0) {
      alert('Preencha todos os campos obrigat?rios');
      return;
    }

    const student = students.find((s) => s.id === selectedStudent);
    const workout: Workout = {
      id: `workout-${Date.now()}`,
      name: workoutName,
      studentId: selectedStudent,
      studentName: student?.name || '',
      exercises: workoutExercises,
      createdAt: new Date().toISOString(),
      scheduledDate: undefined,
      completed: false,
    };

    addWorkout(workout);
    router.push('/trainer/workouts');
  };

  const getExerciseName = (exerciseId: string) => {
    return exercises.find((e) => e.id === exerciseId)?.name || exerciseId;
  };

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/trainer/workouts"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Criar Novo Treino</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Treino
              </label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Treino A - Peito e Tr?ceps"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aluno</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Selecione um aluno</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Exercises List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Exerc?cios ({workoutExercises.length})
                </label>
                <button
                  onClick={() => setShowExerciseModal(true)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Exerc?cio</span>
                </button>
              </div>

              {workoutExercises.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Nenhum exerc?cio adicionado ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workoutExercises
                    .sort((a, b) => a.order - b.order)
                    .map((exercise) => (
                      <div
                        key={exercise.order}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-gray-900">
                                {exercise.order}. {getExerciseName(exercise.exerciseId)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>{exercise.sets} s?ries</span>
                              <span>{exercise.reps} repeti??es</span>
                              {exercise.weight && <span>{exercise.weight} kg</span>}
                              <span>Descanso: {exercise.restSeconds}s</span>
                            </div>
                            {exercise.notes && (
                              <p className="text-sm text-gray-500 mt-2">{exercise.notes}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveExercise(exercise.order)}
                            className="text-red-600 hover:text-red-700 ml-4"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex space-x-3 pt-4">
              <Link
                href="/trainer/workouts"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center"
              >
                Cancelar
              </Link>
              <button
                onClick={handleSaveWorkout}
                className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Treino</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Exercise Modal */}
        {showExerciseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Adicionar Exerc?cio</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exerc?cio
                  </label>
                  <select
                    value={selectedExerciseId}
                    onChange={(e) => setSelectedExerciseId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecione um exerc?cio</option>
                    {availableExercises.map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name} - {exercise.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      S?ries
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={exerciseConfig.sets}
                      onChange={(e) =>
                        setExerciseConfig({ ...exerciseConfig, sets: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Repeti??es
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={exerciseConfig.reps}
                      onChange={(e) =>
                        setExerciseConfig({ ...exerciseConfig, reps: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carga (kg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={exerciseConfig.weight || ''}
                      onChange={(e) =>
                        setExerciseConfig({
                          ...exerciseConfig,
                          weight: parseFloat(e.target.value) || undefined,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Opcional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descanso (s)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={exerciseConfig.restSeconds}
                      onChange={(e) =>
                        setExerciseConfig({
                          ...exerciseConfig,
                          restSeconds: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observa??es
                  </label>
                  <textarea
                    value={exerciseConfig.notes}
                    onChange={(e) =>
                      setExerciseConfig({ ...exerciseConfig, notes: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowExerciseModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleAddExercise}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
