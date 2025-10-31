'use client';

import { useState } from 'react';
import { useStore, Workout, Exercise } from '@/store/store';
import { LogOut, Users, Plus, Calendar, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TrainerDashboard() {
  const { user, users, workouts, addUser, addWorkout, logout } = useStore();
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    exercises: [] as Exercise[],
  });

  const students = users.filter(u => u.role === 'student');

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      addUser({
        id: newStudent.email,
        name: newStudent.name,
        email: newStudent.email,
        role: 'student',
      });
      setNewStudent({ name: '', email: '' });
      setShowAddStudent(false);
    }
  };

  const handleAddExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [
        ...newWorkout.exercises,
        {
          id: Date.now().toString(),
          name: '',
          sets: 3,
          reps: 10,
          restSeconds: 60,
        },
      ],
    });
  };

  const handleSaveWorkout = () => {
    if (newWorkout.name && selectedStudent && newWorkout.exercises.length > 0) {
      const student = users.find(u => u.id === selectedStudent);
      addWorkout({
        id: Date.now().toString(),
        name: newWorkout.name,
        exercises: newWorkout.exercises,
        date: new Date().toISOString(),
        studentId: selectedStudent,
        studentName: student?.name || '',
      });
      setNewWorkout({ name: '', exercises: [] });
      setSelectedStudent('');
      setShowAddWorkout(false);
    }
  };

  const studentWorkouts = workouts.filter(w => w.studentId === selectedStudent);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard do Trainer</h1>
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
        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowAddStudent(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Aluno
          </button>
          <button
            onClick={() => setShowAddWorkout(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Criar Treino
          </button>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Meus Alunos ({students.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedStudent === student.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Treinos: {workouts.filter(w => w.studentId === student.id).length}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workouts */}
        {selectedStudent && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Treinos de {students.find(s => s.id === selectedStudent)?.name}
            </h2>
            <div className="space-y-4">
              {studentWorkouts.map((workout) => (
                <div key={workout.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{workout.name}</h3>
                    {workout.completed && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {format(new Date(workout.date), "dd/MM/yyyy '?s' HH:mm")}
                  </p>
                  <div className="space-y-2">
                    {workout.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-sm text-gray-600">
                          {exercise.sets}x{exercise.reps}
                          {exercise.weight && ` - ${exercise.weight}kg`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Student Modal */}
        {showAddStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Adicionar Novo Aluno</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Nome do aluno"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddStudent}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddStudent(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Workout Modal */}
        {showAddWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
              <h2 className="text-xl font-semibold mb-4">Criar Novo Treino</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Treino</label>
                  <input
                    type="text"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Ex: Treino A - Peito e Tr?ceps"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Aluno</label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Selecione um aluno</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Exerc?cios</label>
                    <button
                      type="button"
                      onClick={handleAddExercise}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      + Adicionar Exerc?cio
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newWorkout.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Nome</label>
                            <input
                              type="text"
                              value={exercise.name}
                              onChange={(e) => {
                                const updated = [...newWorkout.exercises];
                                updated[index].name = e.target.value;
                                setNewWorkout({ ...newWorkout, exercises: updated });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Nome do exerc?cio"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Peso (kg)</label>
                            <input
                              type="number"
                              value={exercise.weight || ''}
                              onChange={(e) => {
                                const updated = [...newWorkout.exercises];
                                updated[index].weight = e.target.value ? parseFloat(e.target.value) : undefined;
                                setNewWorkout({ ...newWorkout, exercises: updated });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Opcional"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">S?ries</label>
                            <input
                              type="number"
                              value={exercise.sets}
                              onChange={(e) => {
                                const updated = [...newWorkout.exercises];
                                updated[index].sets = parseInt(e.target.value) || 0;
                                setNewWorkout({ ...newWorkout, exercises: updated });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Repeti??es</label>
                            <input
                              type="number"
                              value={exercise.reps}
                              onChange={(e) => {
                                const updated = [...newWorkout.exercises];
                                updated[index].reps = parseInt(e.target.value) || 0;
                                setNewWorkout({ ...newWorkout, exercises: updated });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Descanso (s)</label>
                            <input
                              type="number"
                              value={exercise.restSeconds}
                              onChange={(e) => {
                                const updated = [...newWorkout.exercises];
                                updated[index].restSeconds = parseInt(e.target.value) || 0;
                                setNewWorkout({ ...newWorkout, exercises: updated });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewWorkout({
                              ...newWorkout,
                              exercises: newWorkout.exercises.filter((_, i) => i !== index),
                            });
                          }}
                          className="mt-2 text-red-600 hover:text-red-700 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={handleSaveWorkout}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Salvar Treino
                  </button>
                  <button
                    onClick={() => {
                      setShowAddWorkout(false);
                      setNewWorkout({ name: '', exercises: [] });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
