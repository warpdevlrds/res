import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Exercise, Workout, WorkoutExecution, ProgressMetric, Notification } from '@/types';
import { MOCK_EXERCISES, MOCK_STUDENTS, MOCK_WORKOUTS, MOCK_WORKOUT_EXECUTIONS } from '@/data/mockData';

interface StoreState {
  // Auth
  user: User | null;
  isOnline: boolean;
  
  // Data
  exercises: Exercise[];
  users: User[];
  workouts: Workout[];
  workoutExecutions: WorkoutExecution[];
  progressMetrics: ProgressMetric[];
  notifications: Notification[];
  
  // UI State
  theme: 'light' | 'dark';
  isInstalled: boolean;
  
  // Actions - Auth
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Actions - Data
  initializeMockData: () => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  
  addExercise: (exercise: Exercise) => void;
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void;
  deleteExercise: (exerciseId: string) => void;
  
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workoutId: string, updates: Partial<Workout>) => void;
  deleteWorkout: (workoutId: string) => void;
  
  addWorkoutExecution: (execution: WorkoutExecution) => void;
  updateWorkoutExecution: (executionId: string, updates: Partial<WorkoutExecution>) => void;
  
  addProgressMetric: (metric: ProgressMetric) => void;
  
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  deleteNotification: (notificationId: string) => void;
  
  // Actions - UI
  setTheme: (theme: 'light' | 'dark') => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setInstalled: (isInstalled: boolean) => void;
  
  // Computed
  getStudentWorkouts: (studentId: string) => Workout[];
  getTrainerStudents: () => User[];
  getExerciseById: (exerciseId: string) => Exercise | undefined;
  getWorkoutById: (workoutId: string) => Workout | undefined;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      exercises: [],
      users: [],
      workouts: [],
      workoutExecutions: [],
      progressMetrics: [],
      notifications: [],
      theme: 'light',
      isInstalled: false,
      
      // Auth Actions
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      // Initialize Mock Data
      initializeMockData: () => {
        const state = get();
        if (state.exercises.length === 0) {
          set({
            exercises: MOCK_EXERCISES,
            users: [...state.users, ...MOCK_STUDENTS],
            workouts: [...state.workouts, ...MOCK_WORKOUTS],
            workoutExecutions: [...state.workoutExecutions, ...MOCK_WORKOUT_EXECUTIONS],
          });
        }
      },
      
      // User Actions
      addUser: (user) => set((state) => ({
        users: [...state.users.filter(u => u.id !== user.id), user],
      })),
      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u),
      })),
      deleteUser: (userId) => set((state) => ({
        users: state.users.filter(u => u.id !== userId),
      })),
      
      // Exercise Actions
      addExercise: (exercise) => set((state) => ({
        exercises: [...state.exercises.filter(e => e.id !== exercise.id), exercise],
      })),
      updateExercise: (exerciseId, updates) => set((state) => ({
        exercises: state.exercises.map(e => 
          e.id === exerciseId ? { ...e, ...updates } : e
        ),
      })),
      deleteExercise: (exerciseId) => set((state) => ({
        exercises: state.exercises.filter(e => e.id !== exerciseId),
      })),
      
      // Workout Actions
      addWorkout: (workout) => set((state) => ({
        workouts: [...state.workouts.filter(w => w.id !== workout.id), workout],
      })),
      updateWorkout: (workoutId, updates) => set((state) => ({
        workouts: state.workouts.map(w => 
          w.id === workoutId ? { ...w, ...updates } : w
        ),
      })),
      deleteWorkout: (workoutId) => set((state) => ({
        workouts: state.workouts.filter(w => w.id !== workoutId),
      })),
      
      // Workout Execution Actions
      addWorkoutExecution: (execution) => set((state) => ({
        workoutExecutions: [...state.workoutExecutions, execution],
      })),
      updateWorkoutExecution: (executionId, updates) => set((state) => ({
        workoutExecutions: state.workoutExecutions.map(e => 
          e.id === executionId ? { ...e, ...updates } : e
        ),
      })),
      
      // Progress Actions
      addProgressMetric: (metric) => set((state) => ({
        progressMetrics: [...state.progressMetrics.filter(m => m.id !== metric.id), metric],
      })),
      
      // Notification Actions
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
      markNotificationAsRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        ),
      })),
      deleteNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId),
      })),
      
      // UI Actions
      setTheme: (theme) => set({ theme }),
      setOnlineStatus: (isOnline) => set({ isOnline }),
      setInstalled: (isInstalled) => set({ isInstalled }),
      
      // Computed
      getStudentWorkouts: (studentId) => {
        const state = get();
        return state.workouts.filter(w => w.studentId === studentId);
      },
      getTrainerStudents: () => {
        const state = get();
        return state.users.filter(u => u.role === 'student');
      },
      getExerciseById: (exerciseId) => {
        const state = get();
        return state.exercises.find(e => e.id === exerciseId);
      },
      getWorkoutById: (workoutId) => {
        const state = get();
        return state.workouts.find(w => w.id === workoutId);
      },
    }),
    {
      name: 'trainer-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        exercises: state.exercises,
        users: state.users,
        workouts: state.workouts,
        workoutExecutions: state.workoutExecutions,
        progressMetrics: state.progressMetrics,
        notifications: state.notifications,
        theme: state.theme,
      }),
    }
  )
);
