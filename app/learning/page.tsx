'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { useAuth } from '@/app/context/AuthContext';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function LearningCenterPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
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
          <p className="text-gray-600 dark:text-gray-400">请先登录查看您的学习中心</p>
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
  
  // 模拟学习数据
  const learningData = {
    lastActive: '今天',
    totalCourses: 15,
    completedCourses: 7,
    totalTime: '89小时',
    weeklyGoal: '10小时',
    weeklyProgress: 6.5,
    certificates: 3,
    currentCourses: [
      {
        id: 1,
        title: '深度学习基础',
        progress: 75,
        lastLesson: '卷积神经网络原理',
        nextLesson: '递归神经网络',
        image: '/images/courses/deep-learning.jpg',
      },
      {
        id: 2,
        title: 'Python数据分析',
        progress: 42,
        lastLesson: 'Pandas数据处理',
        nextLesson: '数据可视化基础',
        image: '/images/courses/python-data.jpg',
      },
      {
        id: 3,
        title: 'Web前端开发进阶',
        progress: 60,
        lastLesson: 'React状态管理',
        nextLesson: '性能优化技巧',
        image: '/images/courses/web-frontend.jpg',
      },
    ],
    recentNotes: [
      { id: 1, title: '深度学习模型架构笔记', date: '2023-10-15', course: '深度学习基础' },
      { id: 2, title: 'Pandas数据处理技巧', date: '2023-10-12', course: 'Python数据分析' },
      { id: 3, title: 'React Hooks使用总结', date: '2023-10-10', course: 'Web前端开发进阶' },
    ],
    upcomingTasks: [
      { id: 1, title: '深度学习作业提交', due: '2023-10-20', priority: 'high', type: 'assignment' },
      { id: 2, title: 'Python数据分析项目中期检查', due: '2023-10-25', priority: 'medium', type: 'project' },
      { id: 3, title: 'Web前端开发课程测验', due: '2023-11-01', priority: 'high', type: 'quiz' },
    ],
    learningPlan: [
      { id: 1, day: '周一', plan: '深度学习 (2小时)', completed: true },
      { id: 2, day: '周二', plan: 'Python数据分析 (1.5小时)', completed: true },
      { id: 3, day: '周三', plan: '休息', completed: true },
      { id: 4, day: '周四', plan: 'Web前端开发 (2小时)', completed: false },
      { id: 5, day: '周五', plan: '深度学习 (2小时)', completed: false },
      { id: 6, day: '周六', plan: '项目实践 (3小时)', completed: false },
      { id: 7, day: '周日', plan: '复习 (1小时)', completed: false },
    ],
  };
  
  // 获取优先级对应的样式
  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // 获取任务类型对应的图标
  const getTaskTypeIcon = (type: string) => {
    switch(type) {
      case 'assignment': return <DocumentTextIcon className="h-5 w-5" />;
      case 'quiz': return <AcademicCapIcon className="h-5 w-5" />;
      case 'project': return <BookOpenIcon className="h-5 w-5" />;
      default: return <DocumentTextIcon className="h-5 w-5" />;
    }
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              学习中心
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              上次学习: <span className="font-medium">{learningData.lastActive}</span>
            </p>
          </div>
          
          {/* 学习统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">我的课程</p>
                  <div className="flex items-center mt-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {learningData.completedCourses}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 ml-1">/ {learningData.totalCourses}</p>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <BookOpenIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">学习时间</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {learningData.totalTime}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <ClockIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">本周进度</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {learningData.weeklyProgress}
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/ {learningData.weeklyGoal}</span>
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <ChartBarIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-3 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full" 
                  style={{ width: `${(learningData.weeklyProgress / +learningData.weeklyGoal.split('小时')[0]) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">获得证书</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {learningData.certificates}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <AcademicCapIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 进行中的课程 */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">进行中的课程</h2>
                  <Link 
                    href="/learning/courses" 
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    查看全部
                  </Link>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {learningData.currentCourses.map((course) => (
                    <div key={course.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 mb-4 sm:mb-0 sm:mr-4">
                          <div className="relative h-32 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(course.title)}`;
                              }}
                            />
                          </div>
                        </div>
                        <div className="sm:w-3/4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {course.title}
                          </h3>
                          <div className="mb-3">
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
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <p>上次学习: {course.lastLesson}</p>
                            <p>下一课时: {course.nextLesson}</p>
                          </div>
                          <Link 
                            href={`/learning/courses/${course.id}`}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                          >
                            继续学习
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 学习计划 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">本周学习计划</h2>
                <Link 
                  href="/learning/plans" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  编辑计划
                </Link>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {learningData.learningPlan.map((plan) => (
                    <div key={plan.id} className="flex items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${
                        plan.completed 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {plan.completed ? (
                          <CheckCircleIcon className="h-5 w-5" />
                        ) : (
                          <CalendarIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.day}</p>
                        <p className={`text-sm ${
                          plan.completed 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {plan.plan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 近期笔记 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">近期笔记</h2>
                <Link 
                  href="/learning/notes" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  查看全部笔记
                </Link>
              </div>
              <div className="p-6">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {learningData.recentNotes.map((note) => (
                    <div key={note.id} className="py-3 first:pt-0 last:pb-0">
                      <Link href={`/learning/notes/${note.id}`} className="block group">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {note.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>{note.course}</span>
                          <span className="mx-2">•</span>
                          <span>{note.date}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 待完成任务 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">待完成任务</h2>
                <Link href="/todos" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  任务管理
                </Link>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {learningData.upcomingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className={`p-2 rounded-md mr-3 ${getPriorityStyle(task.priority)}`}>
                        {getTaskTypeIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          截止日期: {task.due}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(task.priority)}`}>
                        {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 