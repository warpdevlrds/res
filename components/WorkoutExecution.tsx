'use client';

import { useState, useEffect } from 'react';
import { useStore, Workout, Exercise } from '@/store/store';
import { ArrowLeft, CheckCircle, Circle, Clock, Pause, Play, SkipForward } from 'lucide-react';

interface WorkoutExecutionProps {
  workout: Workout;
  onBack: () => void;
  onComplete: () => void;
}

export default function WorkoutExecution({
  workout,
  onBack,
  onComplete,
}: WorkoutExecutionProps) {
  const { updateExercise, updateWorkout } = useStore();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime] = useState(new Date());

  const currentExercise = workout.exercises[currentExerciseIndex];
  const allSetsCompleted = currentSet > currentExercise.sets;
  const allExercisesCompleted =
    currentExerciseIndex >= workout.exercises.length - 1 && allSetsCompleted;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResting, restSeconds]);

  const handleCompleteSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestSeconds(currentExercise.restSeconds);
    } else {
      // Marcar exerc?cio como conclu?do
      updateExercise(workout.id, currentExercise.id, { completed: true });
      
      // Pr?ximo exerc?cio
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(true);
        setRestSeconds(workout.exercises[currentExerciseIndex + 1].restSeconds);
      } else {
        // Treino completo
        updateWorkout(workout.id, { completed: true });
        onComplete();
      }
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWorkoutDuration = () => {
    const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 1000);
    return formatTime(duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div className="text-sm text-gray-600">
              Tempo: {getWorkoutDuration()}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-700">
              Exerc?cio {currentExerciseIndex + 1} de {workout.exercises.length}
            </h2>
            <span className="text-sm text-gray-600">
              {Math.round(((currentExerciseIndex + 1) / workout.exercises.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Rest Timer */}
        {isResting && (
          <div className="mb-8 bg-primary-600 text-white rounded-xl p-8 text-center">
            <Clock className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Descanso</h3>
            <p className="text-4xl font-bold mb-4">{formatTime(restSeconds)}</p>
            <button
              onClick={handleSkipRest}
              className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Pular Descanso
            </button>
          </div>
        )}

        {/* Current Exercise */}
        {!isResting && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentExercise.name}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-lg text-gray-600">
                <span>{currentExercise.sets} s?ries</span>
                <span>?</span>
                <span>{currentExercise.reps} repeti??es</span>
                {currentExercise.weight && (
                  <>
                    <span>?</span>
                    <span>{currentExercise.weight} kg</span>
                  </>
                )}
              </div>
            </div>

            {currentExercise.notes && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{currentExercise.notes}</p>
              </div>
            )}

            {/* Sets Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  S?rie {currentSet} de {currentExercise.sets}
                </span>
                <div className="flex space-x-2">
                  {Array.from({ length: currentExercise.sets }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index + 1 < currentSet
                          ? 'bg-green-500 text-white'
                          : index + 1 === currentSet
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {index + 1 < currentSet ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCompleteSet}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors"
                disabled={allSetsCompleted}
              >
                {allSetsCompleted ? 'Exerc?cio Conclu?do' : 'Concluir S?rie'}
              </button>

              {!allExercisesCompleted && (
                <button
                  onClick={handleSkipExercise}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <SkipForward className="w-5 h-5" />
                  <span>Pular Exerc?cio</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Exercises List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treino Completo</h3>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  index === currentExerciseIndex
                    ? 'border-primary-500 bg-primary-50'
                    : exercise.completed
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      exercise.completed
                        ? 'bg-green-500 text-white'
                        : index === currentExerciseIndex
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {exercise.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} s?ries ? {exercise.reps} reps
                    </p>
                  </div>
                </div>
                {exercise.completed && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Complete Workout Button */}
        {allExercisesCompleted && (
          <button
            onClick={() => {
              updateWorkout(workout.id, { completed: true });
              onComplete();
            }}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
          >
            Finalizar Treino
          </button>
        )}
      </div>
    </div>
  );
}
