'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Check, Timer, Weight, Repeat } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { mockWorkouts } from '@/lib/mockData';
import { Exercise } from '@/types';

export default function WorkoutPage() {
  const router = useRouter();
  const params = useParams();
  const workoutId = params.id as string;
  
  const [workout, setWorkout] = useState(mockWorkouts.find(w => w.id === workoutId));
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!workout) {
      router.push('/dashboard');
    }
  }, [workout, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  if (!workout) return null;

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;

  const handleCompleteSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setTimeLeft(currentExercise.rest);
      setIsResting(true);
      setIsTimerRunning(true);
    } else {
      handleNextExercise();
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setTimeLeft(0);
      setIsTimerRunning(false);
    } else {
      router.push('/workout-complete');
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] p-6 border-b border-[var(--dark-border)]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[var(--dark-card)] rounded-xl transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{workout.name}</h1>
            <p className="text-sm text-gray-400">
              Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[var(--dark-border)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]"
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {isResting ? (
            <motion.div
              key="rest"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-[var(--neon-orange)]/20 to-[var(--neon-pink)]/20 border-[var(--neon-orange)]">
                <div className="py-8">
                  <Timer size={64} className="text-[var(--neon-orange)] mx-auto mb-4" />
                  <h2 className="text-3xl font-black text-white mb-2">Descanse</h2>
                  <p className="text-6xl font-black gradient-text mb-6">
                    {formatTime(timeLeft)}
                  </p>
                  <Button onClick={handleSkipRest} variant="outline" size="lg">
                    Pular Descanso
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Exercise GIF Placeholder */}
              <Card className="mb-6">
                <div className="aspect-video bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Play size={64} className="text-[var(--neon-cyan)] mx-auto mb-2" />
                    <p className="text-gray-400">GIF do exercício</p>
                  </div>
                </div>
              </Card>

              {/* Exercise Info */}
              <Card gradient className="mb-6">
                <h2 className="text-2xl font-black text-white mb-4">
                  {currentExercise.name}
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="bg-[var(--neon-cyan)]/20 p-3 rounded-xl mb-2 inline-block">
                      <Repeat size={24} className="text-[var(--neon-cyan)]" />
                    </div>
                    <p className="text-sm text-gray-400">Séries</p>
                    <p className="text-xl font-bold text-white">
                      {currentSet}/{currentExercise.sets}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-[var(--neon-purple)]/20 p-3 rounded-xl mb-2 inline-block">
                      <Check size={24} className="text-[var(--neon-purple)]" />
                    </div>
                    <p className="text-sm text-gray-400">Repetições</p>
                    <p className="text-xl font-bold text-white">
                      {currentExercise.reps}
                    </p>
                  </div>

                  {currentExercise.weight && (
                    <div className="text-center">
                      <div className="bg-[var(--neon-pink)]/20 p-3 rounded-xl mb-2 inline-block">
                        <Weight size={24} className="text-[var(--neon-pink)]" />
                      </div>
                      <p className="text-sm text-gray-400">Peso</p>
                      <p className="text-xl font-bold text-white">
                        {currentExercise.weight}kg
                      </p>
                    </div>
                  )}
                </div>

                {currentExercise.notes && (
                  <div className="bg-[var(--dark-bg)]/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-300">
                      💡 {currentExercise.notes}
                    </p>
                  </div>
                )}
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={handleCompleteSet} size="lg" fullWidth>
                  {currentSet < currentExercise.sets
                    ? `Completar Série ${currentSet}`
                    : 'Próximo Exercício'}
                </Button>
                
                {currentExerciseIndex < workout.exercises.length - 1 && (
                  <Button onClick={handleNextExercise} variant="outline" fullWidth>
                    Pular Exercício
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exercise List */}
        <Card>
          <h3 className="font-bold text-white mb-4">Lista de Exercícios</h3>
          <div className="space-y-2">
            {workout.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  index === currentExerciseIndex
                    ? 'bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]'
                    : index < currentExerciseIndex
                    ? 'bg-[var(--neon-green)]/10 opacity-50'
                    : 'bg-[var(--dark-bg)]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index < currentExerciseIndex
                      ? 'bg-[var(--neon-green)] text-black'
                      : index === currentExerciseIndex
                      ? 'bg-[var(--neon-cyan)] text-black'
                      : 'bg-[var(--dark-border)] text-gray-400'
                  }`}
                >
                  {index < currentExerciseIndex ? <Check size={16} /> : index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{exercise.name}</p>
                  <p className="text-xs text-gray-400">
                    {exercise.sets}x{exercise.reps}
                    {exercise.weight && ` • ${exercise.weight}kg`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
