'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import AppLayout from '@/app/components/layout/AppLayout';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Avatar from '@/app/components/ui/Avatar';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  
  // 个人信息状态
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '13800138000',
    birthdate: '1990-01-01',
    location: '北京市海淀区',
    bio: '热爱学习，热爱生活。',
    education: '计算机科学与技术',
    interests: ['人工智能', '数据科学', 'Web开发'],
  });
  
  // 检查是否登录
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  // 如果未登录，返回空
  if (!isAuthenticated || !user) {
    return null;
  }

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // 处理兴趣变化
  const handleInterestChange = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };
  
  // 保存资料
  const handleSave = () => {
    // 这里应该将数据发送到服务器
    // 模拟保存成功
    setEditMode(false);
  };
  
  // 统计卡片数据
  const stats = [
    { label: '已完成课程', value: 12, icon: CheckCircleIcon, color: 'text-green-500' },
    { label: '学习时间', value: '156小时', icon: ClockIcon, color: 'text-blue-500' },
    { label: '进行中课程', value: 3, icon: BookOpenIcon, color: 'text-purple-500' },
    { label: '平均成绩', value: '92分', icon: AcademicCapIcon, color: 'text-yellow-500' },
  ];
  
  // 可选的兴趣列表
  const availableInterests = [
    '人工智能', '数据科学', 'Web开发', '移动开发', '区块链', 
    '游戏开发', '机器学习', '云计算', '网络安全', '数据库', 
    '运维', '产品设计', 'UI/UX设计'
  ];
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          {/* 个人资料卡 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
              <button
                onClick={() => setEditMode(!editMode)}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative px-6 pt-16 pb-6">
              <div className="absolute -top-16 left-6">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.name.charAt(0).toUpperCase()}
                  size="xl"
                  className="ring-4 ring-white dark:ring-gray-800"
                />
              </div>
              
              {editMode ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        姓名
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        邮箱
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        电话
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        出生日期
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="birthdate"
                          type="date"
                          value={formData.birthdate}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        所在地
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        学历
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="education"
                          type="text"
                          value={formData.education}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      个人简介
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      兴趣领域
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableInterests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestChange(interest)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            formData.interests.includes(interest)
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{formData.bio}</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{formData.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{formData.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{formData.birthdate}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{formData.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <AcademicCapIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{formData.education}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">兴趣领域</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 最近学习记录 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">最近学习记录</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { course: '深度学习实战', date: '2023-10-15', duration: '2小时15分钟', progress: 75 },
                  { course: 'Python高级编程', date: '2023-10-14', duration: '1小时30分钟', progress: 40 },
                  { course: '数据结构与算法', date: '2023-10-12', duration: '3小时', progress: 60 },
                ].map((record, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{record.course}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">上次学习: {record.date} · 学习时长: {record.duration}</p>
                    </div>
                    <div className="w-full md:w-48">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{record.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 