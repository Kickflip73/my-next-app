'use client';

import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  animated?: boolean;
  striped?: boolean;
  className?: string;
  barClassName?: string;
  labelClassName?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  showValue = false,
  valueFormat,
  size = 'md',
  color = 'primary',
  animated = false,
  striped = false,
  className = '',
  barClassName = '',
  labelClassName = '',
}) => {
  // 计算百分比
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  // 格式化显示值
  const formattedValue = valueFormat
    ? valueFormat(value, max)
    : showValue
    ? `${Math.round(percentage)}%`
    : '';

  // 高度类名
  const heightClass = React.useMemo(() => {
    switch (size) {
      case 'xs': return 'h-1';
      case 'sm': return 'h-2';
      case 'lg': return 'h-6';
      case 'md':
      default: return 'h-4';
    }
  }, [size]);

  // 颜色类名
  const colorClass = React.useMemo(() => {
    switch (color) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'danger': return 'bg-red-500';
      case 'info': return 'bg-purple-500';
      case 'primary':
      default: return 'bg-blue-500';
    }
  }, [color]);

  // 条纹和动画类名
  const variantClass = React.useMemo(() => {
    let classes = '';
    
    if (striped) {
      classes += ' bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem]';
    }
    
    if (animated) {
      classes += ' animate-progress-stripe';
    }
    
    return classes;
  }, [striped, animated]);

  return (
    <div className="w-full">
      <div 
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClass} ${className}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`${colorClass} ${variantClass} ${size === 'lg' ? 'flex items-center justify-center text-white text-xs font-medium' : ''} rounded-full transition-all duration-300 ${barClassName}`}
          style={{ width: `${percentage}%` }}
        >
          {size === 'lg' && formattedValue}
        </div>
      </div>
      
      {showValue && size !== 'lg' && (
        <div className={`mt-1 text-xs text-right ${labelClassName}`}>
          {formattedValue}
        </div>
      )}
    </div>
  );
};

export default Progress; 