import {
  AcademicCapIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import MainLayout from './components/layout/MainLayout'

interface DashboardStats {
  totalProgress: number;
  completedCourses: number;
  upcomingTasks: number;
  studyHours: number;
}

interface RecommendedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress?: number;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  type: 'assignment' | 'exam' | 'course';
  priority: 'high' | 'medium' | 'low';
}

async function getDashboardData() {
  // 模拟获取仪表盘数据
  const stats: DashboardStats = {
    totalProgress: 68,
    completedCourses: 12,
    upcomingTasks: 5,
    studyHours: 156,
  };

  const recommendedCourses: RecommendedCourse[] = [
    {
      id: '1',
      title: '深度学习实战',
      description: '从理论到实践，掌握深度学习的核心概念和应用',
      thumbnail: 'https://placehold.co/600x400/2563eb/ffffff?text=深度学习实战',
    },
    {
      id: '2',
      title: '数据可视化技巧',
      description: '学习使用Python和JavaScript创建引人注目的数据可视化',
      thumbnail: 'https://placehold.co/600x400/16a34a/ffffff?text=数据可视化',
    },
  ];

  const upcomingTasks: Task[] = [
    {
      id: '1',
      title: '机器学习模型评估作业',
      dueDate: '2024-03-20',
      type: 'assignment',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Python期中考试',
      dueDate: '2024-03-25',
      type: 'exam',
      priority: 'high',
    },
    {
      id: '3',
      title: '完成数据结构课程第5章',
      dueDate: '2024-03-22',
      type: 'course',
      priority: 'medium',
    },
  ];

  return { stats, recommendedCourses, upcomingTasks };
}

export default async function Home() {
  const { stats, recommendedCourses, upcomingTasks } = await getDashboardData();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/progress" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-12 w-12 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">总体进度</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalProgress}%</p>
              </div>
            </div>
          </Link>
          <Link href="/courses/completed" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-12 w-12 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">已完成课程</h3>
                <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
              </div>
            </div>
          </Link>
          <Link href="/tasks" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-12 w-12 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">待完成任务</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.upcomingTasks}</p>
              </div>
            </div>
          </Link>
          <Link href="/study-time" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpenIcon className="h-12 w-12 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">总学习时长</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.studyHours}h</p>
              </div>
            </div>
          </Link>
        </div>

        {/* 快速导航区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/courses" className="card p-6 flex flex-col items-start">
            <BookOpenIcon className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">课程学习</h3>
            <p className="text-gray-600">探索丰富的课程资源</p>
          </Link>

          <Link href="/social" className="card p-6 flex flex-col items-start">
            <UserGroupIcon className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">学习圈子</h3>
            <p className="text-gray-600">加入志同道合的学习伙伴</p>
          </Link>

          <Link href="/practice" className="card p-6 flex flex-col items-start">
            <AcademicCapIcon className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">实战演练</h3>
            <p className="text-gray-600">在实践中提升技能</p>
          </Link>

          <Link href="/resources" className="card p-6 flex flex-col items-start">
            <DocumentTextIcon className="h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">学习资源</h3>
            <p className="text-gray-600">获取优质学习材料</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 待办任务 */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">待办任务</h2>
                <Link href="/tasks" className="text-sm text-blue-600 hover:text-blue-800">
                  查看全部
                </Link>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/${task.type}s/${task.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full mr-3 ${
                              task.priority === 'high'
                                ? 'bg-red-500'
                                : task.priority === 'medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              截止日期: {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-blue-600 hover:text-blue-800">
                          查看详情 →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 推荐课程 */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">推荐课程</h2>
                <Link href="/courses/recommended" className="text-sm text-blue-600 hover:text-blue-800">
                  更多推荐
                </Link>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block group"
                    >
                      <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {course.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
