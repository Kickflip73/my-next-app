import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { 
  ChatBubbleLeftRightIcon,
  UserIcon,
  ClockIcon,
  FireIcon,
  TagIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

// 模拟热门讨论数据
const discussionData = [
  {
    id: 1,
    title: 'React 18新特性有哪些值得关注的地方？',
    content: '最近React 18发布了，带来了许多新特性，比如并发渲染、自动批处理等，大家有什么看法？',
    tags: ['React', '前端', 'JavaScript'],
    author: {
      name: '张三',
      avatar: '/images/avatars/user1.jpg',
      isVerified: true
    },
    replies: 24,
    views: 356,
    createdAt: '2023-10-15',
    lastReply: '2023-10-20',
    isHot: true,
  },
  {
    id: 2,
    title: 'Python中的装饰器如何实现并应用于实际项目？',
    content: '想了解Python装饰器的实现原理和一些实际应用案例，有经验的同学能否分享一下？',
    tags: ['Python', '编程技巧'],
    author: {
      name: '李四',
      avatar: '/images/avatars/user2.jpg',
      isVerified: false
    },
    replies: 18,
    views: 245,
    createdAt: '2023-10-14',
    lastReply: '2023-10-19',
    isHot: true,
  },
  {
    id: 3,
    title: '学习机器学习需要哪些数学基础？如何系统学习？',
    content: '想入门机器学习，但数学基础薄弱，请问需要掌握哪些数学知识，有什么好的学习路线吗？',
    tags: ['机器学习', '数学', '学习路线'],
    author: {
      name: '王五',
      avatar: '/images/avatars/user3.jpg',
      isVerified: false
    },
    replies: 32,
    views: 487,
    createdAt: '2023-10-12',
    lastReply: '2023-10-20',
    isHot: true,
  },
  {
    id: 4,
    title: '如何提高代码的可读性和可维护性？',
    content: '最近在项目中遇到了一些老代码难以维护的问题，想听听大家对于提高代码质量的建议。',
    tags: ['编程实践', '代码质量', '重构'],
    author: {
      name: '赵六',
      avatar: '/images/avatars/user4.jpg',
      isVerified: true
    },
    replies: 27,
    views: 312,
    createdAt: '2023-10-10',
    lastReply: '2023-10-18',
    isHot: false,
  },
  {
    id: 5,
    title: '面试中常见的算法题有哪些，如何准备？',
    content: '准备春招，想提前了解一下互联网公司的算法面试题都考些什么，应该如何准备？',
    tags: ['面试', '算法', '求职'],
    author: {
      name: '钱七',
      avatar: '/images/avatars/user5.jpg',
      isVerified: false
    },
    replies: 42,
    views: 628,
    createdAt: '2023-10-08',
    lastReply: '2023-10-19',
    isHot: true,
  },
];

// 热门标签
const popularTags = [
  { name: 'JavaScript', count: 254 },
  { name: 'Python', count: 187 },
  { name: 'React', count: 165 },
  { name: '机器学习', count: 143 },
  { name: '算法', count: 129 },
  { name: '面试', count: 115 },
  { name: 'Vue', count: 107 },
  { name: '后端', count: 98 },
  { name: '数据结构', count: 83 },
  { name: 'CSS', count: 76 },
];

// 活跃用户
const activeUsers = [
  { name: '张教授', avatar: '/images/avatars/user6.jpg', posts: 42, isVerified: true },
  { name: '李大神', avatar: '/images/avatars/user7.jpg', posts: 38, isVerified: true },
  { name: '王同学', avatar: '/images/avatars/user8.jpg', posts: 27, isVerified: false },
  { name: '赵工程师', avatar: '/images/avatars/user9.jpg', posts: 24, isVerified: false },
  { name: '刘讲师', avatar: '/images/avatars/user10.jpg', posts: 21, isVerified: true },
];

export default function DiscussionsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主要内容区域 */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                讨论区
              </h1>
              <Link
                href="/community/discussions/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                发起讨论
              </Link>
            </div>
            
            {/* 搜索和过滤 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="搜索讨论..."
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-md">
                    最新
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md">
                    热门
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md">
                    未回复
                  </button>
                </div>
              </div>
            </div>
            
            {/* 讨论列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {discussionData.map((discussion) => (
                  <div key={discussion.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex items-start">
                      <div className="hidden sm:block mr-4">
                        <div className="relative">
                          <img
                            src={discussion.author.avatar}
                            alt={discussion.author.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://placehold.co/200x200/4f46e5/ffffff?text=${discussion.author.name.charAt(0)}`;
                            }}
                          />
                          {discussion.author.isVerified && (
                            <span className="absolute -top-1 -right-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 p-0.5 rounded-full">
                              <CheckBadgeIcon className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {discussion.isHot && (
                            <span className="mr-2 px-1.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs rounded flex items-center">
                              <FireIcon className="h-3 w-3 mr-0.5" />
                              热门
                            </span>
                          )}
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            <Link href={`/community/discussions/${discussion.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                              {discussion.title}
                            </Link>
                          </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {discussion.tags.map((tag, idx) => (
                            <Link
                              key={idx}
                              href={`/community/discussions/tags/${tag}`}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
                          <div className="flex items-center">
                            <UserIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.author.name}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-3.5 w-3.5 mr-1" />
                            <span>发布于 {discussion.createdAt}</span>
                          </div>
                          <div className="flex items-center">
                            <ChatBubbleLeftRightIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.replies} 回复</span>
                          </div>
                          <div className="flex items-center">
                            <ArrowTrendingUpIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.views} 浏览</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 分页 */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                    上一页
                  </button>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    第 <span className="font-medium">1</span> 页，共 <span className="font-medium">10</span> 页
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:w-1/4 space-y-6">
            {/* 社区统计 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                社区统计
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">讨论主题</span>
                  <span className="font-medium text-gray-900 dark:text-white">5,328</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">回复总数</span>
                  <span className="font-medium text-gray-900 dark:text-white">24,592</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">社区成员</span>
                  <span className="font-medium text-gray-900 dark:text-white">12,867</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">今日发帖</span>
                  <span className="font-medium text-gray-900 dark:text-white">132</span>
                </div>
              </div>
            </div>
            
            {/* 热门标签 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  热门标签
                </h2>
                <Link
                  href="/community/discussions/tags"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  查看全部
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/community/discussions/tags/${tag.name}`}
                    className="group"
                  >
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300 transition-colors">
                      {tag.name} <span className="text-gray-500 dark:text-gray-400">{tag.count}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* 活跃用户 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  活跃用户
                </h2>
                <Link
                  href="/community/members"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  查看全部
                </Link>
              </div>
              <div className="space-y-3">
                {activeUsers.map((user, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/200x200/4f46e5/ffffff?text=${user.name.charAt(0)}`;
                        }}
                      />
                      {user.isVerified && (
                        <span className="absolute -top-1 -right-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 p-0.5 rounded-full">
                          <CheckBadgeIcon className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <Link
                        href={`/community/members/${user.name}`}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {user.name}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.posts} 篇讨论
                      </p>
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