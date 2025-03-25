interface AssignmentCardProps {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
}

const AssignmentCard = ({ id, title, dueDate, status, score, feedback }: AssignmentCardProps) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    submitted: 'bg-blue-100 text-blue-800',
    graded: 'bg-green-100 text-green-800',
  };

  const statusText = {
    pending: '待提交',
    submitted: '已提交',
    graded: '已批改',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
          {statusText[status]}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        截止日期: {dueDate}
      </div>
      {status === 'graded' && (
        <div className="mt-3 border-t pt-3">
          <div className="text-sm font-medium text-gray-700">得分: {score}/100</div>
          {feedback && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">AI 反馈:</p>
              <p className="mt-1">{feedback}</p>
            </div>
          )}
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          {status === 'pending' ? '提交作业' : '查看详情'}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard; 