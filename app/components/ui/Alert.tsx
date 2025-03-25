'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  closable = false,
  onClose,
  className = '',
  icon,
  action,
}) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  // 获取默认图标
  const getDefaultIcon = () => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case 'error': return <XCircleIcon className="h-5 w-5 text-red-400" />;
      case 'info':
      default: return <InformationCircleIcon className="h-5 w-5 text-blue-400" />;
    }
  };

  // 获取样式
  const getStyles = () => {
    let baseClasses = 'rounded-md p-4';
    let colorClasses = '';

    switch (type) {
      case 'success':
        colorClasses = 'bg-green-50 text-green-800';
        break;
      case 'warning':
        colorClasses = 'bg-yellow-50 text-yellow-800';
        break;
      case 'error':
        colorClasses = 'bg-red-50 text-red-800';
        break;
      case 'info':
      default:
        colorClasses = 'bg-blue-50 text-blue-800';
        break;
    }

    return `${baseClasses} ${colorClasses} ${className}`;
  };

  return (
    <div className={getStyles()}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || getDefaultIcon()}
        </div>
        <div className="ml-3 flex-grow">
          {title && (
            <h3 className="text-sm font-medium">
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? 'mt-2' : ''}`}>
            <p>{message}</p>
          </div>
          {action && (
            <div className="mt-4">
              {action}
            </div>
          )}
        </div>
        {closable && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={handleClose}
                className={`
                  inline-flex rounded-md p-1.5
                  ${type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100' : ''}
                  ${type === 'warning' ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100' : ''}
                  ${type === 'error' ? 'bg-red-50 text-red-500 hover:bg-red-100' : ''}
                  ${type === 'info' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : ''}
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${type === 'success' ? 'focus:ring-green-500' : ''}
                  ${type === 'warning' ? 'focus:ring-yellow-500' : ''}
                  ${type === 'error' ? 'focus:ring-red-500' : ''}
                  ${type === 'info' ? 'focus:ring-blue-500' : ''}
                `}
              >
                <span className="sr-only">关闭</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert; 