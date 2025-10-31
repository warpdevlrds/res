export type UserMode = 'trainer' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  mode: UserMode;
  avatar?: string;
  bio?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  rest: number;
  gifUrl?: string;
  notes?: string;
  completed?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  workoutsCompleted: number;
  currentStreak: number;
}

export interface ProgressData {
  date: string;
  weight?: number;
  reps?: number;
  workouts?: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}
