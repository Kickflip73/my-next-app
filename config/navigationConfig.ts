/**
 * 导航配置
 */
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ChartPieIcon,
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CogIcon,
  UserIcon,
  BellIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  active?: boolean;
  children?: NavigationItem[];
  requireAuth?: boolean;
  requiredRole?: 'student' | 'instructor' | 'admin';
}

/**
 * 主导航菜单
 */
export const mainNavigation: NavigationItem[] = [
  {
    name: '首页',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: '学习中心',
    href: '/learning',
    icon: AcademicCapIcon,
    children: [
      { name: '我的课程', href: '/learning/courses', icon: BookOpenIcon },
      { name: '学习进度', href: '/learning/progress', icon: ChartPieIcon },
      { name: '学习计划', href: '/learning/plans', icon: CalendarIcon },
      { name: '学习笔记', href: '/learning/notes', icon: DocumentTextIcon },
      { name: '任务清单', href: '/todos', icon: CheckCircleIcon },
    ],
  },
  {
    name: '课程资源',
    href: '/courses',
    icon: BookOpenIcon,
    children: [
      { name: '推荐课程', href: '/courses/recommended', icon: BookOpenIcon },
      { name: '全部课程', href: '/courses/all', icon: BookOpenIcon },
      { name: '课程分类', href: '/courses/categories', icon: BookOpenIcon },
    ],
  },
  {
    name: '作业批改',
    href: '/assignments',
    icon: ClipboardDocumentCheckIcon,
    requireAuth: true,
  },
  {
    name: '社区',
    href: '/community',
    icon: UserGroupIcon,
    children: [
      { name: '学习圈子', href: '/community/circles', icon: UserGroupIcon },
      { name: '讨论区', href: '/community/discussions', icon: ChatBubbleLeftRightIcon },
      { name: '学习伙伴', href: '/community/partners', icon: UserIcon },
    ],
  },
  {
    name: '个人中心',
    href: '/profile',
    icon: UserIcon,
    requireAuth: true,
    children: [
      { name: '个人资料', href: '/profile/info', icon: UserIcon },
      { name: '消息通知', href: '/profile/notifications', icon: BellIcon },
      { name: '账户设置', href: '/profile/settings', icon: CogIcon },
    ],
  },
];

/**
 * 用户菜单
 */
export const userNavigation: NavigationItem[] = [
  {
    name: '个人资料',
    href: '/profile',
    icon: UserIcon,
    requireAuth: true,
  },
  {
    name: '账户设置',
    href: '/profile/settings',
    icon: Cog6ToothIcon,
    requireAuth: true,
  },
  {
    name: '通知',
    href: '/notifications',
    icon: BellIcon,
    requireAuth: true,
  },
  {
    name: '学习时间',
    href: '/study-time',
    icon: ClockIcon,
    requireAuth: true,
  },
  {
    name: '成就',
    href: '/profile/achievements',
    icon: RocketLaunchIcon,
    requireAuth: true,
  },
];

/**
 * 移动端底部导航
 */
export const mobileNavigation: NavigationItem[] = [
  {
    name: '首页',
    href: '/',
    icon: ChartBarIcon,
  },
  {
    name: '课程',
    href: '/courses',
    icon: BookOpenIcon,
  },
  {
    name: '作业',
    href: '/assignments',
    icon: ClipboardDocumentCheckIcon,
    requireAuth: true,
  },
  {
    name: '社区',
    href: '/community',
    icon: UserGroupIcon,
    requireAuth: true,
  },
  {
    name: '我的',
    href: '/profile',
    icon: UserIcon,
    requireAuth: true,
  },
]; 