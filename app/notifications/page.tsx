import {
  AcademicCapIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'assignment' | 'course' | 'social' | 'system' | 'reminder';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

async function getNotifications() {
  // 模拟获取通知数据
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'assignment',
      title: '新作业提醒',
      description: '《人工智能基础》课程发布了新的作业：神经网络模型设计',
      time: '10分钟前',
      read: false,
      link: '/assignments/1',
    },
    {
      id: '2',
      type: 'course',
      title: '课程更新',
      description: '您关注的《Python高级编程》课程更新了新的章节',
      time: '1小时前',
      read: false,
      link: '/courses/2',
    },
    {
      id: '3',
      type: 'social',
      title: '讨论回复',
      description: '有人回复了您在"AI学习小组"中的问题',
      time: '2小时前',
      read: true,
      link: '/social/discussions/3',
    },
    {
      id: '4',
      type: 'reminder',
      title: '学习提醒',
      description: '今天的学习计划还未完成，距离截止还有2小时',
      time: '3小时前',
      read: true,
      link: '/learning-plan',
    },
    {
      id: '5',
      type: 'system',
      title: '系统通知',
      description: '平台将于今晚24:00-次日02:00进行系统维护',
      time: '5小时前',
      read: true,
    },
  ];

  return notifications;
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return <AcademicCapIcon className="h-6 w-6 text-blue-500" />;
      case 'course':
        return <ClockIcon className="h-6 w-6 text-green-500" />;
      case 'social':
        return <ChatBubbleLeftIcon className="h-6 w-6 text-purple-500" />;
      case 'system':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'reminder':
        return <BellIcon className="h-6 w-6 text-red-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">通知中心</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              全部标记为已读
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg ${
                  notification.read ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.description}
                  </p>
                  {notification.link && (
                    <a
                      href={notification.link}
                      className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800"
                    >
                      查看详情
                    </a>
                  )}
                </div>
                {!notification.read && (
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 