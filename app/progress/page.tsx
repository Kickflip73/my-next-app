import {
  AcademicCapIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

interface SubjectProgress {
  subject: string;
  progress: number;
  score: number;
  weakPoints: string[];
  strongPoints: string[];
}

interface StudyData {
  weeklyHours: number[];
  subjects: SubjectProgress[];
  totalProgress: number;
  averageScore: number;
  studyStreak: number;
  aiSuggestions: string[];
}

async function getStudyData() {
  // 模拟获取学习数据
  const data: StudyData = {
    weeklyHours: [12, 15, 10, 18, 20, 16, 14],
    subjects: [
      {
        subject: '人工智能基础',
        progress: 75,
        score: 88,
        weakPoints: ['神经网络优化', '模型评估方法'],
        strongPoints: ['机器学习基础', '数据预处理'],
      },
      {
        subject: 'Python编程',
        progress: 90,
        score: 92,
        weakPoints: ['高级装饰器', '元类编程'],
        strongPoints: ['基础语法', '面向对象编程', '数据结构'],
      },
      {
        subject: '数据结构与算法',
        progress: 60,
        score: 85,
        weakPoints: ['平衡树', '动态规划'],
        strongPoints: ['排序算法', '基础数据结构'],
      },
    ],
    totalProgress: 75,
    averageScore: 88.3,
    studyStreak: 15,
    aiSuggestions: [
      '建议增加神经网络优化相关练习',
      '可以尝试完成更多动态规划题目来提升算法能力',
      '建议复习已完成的Python基础知识，准备进阶学习',
    ],
  };
  return data;
}

export default async function ProgressPage() {
  const data = await getStudyData();

  return (
    <div className="space-y-6">
      {/* 总体进度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-12 w-12 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">总体进度</h3>
              <p className="text-3xl font-bold text-blue-600">{data.totalProgress}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AcademicCapIcon className="h-12 w-12 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">平均分数</h3>
              <p className="text-3xl font-bold text-green-600">{data.averageScore}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ClockIcon className="h-12 w-12 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">本周学习</h3>
              <p className="text-3xl font-bold text-yellow-600">{data.weeklyHours[6]}h</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BookOpenIcon className="h-12 w-12 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">连续学习</h3>
              <p className="text-3xl font-bold text-purple-600">{data.studyStreak}天</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 科目进度详情 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">科目学习进度</h2>
              <div className="space-y-6">
                {data.subjects.map((subject) => (
                  <div key={subject.subject} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-medium text-gray-900">
                        {subject.subject}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">
                        得分: {subject.score}
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            进度: {subject.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${subject.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">需要提升</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {subject.weakPoints.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">已掌握</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {subject.strongPoints.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI 学习建议 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">AI学习建议</h2>
              </div>
              <div className="space-y-4">
                {data.aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 每周学习时长趋势 */}
          <div className="bg-white rounded-lg shadow mt-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">周学习时长</h2>
              <div className="h-48 flex items-end justify-between">
                {data.weeklyHours.map((hours, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-blue-600 rounded-t"
                      style={{ height: `${(hours / 20) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['一', '二', '三', '四', '五', '六', '日'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 