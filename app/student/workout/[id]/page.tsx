'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/store/store';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  Pause,
  Play,
  SkipForward,
  Check,
} from 'lucide-react';
import { Workout, WorkoutExecution, SetExecution } from '@/types';
import { format, differenceInSeconds } from 'date-fns';

export default function WorkoutExecutionPage() {
  const router = useRouter();
  const params = useParams();
  const workoutId = params.id as string;

  const { user, getWorkoutById, getExerciseById, addWorkoutExecution, updateWorkout } = useStore();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [workoutStartTime] = useState(new Date());
  const [execution, setExecution] = useState<WorkoutExecution>({
    id: `exec-${Date.now()}`,
    workoutId,
    studentId: user?.id || '',
    startTime: workoutStartTime.toISOString(),
    exercises: [],
  });

  useEffect(() => {
    const w = getWorkoutById(workoutId);
    if (w) {
      setWorkout(w);
      // Inicializar execu??o
      const initialExercises = w.exercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        sets: Array.from({ length: ex.sets }, (_, i) => ({
          setNumber: i + 1,
          reps: ex.reps,
          weight: ex.weight,
          completed: false,
        })),
      }));
      setExecution({ ...execution, exercises: initialExercises });
    }
  }, [workoutId, getWorkoutById]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restSeconds > 0 && !isPaused) {
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
  }, [isResting, restSeconds, isPaused]);

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const currentExerciseData = getExerciseById(currentExercise.exerciseId);
  const exerciseExecution = execution.exercises.find(
    (e) => e.exerciseId === currentExercise.exerciseId
  );

  const allSetsCompleted = currentSet > currentExercise.sets;
  const allExercisesCompleted =
    currentExerciseIndex >= workout.exercises.length - 1 && allSetsCompleted;

  const handleCompleteSet = () => {
    if (!exerciseExecution) return;

    const updatedSets = exerciseExecution.sets.map((set) =>
      set.setNumber === currentSet ? { ...set, completed: true } : set
    );

    const updatedExercises = execution.exercises.map((ex) =>
      ex.exerciseId === currentExercise.exerciseId
        ? { ...ex, sets: updatedSets }
        : ex
    );

    setExecution({ ...execution, exercises: updatedExercises });

    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestSeconds(currentExercise.restSeconds);
    } else {
      // Pr?ximo exerc?cio
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        const nextExercise = workout.exercises[currentExerciseIndex + 1];
        setIsResting(true);
        setRestSeconds(nextExercise.restSeconds);
      }
    }
  };

  const handleFinishWorkout = () => {
    const endTime = new Date();
    const finalExecution: WorkoutExecution = {
      ...execution,
      endTime: endTime.toISOString(),
    };

    addWorkoutExecution(finalExecution);
    updateWorkout(workoutId, { completed: true });
    router.push('/student/dashboard');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWorkoutDuration = () => {
    const duration = differenceInSeconds(new Date(), workoutStartTime);
    return formatTime(duration);
  };

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                {getWorkoutDuration()}
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
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
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
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => {
                    setIsResting(false);
                    setRestSeconds(0);
                    setIsPaused(false);
                  }}
                  className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Pular Descanso
                </button>
              </div>
            </div>
          )}

          {/* Current Exercise */}
          {!isResting && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentExerciseData?.name || currentExercise.exerciseId}
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

              {currentExerciseData?.description && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700">{currentExerciseData.description}</p>
                </div>
              )}

              {currentExercise.notes && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-blue-700 text-sm">{currentExercise.notes}</p>
                </div>
              )}

              {/* Sets Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    S?rie {currentSet} de {currentExercise.sets}
                  </span>
                  <div className="flex space-x-2">
                    {Array.from({ length: currentExercise.sets }).map((_, index) => {
                      const setCompleted =
                        exerciseExecution?.sets.find((s) => s.setNumber === index + 1)?.completed ||
                        false;
                      return (
                        <div
                          key={index}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            setCompleted
                              ? 'bg-success-500 text-white'
                              : index + 1 === currentSet
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {setCompleted ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <span className="font-semibold">{index + 1}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCompleteSet}
                  disabled={allSetsCompleted}
                  className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {allSetsCompleted ? 'Exerc?cio Conclu?do' : 'Concluir S?rie'}
                </button>

                {!allExercisesCompleted && (
                  <button
                    onClick={() => {
                      if (currentExerciseIndex < workout.exercises.length - 1) {
                        setCurrentExerciseIndex(currentExerciseIndex + 1);
                        setCurrentSet(1);
                      }
                    }}
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
              {workout.exercises.map((exercise, index) => {
                const exData = getExerciseById(exercise.exerciseId);
                const exExecution = execution.exercises.find(
                  (e) => e.exerciseId === exercise.exerciseId
                );
                const allSetsDone = exExecution?.sets.every((s) => s.completed) || false;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      index === currentExerciseIndex
                        ? 'border-primary-500 bg-primary-50'
                        : allSetsDone
                        ? 'border-success-200 bg-success-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          allSetsDone
                            ? 'bg-success-500 text-white'
                            : index === currentExerciseIndex
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {allSetsDone ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {exData?.name || exercise.exerciseId}
                        </p>
                        <p className="text-sm text-gray-600">
                          {exercise.sets} s?ries ? {exercise.reps} reps
                        </p>
                      </div>
                    </div>
                    {allSetsDone && <CheckCircle className="w-6 h-6 text-success-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete Workout Button */}
          {allExercisesCompleted && (
            <button
              onClick={handleFinishWorkout}
              className="w-full mt-6 bg-success-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-success-700 transition-colors"
            >
              Finalizar Treino
            </button>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
