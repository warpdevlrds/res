'use client';

import { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

interface GeolocationCheckInProps {
  onCheckIn?: (location: { lat: number; lng: number; address?: string }) => void;
  gymLocation?: { lat: number; lng: number; name: string };
}

export default function GeolocationCheckIn({
  onCheckIn,
  gymLocation,
}: GeolocationCheckInProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError('N?o foi poss?vel obter sua localiza??o');
        }
      );
    } else {
      setError('Geolocaliza??o n?o suportada');
    }
  }, []);

  const handleCheckIn = () => {
    if (location) {
      setIsCheckingIn(true);
      
      // Verificar se est? pr?ximo da academia (se fornecido)
      if (gymLocation) {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          gymLocation.lat,
          gymLocation.lng
        );
        
        if (distance > 100) {
          // Mais de 100 metros
          setError('Voc? est? muito longe da academia');
          setIsCheckingIn(false);
          return;
        }
      }

      // Vibra??o ao fazer check-in
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      onCheckIn?.(location);
      setCheckedIn(true);
      setIsCheckingIn(false);
      
      setTimeout(() => setCheckedIn(false), 3000);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Raio da Terra em metros
    const ?1 = (lat1 * Math.PI) / 180;
    const ?2 = (lat2 * Math.PI) / 180;
    const ?? = ((lat2 - lat1) * Math.PI) / 180;
    const ?? = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(?? / 2) * Math.sin(?? / 2) +
      Math.cos(?1) * Math.cos(?2) * Math.sin(?? / 2) * Math.sin(?? / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Check-in na Academia</p>
            {location && (
              <p className="text-xs text-gray-500">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>
        {checkedIn ? (
          <div className="flex items-center space-x-2 text-success-600">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Check-in realizado!</span>
          </div>
        ) : (
          <button
            onClick={handleCheckIn}
            disabled={!location || isCheckingIn}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isCheckingIn ? 'Verificando...' : 'Fazer Check-in'}
          </button>
        )}
      </div>
    </div>
  );
}
