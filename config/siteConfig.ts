/**
 * 站点配置
 */

export const siteConfig = {
  name: '智能学习平台',
  description: '一个现代化的在线学习平台',
  url: 'https://learning-platform.example.com',
  ogImage: 'https://learning-platform.example.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/learning-platform',
    github: 'https://github.com/learning-platform',
  },
  contactEmail: 'support@learning-platform.example.com',
};

/**
 * 主题配置
 */
export const themeConfig = {
  primaryColor: '#2563eb', // 蓝色
  secondaryColor: '#16a34a', // 绿色
  accentColor: '#9333ea', // 紫色
  warningColor: '#f59e0b', // 黄色
  dangerColor: '#dc2626', // 红色
  textColor: '#1f2937', // 深灰色
  backgroundColor: '#f9fafb', // 浅灰色
  darkMode: {
    primaryColor: '#3b82f6',
    secondaryColor: '#22c55e',
    accentColor: '#a855f7',
    warningColor: '#f97316',
    dangerColor: '#ef4444',
    textColor: '#f9fafb',
    backgroundColor: '#111827',
  },
};

/**
 * 平台功能配置
 */
export const featureConfig = {
  aiAssistant: true,
  voiceAssistant: true,
  socialLearning: true,
  gamification: true,
  certificates: true,
  quiz: true,
  discussion: true,
  codePlayground: true,
  liveSessions: false, // 未实现的功能
  mobileLearning: true,
  offlineAccess: false, // 未实现的功能
};

/**
 * 支持的语言配置
 */
export const languageConfig = {
  default: 'zh',
  supported: ['zh', 'en', 'ja', 'ko'],
  languageNames: {
    zh: '中文',
    en: 'English',
    ja: '日本語',
    ko: '한국어',
  },
};

/**
 * 分析工具配置
 */
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  enableAnalytics: process.env.NODE_ENV === 'production',
}; 