// 课程相关类型定义

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // 课程时长（分钟）
  instructor: Instructor;
  chapters: Chapter[];
  rating: number;
  totalEnrolled: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  progress?: number; // 用户学习进度 (百分比 0-100)
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: number; // 章节时长（分钟）
  lessons: Lesson[];
  isCompleted?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // 课时时长（分钟）
  videoUrl?: string;
  contentType: 'video' | 'text' | 'quiz';
  content?: string; // 文本内容（如果是text类型）
  isCompleted?: boolean;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[]; // 已完成课时ID
  completedChapters: string[]; // 已完成章节ID
  lastAccessedLessonId: string; // 上次访问的课时ID
  overallProgress: number; // 整体进度 (百分比 0-100)
  startDate: Date;
  lastAccessDate: Date;
}

export interface CourseCardProps {
  course: Course;
  className?: string;
  onClickCard?: (courseId: string) => void;
}

export interface CourseListProps {
  courses: Course[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export interface CourseFiltersProps {
  onFilterChange: (filters: CourseFilters) => void;
  className?: string;
}

export interface CourseFilters {
  search?: string;
  levels?: ('beginner' | 'intermediate' | 'advanced')[];
  tags?: string[];
  duration?: [number, number]; // [min, max] 持续时间范围（分钟）
  rating?: number; // 最低评分
} 