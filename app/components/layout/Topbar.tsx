'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  BellIcon,
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/app/context/AuthContext';
import Avatar from '@/app/components/ui/Avatar';
import Badge from '@/app/components/ui/Badge';

interface TopbarProps {
  onMenuClick: () => void;
  username?: string;
  avatar?: string;
  isAuthenticated?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ 
  onMenuClick,
  username = '游客',
  avatar,
  isAuthenticated = false,
}) => {
  const { logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 模拟通知数据
  const notifications = [
    { id: 1, title: '课程提醒', content: '您有一节课程即将在15分钟后开始', time: '5分钟前', read: false },
    { id: 2, title: '作业截止提醒', content: '数学作业将在明天截止', time: '30分钟前', read: false },
    { id: 3, title: '系统通知', content: '系统将于今晚维护，请提前保存您的工作', time: '2小时前', read: true },
  ];
  
  // 未读通知数量
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('搜索:', searchQuery);
    // 实现搜索逻辑
  };
  
  // 关闭所有弹出菜单
  const closeAllMenus = () => {
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };
  
  // 用户菜单项
  const userMenuItems = isAuthenticated 
    ? [
        { name: '个人资料', href: '/profile', icon: UserIcon },
        { name: '学习进度', href: '/learning/progress', icon: AcademicCapIcon },
        { name: '设置', href: '/profile/settings', icon: Cog6ToothIcon },
        { name: '登出', onClick: logout, icon: ArrowRightStartOnRectangleIcon },
      ]
    : [
        { name: '登录', href: '/auth/login', icon: UserIcon },
        { name: '注册', href: '/auth/register', icon: UserIcon },
      ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* 左侧区域 - 移动菜单按钮 */}
        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 lg:hidden"
            onClick={onMenuClick}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* 中间区域 - 搜索栏 */}
        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="搜索课程、资源或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* 右侧区域 - 通知和用户菜单 */}
        <div className="flex items-center space-x-4">
          {/* 帮助按钮 */}
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </button>
          
          {/* 消息按钮 */}
          <Link href="/messages" className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
            <ChatBubbleLeftIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex items-center justify-center">
              <Badge variant="primary" size="sm">3</Badge>
            </span>
          </Link>
          
          {/* 通知按钮 */}
          <div className="relative">
            <button
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUserMenuOpen(false);
              }}
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center">
                  <Badge variant="danger" size="sm">{unreadCount}</Badge>
                </span>
              )}
            </button>
            
            {/* 通知下拉菜单 */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span>通知</span>
                  <Link href="/notifications" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    查看全部
                  </Link>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={`/notifications/${notification.id}`}
                        className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{notification.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.content}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                      暂无通知
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* 用户头像和下拉菜单 */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotificationsOpen(false);
              }}
            >
              <Avatar 
                src={avatar} 
                alt={username} 
                fallback={username.charAt(0).toUpperCase()} 
                size="md"
                className="ring-2 ring-white dark:ring-gray-800"
              />
            </button>
            
            {/* 用户下拉菜单 */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">已登录为</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{username}</p>
                </div>
                {userMenuItems.map((item, index) => {
                  if (item.href) {
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={closeAllMenus}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <button
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          closeAllMenus();
                          item.onClick?.();
                        }}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </div>
                      </button>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 