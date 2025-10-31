export interface User {
  id: string;
  name: string;
  email: string;
  role: 'trainer' | 'student';
  avatar?: string;
  phone?: string;
  joinDate?: string;
  goals?: string[];
  level?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  description: string;
  equipment: string;
  difficulty: 'Iniciante' | 'Intermedi?rio' | 'Avan?ado';
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  restSeconds: number;
  notes?: string;
  order: number;
}

export interface Workout {
  id: string;
  name: string;
  studentId: string;
  studentName: string;
  exercises: WorkoutExercise[];
  createdAt: string;
  scheduledDate?: string;
  completed?: boolean;
}

export interface SetExecution {
  setNumber: number;
  reps: number;
  weight?: number;
  completed: boolean;
  restTime?: number;
}

export interface ExerciseExecution {
  exerciseId: string;
  sets: SetExecution[];
  notes?: string;
  rating?: number;
}

export interface WorkoutExecution {
  id: string;
  workoutId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  exercises: ExerciseExecution[];
  notes?: string;
  rating?: number;
}

export interface ProgressMetric {
  id: string;
  studentId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    arm?: number;
    thigh?: number;
  };
  photos?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'workout_assigned' | 'workout_reminder' | 'message' | 'progress_milestone';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
