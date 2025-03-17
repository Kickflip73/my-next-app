interface Assignment {
  id: string;
  title: string;
  description: string;
  courseTitle: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  requirements: string[];
}

async function getAssignmentDetail(id: string) {
  // 模拟获取作业详情数据
  const assignment: Assignment = {
    id,
    title: 'AI模型评估作业',
    description: '本次作业要求学生对所学的机器学习模型进行评估，包括模型性能分析、参数调优等方面。',
    courseTitle: '人工智能基础',
    dueDate: '2024-03-20',
    status: 'pending',
    requirements: [
      '使用Python实现模型评估代码',
      '分析至少三种不同的评估指标',
      '提供详细的评估报告',
      '包含改进建议'
    ]
  };
  return assignment;
}

export default async function AssignmentPage({ params }: { params: { id: string } }) {
  const assignment = await getAssignmentDetail(params.id);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {assignment.status === 'pending' ? '待提交' :
               assignment.status === 'submitted' ? '已提交' : '已批改'}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">课程：{assignment.courseTitle}</span>
              <span>截止日期：{assignment.dueDate}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">作业要求</h2>
            <ul className="space-y-2">
              {assignment.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {assignment.status === 'graded' && (
            <div className="mb-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">评分反馈</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">{assignment.score}/100</span>
                </div>
                <p className="text-gray-600">{assignment.feedback}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            {assignment.status === 'pending' ? (
              <>
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  保存草稿
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  提交作业
                </button>
              </>
            ) : (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                查看提交
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 