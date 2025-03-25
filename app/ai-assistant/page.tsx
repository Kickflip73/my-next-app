'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/app/components/layout/AppLayout';
import { PaperAirplaneIcon, ArrowPathIcon, ChatBubbleLeftRightIcon, LightBulbIcon } from '@heroicons/react/24/outline';

// 定义消息类型
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function AIAssistantPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {role: 'assistant', content: '你好！我是你的AI学习助手，基于DeepSeek Reasoner模型提供更深入的学习指导。请随时提问！'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  
  // 使用useEffect确保聊天记录滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading, streamingMessage]);
  
  // 组件卸载时清理EventSource连接
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);
  
  // 流式获取DeepSeek回复（使用Fetch API直接发送POST请求）
  const fetchStreamingResponse = async (messages: Message[]) => {
    // 关闭可能存在的之前的EventSource连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // 清除任何之前的错误信息
    setErrorMessage(null);
    
    try {
      // 准备API请求内容
      const requestBody = {
        messages: [
          // 系统指令，定义AI助手的行为和限制
          { 
            role: 'system', 
            content: '你是一个专业的学习助手，基于DeepSeek Reasoner大模型，帮助用户解答学习中的问题、提供学习建议并制定学习计划。你擅长分析学习难题并提供系统性解决方案。你应当保持友好、专业的态度，提供准确、有帮助的信息。只回答与学习和教育相关的问题，拒绝回答任何违反法律法规或道德标准的内容。' 
          },
          ...messages
        ],
        stream: true
      };
      
      // 初始化流式内容
      setStreamingMessage('');
      
      // 通过fetch发送POST请求并获取流式响应
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      if (!response.body) {
        throw new Error('响应没有body');
      }
      
      // 使用流式响应处理
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          // 流结束，将累积的消息添加到聊天历史
          if (streamingMessage) {
            setChatHistory(prev => [...prev, { role: 'assistant', content: streamingMessage }]);
            setStreamingMessage('');
          }
          setIsLoading(false);
          break;
        }
        
        // 将二进制数据转换为文本
        const chunk = decoder.decode(value, { stream: true });
        
        // 处理SSE格式数据
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            if (line === 'data: [DONE]') {
              // 流结束
              continue;
            }
            
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.content) {
                setStreamingMessage(prev => prev + data.content);
              }
              
              if (data.error) {
                setErrorMessage(data.error);
                setIsLoading(false);
              }
            } catch (e) {
              console.error('解析JSON出错:', e, line);
            }
          }
        }
      }
    } catch (error) {
      console.error('流处理出错:', error);
      setErrorMessage(error instanceof Error ? error.message : '未知错误');
      setIsLoading(false);
      
      // 确保有足够的出错信息反馈给用户
      if (streamingMessage) {
        setChatHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: streamingMessage + '\n\n(连接中断，请稍后再试)' 
          }
        ]);
        setStreamingMessage('');
      } else {
        setChatHistory(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: '抱歉，连接AI服务时出现问题，请稍后再试。' 
          }
        ]);
      }
    }
  };
  
  // 与DeepSeek API交互获取回复（非流式，作为备选方案）
  const fetchDeepSeekResponse = async (messages: Message[]) => {
    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            // 系统指令，定义AI助手的行为和限制
            { 
              role: 'system', 
              content: '你是一个专业的学习助手，基于DeepSeek Reasoner大模型，帮助用户解答学习中的问题、提供学习建议并制定学习计划。你擅长分析学习难题并提供系统性解决方案。你应当保持友好、专业的态度，提供准确、有帮助的信息。只回答与学习和教育相关的问题，拒绝回答任何违反法律法规或道德标准的内容。' 
            },
            ...messages
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      const data = await response.json();
      return data.response || "抱歉，我无法处理您的请求，请稍后再试。";
    } catch (error) {
      console.error('调用DeepSeek API出错:', error);
      return "抱歉，连接AI服务时出现问题，请稍后再试。";
    }
  };
  
  // 发送消息并获取回复
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // 添加用户消息到聊天历史
    const userMessage = {role: 'user' as const, content: message};
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // 清空输入框
    setMessage('');
    
    // 准备发送给API的消息历史，排除初始问候消息
    const apiMessages = chatHistory.length > 1 
      ? chatHistory.slice(1).concat(userMessage) 
      : [userMessage];
    
    try {
      // 使用流式输出
      await fetchStreamingResponse(apiMessages);
    } catch (error) {
      console.error('处理流式输出时出错，尝试使用非流式方式:', error);
      
      // 作为备选，使用非流式接口
      try {
        const aiResponse = await fetchDeepSeekResponse(apiMessages);
        setChatHistory(prev => [...prev, {role: 'assistant', content: aiResponse}]);
      } catch (fallbackError) {
        console.error('备选方案也失败:', fallbackError);
        setChatHistory(prev => [...prev, {
          role: 'assistant', 
          content: '抱歉，我遇到了一些技术问题，无法回答您的问题。请稍后再试。'
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 清空对话
  const handleClearChat = () => {
    // 关闭可能存在的流式连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    setStreamingMessage('');
    setIsLoading(false);
    setErrorMessage(null);
    setChatHistory([{role: 'assistant', content: '你好！我是你的AI学习助手，基于DeepSeek Reasoner模型提供更深入的学习指导。请随时提问！'}]);
  };
  
  // 中断生成
  const handleStopGeneration = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // 如果有流式内容，将其添加到历史
    if (streamingMessage) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: streamingMessage + '(已中断生成)' }]);
      setStreamingMessage('');
    }
    
    setIsLoading(false);
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">AI学习助手</h1>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-indigo-800 text-white rounded-full flex items-center">
                <LightBulbIcon className="h-3 w-3 mr-1" />
                Powered by DeepSeek Reasoner
              </span>
            </div>
            <p className="text-blue-100 mt-2">
              使用先进的推理能力，提供更深入的学习指导和问题解答
            </p>
          </div>
          
          {/* 功能说明 */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-sm text-blue-800 dark:text-blue-200 border-b border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <LightBulbIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <p>
                DeepSeek Reasoner 模型具有更强的推理能力，可以深入思考问题并给出更全面的回答。尝试问一些需要深度思考的学习问题吧！
              </p>
            </div>
          </div>
          
          {/* 错误信息显示 */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-sm text-red-800 dark:text-red-200 border-b border-red-100 dark:border-red-800">
              <div className="flex items-start">
                <svg className="h-5 w-5 mr-2 flex-shrink-0 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>
                  连接错误: {errorMessage}
                </p>
              </div>
            </div>
          )}
          
          {/* 聊天界面 */}
          <div className="flex flex-col h-[450px]">
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto"
            >
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex mb-4 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      chat.role === 'user' 
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded-tr-none' 
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-tl-none'
                    }`}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}
              
              {/* 流式消息显示 */}
              {streamingMessage && (
                <div className="flex mb-4 justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-tl-none">
                    {streamingMessage}
                    <span className="inline-block w-1 h-4 ml-1 bg-gray-500 animate-pulse"></span>
                  </div>
                </div>
              )}
              
              {/* 加载指示器 */}
              {isLoading && !streamingMessage && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 输入区域 */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-end">
                <div className="flex-1 relative">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="输入您的问题..."
                    disabled={isLoading}
                  />
                </div>
                {isLoading ? (
                  <button
                    onClick={handleStopGeneration}
                    className="ml-2 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                    title="停止生成"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <rect x="6" y="6" width="8" height="8" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    className={`ml-2 p-2 rounded-full ${
                      message.trim() && !isLoading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  按 Enter 发送消息，Shift + Enter 换行
                </p>
                <button 
                  onClick={handleClearChat}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                >
                  <ArrowPathIcon className="h-3 w-3 mr-1" />
                  清空对话
                </button>
              </div>
            </div>
          </div>
          
          {/* 建议问题 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              试试这些需要深度思考的问题：
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "如何建立有效的知识结构来学习一个新领域？",
                "请分析不同学习方法的优缺点及适用场景",
                "如何克服学习中的认知偏差？",
                "设计一个机器学习算法学习路线，包括必要的数学基础"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(question);
                  }}
                  className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/50"
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 