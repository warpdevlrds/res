'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { ArrowLeft, Calendar, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CalendarPage() {
  const router = useRouter();
  const { workouts, getTrainerStudents } = useStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState<string>('all');

  const students = getTrainerStudents();
  const filteredWorkouts = workouts.filter(
    (w) => selectedStudent === 'all' || w.studentId === selectedStudent
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getWorkoutsForDay = (date: Date) => {
    return filteredWorkouts.filter((w) => {
      if (!w.scheduledDate) return false;
      return isSameDay(new Date(w.scheduledDate), date);
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <AuthGuard allowedRoles={['trainer']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/trainer/dashboard" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Calend?rio</h1>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Todos os alunos</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Calendar Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ?
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ?
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday Headers */}
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S?b'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month start */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24"></div>
              ))}

              {/* Calendar Days */}
              {daysInMonth.map((day) => {
                const dayWorkouts = getWorkoutsForDay(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-24 border border-gray-200 rounded-lg p-2 ${
                      isToday ? 'bg-primary-50 border-primary-300' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? 'text-primary-600' : 'text-gray-900'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayWorkouts.length > 0 && (
                        <span className="text-xs bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {dayWorkouts.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayWorkouts.slice(0, 2).map((workout) => (
                        <div
                          key={workout.id}
                          className="text-xs bg-primary-100 text-primary-800 p-1 rounded truncate cursor-pointer hover:bg-primary-200"
                          onClick={() => router.push(`/trainer/workouts/${workout.id}`)}
                          title={workout.name}
                        >
                          {workout.name}
                        </div>
                      ))}
                      {dayWorkouts.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayWorkouts.length - 2} mais
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pr?ximos Treinos</h2>
            <div className="space-y-2">
              {filteredWorkouts
                .filter((w) => w.scheduledDate && new Date(w.scheduledDate) > new Date())
                .sort((a, b) =>
                  new Date(a.scheduledDate || '').getTime() -
                  new Date(b.scheduledDate || '').getTime()
                )
                .slice(0, 10)
                .map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => router.push(`/trainer/workouts/${workout.id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{workout.name}</p>
                      <p className="text-sm text-gray-600">
                        {workout.studentName} ?{' '}
                        {workout.scheduledDate &&
                          format(new Date(workout.scheduledDate), "dd/MM '?s' HH:mm", {
                            locale: ptBR,
                          })}
                      </p>
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
