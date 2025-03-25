'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChartBarIcon,
  AcademicCapIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function MyCourses() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'in-progress', 'completed'
  
  // 检查是否登录
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  // 如果未登录，显示加载状态
  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="container mx-auto py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">请先登录查看您的课程</p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            前往登录
          </Link>
        </div>
      </AppLayout>
    );
  }
  
  // 模拟用户课程数据
  const myCourses = [
    {
      id: 1,
      title: '深度学习基础',
      image: '/images/courses/deep-learning.jpg',
      instructor: '李教授',
      progress: 75,
      lastLesson: '卷积神经网络原理',
      nextLesson: '递归神经网络',
      totalLessons: 24,
      completedLessons: 18,
      category: '人工智能',
      status: 'in-progress',
      lastActive: '2天前',
    },
    {
      id: 2,
      title: 'Python数据分析',
      image: '/images/courses/python-data.jpg',
      instructor: '王博士',
      progress: 42,
      lastLesson: 'Pandas数据处理',
      nextLesson: '数据可视化基础',
      totalLessons: 36,
      completedLessons: 15,
      category: '数据科学',
      status: 'in-progress',
      lastActive: '5天前',
    },
    {
      id: 3,
      title: 'Web前端开发进阶',
      image: '/images/courses/web-frontend.jpg',
      instructor: '张讲师',
      progress: 60,
      lastLesson: 'React状态管理',
      nextLesson: '性能优化技巧',
      totalLessons: 30,
      completedLessons: 18,
      category: 'Web开发',
      status: 'in-progress',
      lastActive: '昨天',
    },
    {
      id: 4,
      title: 'JavaScript基础到高级',
      image: '/images/courses/javascript.jpg',
      instructor: '赵讲师',
      progress: 100,
      lastLesson: '异步编程与Promise',
      nextLesson: null,
      totalLessons: 28,
      completedLessons: 28,
      category: '编程语言',
      status: 'completed',
      lastActive: '1个月前',
      completionDate: '2023-09-15',
      certificate: true,
    },
    {
      id: 5,
      title: 'CSS现代布局技术',
      image: '/images/courses/css.jpg',
      instructor: '孙老师',
      progress: 100,
      lastLesson: 'Grid布局进阶应用',
      nextLesson: null,
      totalLessons: 20,
      completedLessons: 20,
      category: 'Web开发',
      status: 'completed',
      lastActive: '2个月前',
      completionDate: '2023-08-20',
      certificate: true,
    },
    {
      id: 6,
      title: '数据库原理与应用',
      image: '/images/courses/database.jpg',
      instructor: '钱教授',
      progress: 8,
      lastLesson: '关系型数据库基础',
      nextLesson: 'SQL查询语言',
      totalLessons: 25,
      completedLessons: 2,
      category: '数据库',
      status: 'in-progress',
      lastActive: '1周前',
    },
  ];
  
  // 根据当前选择的标签筛选课程
  const filteredCourses = activeTab === 'all' 
    ? myCourses 
    : myCourses.filter(course => course.status === activeTab);
    
  // 课程统计
  const courseStats = {
    total: myCourses.length,
    inProgress: myCourses.filter(c => c.status === 'in-progress').length,
    completed: myCourses.filter(c => c.status === 'completed').length,
    certificates: myCourses.filter(c => c.certificate).length,
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                我的课程
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                管理您正在学习和已完成的课程
              </p>
            </div>
            <Link 
              href="/courses" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              浏览更多课程
            </Link>
          </div>
          
          {/* 课程统计卡片 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <BookOpenIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">总课程</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{courseStats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                  <ArrowPathIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">进行中</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{courseStats.inProgress}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">已完成</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{courseStats.completed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
                  <AcademicCapIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">证书</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{courseStats.certificates}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 课程筛选标签 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'all'
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('all')}
              >
                全部课程
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'in-progress'
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('in-progress')}
              >
                进行中
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'completed'
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('completed')}
              >
                已完成
              </button>
            </div>
          </div>
          
          {/* 课程列表 */}
          {filteredCourses.length > 0 ? (
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(course.title)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 md:from-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-2 md:hidden">
                        <h2 className="text-white text-lg font-bold truncate">{course.title}</h2>
                        <p className="text-white/80 text-sm">{course.instructor}</p>
                      </div>
                      {course.status === 'completed' && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          已完成
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 md:flex-1">
                      <div className="hidden md:block mb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                              {course.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              讲师: {course.instructor}
                            </p>
                          </div>
                          
                          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="md:hidden flex justify-between items-center mb-4 mt-2">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {course.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          最近活动: {course.lastActive}
                        </span>
                      </div>
                      
                      {course.status === 'in-progress' ? (
                        <>
                          <div className="mb-4">
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">完成进度</span>
                              <span className="text-gray-700 dark:text-gray-300">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span>上次学习:</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {course.lastActive}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <PauseIcon className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                              <span>{course.lastLesson}</span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <PlayIcon className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                              <span>下一课: {course.nextLesson}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              已完成 {course.completedLessons} / {course.totalLessons} 课时
                            </div>
                            <Link
                              href={`/learning/courses/${course.id}`}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              继续学习
                              <ArrowRightIcon className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center mb-4">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">
                              完成于 {course.completionDate}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <span>课程总结:</span>
                              <div className="mt-1 flex items-start">
                                <CheckCircleIcon className="h-4 w-4 mr-1 text-green-600 dark:text-green-400 mt-0.5" />
                                <span>已完成全部 {course.totalLessons} 课时的学习</span>
                              </div>
                              {course.certificate && (
                                <div className="mt-1 flex items-start">
                                  <AcademicCapIcon className="h-4 w-4 mr-1 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                  <span>已获得课程结业证书</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              课程已完成
                            </div>
                            <div className="flex space-x-2">
                              {course.certificate && (
                                <Link
                                  href={`/learning/certificates/${course.id}`}
                                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                                >
                                  查看证书
                                  <AcademicCapIcon className="h-4 w-4 ml-1" />
                                </Link>
                              )}
                              <Link
                                href={`/learning/courses/${course.id}`}
                                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                              >
                                课程回顾
                                <ArrowRightIcon className="h-4 w-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <BookOpenIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                没有找到{activeTab === 'in-progress' ? '进行中的' : activeTab === 'completed' ? '已完成的' : ''}课程
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === 'all'
                  ? '您尚未加入任何课程，立即浏览课程目录并开始学习之旅。'
                  : activeTab === 'in-progress'
                  ? '您没有正在进行中的课程，浏览更多课程开始学习吧。'
                  : '您尚未完成任何课程，继续坚持学习，很快就能获得成就。'}
              </p>
              <Link 
                href="/courses" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <BookOpenIcon className="h-5 w-5 mr-2" />
                浏览课程
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 