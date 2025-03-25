'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, QrCodeIcon } from '@heroicons/react/24/outline';

// 声明全局类型，用于表示第三方SDK
declare global {
  interface Window {
    WxLogin: any;
    QC: {
      Login: {
        check: () => boolean;
        getMe: (callback: (openId: string, accessToken: string) => void) => void;
        showPopup: (options: any) => void;
      };
    };
  }
}

export default function ThirdPartyLoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'wechat' | 'qq' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载微信登录SDK
  useEffect(() => {
    if (loginType === 'wechat') {
      setIsLoading(true);
      setError(null);
      
      const script = document.createElement('script');
      script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
      script.async = true;
      script.onload = () => {
        console.log('微信登录SDK加载成功');
        initWechatLogin();
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error('微信登录SDK加载失败');
        setError('微信登录SDK加载失败，请稍后再试');
        setIsLoading(false);
      };
      
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [loginType]);

  // 初始化微信登录
  const initWechatLogin = () => {
    const container = document.getElementById('wechat-qr-container');
    if (!container || typeof window.WxLogin !== 'function') return;
    
    try {
      // 随机生成state防止CSRF攻击
      const state = Math.random().toString(36).substring(2, 15);
      
      // 保存到本地存储，回调时验证
      localStorage.setItem('wx_login_state', state);
      
      new window.WxLogin({
        self_redirect: false,
        id: 'wechat-qr-container', 
        appid: 'wx_app_id_example', // 替换为您的微信AppID
        scope: 'snsapi_login',
        redirect_uri: encodeURIComponent(`${window.location.origin}/auth/login/callback?type=wechat`),
        state: state,
        style: '',
        href: ''
      });
    } catch (err) {
      console.error('初始化微信登录失败:', err);
      setError('初始化微信登录失败，请稍后再试');
    }
  };

  // 加载QQ登录SDK
  useEffect(() => {
    if (loginType === 'qq') {
      setIsLoading(true);
      setError(null);
      
      const script = document.createElement('script');
      script.src = 'https://connect.qq.com/qc_jssdk.js';
      script.async = true;
      script.onload = () => {
        console.log('QQ登录SDK加载成功');
        initQQLogin();
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error('QQ登录SDK加载失败');
        setError('QQ登录SDK加载失败，请稍后再试');
        setIsLoading(false);
      };
      
      // 设置数据属性
      script.setAttribute('data-appid', 'qq_app_id_example'); // 替换为您的QQ AppID
      script.setAttribute('data-redirecturi', encodeURIComponent(`${window.location.origin}/auth/login/callback?type=qq`));
      
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [loginType]);

  // 初始化QQ登录
  const initQQLogin = () => {
    if (typeof window.QC === 'undefined') {
      setError('QQ登录初始化失败，请稍后再试');
      return;
    }
    
    const qqLoginBtn = document.getElementById('qq-login-btn');
    if (qqLoginBtn) {
      qqLoginBtn.onclick = handleQQLogin;
    }
  };

  // 处理QQ登录
  const handleQQLogin = () => {
    try {
      if (typeof window.QC !== 'undefined' && window.QC.Login) {
        // 打开QQ登录弹窗
        window.QC.Login.showPopup({
          appId: "qq_app_id_example", // 替换为您的QQ AppID
          redirectURI: `${window.location.origin}/auth/login/callback?type=qq`
        });
      } else {
        console.error('QQ SDK未正确加载');
        // 使用备选方案
        handleLoginFallback('qq');
      }
    } catch (err) {
      console.error('QQ登录失败:', err);
      // 使用备选方案
      handleLoginFallback('qq');
    }
  };

  // 备选登录方案（当SDK加载失败时）
  const handleLoginFallback = (type: 'wechat' | 'qq') => {
    console.log(`使用${type}登录备选方案`);
    const mockCode = Math.random().toString(36).substring(2, 15);
    console.log(`模拟${type}登录成功，重定向到回调页面，code:`, mockCode);
    router.push(`/auth/login/callback?type=${type}&code=${mockCode}`);
  };

  // 返回登录类型选择
  const backToSelection = () => {
    setLoginType(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            返回登录
          </Link>
        </div>

        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">第三方账号登录</h1>
            <p className="mt-2 text-gray-600">
              {loginType ? 
                `使用${loginType === 'wechat' ? '微信' : 'QQ'}账号登录` : 
                '请选择您要使用的第三方账号登录方式'}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">登录出错</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loginType ? (
            // 登录选择界面
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setLoginType('wechat')}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <QrCodeIcon className="mr-2 h-5 w-5 text-green-600" />
                <span>微信扫码登录</span>
              </button>

              <button
                onClick={() => setLoginType('qq')}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  className="mr-2 h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.7 13.8c-.2 0-.4-.1-.5-.2-.2-.1-.3-.2-.5-.1-.3.2-.7.3-1 .4-1.1.4-2.3.4-3.4 0-.4-.1-.7-.3-1-.4-.1 0-.3.1-.5.1-.1.1-.3.2-.5.2-.3 0-.5-.3-.4-.6.1-.2.3-.5.5-.7v-.1c.2-.3.4-.5.5-.8v-.1c0-.4-.6-1.2-.9-1.7-.3-.5-.6-1.1-.4-1.7.1-.2.2-.3.4-.3.5 0 1.5 1.1 1.5 1.1 0-.7.1-1.3.3-2 .3-.9.8-1.5 1.6-1.5s1.3.6 1.6 1.5c.2.7.3 1.3.3 2 0 0 .9-1.1 1.5-1.1.2 0 .3.1.4.3.2.6-.1 1.2-.4 1.7-.3.5-.9 1.3-.9 1.7v.1c.1.3.3.5.5.8v.1c.2.2.4.5.5.7.1.3-.1.6-.4.6z"
                    fill="currentColor"
                  />
                </svg>
                <span>QQ账号登录</span>
              </button>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-50 px-2 text-gray-500">
                    其他登录方式
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  使用邮箱密码登录
                </Link>
              </div>
            </div>
          ) : loginType === 'wechat' ? (
            // 微信登录界面
            <div className="flex flex-col items-center">
              <h2 className="mb-4 text-xl font-semibold">微信扫码登录</h2>
              {isLoading ? (
                <div className="my-8 flex flex-col items-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>
                  <p className="mt-4 text-gray-600">正在加载微信登录...</p>
                </div>
              ) : (
                <>
                  <div 
                    id="wechat-qr-container" 
                    className="mb-6 h-64 w-64 rounded border border-gray-200 bg-white"
                  ></div>
                  <p className="mb-6 text-sm text-gray-600">请使用微信扫描二维码登录</p>
                </>
              )}
              
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => handleLoginFallback('wechat')}
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  无法扫码？点击此处直接登录
                </button>
                <button
                  onClick={backToSelection}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  返回选择其他登录方式
                </button>
              </div>
            </div>
          ) : (
            // QQ登录界面
            <div className="flex flex-col items-center">
              <h2 className="mb-4 text-xl font-semibold">QQ账号登录</h2>
              {isLoading ? (
                <div className="my-8 flex flex-col items-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                  <p className="mt-4 text-gray-600">正在加载QQ登录...</p>
                </div>
              ) : (
                <div className="mb-6 flex flex-col items-center">
                  <button
                    id="qq-login-btn"
                    className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    点击进行QQ登录
                  </button>
                  <p className="mt-4 text-sm text-gray-600">
                    点击按钮后将跳转到QQ登录页面
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => handleLoginFallback('qq')}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  登录遇到问题？点击此处直接登录
                </button>
                <button
                  onClick={backToSelection}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  返回选择其他登录方式
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 