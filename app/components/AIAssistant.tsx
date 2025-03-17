'use client';

import { useState } from 'react';
import { AIService } from '../services/ai';
import { ChatBubbleLeftRightIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await AIService.chat([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI助手错误:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉,我遇到了一些问题。请稍后再试。' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action: 'plan' | 'help' | 'explain') => {
    let response;
    setLoading(true);
    try {
      switch (action) {
        case 'plan':
          response = await AIService.getStudyPlan('编程', '入门');
          break;
        case 'help':
          response = await AIService.getHomeworkHelp('如何理解递归?');
          break;
        case 'explain':
          response = await AIService.getConceptExplanation('机器学习');
          break;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('快捷操作错误:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-[800px] h-[700px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <h3 className="font-medium text-lg">AI学习助手</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg p-4 max-w-[90%] ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-800'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base font-bold mb-2" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-blue-600" {...props} />,
                          blockquote: ({node, ...props}) => (
                            <blockquote className="border-l-4 border-blue-500 pl-4 my-2" {...props} />
                          ),
                          code: ({node, ...props}) => (
                            <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    <span>AI助手正在思考...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => handleQuickAction('plan')}
                className="flex items-center px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              >
                <AcademicCapIcon className="h-4 w-4 mr-2" />
                学习规划
              </button>
              <button
                onClick={() => handleQuickAction('help')}
                className="flex items-center px-4 py-2 text-sm bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                作业帮助
              </button>
              <button
                onClick={() => handleQuickAction('explain')}
                className="flex items-center px-4 py-2 text-sm bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors"
              >
                <LightBulbIcon className="h-4 w-4 mr-2" />
                概念解释
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入你的问题..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                发送
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
} 