import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import TodoComponent from '../components/Todo';

export const metadata = {
  title: '学习任务管理 | 在线学习平台',
  description: '管理您的学习任务，提高学习效率',
};

export default function TodoPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <TodoComponent />
        </div>
      </div>
    </AppLayout>
  );
} 