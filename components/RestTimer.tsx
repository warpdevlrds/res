'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';

interface RestTimerProps {
  seconds: number;
  onComplete?: () => void;
  onSkip?: () => void;
  exerciseName?: string;
}

export default function RestTimer({
  seconds,
  onComplete,
  onSkip,
  exerciseName,
}: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isPaused, setIsPaused] = useState(false);
  const [hasVibrated, setHasVibrated] = useState(false);

  useEffect(() => {
    setTimeLeft(seconds);
    setHasVibrated(false);
  }, [seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Vibra??o quando termina
            if (navigator.vibrate && !hasVibrated) {
              navigator.vibrate([200, 100, 200]);
              setHasVibrated(true);
            }
            // Som de alerta
            if (typeof window !== 'undefined' && 'Audio' in window) {
              const audio = new Audio('/beep.mp3');
              audio.play().catch(() => {}); // Ignora erro se arquivo n?o existir
            }
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, timeLeft, onComplete, hasVibrated]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / seconds) * 100;

  return (
    <div className="bg-primary-600 text-white rounded-xl p-8 text-center">
      {exerciseName && (
        <p className="text-sm opacity-90 mb-2">Pr?ximo: {exerciseName}</p>
      )}
      <h3 className="text-2xl font-bold mb-2">Descanso</h3>
      <p className="text-5xl font-bold mb-4">{formatTime(timeLeft)}</p>
      
      {/* Progress Circle */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="flex space-x-3 justify-center">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <SkipForward className="w-5 h-5" />
            <span>Pular</span>
          </button>
        )}
      </div>
    </div>
  );
}
