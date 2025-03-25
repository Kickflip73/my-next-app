import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  UserIcon,
  TagIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

// 模拟热门讨论数据
const hotDiscussions = [
  {
    id: 1,
    title: 'Python中的高级数据结构应用',
    category: '编程技巧',
    author: '李明',
    authorAvatar: '/images/avatars/user1.jpg',
    date: '2小时前',
    replies: 42,
    views: 356,
    likes: 28,
  },
  {
    id: 2,
    title: '如何有效地组织机器学习项目结构？',
    category: '机器学习',
    author: '张华',
    authorAvatar: '/images/avatars/user2.jpg',
    date: '4小时前',
    replies: 35,
    views: 289,
    likes: 32,
  },
  {
    id: 3,
    title: '近期深度学习领域的前沿研究进展',
    category: '深度学习',
    author: '王芳',
    authorAvatar: '/images/avatars/user3.jpg',
    date: '昨天',
    replies: 27,
    views: 412,
    likes: 64,
  },
];

// 模拟学习圈子数据
const learningCircles = [
  {
    id: 1,
    name: 'Python爱好者',
    description: '分享Python学习经验，讨论Python生态系统发展和应用',
    members: 1256,
    icon: '/images/circles/python.png',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: '机器学习研究',
    description: '讨论机器学习算法、模型和前沿应用，共同解决学习中的难题',
    members: 876,
    icon: '/images/circles/ml.png',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    name: 'Web开发交流',
    description: '交流前后端开发技术，分享实用工具和最佳实践',
    members: 1580,
    icon: '/images/circles/web.png',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 4,
    name: '数据科学探索',
    description: '共同探讨数据分析、可视化和挖掘技术，分享实际案例',
    members: 965,
    icon: '/images/circles/data.png',
    color: 'from-purple-500 to-purple-600',
  },
];

// 模拟活跃用户数据
const activeUsers = [
  { id: 1, name: '李明', avatar: '/images/avatars/user1.jpg', contributions: 156, role: '技术专家' },
  { id: 2, name: '张华', avatar: '/images/avatars/user2.jpg', contributions: 132, role: '学习助手' },
  { id: 3, name: '王芳', avatar: '/images/avatars/user3.jpg', contributions: 98, role: '内容贡献者' },
  { id: 4, name: '赵伟', avatar: '/images/avatars/user4.jpg', contributions: 87, role: '问题解答者' },
  { id: 5, name: '刘洋', avatar: '/images/avatars/user5.jpg', contributions: 76, role: '讨论活跃者' },
];

// 模拟近期活动数据
const recentActivities = [
  {
    id: 1,
    type: 'discussion',
    title: '如何优化深度学习模型训练速度？',
    user: '李明',
    userAvatar: '/images/avatars/user1.jpg',
    time: '1小时前',
    detail: '发布了新讨论主题'
  },
  {
    id: 2,
    type: 'answer',
    title: 'Python多线程与多进程的区别',
    user: '张华',
    userAvatar: '/images/avatars/user2.jpg',
    time: '3小时前',
    detail: '回答了问题并获得最佳答案'
  },
  {
    id: 3,
    type: 'event',
    title: 'AI应用开发线上研讨会',
    user: '王芳',
    userAvatar: '/images/avatars/user3.jpg',
    time: '昨天',
    detail: '创建了新活动，将于下周三举行'
  },
  {
    id: 4,
    type: 'resource',
    title: '机器学习入门资源合集',
    user: '赵伟',
    userAvatar: '/images/avatars/user4.jpg',
    time: '昨天',
    detail: '分享了新学习资源'
  },
];

// 模拟热门标签数据
const popularTags = [
  { name: 'Python', count: 325 },
  { name: '机器学习', count: 286 },
  { name: '深度学习', count: 243 },
  { name: 'JavaScript', count: 198 },
  { name: 'React', count: 187 },
  { name: '数据科学', count: 176 },
  { name: 'TensorFlow', count: 165 },
  { name: '计算机视觉', count: 142 },
  { name: 'Node.js', count: 136 },
  { name: 'SQL', count: 128 },
];

