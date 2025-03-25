/**
 * AI服务
 * 处理与AI相关的请求
 */

import { api } from '@/app/lib/api';
import { AIResponse, ChatCompletionRequestMessage } from '@/app/types/ai';

/**
 * 发送聊天请求到AI服务
 */
export const sendChatCompletion = async (
  messages: ChatCompletionRequestMessage[]
): Promise<AIResponse> => {
  try {
    return await api.post<AIResponse>('chat', { messages });
  } catch (error) {
    console.error('Failed to get chat completion:', error);
    throw error;
  }
};

/**
 * 获取学习建议
 */
export const getLearningRecommendations = async (
  userId: string,
  context?: string
): Promise<any> => {
  try {
    return await api.post<any>('ai/learning-recommendations', {
      userId,
      context,
    });
  } catch (error) {
    console.error('Failed to get learning recommendations:', error);
    throw error;
  }
};

/**
 * 获取内容摘要
 */
export const getContentSummary = async (content: string): Promise<string> => {
  try {
    const response = await api.post<{ summary: string }>('ai/summarize', {
      content,
    });
    return response.summary;
  } catch (error) {
    console.error('Failed to get content summary:', error);
    throw error;
  }
};

/**
 * 生成学习计划
 */
export const generateLearningPlan = async (
  courseId: string,
  userPreferences?: Record<string, any>
): Promise<any> => {
  try {
    return await api.post<any>('ai/generate-learning-plan', {
      courseId,
      userPreferences,
    });
  } catch (error) {
    console.error('Failed to generate learning plan:', error);
    throw error;
  }
};

/**
 * 获取内容相关问题
 */
export const getContentQuestions = async (
  content: string,
  count: number = 3
): Promise<string[]> => {
  try {
    const response = await api.post<{ questions: string[] }>('ai/generate-questions', {
      content,
      count,
    });
    return response.questions;
  } catch (error) {
    console.error('Failed to generate questions:', error);
    throw error;
  }
};

/**
 * 评估用户答案
 */
export const evaluateAnswer = async (
  question: string,
  answer: string,
  referenceContent?: string
): Promise<{ score: number; feedback: string }> => {
  try {
    return await api.post<{ score: number; feedback: string }>('ai/evaluate-answer', {
      question,
      answer,
      referenceContent,
    });
  } catch (error) {
    console.error('Failed to evaluate answer:', error);
    throw error;
  }
}; 