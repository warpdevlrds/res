'use client';

import { useStore } from '@/store/store';
import { TrendingUp, Users } from 'lucide-react';

export default function StudentProgress() {
  const { users, workouts } = useStore();
  const students = users.filter(u => u.role === 'student');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Progresso dos Alunos</h2>

      {students.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum aluno cadastrado</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((student) => {
            const studentWorkouts = workouts.filter(w => w.studentId === student.id);
            const completedWorkouts = studentWorkouts.filter(w => w.completed).length;
            const totalExercises = studentWorkouts.reduce(
              (acc, w) => acc + w.exercises.length,
              0
            );

            return (
              <div
                key={student.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Treinos Totais</p>
                    <p className="text-2xl font-bold text-gray-900">{studentWorkouts.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Treinos Conclu?dos</p>
                    <p className="text-2xl font-bold text-green-600">{completedWorkouts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Taxa de Conclus?o</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {studentWorkouts.length > 0
                        ? Math.round((completedWorkouts / studentWorkouts.length) * 100)
                        : 0}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Exerc?cios Realizados</p>
                    <p className="text-2xl font-bold text-gray-900">{totalExercises}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
