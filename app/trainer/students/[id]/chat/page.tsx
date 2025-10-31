'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Chat from '@/components/Chat';

export default function ChatPage() {
  const params = useParams();
  const { getTrainerStudents, user } = useStore();
  const [receiverId, setReceiverId] = useState<string>('');
  const [receiverName, setReceiverName] = useState<string>('');

  const students = getTrainerStudents();

  useEffect(() => {
    // Se for trainer, pode ter ID do aluno na URL
    if (params.id && user?.role === 'trainer') {
      const student = students.find((s) => s.id === params.id);
      if (student) {
        setReceiverId(student.id);
        setReceiverName(student.name);
      }
    } else if (user?.role === 'student') {
      // Aluno conversa com o trainer (assumindo primeiro trainer)
      const trainer = students.length > 0 ? null : { id: 'trainer-1', name: 'Meu Trainer' };
      // Implementar l?gica para encontrar trainer
    }
  }, [params.id, user, students]);

  if (!receiverId) {
    return (
      <AuthGuard allowedRoles={['trainer', 'student']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecione um contato</h2>
            <div className="space-y-2">
              {students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => {
                    setReceiverId(student.id);
                    setReceiverName(student.name);
                  }}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard allowedRoles={['trainer', 'student']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow h-[600px]">
            <Chat receiverId={receiverId} receiverName={receiverName} />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
