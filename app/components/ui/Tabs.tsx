'use client';

import React, { useState } from 'react';

interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  type?: 'line' | 'card' | 'segment';
  className?: string;
  tabBarClassName?: string;
  tabPanelClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
  type = 'line',
  className = '',
  tabBarClassName = '',
  tabPanelClassName = '',
}) => {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || (items.length > 0 ? items[0].key : '')
  );

  const handleTabClick = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key);
      onChange?.(key);
    }
  };

  const getTabBarClass = () => {
    const baseClass = 'flex border-b border-gray-200 mb-4';
    
    switch (type) {
      case 'card':
        return `${baseClass} gap-1 ${tabBarClassName}`;
      case 'segment':
        return `inline-flex p-1 bg-gray-100 rounded-lg ${tabBarClassName}`;
      case 'line':
      default:
        return `${baseClass} ${tabBarClassName}`;
    }
  };

  const getTabClass = (item: TabItem) => {
    const isActive = activeKey === item.key;
    const isDisabled = item.disabled;
    
    if (isDisabled) {
      return 'px-4 py-2 text-gray-400 cursor-not-allowed';
    }
    
    switch (type) {
      case 'card':
        return isActive
          ? 'px-4 py-2 bg-white border-t border-l border-r border-gray-200 rounded-t-lg text-blue-600'
          : 'px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-lg';
      case 'segment':
        return isActive
          ? 'px-4 py-2 bg-white rounded-md shadow-sm text-blue-600'
          : 'px-4 py-2 hover:bg-gray-200 rounded-md';
      case 'line':
      default:
        return isActive
          ? 'px-4 py-2 border-b-2 border-blue-500 -mb-px text-blue-600'
          : 'px-4 py-2 hover:text-blue-500';
    }
  };

  const getActiveContent = () => {
    const activeItem = items.find(item => item.key === activeKey);
    return activeItem ? activeItem.content : null;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={getTabBarClass()}>
        {items.map(item => (
          <button
            key={item.key}
            className={getTabClass(item)}
            onClick={() => !item.disabled && handleTabClick(item.key)}
            disabled={item.disabled}
            role="tab"
            aria-selected={activeKey === item.key}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={`tab-content ${tabPanelClassName}`} role="tabpanel">
        {getActiveContent()}
      </div>
    </div>
  );
};

export default Tabs; 