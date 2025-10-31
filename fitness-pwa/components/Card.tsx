'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, gradient = false, onClick }: CardProps) {
  const baseStyles = 'rounded-3xl p-6 backdrop-blur-lg';
  const bgStyles = gradient
    ? 'bg-gradient-to-br from-[var(--dark-card)] to-[var(--dark-bg)] border border-[var(--dark-border)]'
    : 'bg-[var(--dark-card)] border border-[var(--dark-border)]';
  const hoverStyles = hover ? 'cursor-pointer hover:border-[var(--neon-cyan)] transition-all duration-300' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`${baseStyles} ${bgStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
