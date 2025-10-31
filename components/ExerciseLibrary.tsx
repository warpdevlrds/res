'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '@/store/store';
import { Exercise } from '@/types';
import { EXERCISE_CATEGORIES, DIFFICULTY_LEVELS, EQUIPMENT_TYPES } from '@/data/mockData';

interface ExerciseLibraryProps {
  onSelectExercise?: (exercise: Exercise) => void;
  selectedExercises?: string[];
  showAddButton?: boolean;
}

export default function ExerciseLibrary({
  onSelectExercise,
  selectedExercises = [],
  showAddButton = true,
}: ExerciseLibraryProps) {
  const { exercises } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
    const notSelected = !selectedExercises.includes(exercise.id);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment && notSelected;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-success-100 text-success-800';
      case 'Intermedi?rio':
        return 'bg-alert-100 text-alert-800';
      case 'Avan?ado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar exerc?cios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todas as categorias</option>
          {EXERCISE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todas as dificuldades</option>
          {DIFFICULTY_LEVELS.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todos os equipamentos</option>
          {EQUIPMENT_TYPES.map((eq) => (
            <option key={eq} value={eq}>
              {eq}
            </option>
          ))}
        </select>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                <span className="text-sm text-primary-600">{exercise.category}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${getDifficultyColor(exercise.difficulty)}`}
              >
                {exercise.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
            <div className="text-xs text-gray-500 mb-2">
              {exercise.muscleGroups.join(', ')} ? {exercise.equipment}
            </div>
            {showAddButton && onSelectExercise && (
              <button
                onClick={() => onSelectExercise(exercise)}
                className="w-full bg-primary-600 text-white py-1.5 rounded text-sm hover:bg-primary-700 transition-colors"
              >
                Adicionar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
