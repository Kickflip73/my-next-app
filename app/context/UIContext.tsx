'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isMobile: boolean;
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);

  // 初始化时检查暗色模式偏好
  useEffect(() => {
    // 从localStorage检查暗色模式偏好
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      // 检查系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }

    // 监听窗口大小变化以设置移动状态
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始检查
    handleResize();

    // 添加resize事件监听器
    window.addEventListener('resize', handleResize);

    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 监听暗色模式变化，更新localStorage和文档类
  useEffect(() => {
    // 保存到localStorage
    localStorage.setItem('darkMode', darkMode.toString());

    // 更新文档类
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    darkMode,
    setDarkMode,
    isMobile,
    showAIAssistant,
    setShowAIAssistant,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  
  return context;
}; 