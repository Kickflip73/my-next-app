import Link from 'next/link';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ChartPieIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon },
  { name: '学习进度', href: '/progress', icon: ChartPieIcon },
  { name: '课程资源', href: '/courses', icon: BookOpenIcon },
  { name: '作业批改', href: '/assignments', icon: ClipboardDocumentCheckIcon },
  { name: '学习计划', href: '/learning-plan', icon: CalendarIcon },
  { name: '社交学习圈', href: '/social', icon: UserGroupIcon },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="AI学习平台"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">AI学习平台</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
} 