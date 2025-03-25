'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 错误发生时记录到控制台
    console.error('应用发生错误:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            出了点问题
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            很抱歉，应用程序发生了错误。我们的团队已经收到通知，并正在努力解决这个问题。
          </p>

          {error.digest && (
            <div className="mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">错误ID:</div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
                {error.digest}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            重试
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          如果问题持续存在，请
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
            联系我们的支持团队
          </Link>
        </div>
      </div>
    </div>
  );
} 