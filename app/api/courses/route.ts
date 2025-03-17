import { NextResponse } from 'next/server';

// 模拟数据库数据
const courses = [
  {
    id: '1',
    title: '人工智能基础',
    description: '学习AI的基本概念和应用，包括机器学习、深度学习等核心知识。',
    instructor: '张教授',
    thumbnail: '/images/ai-course.jpg',
    progress: 45,
  },
  {
    id: '2',
    title: '数据科学入门',
    description: '掌握数据分析、可视化和统计学基础知识，为AI学习打下基础。',
    instructor: '李教授',
    thumbnail: '/images/data-science.jpg',
    progress: 30,
  },
  {
    id: '3',
    title: 'Python编程基础',
    description: '学习Python编程语言，为AI和数据科学学习做准备。',
    instructor: '王教授',
    thumbnail: '/images/python.jpg',
    progress: 60,
  },
];

export async function GET() {
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(courses);
} 