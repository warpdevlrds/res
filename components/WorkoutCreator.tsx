'use client';

import { useState } from 'react';
import { useStore, Workout, Exercise, User } from '@/store/store';
import { Plus, X, Save } from 'lucide-react';

export default function WorkoutCreator() {
  const { users, addWorkout } = useStore();
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: 12,
    restSeconds: 60,
  });

  const students = users.filter(u => u.role === 'student');

  const handleAddExercise = () => {
    if (currentExercise.name) {
      const exercise: Exercise = {
        id: `exercise-${Date.now()}`,
        name: currentExercise.name,
        sets: currentExercise.sets || 3,
        reps: currentExercise.reps || 12,
        weight: currentExercise.weight,
        restSeconds: currentExercise.restSeconds || 60,
        notes: currentExercise.notes,
        completed: false,
      };
      setExercises([...exercises, exercise]);
      setCurrentExercise({
        name: '',
        sets: 3,
        reps: 12,
        restSeconds: 60,
      });
      setShowExerciseForm(false);
    }
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  const handleSaveWorkout = () => {
    if (!selectedStudent || !workoutName || exercises.length === 0) {
      alert('Preencha todos os campos obrigat?rios');
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    const workout: Workout = {
      id: `workout-${Date.now()}`,
      name: workoutName,
      exercises,
      date: new Date().toISOString(),
      studentId: selectedStudent,
      studentName: student?.name || '',
      completed: false,
    };

    addWorkout(workout);
    setWorkoutName('');
    setExercises([]);
    setSelectedStudent('');
    alert('Treino criado com sucesso!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Treino</h2>

      <div className="space-y-6">
        {/* Student Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aluno
          </label>
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

        {/* Workout Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Treino
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ex: Treino de Peito e Tr?ceps"
          />
        </div>

        {/* Exercises List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Exerc?cios
            </label>
            <button
              onClick={() => setShowExerciseForm(true)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Exerc?cio</span>
            </button>
          </div>

          {exercises.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Nenhum exerc?cio adicionado ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">
                          {index + 1}. {exercise.name}
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
                      onClick={() => handleRemoveExercise(exercise.id)}
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
        <button
          onClick={handleSaveWorkout}
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Salvar Treino</span>
        </button>
      </div>

      {/* Exercise Form Modal */}
      {showExerciseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Adicionar Exerc?cio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Exerc?cio
                </label>
                <input
                  type="text"
                  required
                  value={currentExercise.name}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Supino Reto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    S?ries
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={currentExercise.sets}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, sets: parseInt(e.target.value) || 0 })}
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
                    value={currentExercise.reps}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, reps: parseInt(e.target.value) || 0 })}
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
                    value={currentExercise.weight || ''}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, weight: parseFloat(e.target.value) || undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Opcional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descanso (segundos)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={currentExercise.restSeconds}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, restSeconds: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observa??es
                </label>
                <textarea
                  value={currentExercise.notes || ''}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Observa??es sobre o exerc?cio..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowExerciseForm(false);
                    setCurrentExercise({ name: '', sets: 3, reps: 12, restSeconds: 60 });
                  }}
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
  );
}
