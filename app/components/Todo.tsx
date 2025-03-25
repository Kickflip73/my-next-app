'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrashIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon, 
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import Badge from './ui/Badge';

// 定义任务类型
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: string;
}

// 定义新任务的初始状态
const initialNewTodo: Omit<Todo, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  completed: false,
  priority: 'medium',
  dueDate: ''
};

export default function TodoComponent() {
  // 状态管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState(initialNewTodo);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // 从本地存储加载任务
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error loading todos:', e);
      }
    }
  }, []);

  // 保存任务到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新任务
  const handleAddTodo = () => {
    if (!newTodo.title.trim()) return;

    const currentDate = new Date().toISOString();
    const newTodoItem: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
      createdAt: currentDate
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo(initialNewTodo);
  };

  // 删除任务
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingTodoId === id) {
      setEditingTodoId(null);
      setEditForm(null);
    }
  };

  // 切换任务完成状态
  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 开始编辑任务
  const handleStartEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditForm(todo);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditForm(null);
  };

  // 保存编辑后的任务
  const handleSaveEdit = () => {
    if (!editForm || !editForm.title.trim()) return;

    setTodos(
      todos.map(todo => 
        todo.id === editingTodoId ? editForm : todo
      )
    );
    setEditingTodoId(null);
    setEditForm(null);
  };

  // 处理排序改变
  const handleSortChange = (field: 'dueDate' | 'priority' | 'createdAt') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // 过滤并排序任务
  const filteredAndSortedTodos = React.useMemo(() => {
    let filtered = [...todos];
    
    // 应用过滤器
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
    
    // 应用排序
    return filtered.sort((a, b) => {
      let compareValueA, compareValueB;
      
      if (sortBy === 'dueDate') {
        compareValueA = a.dueDate || '';
        compareValueB = b.dueDate || '';
      } else if (sortBy === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        compareValueA = priorityWeight[a.priority];
        compareValueB = priorityWeight[b.priority];
      } else { // createdAt
        compareValueA = a.createdAt;
        compareValueB = b.createdAt;
      }
      
      if (compareValueA < compareValueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (compareValueA > compareValueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [todos, filter, sortBy, sortDirection]);

  // 获取优先级对应的徽章颜色
  const getPriorityBadgeVariant = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  // 计算到期日状态
  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(0, 0, 0, 0);
    
    const diffTime = dueDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { label: '已过期', variant: 'danger' as const };
    } else if (diffDays === 0) {
      return { label: '今天到期', variant: 'warning' as const };
    } else if (diffDays <= 3) {
      return { label: `${diffDays}天后到期`, variant: 'warning' as const };
    } else {
      return { label: `${diffDays}天后到期`, variant: 'secondary' as const };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">学习任务清单</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            全部
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-3 py-2 rounded-md ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            进行中
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            已完成
          </button>
        </div>
      </div>
      
      {/* 添加新任务表单 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">添加新任务</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              任务标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="输入任务标题"
              value={newTodo.title}
              onChange={e => setNewTodo({...newTodo, title: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              任务描述
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              rows={2}
              placeholder="输入任务描述（可选）"
              value={newTodo.description}
              onChange={e => setNewTodo({...newTodo, description: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                优先级
              </label>
              <select
                id="priority"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={newTodo.priority}
                onChange={e => setNewTodo({...newTodo, priority: e.target.value as 'high' | 'medium' | 'low'})}
              >
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                截止日期
              </label>
              <input
                type="date"
                id="dueDate"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={newTodo.dueDate}
                onChange={e => setNewTodo({...newTodo, dueDate: e.target.value})}
              />
            </div>
          </div>
          
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleAddTodo}
          >
            <PlusIcon className="h-5 w-5" />
            <span>添加任务</span>
          </button>
        </div>
      </div>
      
      {/* 任务列表 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">任务列表</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-sm mr-2">排序: </span>
              <button 
                onClick={() => handleSortChange('createdAt')}
                className={`flex items-center px-2 py-1 rounded text-sm ${sortBy === 'createdAt' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}`}
              >
                创建时间
                {sortBy === 'createdAt' && (
                  sortDirection === 'asc' ? 
                  <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                  <ArrowDownIcon className="h-4 w-4 ml-1" />
                )}
              </button>
              <button 
                onClick={() => handleSortChange('priority')}
                className={`flex items-center px-2 py-1 rounded text-sm ${sortBy === 'priority' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}`}
              >
                优先级
                {sortBy === 'priority' && (
                  sortDirection === 'asc' ? 
                  <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                  <ArrowDownIcon className="h-4 w-4 ml-1" />
                )}
              </button>
              <button 
                onClick={() => handleSortChange('dueDate')}
                className={`flex items-center px-2 py-1 rounded text-sm ${sortBy === 'dueDate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}`}
              >
                到期日
                {sortBy === 'dueDate' && (
                  sortDirection === 'asc' ? 
                  <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                  <ArrowDownIcon className="h-4 w-4 ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {filteredAndSortedTodos.length === 0 ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            暂无任务
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTodos.map(todo => (
              <div 
                key={todo.id} 
                className={`p-4 rounded-lg border ${todo.completed ? 'bg-gray-50 dark:bg-gray-900/20' : 'bg-white dark:bg-gray-800'}`}
              >
                {editingTodoId === todo.id ? (
                  // 编辑模式
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      value={editForm?.title || ''}
                      onChange={e => setEditForm(prev => prev ? {...prev, title: e.target.value} : null)}
                    />
                    
                    <textarea
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      rows={2}
                      value={editForm?.description || ''}
                      onChange={e => setEditForm(prev => prev ? {...prev, description: e.target.value} : null)}
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        value={editForm?.priority || 'medium'}
                        onChange={e => setEditForm(prev => prev ? {...prev, priority: e.target.value as 'high' | 'medium' | 'low'} : null)}
                      >
                        <option value="high">高优先级</option>
                        <option value="medium">中优先级</option>
                        <option value="low">低优先级</option>
                      </select>
                      
                      <input
                        type="date"
                        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        value={editForm?.dueDate || ''}
                        onChange={e => setEditForm(prev => prev ? {...prev, dueDate: e.target.value} : null)}
                      />
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                ) : (
                  // 查看模式
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleComplete(todo.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                            todo.completed 
                              ? 'bg-green-500 border-green-500 flex items-center justify-center' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {todo.completed && <CheckIcon className="h-4 w-4 text-white" />}
                        </button>
                        <div className="space-y-1 flex-1">
                          <h4 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                            {todo.title}
                          </h4>
                          {todo.description && (
                            <p className={`text-sm ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                              {todo.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant={getPriorityBadgeVariant(todo.priority)}>
                              {todo.priority === 'high' ? '高优先级' : todo.priority === 'medium' ? '中优先级' : '低优先级'}
                            </Badge>
                            
                            {todo.dueDate && (
                              <Badge variant={getDueDateStatus(todo.dueDate)?.variant || 'secondary'}>
                                {getDueDateStatus(todo.dueDate)?.label}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 ml-4">
                        <button
                          onClick={() => handleStartEdit(todo)}
                          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      创建时间: {new Date(todo.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 