// 获取活动类型对应的图标
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'discussion':
      return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
    case 'answer':
      return <UserIcon className="h-5 w-5" />;
    case 'event':
      return <CalendarIcon className="h-5 w-5" />;
    case 'resource':
      return <BookmarkIcon className="h-5 w-5" />;
    default:
      return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
  }
};

// 获取活动类型对应的颜色
const getActivityColor = (type: string) => {
  switch (type) {
    case 'discussion':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'answer':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'event':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'resource':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function CommunityPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              学习社区
            </h1>
            <div className="flex items-center space-x-2">
              <Link href="/community/discussions/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                发起讨论
              </Link>
            </div>
          </div>
          
          {/* 搜索框 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="搜索讨论、学习圈子或用户..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 热门讨论 */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <FireIcon className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">热门讨论</h2>
                  </div>
                  <Link 
                    href="/community/discussions" 
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    查看全部
                  </Link>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {hotDiscussions.map((discussion) => (
                    <div key={discussion.id} className="p-6">
                      <div className="flex items-start">
                        <img
                          src={discussion.authorAvatar}
                          alt={discussion.author}
                          className="w-10 h-10 rounded-full mr-4 object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/200x200/3b82f6/ffffff?text=${discussion.author.charAt(0)}`;
                          }}
                        />
                        <div className="flex-1">
                          <Link href={`/community/discussions/${discussion.id}`} className="block group">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {discussion.title}
                            </h3>
                          </Link>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 flex-wrap">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                              {discussion.category}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{discussion.author}</span>
                            <span className="mx-2">•</span>
                            <span>{discussion.date}</span>
                          </div>
                          <div className="flex items-center mt-3 space-x-4 text-sm">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                              <span>{discussion.replies} 回复</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <EyeIcon className="h-4 w-4 mr-1" />
                              <span>{discussion.views} 浏览</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <HeartIcon className="h-4 w-4 mr-1" />
                              <span>{discussion.likes} 赞</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 热门标签和近期活动 */}
            <div className="space-y-6">
              {/* 热门标签 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <TagIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">热门标签</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Link 
                        key={index} 
                        href={`/community/tags/${tag.name}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {tag.name} <span className="ml-1 text-gray-500 dark:text-gray-400">({tag.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 近期活动 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">近期活动</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className={`p-2 rounded-md mr-3 ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <img
                              src={activity.userAvatar}
                              alt={activity.user}
                              className="w-5 h-5 rounded-full mr-2 object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/200x200/3b82f6/ffffff?text=${activity.user.charAt(0)}`;
                              }}
                            />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</span>
                          </div>
                          <Link 
                            href={`/community/activities/${activity.id}`}
                            className="block mt-1 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {activity.title}
                          </Link>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>{activity.detail}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 学习圈子 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">学习圈子</h2>
              </div>
              <Link 
                href="/community/circles" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                查看全部
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningCircles.map((circle) => (
                <Link 
                  key={circle.id}
                  href={`/community/circles/${circle.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-24 bg-gradient-to-r ${circle.color} flex items-center justify-center relative`}>
                    <img
                      src={circle.icon}
                      alt={circle.name}
                      className="h-16 w-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/200x200/ffffff/000000?text=${circle.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {circle.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {circle.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      <span>{circle.members} 成员</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* 活跃用户 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-purple-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">活跃用户</h2>
              </div>
              <Link 
                href="/community/users" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                查看更多
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {activeUsers.map((user) => (
                <Link 
                  key={user.id}
                  href={`/community/users/${user.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover mb-3"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/200x200/3b82f6/ffffff?text=${user.name.charAt(0)}`;
                    }}
                  />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full mt-1">
                    {user.role}
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    贡献: {user.contributions}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 