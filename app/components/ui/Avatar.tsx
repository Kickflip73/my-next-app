'use client';

import React from 'react';
import Image from 'next/image';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '用户头像',
  fallback,
  size = 'md',
  shape = 'circle',
  className = '',
  status,
}) => {
  const [error, setError] = React.useState<boolean>(false);

  // 将尺寸转换为具体像素
  const getSizeInPixels = (): number => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'xs': return 24;
      case 'sm': return 32;
      case 'md': return 40;
      case 'lg': return 56;
      case 'xl': return 80;
      default: return 40;
    }
  };

  // 获取形状对应的类名
  const getShapeClass = (): string => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-none';
      case 'rounded': return 'rounded-md';
      default: return 'rounded-full';
    }
  };

  // 获取状态指示器的类名
  const getStatusClass = (): string => {
    if (!status) return '';
    
    const baseClass = 'absolute bottom-0 right-0 block rounded-full ring-2 ring-white';
    const sizePixels = getSizeInPixels();
    const statusSize = sizePixels <= 32 ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5';
    
    let statusColor = '';
    switch (status) {
      case 'online': statusColor = 'bg-green-500'; break;
      case 'offline': statusColor = 'bg-gray-400'; break;
      case 'away': statusColor = 'bg-yellow-500'; break;
      case 'busy': statusColor = 'bg-red-500'; break;
      default: statusColor = 'bg-gray-400';
    }
    
    return `${baseClass} ${statusSize} ${statusColor}`;
  };

  // 生成用户名首字母作为备用显示内容
  const getFallbackContent = (): string => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    
    if (alt && alt !== '用户头像') {
      const words = alt.split(' ');
      if (words.length === 1) return words[0].charAt(0).toUpperCase();
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
    
    return 'U';
  };

  const sizeInPx = getSizeInPixels();
  const shapeClass = getShapeClass();
  const statusClass = getStatusClass();
  const fallbackContent = getFallbackContent();
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: sizeInPx, height: sizeInPx }}
    >
      {!error && src ? (
        <Image
          src={src}
          alt={alt}
          width={sizeInPx}
          height={sizeInPx}
          className={shapeClass + ' object-cover'}
          onError={() => setError(true)}
        />
      ) : (
        <div
          className={`flex items-center justify-center ${shapeClass} bg-gray-200 text-gray-600 font-medium`}
          style={{ width: sizeInPx, height: sizeInPx }}
        >
          <span style={{ fontSize: Math.max(sizeInPx * 0.4, 12) }}>
            {fallbackContent}
          </span>
        </div>
      )}
      
      {status && <span className={statusClass} />}
    </div>
  );
};

export default Avatar; 