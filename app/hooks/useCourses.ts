'use client';

import { useState, useEffect } from 'react';
import { Course, CourseFilters } from '@/app/types/courses';
import * as courseService from '@/app/services/course-service';

/**
 * 获取课程列表的钩子
 */
export function useCourses(initialFilters?: CourseFilters) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CourseFilters | undefined>(initialFilters);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await courseService.getCourses(filters);
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('获取课程失败，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  /**
   * 更新过滤条件
   */
  const updateFilters = (newFilters: CourseFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * 重置过滤条件
   */
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { courses, isLoading, error, filters, updateFilters, resetFilters };
}

/**
 * 获取用户已报名课程的钩子
 */
export function useEnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await courseService.getEnrolledCourses();
        setEnrolledCourses(data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError('获取已报名课程失败，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return { enrolledCourses, isLoading, error };
}

/**
 * 获取单个课程详情的钩子
 */
export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error(`Error fetching course with ID ${courseId}:`, err);
        setError('获取课程详情失败，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  /**
   * 报名课程
   */
  const enrollInCourse = async () => {
    if (!courseId) return;
    
    try {
      await courseService.enrollCourse(courseId);
      // 刷新课程数据
      const refreshedCourse = await courseService.getCourseById(courseId);
      setCourse(refreshedCourse);
      return true;
    } catch (err) {
      console.error(`Error enrolling in course with ID ${courseId}:`, err);
      setError('报名课程失败，请稍后再试');
      return false;
    }
  };

  return { course, isLoading, error, enrollInCourse };
} 