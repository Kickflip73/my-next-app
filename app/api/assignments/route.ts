import { NextResponse } from 'next/server';

// 模拟数据库数据
const assignments = [
  {
    id: '1',
    title: 'AI模型评估作业',
    dueDate: '2024-03-20',
    status: 'pending',
  },
  {
    id: '2',
    title: '数据预处理实践',
    dueDate: '2024-03-22',
    status: 'submitted',
  },
  {
    id: '3',
    title: '机器学习算法实现',
    dueDate: '2024-03-25',
    status: 'graded',
    score: 92,
    feedback: '整体实现很好，但在模型优化方面还可以进一步改进。建议尝试使用不同的超参数组合来提升模型性能。',
  },
];

export async function GET() {
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(assignments);
} 