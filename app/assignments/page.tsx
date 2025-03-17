import AssignmentCard from '../components/AssignmentCard';

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
}

async function getAllAssignments() {
  const res = await fetch('http://localhost:3000/api/assignments', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('获取作业数据失败');
  }
  return res.json() as Promise<Assignment[]>;
}

export default async function AssignmentsPage() {
  const assignments = await getAllAssignments();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">作业管理</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">全部作业</option>
              <option value="pending">待提交</option>
              <option value="submitted">已提交</option>
              <option value="graded">已批改</option>
            </select>
            <input
              type="text"
              placeholder="搜索作业..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} {...assignment} />
        ))}
      </div>
    </div>
  );
} 