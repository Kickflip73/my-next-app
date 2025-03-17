interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  completedCourses: number;
  ongoingCourses: number;
  averageScore: number;
}

async function getUserProfile() {
  // 模拟获取用户数据
  const profile: UserProfile = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '/images/avatar.jpg',
    role: '学生',
    completedCourses: 5,
    ongoingCourses: 3,
    averageScore: 92,
  };
  return profile;
}

export default async function ProfilePage() {
  const profile = await getUserProfile();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {profile.role}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">已完成课程</h3>
          <p className="text-3xl font-bold text-blue-600">{profile.completedCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">进行中课程</h3>
          <p className="text-3xl font-bold text-blue-600">{profile.ongoingCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">平均成绩</h3>
          <p className="text-3xl font-bold text-blue-600">{profile.averageScore}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">学习数据分析</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">学习建议</h3>
            <p className="text-gray-600">
              根据您的学习情况，建议您：
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>增加机器学习相关课程的学习时间</li>
              <li>多参与实践项目，提升动手能力</li>
              <li>建议复习已完成课程中的重点内容</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">近期目标</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Python进阶课程完成度</span>
                  <span className="text-sm font-medium text-gray-700">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">数据结构课程完成度</span>
                  <span className="text-sm font-medium text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 