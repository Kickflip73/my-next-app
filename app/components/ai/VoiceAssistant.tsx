"use client";

import { useState } from 'react';
import { XMarkIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';

interface VoiceAssistantProps {
  onClose: () => void;
}

export default function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; text: string }>>([]);

  const handleStartListening = () => {
    setIsListening(true);
    // TODO: 实现语音识别功能
  };

  const handleStopListening = () => {
    setIsListening(false);
    // 模拟语音识别结果
    const newMessage = { type: 'user' as const, text: '请帮我查看今天的学习计划' };
    setMessages([...messages, newMessage]);
    
    // 模拟AI助手回复
    setTimeout(() => {
      const response = { 
        type: 'assistant' as const, 
        text: '今天的学习计划包括：\n1. 完成人工智能基础课程第三章\n2. 提交数据结构作业\n3. 参加Python编程在线讨论' 
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">AI语音助手</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
            isListening
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {isListening ? (
            <>
              <StopIcon className="h-5 w-5" />
              <span>停止录音</span>
            </>
          ) : (
            <>
              <MicrophoneIcon className="h-5 w-5" />
              <span>开始说话</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 