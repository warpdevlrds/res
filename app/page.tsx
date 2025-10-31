'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import LoginPage from '@/components/LoginPage';
import TrainerDashboard from '@/components/TrainerDashboard';
import StudentDashboard from '@/components/StudentDashboard';

export default function Home() {
  const { user, loadUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar usu?rio do localStorage ao iniciar
    loadUser();
    setIsLoading(false);

    // Registrar service worker se dispon?vel
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, [loadUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return user.role === 'trainer' ? <TrainerDashboard /> : <StudentDashboard />;
}
