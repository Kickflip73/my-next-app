'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const pathname = usePathname();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 根据路径生成建议
  useEffect(() => {
    const generateSuggestions = () => {
      const defaultSuggestions = ['/courses', '/todos', '/learning/plans'];
      
      if (pathname.includes('course')) {
        return ['/courses', '/courses/all', '/courses/recommended'];
      } else if (pathname.includes('learn')) {
        return ['/learning/courses', '/learning/progress', '/learning/plans'];
      } else if (pathname.includes('todo')) {
        return ['/todos'];
      } else if (pathname.includes('community')) {
        return ['/community/circles', '/community/discussions'];
      } else {
        return defaultSuggestions;
      }
    };

    setSuggestions(generateSuggestions());
  }, [pathname]);

  // 获取可读的路径描述
  const getPathDescription = (path: string) => {
    switch (path) {
      case '/':
        return '首页';
      case '/courses':
        return '课程列表';
      case '/courses/all':
        return '全部课程';
      case '/courses/recommended':
        return '推荐课程';
      case '/learning/courses':
        return '我的课程';
      case '/learning/progress':
        return '学习进度';
      case '/learning/plans':
        return '学习计划';
      case '/todos':
        return '任务列表';
      case '/community/circles':
        return '学习圈子';
      case '/community/discussions':
        return '讨论区';
      default:
        return path;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            页面未找到
          </h1>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">
                页面路径
              </span>
            </div>
          </div>
          <div className="mt-2 mb-6 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
            {pathname}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            很抱歉，我们无法找到您要访问的页面。它可能已被移动、删除或暂时不可用。
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            返回首页
          </Link>

          {suggestions.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                您可能想要访问：
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((path) => (
                  <Link
                    key={path}
                    href={path}
                    className="px-3 py-1 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {getPathDescription(path)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          如果您认为这是一个错误，请
          <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
} 