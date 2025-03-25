import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { 
  BookOpenIcon, 
  ClockIcon, 
  UserIcon, 
  StarIcon,
  FireIcon,
  TrophyIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function RecommendedCoursesPage() {
  // 推荐课程数据
  const recommendedCourses = [
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
      recommendReason: '热门课程',
      discount: '8.5折',
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
      recommendReason: '最适合你',
      discount: null,
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
      recommendReason: '进阶课程',
      discount: '7折',
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
      recommendReason: '热门技能',
      discount: null,
    },
    {
      id: 8,
      title: '网络安全基础与实践',
      description: '学习网络安全基本概念、常见漏洞分析和安全防护措施，培养安全意识和技能。',
      instructor: '孙教授',
      duration: '8周',
      level: '初级',
      rating: 4.6,
      students: 760,
      image: '/images/courses/cybersecurity.jpg',
      categories: ['网络安全', '信息安全'],
      recommendReason: '新上线',
      discount: '9折',
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
      recommendReason: '就业热门',
      discount: '8折',
    },
  ];

  // 根据推荐原因获取标志颜色
  const getRecommendBadgeClass = (reason: string) => {
    switch(reason) {
      case '热门课程': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case '最适合你': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case '进阶课程': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case '热门技能': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case '新上线': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case '就业热门': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // 根据推荐原因获取图标
  const getRecommendIcon = (reason: string) => {
    switch(reason) {
      case '热门课程': return <FireIcon className="h-4 w-4 mr-1" />;
      case '最适合你': return <SparklesIcon className="h-4 w-4 mr-1" />;
      case '进阶课程': return <TrophyIcon className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  // 学习路径推荐
  const learningPaths = [
    {
      title: '人工智能工程师',
      description: '从基础到高级，系统学习人工智能所需的理论知识和实践技能',
      courses: 5,
      duration: '6个月',
      level: '初级到高级',
      image: '/images/paths/ai-engineer.jpg',
    },
    {
      title: '全栈Web开发',
      description: '掌握前后端开发技术，成为全能Web开发工程师',
      courses: 6,
      duration: '8个月',
      level: '初级到中级',
      image: '/images/paths/fullstack.jpg',
    },
    {
      title: '数据科学家',
      description: '系统学习数据分析、挖掘和建模，成为数据科学专家',
      courses: 7,
      duration: '9个月',
      level: '中级到高级',
      image: '/images/paths/data-scientist.jpg',
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">推荐课程</h1>
          <Link 
            href="/courses/all" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            浏览全部课程 →
          </Link>
        </div>
        
        {/* 个人推荐提示 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 mb-8 text-white">
          <h2 className="text-xl font-bold mb-2">专属你的学习推荐</h2>
          <p className="opacity-90 mb-4">
            基于你的学习历史和兴趣偏好，我们为你精选了以下课程和学习路径，帮助你更高效地提升技能。
          </p>
          <div className="flex items-center">
            <span className="mr-6">
              <span className="font-medium">学习进度</span>
              <span className="ml-2">42%</span>
            </span>
            <span className="mr-6">
              <span className="font-medium">技能方向</span>
              <span className="ml-2">人工智能 / Python</span>
            </span>
            <Link 
              href="/profile/learning-preferences" 
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full"
            >
              调整学习偏好
            </Link>
          </div>
        </div>
        
        {/* 推荐课程标题 */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          为你推荐的课程
        </h2>
        
        {/* 推荐课程网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendedCourses.map((course) => (
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
                
                {course.discount && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded">
                    {course.discount}
                  </div>
                )}
                
                <div className={`absolute bottom-2 left-2 px-2 py-1 text-xs rounded flex items-center ${getRecommendBadgeClass(course.recommendReason)}`}>
                  {getRecommendIcon(course.recommendReason)}
                  {course.recommendReason}
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

        {/* 学习路径推荐 */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          推荐学习路径
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {learningPaths.map((path, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(path.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg font-bold">{path.title}</h3>
                  <div className="flex text-sm text-white/80">
                    <span className="mr-3">{path.courses} 门课程</span>
                    <span>{path.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {path.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {path.level}
                  </span>
                  <Link
                    href={`/learning-paths/${index + 1}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    查看路径 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 更多推荐 */}
        <div className="text-center">
          <Link 
            href="/courses/popular" 
            className="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 font-medium"
          >
            探索更多热门课程
          </Link>
        </div>
      </div>
    </AppLayout>
  );
} 