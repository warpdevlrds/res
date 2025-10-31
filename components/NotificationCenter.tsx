'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';
import { useStore } from '@/store/store';
import { Notification } from '@/types';

export default function NotificationCenter() {
  const { notifications, markNotificationAsRead, deleteNotification } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const allNotifications = notifications.slice(0, 10).reverse();

  const handleRead = (id: string) => {
    markNotificationAsRead(id);
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  // Solicitar permiss?o para notifica??es push
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Mostrar notifica??o quando uma nova chegar
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const latest = notifications[0];
      if (latest && !latest.read) {
        new Notification(latest.title, {
          body: latest.message,
          icon: '/icon-192x192.png',
        });
      }
    }
  }, [notifications]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifica??es</h3>
              {unreadCount > 0 && (
                <span className="text-sm text-primary-600">{unreadCount} novas</span>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {allNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma notifica??o</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {allNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleRead(notification.id)}
                            className="text-primary-600 hover:text-primary-700"
                            title="Marcar como lida"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Remover"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
