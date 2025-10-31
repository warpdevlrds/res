'use client';

import { useState } from 'react';
import { useStore, Workout, User } from '@/store/store';
import { Plus, Users, Calendar, BarChart3, LogOut, User as UserIcon } from 'lucide-react';
import StudentList from '@/components/StudentList';
import WorkoutCreator from '@/components/WorkoutCreator';
import WorkoutList from '@/components/WorkoutList';
import StudentProgress from '@/components/StudentProgress';

export default function TrainerDashboard() {
  const { user, users, workouts, logout } = useStore();
  const [activeTab, setActiveTab] = useState<'students' | 'workouts' | 'create' | 'progress'>('students');

  const students = users.filter(u => u.role === 'student');
  const myWorkouts = workouts.filter(w => w.studentId);

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
                <h1 className="text-xl font-bold text-gray-900">Ol?, {user?.name || 'Trainer'}</h1>
                <p className="text-sm text-gray-500">Personal Trainer</p>
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

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Alunos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
              </div>
              <Users className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Treinos Criados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{myWorkouts.length}</p>
              </div>
              <Calendar className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Treinos Conclu?dos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {myWorkouts.filter(w => w.completed).length}
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Meus Alunos
              </button>
              <button
                onClick={() => setActiveTab('workouts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'workouts'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Treinos
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'create'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Criar Treino
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Progresso
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'students' && <StudentList />}
          {activeTab === 'workouts' && <WorkoutList />}
          {activeTab === 'create' && <WorkoutCreator />}
          {activeTab === 'progress' && <StudentProgress />}
        </div>
      </div>
    </div>
  );
}
