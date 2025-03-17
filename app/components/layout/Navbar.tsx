"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  BellIcon, 
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

interface NavbarProps {
  onToggleVoiceAssistant: () => void;
}

export default function Navbar({ onToggleVoiceAssistant }: NavbarProps) {
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(2);

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div className="flex-1 px-4 flex justify-end">
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* 语音助手按钮 */}
          <button
            onClick={onToggleVoiceAssistant}
            className="p-1 rounded-full text-gray-400 hover:text-blue-600 focus:outline-none"
          >
            <MicrophoneIcon className="h-6 w-6" />
          </button>

          {/* 通知按钮 */}
          <Link href="/notifications" className="relative p-1 rounded-full text-gray-400 hover:text-blue-600">
            <BellIcon className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                {unreadNotifications}
              </span>
            )}
          </Link>

          {/* 消息按钮 */}
          <Link href="/messages" className="relative p-1 rounded-full text-gray-400 hover:text-blue-600">
            <ChatBubbleLeftIcon className="h-6 w-6" />
            {unreadMessages > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                {unreadMessages}
              </span>
            )}
          </Link>

          {/* 设置按钮 */}
          <Link href="/settings" className="p-1 rounded-full text-gray-400 hover:text-blue-600">
            <Cog6ToothIcon className="h-6 w-6" />
          </Link>

          {/* 用户头像 */}
          <Link
            href="/profile"
            className="flex items-center"
          >
            <div className="relative">
              <img
                className="h-8 w-8 rounded-full"
                src="/images/avatar.jpg"
                alt="用户头像"
              />
              <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 