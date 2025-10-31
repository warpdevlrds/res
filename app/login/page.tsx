'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import LoginPage from '@/components/LoginPage';
import OfflineIndicator from '@/components/OfflineIndicator';
import PWAInstaller from '@/components/PWAInstaller';

export default function LoginRoute() {
  const { user, initializeMockData } = useStore();
  const router = useRouter();

  useEffect(() => {
    initializeMockData();
    
    // Se j? estiver logado, redirecionar
    if (user) {
      if (user.role === 'trainer') {
        router.push('/trainer/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    }
  }, [user, router, initializeMockData]);

  return (
    <>
      <OfflineIndicator />
      <PWAInstaller />
      <LoginPage />
    </>
  );
}
