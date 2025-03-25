import React from 'react';
import Link from 'next/link';
import AppLayout from '@/app/components/layout/AppLayout';
import { 
  ChevronRightIcon,
  BookOpenIcon,
  UserGroupIcon,
  CodeBracketIcon,
  ServerIcon,
  CpuChipIcon,
  BoltIcon,
  CloudIcon,
  GlobeAltIcon,
  CommandLineIcon,
  CursorArrowRaysIcon,
  PaintBrushIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function CoursesCategoriesPage() {
  // 课程分类数据
  const categories = [
    {
      name: '编程语言',
      icon: CodeBracketIcon,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      subcategories: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby'],
      courseCount: 124,
      popular: true,
    },
    {
      name: '前端开发',
      icon: CursorArrowRaysIcon,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      subcategories: ['React', 'Vue', 'Angular', 'HTML/CSS', 'TypeScript', 'Next.js', 'Web设计'],
      courseCount: 98,
      popular: true,
    },
    {
      name: '后端开发',
      icon: ServerIcon,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      subcategories: ['Node.js', 'Spring Boot', 'Django', 'Express', 'FastAPI', '微服务', 'API开发'],
      courseCount: 87,
      popular: true,
    },
    {
      name: '人工智能',
      icon: CpuChipIcon,
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      subcategories: ['机器学习', '深度学习', '自然语言处理', '计算机视觉', '强化学习'],
      courseCount: 76,
      popular: true,
    },
    {
      name: '数据科学',
      icon: BoltIcon,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      subcategories: ['数据分析', '数据可视化', '大数据', 'SQL', 'R语言', '统计学'],
      courseCount: 82,
      popular: true,
    },
    {
      name: '云计算',
      icon: CloudIcon,
      color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
      subcategories: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'DevOps'],
      courseCount: 45,
      popular: false,
    },
    {
      name: '移动开发',
      icon: GlobeAltIcon,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      subcategories: ['iOS开发', 'Android开发', 'React Native', 'Flutter', '跨平台开发'],
      courseCount: 58,
      popular: false,
    },
    {
      name: '系统运维',
      icon: CommandLineIcon,
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      subcategories: ['Linux系统', '网络管理', '服务器管理', '虚拟化', '自动化运维'],
      courseCount: 36,
      popular: false,
    },
    {
      name: '设计与创意',
      icon: PaintBrushIcon,
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      subcategories: ['UI设计', 'UX设计', '平面设计', '动画设计', '3D建模'],
      courseCount: 42,
      popular: false,
    },
    {
      name: '网络安全',
      icon: ShieldCheckIcon,
      color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
      subcategories: ['渗透测试', '网络防御', '密码学', '应用安全', '安全合规'],
      courseCount: 29,
      popular: false,
    },
  ];

  // 热门技能
  const popularSkills = [
    { name: 'Python', count: 36 },
    { name: 'React', count: 28 },
    { name: '机器学习', count: 24 },
    { name: 'JavaScript', count: 32 },
    { name: 'Docker', count: 18 },
    { name: 'Java', count: 22 },
    { name: 'Web开发', count: 30 },
    { name: '数据分析', count: 26 },
    { name: 'Node.js', count: 20 },
    { name: 'SQL', count: 25 },
    { name: '云计算', count: 19 },
    { name: 'TypeScript', count: 21 },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">课程分类</h1>
          <Link 
            href="/courses/all" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            浏览全部课程 →
          </Link>
        </div>
        
        {/* 热门分类 */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            热门分类
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(cat => cat.popular).map((category, index) => (
              <Link
                key={index}
                href={`/courses/categories/${category.name}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-start"
              >
                <div className={`p-3 rounded-md ${category.color} mr-4`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    {category.courseCount} 门课程
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 4).map((subcat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
                      >
                        {subcat}
                      </span>
                    ))}
                    {category.subcategories.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                        +{category.subcategories.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 所有分类 */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            所有分类
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md ${category.color} mr-3`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <Link 
                        href={`/courses/categories/${category.name}`}
                        className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {category.name}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {category.courseCount} 门课程
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {category.subcategories.map((subcat, idx) => (
                      <Link
                        key={idx}
                        href={`/courses/categories/${category.name}/${subcat}`}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group"
                      >
                        <ChevronRightIcon className="h-4 w-4 mr-1 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        <span className="text-sm">{subcat}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 热门技能 */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            热门技能
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex flex-wrap gap-3">
              {popularSkills.map((skill, index) => (
                <Link
                  key={index}
                  href={`/courses/skills/${skill.name}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors"
                >
                  {skill.name}
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {skill.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 