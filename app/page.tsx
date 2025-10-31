'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import OfflineIndicator from '@/components/OfflineIndicator';
import PWAInstaller from '@/components/PWAInstaller';

export default function Home() {
  const { user, initializeMockData } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializar dados mock
    initializeMockData();

    // Redirecionar baseado no tipo de usu?rio
    if (user) {
      if (user.role === 'trainer') {
        router.push('/trainer/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      router.push('/login');
    }

    setIsLoading(false);

    // Registrar service worker se dispon?vel
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, [user, router, initializeMockData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <OfflineIndicator />
      <PWAInstaller />
    </>
  );
}
