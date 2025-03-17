interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  chapters: Array<{
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }>;
  requirements: string[];
  objectives: string[];
}

async function getCourseDetail(id: string) {
  // 模拟获取课程详情数据
  const courseDetail: CourseDetail = {
    id,
    title: '人工智能基础',
    description: '学习AI的基本概念和应用，包括机器学习、深度学习等核心知识。本课程将带领你深入了解人工智能的基础理论和实践应用。',
    instructor: '张教授',
    thumbnail: '/images/ai-course.jpg',
    progress: 45,
    chapters: [
      { id: '1', title: '人工智能导论', duration: '45分钟', completed: true },
      { id: '2', title: '机器学习基础', duration: '60分钟', completed: true },
      { id: '3', title: '神经网络入门', duration: '90分钟', completed: false },
      { id: '4', title: '深度学习实践', duration: '120分钟', completed: false },
    ],
    requirements: [
      'Python基础编程知识',
      '基础数学和统计学知识',
      '基本的英语阅读能力'
    ],
    objectives: [
      '理解人工智能的核心概念和应用场景',
      '掌握机器学习的基本原理和方法',
      '能够使用Python实现简单的AI模型',
      '了解深度学习的基本架构和应用'
    ]
  };
  return courseDetail;
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourseDetail(params.id);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">课程目标</h2>
                <ul className="space-y-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">课程要求</h2>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">课程进度</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{course.progress}% 完成</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">课程章节</h3>
              <div className="space-y-3">
                {course.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      {chapter.completed ? (
                        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                      )}
                      <span className="text-gray-700">{chapter.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{chapter.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              继续学习
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 