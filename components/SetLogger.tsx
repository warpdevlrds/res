'use client';

import { useState } from 'react';
import { Minus, Plus, CheckCircle, Circle } from 'lucide-react';
import { SetExecution } from '@/types';

interface SetLoggerProps {
  totalSets: number;
  reps: number;
  weight?: number;
  onSetComplete: (setNumber: number, reps: number, weight?: number) => void;
  completedSets: SetExecution[];
}

export default function SetLogger({
  totalSets,
  reps,
  weight,
  onSetComplete,
  completedSets,
}: SetLoggerProps) {
  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(reps);
  const [currentWeight, setCurrentWeight] = useState(weight);

  const handleSetComplete = () => {
    if (currentSet <= totalSets) {
      onSetComplete(currentSet, currentReps, currentWeight);
      
      if (currentSet < totalSets) {
        setCurrentSet(currentSet + 1);
        setCurrentReps(reps);
      }
    }
  };

  const handleAdjustWeight = (delta: number) => {
    setCurrentWeight((prev) => Math.max(0, (prev || 0) + delta));
  };

  const handleAdjustReps = (delta: number) => {
    setCurrentReps((prev) => Math.max(1, prev + delta));
  };

  const nextSetNumber = completedSets.length + 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          S?rie {nextSetNumber} de {totalSets}
        </span>
        <div className="flex space-x-2">
          {Array.from({ length: totalSets }).map((_, index) => {
            const setNum = index + 1;
            const isCompleted = completedSets.some((s) => s.setNumber === setNum && s.completed);
            return (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-success-500 text-white'
                    : setNum === nextSetNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{setNum}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Adjust Reps */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repeti??es
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleAdjustReps(-1)}
            className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-2xl font-bold text-gray-900 min-w-[60px] text-center">
            {currentReps}
          </span>
          <button
            onClick={() => handleAdjustReps(1)}
            className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Adjust Weight */}
      {weight !== undefined && (
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carga (kg)
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleAdjustWeight(-2.5)}
              className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold text-gray-900 min-w-[60px] text-center">
              {currentWeight || 0}
            </span>
            <button
              onClick={() => handleAdjustWeight(2.5)}
              className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Complete Set Button */}
      {nextSetNumber <= totalSets && (
        <button
          onClick={handleSetComplete}
          className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors"
        >
          Concluir S?rie {nextSetNumber}
        </button>
      )}
    </div>
  );
}
