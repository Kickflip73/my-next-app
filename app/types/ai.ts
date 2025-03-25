// AI相关类型定义

export interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

export interface AIAssistantProps {
  className?: string;
}

export interface VoiceAssistantProps {
  className?: string;
  onVoiceInput?: (text: string) => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
} 