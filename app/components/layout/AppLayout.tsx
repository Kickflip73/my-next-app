'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useTheme } from '@/app/context/ThemeContext';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

// 直接从文件路径导入组件
import Sidebar from '@/app/components/layout/Sidebar';
import Topbar from '@/app/components/layout/Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 在较小屏幕上自动折叠侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    // 初始检查
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 切换侧边栏展开/折叠状态
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // 当路径变化时关闭移动菜单
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 主题选择选项
  const themeOptions = [
    { value: 'light', label: '明亮模式', icon: SunIcon },
    { value: 'dark', label: '暗黑模式', icon: MoonIcon },
    { value: 'system', label: '系统设置', icon: ComputerDesktopIcon },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 桌面侧边栏 */}
      <div className={`fixed inset-y-0 z-20 hidden lg:block transition-all duration-300 ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          className="h-full"
        />
      </div>

      {/* 移动菜单覆盖层 */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 移动侧边栏 */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="relative h-full">
          <Sidebar onToggle={() => setMobileMenuOpen(false)} />
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* 顶部导航栏 */}
        <Topbar
          onMenuClick={() => setMobileMenuOpen(true)}
          username={user?.name || '游客'}
          avatar={user?.avatar}
          isAuthenticated={isAuthenticated}
        />

        {/* 页面内容 */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* 页脚 */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} 智能学习平台. 保留所有权利.
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">关于我们</Link>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">隐私政策</Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">使用条款</Link>
              <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">联系我们</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* 主题选择器 (固定在右下角) */}
      <div className="fixed right-4 bottom-4 z-10">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex space-x-1">
          {themeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
              className={`p-2 rounded-full ${
                theme === option.value 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              title={option.label}
            >
              <option.icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLayout; 