'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Plus, Search, User as UserIcon, Mail, Phone, Edit, Trash2 } from 'lucide-react';

export default function TrainerStudentsPage() {
  const { getTrainerStudents, deleteUser, initializeMockData } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const students = getTrainerStudents();
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar adicionar aluno
    setShowAddModal(false);
    setNewStudent({ name: '', email: '', phone: '' });
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Tem certeza que deseja remover este aluno?')) {
      deleteUser(studentId);
    }
  };

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Meus Alunos</h1>
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
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar alunos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Aluno</span>
            </button>
          </div>

          {/* Students Grid */}
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado ainda'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Adicionar Primeiro Aluno
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-600 p-3 rounded-full">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        {student.level && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {student.level}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-primary-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {student.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {student.email}
                      </div>
                    )}
                    {student.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {student.phone}
                      </div>
                    )}
                  </div>

                  {student.goals && student.goals.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Objetivos:</p>
                      <div className="flex flex-wrap gap-1">
                        {student.goals.map((goal, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/trainer/students/${student.id}`}
                    className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Adicionar Novo Aluno</h3>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(11) 98765-4321"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
