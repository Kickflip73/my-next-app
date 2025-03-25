/**
 * 工具函数库
 */

/**
 * 将日期格式化为易读形式
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 将日期格式化为相对时间（如：3分钟前、2小时前、昨天等）
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return '昨天';
  }
  
  if (diffInDays < 7) {
    return `${diffInDays}天前`;
  }
  
  // 如果超过一周，则显示具体日期
  return formatDate(date);
}

/**
 * 格式化课程时长（将分钟转换为小时和分钟）
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}小时`;
  }
  
  return `${hours}小时${remainingMinutes}分钟`;
}

/**
 * 格式化课程难度级别
 */
export function formatCourseLevel(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const levelMap = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
  };
  
  return levelMap[level] || '未知';
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 生成随机ID
 */
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 截断文本（如果超过指定长度则添加省略号）
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 从URL字符串中提取视频ID（支持YouTube和Bilibili）
 */
export function extractVideoId(url: string): { platform: string; id: string } | null {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  
  if (youtubeMatch && youtubeMatch[1]) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }
  
  // Bilibili
  const bilibiliRegex = /(?:bilibili\.com\/video\/)([a-zA-Z0-9]+)/;
  const bilibiliMatch = url.match(bilibiliRegex);
  
  if (bilibiliMatch && bilibiliMatch[1]) {
    return { platform: 'bilibili', id: bilibiliMatch[1] };
  }
  
  return null;
}

/**
 * 检查值是否是对象
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 深度合并对象
 * 简化版本，避免TypeScript泛型索引错误
 */
export function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
} 