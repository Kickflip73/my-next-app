'use client';

import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card = ({
  className = '',
  children,
  variant = 'default',
  padding = 'medium',
}: CardProps) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'default':
        return 'bg-white';
      case 'outline':
        return 'bg-white border border-gray-200';
      case 'elevated':
        return 'bg-white shadow-lg';
      default:
        return 'bg-white';
    }
  };

  const getPaddingClasses = (): string => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'small':
        return 'p-3';
      case 'medium':
        return 'p-5';
      case 'large':
        return 'p-8';
      default:
        return 'p-5';
    }
  };

  return (
    <div
      className={`
        rounded-lg
        ${getVariantClasses()}
        ${getPaddingClasses()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card; 