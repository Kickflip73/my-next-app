'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 初始化主题状态
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 初始加载
  useEffect(() => {
    // 从本地存储加载主题设置
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  // 每次主题改变时更新
  useEffect(() => {
    // 检查系统偏好
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateIsDarkMode = () => {
      if (theme === 'system') {
        setIsDarkMode(darkModeMediaQuery.matches);
      } else {
        setIsDarkMode(theme === 'dark');
      }
    };
    
    // 立即更新
    updateIsDarkMode();
    
    // 监听系统偏好变化
    const mqListener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDarkMode(e.matches);
      }
    };
    
    darkModeMediaQuery.addEventListener('change', mqListener);
    return () => darkModeMediaQuery.removeEventListener('change', mqListener);
  }, [theme]);

  // 应用到DOM
  useEffect(() => {
    // 根据当前主题更新文档类
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 设置主题时更新本地存储
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 立即应用主题
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(newTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext; 