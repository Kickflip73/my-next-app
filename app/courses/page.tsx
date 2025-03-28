import React from 'react';
import AppLayout from '@/app/components/layout/AppLayout';
import Link from 'next/link';
import { BookOpenIcon, ClockIcon, UserIcon, StarIcon } from '@heroicons/react/24/outline';

// 模拟课程数据
const courses = [
  {
    id: 1,
    title: '人工智能入门',
    description: '探索人工智能的基本概念、算法和应用场景，从零基础入门到掌握核心原理。',
    instructor: '李教授',
    duration: '10周',
    level: '初级',
    rating: 4.8,
    students: 1250,
    image: '/images/courses/ai-basics.jpg',
    categories: ['人工智能', '计算机科学'],
  },
  {
    id: 2,
    title: '数据科学实战',
    description: '学习数据清洗、探索性分析、可视化和预测建模，解决实际业务问题。',
    instructor: '王博士',
    duration: '12周',
    level: '中级',
    rating: 4.9,
    students: 980,
    image: '/images/courses/data-science.jpg',
    categories: ['数据科学', '统计学'],
  },
  {
    id: 3,
    title: 'Python高级编程',
    description: '深入理解Python高级特性，掌握性能优化、并发编程、设计模式等专业技能。',
    instructor: '张讲师',
    duration: '8周',
    level: '高级',
    rating: 4.7,
    students: 1545,
    image: '/images/courses/python-advanced.jpg',
    categories: ['编程语言', 'Python'],
  },
  {
    id: 4,
    title: '深度学习与计算机视觉',
    description: '学习卷积神经网络、目标检测、图像分割和生成对抗网络等前沿技术。',
    instructor: '陈教授',
    duration: '14周',
    level: '高级',
    rating: 4.9,
    students: 760,
    image: '/images/courses/deep-learning.jpg',
    categories: ['深度学习', '计算机视觉'],
  },
  {
    id: 5,
    title: 'Web全栈开发',
    description: '从前端到后端，全面学习现代Web应用开发，包括React、Node.js和数据库技术。',
    instructor: '林讲师',
    duration: '16周',
    level: '中级',
    rating: 4.6,
    students: 2100,
    image: '/images/courses/web-dev.jpg',
    categories: ['Web开发', 'JavaScript'],
  },
  {
    id: 6,
    title: '机器学习基础与应用',
    description: '学习机器学习的理论基础和实际应用，包括监督学习、无监督学习和强化学习。',
    instructor: '赵教授',
    duration: '12周',
    level: '中级',
    rating: 4.8,
    students: 1320,
    image: '/images/courses/machine-learning.jpg',
    categories: ['机器学习', '数据科学'],
  },
];

// 课程分类
const categories = [
  '全部课程',
  '人工智能',
  '数据科学',
  '编程语言',
  '深度学习',
  'Web开发',
  '机器学习',
  '计算机视觉',
  '自然语言处理',
];

// 课程水平
const levels = ['全部', '初级', '中级', '高级'];

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">课程列表</h1>
          <Link 
            href="/courses/recommended" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            查看推荐课程 →
          </Link>
        </div>
        
        {/* 筛选器 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <p className="text-gray-700 dark:text-gray-300 font-medium mr-2">分类:</p>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    index === 0 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <p className="text-gray-700 dark:text-gray-300 font-medium">难度:</p>
              <div className="flex gap-2">
                {levels.map((level, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-md text-sm ${
                      index === 0 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 课程网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg">
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 如果图片加载失败，使用占位图
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(course.title)}`;
                  }}
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{course.rating}/5.0</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <BookOpenIcon className="h-4 w-4 mr-1" />
                    <span>{course.students} 学生</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/courses/${course.id}`}
                  className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  查看课程
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700">
              上一页
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-gray-300 dark:border-gray-600">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700">
              下一页
            </button>
          </nav>
        </div>
      </div>
    </AppLayout>
  );
} 