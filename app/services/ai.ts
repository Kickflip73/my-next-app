import { ChatCompletionRequestMessage } from './types';

// API配置
const API_CONFIG = {
  key: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || 'sk-ec93fcd5dc7043259a46efcd4ea614e1',
  baseUrl: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  maxRetries: 3,
  retryDelay: 1000,
};

export class AIService {
  private static async makeRequest(url: string, options: RequestInit, retryCount = 0) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 402) {
        throw new Error('API 密钥无效或余额不足，请检查您的 API 密钥配置。');
      }

      if (!response.ok) {
        if (retryCount < API_CONFIG.maxRetries) {
          // 延迟重试
          await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
          return this.makeRequest(url, options, retryCount + 1);
        }
        throw new Error(`API请求失败: ${response.status} - ${await response.text()}`);
      }

      return response.json();
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  static async chat(messages: ChatCompletionRequestMessage[]) {
    try {
      const response = await this.makeRequest(
        `${API_CONFIG.baseUrl}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.key}`,
          },
          body: JSON.stringify({
            model: API_CONFIG.model,
            messages,
            temperature: 0.7,
            max_tokens: 2000,
          }),
        }
      );

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI服务错误:', error);
      if (error instanceof Error) {
        if (error.message.includes('API 密钥无效')) {
          return '抱歉，AI服务暂时不可用。请联系管理员检查API密钥配置。';
        }
      }
      return '抱歉，服务出现了问题。请稍后再试。';
    }
  }

  static async getStudyPlan(subject: string, level: string) {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的学习规划师,根据学生的需求提供个性化的学习计划。'
      },
      {
        role: 'user',
        content: `请为我制定一个${subject}的学习计划,我目前的水平是${level}。请提供详细的学习路线、推荐资源和时间规划。`
      }
    ];
    return this.chat(messages);
  }

  static async getHomeworkHelp(question: string) {
    const messages = [
      {
        role: 'system',
        content: '你是一个耐心的助教,帮助学生解决学习中遇到的问题。'
      },
      {
        role: 'user',
        content: `我在做作业时遇到了这个问题:${question},能帮我分析一下吗?`
      }
    ];
    return this.chat(messages);
  }

  static async getConceptExplanation(concept: string) {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的知识讲解者,擅长用通俗易懂的方式解释复杂概念。'
      },
      {
        role: 'user',
        content: `请帮我解释这个概念:${concept},尽量用简单的语言和例子。`
      }
    ];
    return this.chat(messages);
  }
} 