'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { mainNavigation } from '@/config/navigationConfig';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle,
  className = '',
}) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // 判断路径是否激活
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // 切换展开状态
  const toggleExpand = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // 过滤需要认证的导航项
  const filteredNavigation = mainNavigation.filter(item => 
    !item.requireAuth || (item.requireAuth && isAuthenticated)
  );

  return (
    <div 
      className={`h-full bg-white dark:bg-gray-900 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center">
          {collapsed ? (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              智
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                智
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">智能学习平台</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="mt-5 px-2">
        <ul className="space-y-1">
          {filteredNavigation.map((item) => {
            const isItemActive = isActive(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems[item.name] || false;

            // 如果当前项或其子项被激活，自动展开
            React.useEffect(() => {
              if (hasChildren && item.children?.some(child => isActive(child.href)) && !expandedItems[item.name]) {
                toggleExpand(item.name);
              }
            }, []);
            
            return (
              <li key={item.name}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`
                        group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md
                        ${isItemActive 
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }
                        ${collapsed ? 'justify-center' : 'justify-between'}
                      `}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`flex-shrink-0 h-5 w-5 ${
                            isItemActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                          }`}
                          aria-hidden="true"
                        />
                        {!collapsed && <span className="ml-3">{item.name}</span>}
                      </div>
                      {!collapsed && (
                        <ChevronRightIcon
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      )}
                    </button>
                    
                    {(isExpanded || (collapsed && isItemActive)) && (
                      <ul className={`mt-1 space-y-1 ${collapsed ? 'absolute left-16 min-w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-10' : 'pl-7'}`}>
                        {item.children?.map((child) => {
                          const isChildActive = isActive(child.href);
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`
                                  group flex items-center px-3 py-2 text-sm font-medium rounded-md
                                  ${isChildActive
                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                  }
                                `}
                              >
                                <child.icon
                                  className={`flex-shrink-0 h-4 w-4 ${
                                    isChildActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                  aria-hidden="true"
                                />
                                <span className="ml-3">{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${isItemActive 
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 ${
                        isItemActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                      aria-hidden="true"
                    />
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-4 px-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
            快捷工具
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/ai-assistant"
              className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mb-1 text-blue-500"
              >
                <path d="M12 8V4m0 4a4 4 0 100 8 4 4 0 000-8z" />
                <path d="M12 16v4" />
                <path d="M8 12H4" />
                <path d="M20 12h-4" />
              </svg>
              AI助手
            </Link>
            
            <Link
              href="/learning-plan"
              className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mb-1 text-green-500"
              >
                <path d="M8 6h10m-10 4h8m-8 4h6" />
                <rect x="2" y="2" width="20" height="20" rx="2" />
              </svg>
              学习计划
            </Link>
            
            <Link
              href="/notifications"
              className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mb-1 text-yellow-500"
              >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              通知
            </Link>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
          >
            <path d="M18 17l-6-6-6 6" />
          </svg>
          {!collapsed && <span className="ml-2">收起侧边栏</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 