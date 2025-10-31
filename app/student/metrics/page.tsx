'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { Plus, Calendar, Target, TrendingUp } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import ProgressCharts from '@/components/ProgressCharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ProgressMetricsPage() {
  const { user, progressMetrics, addProgressMetric } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    arm: '',
    thigh: '',
  });

  const myMetrics = progressMetrics.filter((m) => m.studentId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const metric = {
      id: `metric-${Date.now()}`,
      studentId: user?.id || '',
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
      measurements: {
        chest: formData.chest ? parseFloat(formData.chest) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        arm: formData.arm ? parseFloat(formData.arm) : undefined,
        thigh: formData.thigh ? parseFloat(formData.thigh) : undefined,
      },
    };
    addProgressMetric(metric);
    setShowAddModal(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: '',
      chest: '',
      waist: '',
      arm: '',
      thigh: '',
    });
  };

  const weightData = myMetrics
    .filter((m) => m.weight)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      date: format(new Date(m.date), 'dd/MM', { locale: ptBR }),
      value: m.weight || 0,
    }));

  const measurementsData = myMetrics
    .filter((m) => m.measurements)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      date: format(new Date(m.date), 'dd/MM', { locale: ptBR }),
      chest: m.measurements?.chest || 0,
      waist: m.measurements?.waist || 0,
      arm: m.measurements?.arm || 0,
    }));

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">M?tricas de Progresso</h1>
              <Link href="/student/dashboard" className="text-primary-600 hover:text-primary-700">
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar M?trica</span>
            </button>
          </div>

          {/* Charts */}
          {weightData.length > 0 && (
            <div className="mb-8">
              <ProgressCharts
                data={weightData}
                type="line"
                title="Evolu??o de Peso"
                valueLabel="Peso (kg)"
                color="#2563eb"
              />
            </div>
          )}

          {/* Measurements */}
          {measurementsData.length > 0 && (
            <div className="mb-8">
              <ProgressCharts
                data={measurementsData}
                type="line"
                title="Evolu??o de Medidas"
                valueLabel="Medidas (cm)"
                color="#16a34a"
              />
            </div>
          )}

          {/* Recent Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hist?rico de M?tricas</h2>
            {myMetrics.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhuma m?trica registrada ainda
              </p>
            ) : (
              <div className="space-y-4">
                {myMetrics
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((metric) => (
                    <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {format(new Date(metric.date), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {metric.weight && (
                          <div>
                            <p className="text-sm text-gray-500">Peso</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metric.weight} kg
                            </p>
                          </div>
                        )}
                        {metric.bodyFat && (
                          <div>
                            <p className="text-sm text-gray-500">Gordura Corporal</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metric.bodyFat}%
                            </p>
                          </div>
                        )}
                        {metric.measurements?.chest && (
                          <div>
                            <p className="text-sm text-gray-500">Peito</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metric.measurements.chest} cm
                            </p>
                          </div>
                        )}
                        {metric.measurements?.waist && (
                          <div>
                            <p className="text-sm text-gray-500">Cintura</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metric.measurements.waist} cm
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Metric Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Adicionar M?trica</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gordura (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.bodyFat}
                      onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peito (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.chest}
                      onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cintura (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.waist}
                      onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bra?o (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.arm}
                      onChange={(e) => setFormData({ ...formData, arm: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coxa (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.thigh}
                      onChange={(e) => setFormData({ ...formData, thigh: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
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
                    Salvar
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
