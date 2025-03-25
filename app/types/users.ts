// 用户相关类型定义

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  joinedAt: Date;
  lastActive?: Date;
  settings: UserSettings;
}

export interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
}

export interface UserProfile extends User {
  enrolledCourses: number;
  completedCourses: number;
  totalAssignments: number;
  pendingAssignments: number;
  averageScore: number;
  studyTime: number; // 总学习时间（分钟）
  achievements: Achievement[];
  skills: Skill[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Skill {
  name: string;
  level: number; // 1-10
  category: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  avatar?: File;
  settings?: Partial<UserSettings>;
} 