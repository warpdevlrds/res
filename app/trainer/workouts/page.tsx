'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Plus, Search, Filter, Calendar, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TrainerWorkoutsPage() {
  const { workouts, getTrainerStudents, initializeMockData } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('all');

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const students = getTrainerStudents();
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStudent = selectedStudent === 'all' || workout.studentId === selectedStudent;
    return matchesSearch && matchesStudent;
  });

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Treinos</h1>
              <Link
                href="/trainer/dashboard"
                className="text-primary-600 hover:text-primary-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar treinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Todos os alunos</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              href="/trainer/workouts/new"
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Criar Treino</span>
            </Link>
          </div>

          {/* Workouts List */}
          {filteredWorkouts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum treino encontrado</p>
              <Link
                href="/trainer/workouts/new"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Criar Primeiro Treino
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
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
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {workout.scheduledDate
                            ? format(new Date(workout.scheduledDate), "dd 'de' MMMM", {
                                locale: ptBR,
                              })
                            : 'Sem data agendada'}
                        </div>
                        <span>?</span>
                        <span>{workout.exercises.length} exerc?cios</span>
                        <span>?</span>
                        <span>Aluno: {workout.studentName}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {workout.completed ? (
                        <CheckCircle className="w-6 h-6 text-success-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                    {workout.exercises.slice(0, 6).map((exercise, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                      >
                        {index + 1}. {exercise.exerciseId} - {exercise.sets} s?ries ? {exercise.reps}{' '}
                        reps
                      </div>
                    ))}
                    {workout.exercises.length > 6 && (
                      <div className="text-sm text-gray-500 p-2">
                        + {workout.exercises.length - 6} exerc?cios
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/trainer/workouts/${workout.id}`}
                      className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Ver Detalhes
                    </Link>
                    <Link
                      href={`/trainer/workouts/${workout.id}/edit`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
