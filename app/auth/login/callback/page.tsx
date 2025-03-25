'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // 获取URL参数
        const loginType = searchParams.get('type');
        const code = searchParams.get('code');
        
        // 验证参数
        if (!loginType || !code) {
          throw new Error('登录参数无效');
        }
        
        // 模拟调用API获取用户信息和token
        // 实际应用中，这里应该调用后端API
        const userData = await mockApiCall(loginType, code);
        
        // 使用AuthContext的login方法登录
        const loginSuccess = await login(userData);
        
        if (loginSuccess) {
          setSuccess(true);
          // 登录成功后延迟跳转到主页
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          throw new Error('登录失败');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : '登录处理失败');
      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [searchParams, login, router]);

  // 模拟API调用
  const mockApiCall = async (loginType: string, code: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 根据登录类型返回不同的用户数据
    if (loginType === 'wechat') {
      return {
        userId: `wx_${Math.random().toString(36).substring(2, 10)}`,
        username: '微信用户',
        email: `wxuser_${Math.random().toString(36).substring(2, 10)}@example.com`,
        avatar: '/avatars/wechat-avatar.png',
        token: `wx_token_${Math.random().toString(36).substring(2, 15)}`
      };
    } else if (loginType === 'qq') {
      return {
        userId: `qq_${Math.random().toString(36).substring(2, 10)}`,
        username: 'QQ用户',
        email: `qquser_${Math.random().toString(36).substring(2, 10)}@example.com`,
        avatar: '/avatars/qq-avatar.png',
        token: `qq_token_${Math.random().toString(36).substring(2, 15)}`
      };
    } else {
      throw new Error('不支持的登录类型');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {loading && (
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="h-12 w-12 animate-spin text-blue-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">正在处理登录...</h2>
            <p className="mt-2 text-center text-gray-600">
              请稍候，我们正在验证您的登录信息
            </p>
          </div>
        )}

        {success && (
          <div className="flex flex-col items-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">登录成功！</h2>
            <p className="mt-2 text-center text-gray-600">
              您已成功登录。正在跳转到主页...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center">
            <XCircleIcon className="h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">登录失败</h2>
            <p className="mt-2 text-center text-red-600">{error}</p>
            <button
              onClick={() => router.push('/auth/login/third-party')}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              重新登录
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 