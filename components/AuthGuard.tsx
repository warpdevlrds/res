'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('trainer' | 'student')[];
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  allowedRoles,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push(redirectTo);
      return;
    }
  }, [user, allowedRoles, router, redirectTo]);

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
