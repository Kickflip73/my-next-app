'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import AppLayout from '@/app/components/layout/AppLayout';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // 密码强度检查
  const passwordStrength = (): { score: number; message: string } => {
    if (!password) return { score: 0, message: '请输入密码' };
    
    let score = 0;
    let checks = {
      length: password.length >= 8,
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password)
    };
    
    if (checks.length) score += 1;
    if (checks.hasLowerCase && checks.hasUpperCase) score += 1;
    if (checks.hasNumber) score += 1;
    if (checks.hasSpecialChar) score += 1;
    
    let message = '';
    switch (score) {
      case 0: message = '非常弱'; break;
      case 1: message = '弱'; break;
      case 2: message = '一般'; break;
      case 3: message = '强'; break;
      case 4: message = '非常强'; break;
      default: message = '';
    }
    
    return { score, message };
  };

  const strengthResult = passwordStrength();
  
  // 密码强度指示器的颜色
  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-gray-300';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-600';
      default: return 'bg-gray-300';
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 表单验证
    if (!name.trim()) {
      setError('请输入您的姓名');
      return;
    }
    
    if (!email.trim()) {
      setError('请输入您的邮箱');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('请输入有效的邮箱地址');
      return;
    }
    
    if (password.length < 8) {
      setError('密码长度必须至少为8个字符');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    if (!agreeToTerms) {
      setError('请阅读并同意用户协议和隐私政策');
      return;
    }
    
    setLoading(true);
    
    try {
      // 调用注册方法
      const success = await register(email, password, name);
      
      if (success) {
        router.push('/');
      } else {
        setError('注册失败，请稍后再试');
      }
    } catch (err) {
      setError('注册过程中发生错误，请稍后再试');
      console.error('注册错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                创建账户
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                加入我们的学习平台，开启学习之旅
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-md flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  姓名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="请输入您的姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱地址
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="请输入您的邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="请输入密码（至少8个字符）"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${getStrengthColor(strengthResult.score)}`}
                          style={{ width: `${(strengthResult.score / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{strengthResult.message}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      密码应包含至少8个字符，包括大小写字母、数字和特殊字符
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  确认密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="请再次输入密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">密码不匹配</p>
                )}
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                    我已阅读并同意
                    <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      用户协议
                    </Link>
                    和
                    <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      隐私政策
                    </Link>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? '注册中...' : '注册'}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  已有账户?{' '}
                  <Link href="/auth/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    立即登录
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 