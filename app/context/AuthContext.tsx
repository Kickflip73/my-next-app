'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// 用户类型定义
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'admin';
}

// 第三方登录用户数据
interface ThirdPartyUser {
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  token: string;
}

// 定义认证上下文类型
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (emailOrData: string | ThirdPartyUser, password?: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: false,
  error: null,
});

// 认证提供者组件
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 检查初始认证状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 从本地存储中获取用户信息
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('认证检查失败:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 登录方法，支持普通登录和第三方登录
  const login = async (emailOrData: string | ThirdPartyUser, password?: string) => {
    setLoading(true);
    setError(null);

    try {
      // 判断是普通登录还是第三方登录
      if (typeof emailOrData === 'string' && password) {
        // 普通登录方式
        const email = emailOrData;
        
        // 这里应该是实际的API调用，现在使用模拟数据
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // });
        
        // if (!response.ok) {
        //   throw new Error('登录失败');
        // }
        
        // const data = await response.json();
        
        // 模拟API响应
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模拟成功登录
        if (email === 'test@example.com' && password === 'password') {
          const userData: User = {
            id: '1',
            name: '测试用户',
            email: 'test@example.com',
            avatar: '/avatars/avatar-1.png',
            role: 'student',
          };
          
          // 保存用户信息
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return true;
        } else {
          throw new Error('邮箱或密码不正确');
        }
      } else if (typeof emailOrData === 'object') {
        // 第三方登录方式
        const thirdPartyData = emailOrData;
        
        // 转换为应用内用户格式
        const userData: User = {
          id: thirdPartyData.userId,
          name: thirdPartyData.username,
          email: thirdPartyData.email,
          avatar: thirdPartyData.avatar,
          role: 'student', // 默认角色
        };
        
        // 保存用户信息和token
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', thirdPartyData.token);
        setUser(userData);
        return true;
      } else {
        throw new Error('无效的登录参数');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '登录时发生错误';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 注册方法
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      // 这里应该是实际的API调用，现在使用模拟数据
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('注册失败');
      // }
      
      // const data = await response.json();
      
      // 模拟API响应
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟成功注册
      const userData: User = {
        id: '1',
        name,
        email,
        avatar: '/avatars/avatar-1.png',
        role: 'student',
      };
      
      // 保存用户信息
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册时发生错误';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 登出方法
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // 同时清除可能存在的token
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 自定义钩子，方便使用认证上下文
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 