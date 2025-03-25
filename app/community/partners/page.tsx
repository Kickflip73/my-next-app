import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { 
  UserIcon, 
  MagnifyingGlassIcon, 
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  TagIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

// 模拟学习伙伴数据
const learningPartners = [
  {
    id: 1,
    name: '王小明',
    avatar: '/images/avatars/user1.jpg',
    role: '学生',
    location: '北京',
    skills: ['Python', '机器学习', '数据分析'],
    interests: ['人工智能', '自然语言处理'],
    bio: '计算机科学专业学生，对AI和数据科学充满热情，希望找到志同道合的学习伙伴一起进步。',
    activity: {
      joined: '2023-06-15',
      topics: 28,
      replies: 156,
      lastActive: '今天'
    }
  },
  {
    id: 2,
    name: '李小红',
    avatar: '/images/avatars/user2.jpg',
    role: '前端开发者',
    location: '上海',
    skills: ['JavaScript', 'React', 'CSS'],
    interests: ['Web开发', 'UI设计'],
    bio: '三年前端开发经验，正在学习React Native和Flutter，寻找移动开发学习小伙伴。',
    activity: {
      joined: '2023-02-10',
      topics: 45,
      replies: 231,
      lastActive: '昨天'
    }
  },
  {
    id: 3,
    name: '张大山',
    avatar: '/images/avatars/user3.jpg',
    role: '后端工程师',
    location: '深圳',
    skills: ['Java', 'Spring Boot', '微服务'],
    interests: ['分布式系统', '云原生'],
    bio: '专注于后端开发和系统架构，希望能找到对架构设计感兴趣的学习伙伴，共同探讨技术难题。',
    activity: {
      joined: '2022-11-20',
      topics: 32,
      replies: 178,
      lastActive: '3天前'
    }
  },
  {
    id: 4,
    name: '赵梅',
    avatar: '/images/avatars/user4.jpg',
    role: '产品经理',
    location: '杭州',
    skills: ['产品设计', '用户研究', 'Axure'],
    interests: ['用户体验', '交互设计'],
    bio: '产品经理转行学习编程，对UI/UX和前端开发感兴趣，希望能找到有耐心指导的技术伙伴。',
    activity: {
      joined: '2023-03-18',
      topics: 19,
      replies: 87,
      lastActive: '1周前'
    }
  },
  {
    id: 5,
    name: '钱小豪',
    avatar: '/images/avatars/user5.jpg',
    role: '算法工程师',
    location: '广州',
    skills: ['算法', '竞赛编程', 'C++'],
    interests: ['刷题', '算法优化'],
    bio: 'ACM金牌得主，目前在准备各大厂算法岗位面试，寻找志同道合的伙伴一起刷题冲刺。',
    activity: {
      joined: '2023-01-05',
      topics: 56,
      replies: 324,
      lastActive: '2天前'
    }
  },
  {
    id: 6,
    name: '孙小花',
    avatar: '/images/avatars/user6.jpg',
    role: '数据科学家',
    location: '成都',
    skills: ['R语言', '统计分析', 'Tableau'],
    interests: ['大数据', '数据可视化'],
    bio: '热爱数据挖掘和分析，希望能和对数据科学有兴趣的伙伴一起学习交流，共同提高数据处理能力。',
    activity: {
      joined: '2022-12-12',
      topics: 24,
      replies: 134,
      lastActive: '4天前'
    }
  },
];

// 技能标签
const skillTags = [
  'Python', 'JavaScript', 'Java', 'C++', '算法', '前端开发', '后端开发', 
  '机器学习', '数据分析', 'React', 'Vue', 'Angular', 'Node.js', 'Spring Boot',
  '设计', 'UI/UX', '产品管理'
];

export default function LearningPartnersPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              学习伙伴
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              寻找志同道合的学习伙伴，互相督促、共同进步
            </p>
          </div>
        </div>
        
        {/* 搜索和过滤 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="搜索学习伙伴（按姓名、技能或兴趣）"
              />
            </div>
            <div className="relative">
              <select
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
              >
                <option value="">按活跃度排序</option>
                <option value="newest">最近加入</option>
                <option value="topics">讨论数量</option>
                <option value="replies">回复数量</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">按技能筛选：</p>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag, index) => (
                <button
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 学习伙伴列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPartners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      // 如果图片加载失败，使用占位图
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/200x200/3b82f6/ffffff?text=${partner.name.charAt(0)}`;
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {partner.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{partner.role}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <MapPinIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{partner.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {partner.bio}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <AcademicCapIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">技能</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {partner.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <TagIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">兴趣</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {partner.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">话题</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{partner.activity.topics}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">回复</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{partner.activity.replies}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">最近活跃</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{partner.activity.lastActive}</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Link
                    href={`/community/partners/${partner.id}`}
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    查看资料
                  </Link>
                  <Link
                    href={`/messages/new?to=${partner.id}`}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-md transition-colors flex items-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                    发送消息
                  </Link>
                </div>
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