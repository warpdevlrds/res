'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const { isOnline, setOnlineStatus } = useStore();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setOnlineStatus(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setOnlineStatus(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  if (!showBanner && isOnline) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showBanner ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm font-medium ${
          isOnline
            ? 'bg-green-600 text-white'
            : 'bg-orange-600 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 mr-2" />
            Conectado ? internet
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 mr-2" />
            Modo offline - Seus dados ser?o sincronizados quando voltar online
          </>
        )}
      </div>
    </div>
  );
}
