"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
  pending?: boolean;
}

const CHAT_HISTORY_KEY = 'chat_history';
const MAX_HISTORY_LENGTH = 50; // 限制保存最近的50条消息

// 添加窗口大小的本地存储键
const CHAT_WINDOW_SIZE_KEY = 'chat_window_size';

// 默认窗口大小
const DEFAULT_WINDOW_SIZE = {
  width: 600,
  height: 700
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState(DEFAULT_WINDOW_SIZE);
  const [isResizing, setIsResizing] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 从localStorage加载聊天历史
  useEffect(() => {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(parsedHistory);
      } catch (error) {
        console.error('Error loading chat history:', error);
        // 如果加载失败，设置默认欢迎消息
        setMessages([{
          id: 1,
          content: "你好！我是你的AI学习助手。有什么我可以帮你的吗？",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        }]);
      }
    } else {
      // 如果没有历史记录，设置默认欢迎消息
      setMessages([{
        id: 1,
        content: "你好！我是你的AI学习助手。有什么我可以帮你的吗？",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  }, []);

  // 保存聊天历史到localStorage
  useEffect(() => {
    if (messages.length > 0) {
      // 只保存最近的消息
      const historyToSave = messages.slice(-MAX_HISTORY_LENGTH);
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(historyToSave));
    }
  }, [messages]);

  // 加载保存的窗口大小
  useEffect(() => {
    const savedSize = localStorage.getItem(CHAT_WINDOW_SIZE_KEY);
    if (savedSize) {
      try {
        const parsedSize = JSON.parse(savedSize);
        setWindowSize(parsedSize);
      } catch (error) {
        console.error('Error loading window size:', error);
      }
    }
  }, []);

  // 保存窗口大小
  useEffect(() => {
    localStorage.setItem(CHAT_WINDOW_SIZE_KEY, JSON.stringify(windowSize));
  }, [windowSize]);

  // 清除聊天历史的函数
  const clearChatHistory = () => {
    const confirmClear = window.confirm('确定要清除所有聊天记录吗？');
    if (confirmClear) {
      localStorage.removeItem(CHAT_HISTORY_KEY);
      setMessages([{
        id: 1,
        content: "你好！我是你的AI学习助手。有什么我可以帮你的吗？",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  };

  const navigation = [
    { name: '首页', href: '/', icon: HomeIcon },
    { name: '课程学习', href: '/courses', icon: BookOpenIcon },
    { name: '学习圈子', href: '/social', icon: UserGroupIcon },
    { name: '消息中心', href: '/messages', icon: ChatBubbleLeftIcon },
    { name: '通知中心', href: '/notifications', icon: BellIcon },
    { name: '设置', href: '/settings', icon: Cog6ToothIcon },
  ];

  // 将消息历史转换为API所需的格式
  const getMessageHistory = (messages: Message[]) => {
    return messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    const aiMessage: Message = {
      id: messages.length + 2,
      content: "",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      pending: true,
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          history: getMessageHistory(messages)
        }),
      });

      if (!response.ok) {
        throw new Error('API请求失败');
      }

      if (!response.body) {
        throw new Error('没有响应数据');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        accumulatedContent += text;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (!lastMessage.isUser) {
            lastMessage.content = accumulatedContent;
          }
          return newMessages;
        });
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage.isUser) {
          lastMessage.pending = false;
        }
        return newMessages;
      });

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage.isUser) {
          lastMessage.content = "抱歉，发生了一些错误。请稍后再试。";
          lastMessage.pending = false;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 监听消息变化，自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理拖拽调整大小
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    // 记录初始位置和大小
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      // 计算鼠标移动的距离（向左/向上为正，向右/向下为负）
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // 计算新的宽度和高度（向左/向上拖动时增加大小）
      const newWidth = Math.min(
        Math.max(400, startWidth - deltaX),
        window.innerWidth - 40
      );
      const newHeight = Math.min(
        Math.max(500, startHeight - deltaY),
        window.innerHeight - 40
      );

      setWindowSize({
        width: newWidth,
        height: newHeight
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden px-4 inline-flex items-center"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">学习平台</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="ml-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://placehold.co/100x100/4F46E5/ffffff?text=U"
                  alt="用户头像"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'} bg-white w-64 min-h-screen fixed md:relative shadow-sm`}>
          <div className="p-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1">
          <main className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>

        {/* AI助手聊天窗口 */}
        <div className="fixed bottom-4 right-4 z-50">
          {!chatOpen ? (
            <button
              onClick={() => setChatOpen(true)}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
            </button>
          ) : (
            <div
              ref={chatWindowRef}
              className="bg-white rounded-lg shadow-xl flex flex-col fixed"
              style={{
                width: `${windowSize.width}px`,
                height: `${windowSize.height}px`,
                right: '16px',
                bottom: '16px',
                overflow: 'hidden'
              }}
            >
              {/* 拖拽调整大小的句柄 - 左上角 */}
              <div
                className="absolute top-0 left-0 w-8 h-8 cursor-nw-resize z-[60] group"
                onMouseDown={handleMouseDown}
                style={{
                  background: 'linear-gradient(135deg, #CBD5E0 50%, transparent 50%)',
                }}
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
              </div>

              {/* 聊天窗口头部 */}
              <div className="p-6 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                  <h3 className="text-xl font-medium">AI学习助手</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearChatHistory}
                    className="text-white hover:text-gray-200 transition-colors text-sm px-3 py-1 rounded border border-white/30 hover:border-white/50"
                  >
                    清除记录
                  </button>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* 聊天消息区域 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" id="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.isUser ? (
                        <p className="text-base leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      ) : (
                        <div className="markdown-body">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
                              h4: ({node, ...props}) => <h4 className="text-base font-bold my-2" {...props} />,
                              p: ({node, ...props}) => <p className="my-2 leading-relaxed" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc list-inside my-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2" {...props} />,
                              li: ({node, ...props}) => <li className="my-1" {...props} />,
                              code: ({node, inline, ...props}) => 
                                inline ? (
                                  <code className="bg-gray-200 px-1 rounded" {...props} />
                                ) : (
                                  <code className="block bg-gray-200 p-2 rounded my-2 overflow-x-auto" {...props} />
                                ),
                              blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-4 border-gray-300 pl-4 my-2" {...props} />
                              ),
                              a: ({node, ...props}) => (
                                <a className="text-blue-600 hover:underline" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                          {message.pending && (
                            <span className="inline-block ml-1">
                              <span className="animate-pulse">▊</span>
                            </span>
                          )}
                        </div>
                      )}
                      <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="输入你的问题..."
                    disabled={isLoading}
                    className="flex-1 border rounded-xl px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span>{isLoading ? '发送中...' : '发送'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 