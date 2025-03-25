import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { 
  UserGroupIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// 模拟学习圈数据
const learningCircles = [
  {
    id: 1,
    name: '前端开发学习小组',
    description: '专注于React、Vue等前端技术学习与分享，欢迎所有对前端开发感兴趣的同学加入！',
    members: 128,
    topics: 56,
    category: '编程开发',
    tags: ['React', 'Vue', 'CSS', 'JavaScript'],
    image: '/images/circles/frontend.jpg',
  },
  {
    id: 2,
    name: '数据科学与人工智能',
    description: '讨论数据分析、机器学习和深度学习等AI相关技术，分享学习资源和项目经验。',
    members: 203,
    topics: 87,
    category: '人工智能',
    tags: ['机器学习', 'Python', '数据分析', '深度学习'],
    image: '/images/circles/data-science.jpg',
  },
  {
    id: 3,
    name: '算法竞赛训练营',
    description: '针对各类算法竞赛的刷题讨论组，包括leetcode每日一题解析和竞赛经验分享。',
    members: 97,
    topics: 124,
    category: '算法竞赛',
    tags: ['算法', '竞赛', '数据结构', '刷题'],
    image: '/images/circles/algorithms.jpg',
  },
  {
    id: 4,
    name: '产品设计与用户体验',
    description: '关注产品设计、用户研究和交互设计，分享行业趋势和设计方法论。',
    members: 85,
    topics: 42,
    category: '设计',
    tags: ['UI设计', 'UX', '产品思维', '用户研究'],
    image: '/images/circles/design.jpg',
  },
  {
    id: 5,
    name: '后端架构师成长营',
    description: '专注于后端开发技术、系统架构设计、性能优化和分布式系统等话题讨论。',
    members: 156,
    topics: 73,
    category: '编程开发',
    tags: ['Java', '架构设计', '微服务', '数据库'],
    image: '/images/circles/backend.jpg',
  },
  {
    id: 6,
    name: '移动应用开发交流群',
    description: 'Android与iOS开发技术交流，包括原生开发和跨平台框架如Flutter、React Native等。',
    members: 112,
    topics: 58,
    category: '编程开发',
    tags: ['Android', 'iOS', 'Flutter', 'React Native'],
    image: '/images/circles/mobile.jpg',
  },
];

// 学习圈分类
const categories = [
  '全部圈子',
  '编程开发',
  '人工智能',
  '算法竞赛',
  '设计',
  '语言学习',
  '考试认证',
  '职业发展',
];

export default function LearningCirclesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              学习圈子
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              加入志同道合的学习社区，一起分享知识和经验
            </p>
          </div>
          <Link
            href="/community/circles/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            创建学习圈
          </Link>
        </div>
        
        {/* 分类过滤器 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2">
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
        </div>
        
        {/* 学习圈列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningCircles.map((circle) => (
            <div 
              key={circle.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={circle.image}
                  alt={circle.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 如果图片加载失败，使用占位图
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(circle.name)}`;
                  }}
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600/80 text-white text-xs rounded">
                  {circle.category}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {circle.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                  {circle.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>{circle.members} 成员</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                    <span>{circle.topics} 话题</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {circle.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/community/circles/${circle.id}`}
                  className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  加入圈子
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* 我的圈子 */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              我的圈子
            </h2>
            <Link 
              href="/community/circles/my"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningCircles.slice(0, 3).map((circle) => (
              <Link 
                key={circle.id}
                href={`/community/circles/${circle.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  <UsersIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{circle.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{circle.members} 成员</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 