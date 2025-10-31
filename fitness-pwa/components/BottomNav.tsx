'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Dumbbell, TrendingUp, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Dumbbell, label: 'Treinos', path: '/workouts' },
    { icon: TrendingUp, label: 'Progresso', path: '/progress' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--dark-card)] border-t border-[var(--dark-border)] backdrop-blur-lg z-50">
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center justify-center gap-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-12 h-1 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full"
                />
              )}
              <Icon
                size={24}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-[var(--neon-cyan)]' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs transition-colors duration-300 ${
                  isActive ? 'text-[var(--neon-cyan)]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
