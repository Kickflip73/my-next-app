import React from 'react';
import Link from 'next/link';
import AppLayout from './components/layout/AppLayout';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  RocketLaunchIcon,
  LightBulbIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  // 特色课程数据
  const featuredCourses = [
    {
      id: 1,
      title: '人工智能入门',
      description: '了解人工智能的基础知识和应用领域',
      image: '/images/courses/ai-intro.jpg',
      instructor: '张教授',
      rating: 4.8,
      students: 1240,
    },
    {
      id: 2,
      title: '数据科学与分析',
      description: '掌握数据分析的核心技能和工具',
      image: '/images/courses/data-science.jpg',
      instructor: '李博士',
      rating: 4.7,
      students: 980,
    },
    {
      id: 3,
      title: 'Web开发全栈课程',
      description: '从前端到后端，全面学习Web开发技术',
      image: '/images/courses/web-dev.jpg',
      instructor: '王讲师',
      rating: 4.9,
      students: 1560,
    },
  ];

  // 平台特点数据
  const features = [
    {
      icon: RocketLaunchIcon,
      title: '个性化学习路径',
      description: '根据您的学习目标和进度，自动生成最适合您的学习计划'
    },
    {
      icon: LightBulbIcon,
      title: 'AI辅助学习',
      description: '智能助手随时解答问题，提供学习建议和资源推荐'
    },
    {
      icon: UserGroupIcon,
      title: '社区学习',
      description: '加入学习小组，与志同道合的学习者一起成长'
    },
    {
      icon: ChartBarIcon,
      title: '学习分析',
      description: '详细的学习数据分析，帮助您了解自己的学习模式和进步'
    },
  ];

  return (
    <AppLayout>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-24 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              使用AI加速您的学习旅程
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              个性化学习路径，智能学习助手，全面的课程资源，帮助您更高效地学习和成长。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="px-6 py-3 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-300 text-center">
                浏览课程
              </Link>
              <Link href="/auth/register" className="px-6 py-3 rounded-lg bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors duration-300 text-center">
                免费注册
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg transform rotate-3"></div>
              <img 
                src="/images/hero-image.jpg" 
                alt="学习者使用平台" 
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 特色课程 */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">特色课程</h2>
          <Link href="/courses" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 bg-blue-100 dark:bg-blue-900/20">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>讲师: {course.instructor}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{course.students}名学生</span>
                </div>
                <Link 
                  href={`/courses/${course.id}`}
                  className="w-full block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                >
                  查看课程
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 任务管理工具卡片 */}
      <section className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">任务管理工具</h2>
            <p className="text-purple-100 mb-6">
              使用我们的任务管理工具，轻松规划您的学习计划，跟踪进度，提高学习效率。设置优先级、截止日期，管理您的学习任务从未如此简单。
            </p>
            <Link
              href="/todos"
              className="px-6 py-3 rounded-lg bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300 font-medium inline-block"
            >
              开始管理任务
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-4 shadow-xl transform md:rotate-2 md:translate-x-4">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">✓</div>
                  <div className="text-lg font-medium text-purple-900">完成数据科学作业</div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 rounded-full border-2 border-indigo-600 mr-3"></div>
                  <div className="text-lg text-indigo-900">准备机器学习考试</div>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full border-2 border-indigo-600 mr-3"></div>
                  <div className="text-lg text-indigo-900">阅读人工智能论文</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 平台特点 */}
      <section className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">为什么选择我们的平台</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 注册号召 */}
      <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden">
        <div className="container mx-auto px-6 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            准备好开始您的学习之旅了吗？
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            现在注册，立即获取300+精选课程、AI学习助手和个性化学习路径
          </p>
          <Link 
            href="/auth/register" 
            className="inline-block px-8 py-4 rounded-lg bg-white text-indigo-600 font-medium text-lg hover:bg-indigo-50 transition-colors duration-300"
          >
            免费注册开始学习
          </Link>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="mt-16 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">精选课程</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">50,000+</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">注册学员</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">100+</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">专业讲师</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">4.8</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">平均评分</div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
