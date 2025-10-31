import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'trainer' | 'student';
  avatar?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restSeconds: number;
  notes?: string;
  completed?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: string;
  studentId: string;
  studentName: string;
  completed?: boolean;
}

export interface StoreState {
  user: User | null;
  users: User[];
  workouts: Workout[];
  setUser: (user: User | null) => void;
  addUser: (user: User) => void;
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workoutId: string, updates: Partial<Workout>) => void;
  updateExercise: (workoutId: string, exerciseId: string, updates: Partial<Exercise>) => void;
  loadUser: () => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      users: [],
      workouts: [],
      
      setUser: (user) => set({ user }),
      
      addUser: (user) => set((state) => ({ 
        users: [...state.users.filter(u => u.id !== user.id), user] 
      })),
      
      addWorkout: (workout) => set((state) => ({ 
        workouts: [...state.workouts.filter(w => w.id !== workout.id), workout] 
      })),
      
      updateWorkout: (workoutId, updates) => set((state) => ({
        workouts: state.workouts.map(w => 
          w.id === workoutId ? { ...w, ...updates } : w
        ),
      })),
      
      updateExercise: (workoutId, exerciseId, updates) => set((state) => ({
        workouts: state.workouts.map(workout => 
          workout.id === workoutId 
            ? {
                ...workout,
                exercises: workout.exercises.map(ex => 
                  ex.id === exerciseId ? { ...ex, ...updates } : ex
                ),
              }
            : workout
        ),
      })),
      
      loadUser: () => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('trainer-app-storage');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed.state?.user) {
                set({ user: parsed.state.user });
              }
            } catch (e) {
              console.error('Error loading user:', e);
            }
          }
        }
      },
      
      logout: () => set({ user: null }),
    }),
    {
      name: 'trainer-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        users: state.users,
        workouts: state.workouts,
      }),
    }
  )
);
