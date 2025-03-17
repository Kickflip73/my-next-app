import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  topics: number;
  category: string;
  avatar: string;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  time: string;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  studyHours: number;
  streak: number;
}

async function getSocialData() {
  // 模拟获取社交数据
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'AI学习小组',
      description: '讨论人工智能最新技术和学习经验',
      members: 128,
      topics: 56,
      category: '人工智能',
      avatar: '/images/ai-group.jpg',
    },
    {
      id: '2',
      name: 'Python进阶群',
      description: '分享Python高级特性和实战经验',
      members: 256,
      topics: 89,
      category: '编程开发',
      avatar: '/images/python-group.jpg',
    },
    {
      id: '3',
      name: '算法刷题群',
      description: '一起刷题，提高算法能力',
      members: 180,
      topics: 120,
      category: '算法',
      avatar: '/images/algo-group.jpg',
    },
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: '如何高效学习机器学习？',
      author: {
        name: '张三',
        avatar: '/images/avatar1.jpg',
      },
      content: '最近开始学习机器学习，想请教大家有什么好的学习方法和资源推荐...',
      likes: 24,
      comments: 12,
      time: '2小时前',
    },
    {
      id: '2',
      title: '分享一个有趣的Python项目',
      author: {
        name: '李四',
        avatar: '/images/avatar2.jpg',
      },
      content: '最近做了一个基于Python的自动化工具，可以帮助大家提高学习效率...',
      likes: 36,
      comments: 18,
      time: '4小时前',
    },
  ];

  const leaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      name: '王五',
      avatar: '/images/avatar3.jpg',
      score: 98,
      studyHours: 120,
      streak: 30,
    },
    {
      rank: 2,
      name: '赵六',
      avatar: '/images/avatar4.jpg',
      score: 95,
      studyHours: 110,
      streak: 28,
    },
    {
      rank: 3,
      name: '孙七',
      avatar: '/images/avatar5.jpg',
      score: 92,
      studyHours: 105,
      streak: 25,
    },
  ];

  return { studyGroups, discussions, leaderboard };
}

export default async function SocialPage() {
  const { studyGroups, discussions, leaderboard } = await getSocialData();

  return (
    <div className="space-y-6">
      {/* 学习圈列表 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">学习圈</h2>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <PlusIcon className="h-5 w-5 mr-1" />
              创建学习圈
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{group.name}</h3>
                    <span className="text-sm text-gray-500">{group.category}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{group.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{group.members} 成员</span>
                  <span>{group.topics} 话题</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 讨论区 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">最新讨论</h2>
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <img
                        src={discussion.author.avatar}
                        alt={discussion.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900">
                          {discussion.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {discussion.author.name} · {discussion.time}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          {discussion.content}
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>{discussion.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1">
                            <ChatBubbleLeftRightIcon className="h-4 w-4" />
                            <span>{discussion.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 排行榜 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <TrophyIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">学习排行榜</h2>
              </div>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <span className={`text-lg font-bold ${
                      user.rank === 1 ? 'text-yellow-500' :
                      user.rank === 2 ? 'text-gray-400' :
                      'text-yellow-700'
                    }`}>
                      #{user.rank}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">
                        学习时长: {user.studyHours}h · 连续: {user.streak}天
                      </p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">
                      {user.score}
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