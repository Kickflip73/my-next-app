/**
 * 课程服务
 * 处理课程相关的数据请求
 */

import { api } from '@/app/lib/api';
import { Course, CourseFilters, CourseProgress } from '@/app/types/courses';

/**
 * 获取课程列表
 */
export const getCourses = async (filters?: CourseFilters): Promise<Course[]> => {
  try {
    return await api.get<Course[]>('courses', { params: filters as any });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
};

/**
 * 获取单个课程详情
 */
export const getCourseById = async (courseId: string): Promise<Course> => {
  try {
    return await api.get<Course>(`courses/${courseId}`);
  } catch (error) {
    console.error(`Failed to fetch course with ID ${courseId}:`, error);
    throw error;
  }
};

/**
 * 获取推荐课程
 */
export const getRecommendedCourses = async (): Promise<Course[]> => {
  try {
    return await api.get<Course[]>('courses/recommended');
  } catch (error) {
    console.error('Failed to fetch recommended courses:', error);
    throw error;
  }
};

/**
 * 获取用户已报名的课程
 */
export const getEnrolledCourses = async (): Promise<Course[]> => {
  try {
    return await api.get<Course[]>('courses/enrolled');
  } catch (error) {
    console.error('Failed to fetch enrolled courses:', error);
    throw error;
  }
};

/**
 * 报名课程
 */
export const enrollCourse = async (courseId: string): Promise<void> => {
  try {
    await api.post<void>(`courses/${courseId}/enroll`, {});
  } catch (error) {
    console.error(`Failed to enroll in course with ID ${courseId}:`, error);
    throw error;
  }
};

/**
 * 获取课程进度
 */
export const getCourseProgress = async (courseId: string): Promise<CourseProgress> => {
  try {
    return await api.get<CourseProgress>(`courses/${courseId}/progress`);
  } catch (error) {
    console.error(`Failed to fetch progress for course with ID ${courseId}:`, error);
    throw error;
  }
};

/**
 * 更新课程进度
 */
export const updateCourseProgress = async (
  courseId: string,
  lessonId: string,
  completed: boolean
): Promise<CourseProgress> => {
  try {
    return await api.post<CourseProgress>(`courses/${courseId}/progress`, {
      lessonId,
      completed,
    });
  } catch (error) {
    console.error(`Failed to update progress for course with ID ${courseId}:`, error);
    throw error;
  }
};

/**
 * 获取课程评论
 */
export const getCourseReviews = async (courseId: string): Promise<any[]> => {
  try {
    return await api.get<any[]>(`courses/${courseId}/reviews`);
  } catch (error) {
    console.error(`Failed to fetch reviews for course with ID ${courseId}:`, error);
    throw error;
  }
};

/**
 * 提交课程评论
 */
export const submitCourseReview = async (
  courseId: string,
  rating: number,
  comment: string
): Promise<void> => {
  try {
    await api.post<void>(`courses/${courseId}/reviews`, {
      rating,
      comment,
    });
  } catch (error) {
    console.error(`Failed to submit review for course with ID ${courseId}:`, error);
    throw error;
  }
}; 