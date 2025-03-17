import {
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface LearningGoal {
  id: string;
  title: string;
  deadline: string;
  progress: number;
}

interface DailyTask {
  id: string;
  title: string;
  subject: string;
  duration: number;
  completed: boolean;
  timeSlot: string;
}

interface WeeklyPlan {
  date: string;
  tasks: DailyTask[];
}

async function getLearningPlanData() {
  // 模拟获取学习计划数据
  const goals: LearningGoal[] = [
    {
      id: '1',
      title: '完成人工智能基础课程',
      deadline: '2024-06-30',
      progress: 65,
    },
    {
      id: '2',
      title: 'Python高级开发认证',
      deadline: '2024-08-15',
      progress: 40,
    },
    {
      id: '3',
      title: '数据结构与算法精通',
      deadline: '2024-12-31',
      progress: 25,
    },
  ];

  const weeklyPlan: WeeklyPlan[] = [
    {
      date: '2024-03-18',
      tasks: [
        {
          id: '1',
          title: '神经网络基础学习',
          subject: '人工智能基础',
          duration: 120,
          completed: true,
          timeSlot: '09:00-11:00',
        },
        {
          id: '2',
          title: 'Python装饰器练习',
          subject: 'Python编程',
          duration: 90,
          completed: false,
          timeSlot: '14:00-15:30',
        },
      ],
    },
    {
      date: '2024-03-19',
      tasks: [
        {
          id: '3',
          title: '动态规划专题练习',
          subject: '算法与数据结构',
          duration: 150,
          completed: false,
          timeSlot: '10:00-12:30',
        },
      ],
    },
    // 更多日期...
  ];

  return { goals, weeklyPlan };
}

export default async function LearningPlanPage() {
  const { goals, weeklyPlan } = await getLearningPlanData();

  return (
    <div className="space-y-6">
      {/* 学习目标 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">学习目标</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              添加新目标
            </button>
          </div>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      截止日期: {goal.deadline}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 每周计划 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">本周学习计划</h2>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  重新生成计划
                </button>
              </div>
              <div className="space-y-6">
                {weeklyPlan.map((day) => (
                  <div key={day.date} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      {day.date}
                    </h3>
                    <div className="space-y-4">
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="mr-4">
                              {task.completed ? (
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                              ) : (
                                <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {task.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {task.subject} · {task.timeSlot}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {task.duration}分钟
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 学习建议 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">AI学习建议</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    时间分配建议
                  </h3>
                  <p className="text-sm text-gray-600">
                    建议将更多时间分配给算法练习，这将帮助你更好地理解AI模型的原理。
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    学习方法优化
                  </h3>
                  <p className="text-sm text-gray-600">
                    可以尝试番茄工作法来提高学习效率，每25分钟休息5分钟。
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    近期重点
                  </h3>
                  <p className="text-sm text-gray-600">
                    本周重点关注Python高级特性的学习，为后续的认证考试做准备。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 