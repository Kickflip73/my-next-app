import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!DEEPSEEK_API_KEY) {
      console.error('DeepSeek API key is not configured');
      throw new Error('未配置 DeepSeek API 密钥');
    }

    // 构建完整的消息历史
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的学习助手，帮助用户解答学习相关的问题。请用中文回答，并使用 Markdown 格式。保持回答的连贯性，注意上下文。'
      },
      ...(history || []),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DeepSeek API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`DeepSeek API 请求失败: ${response.status} ${response.statusText}`);
    }

    // 创建一个 TransformStream 来处理数据
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = '';

    const stream = new TransformStream({
      async transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch (e) {
              console.error('Error parsing JSON:', e, 'Line:', line);
            }
          }
        }
      },
      flush(controller) {
        if (buffer) {
          try {
            const json = JSON.parse(buffer.slice(6));
            const content = json.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          } catch (e) {
            console.error('Error parsing remaining buffer:', e);
          }
        }
      }
    });

    return new Response(response.body?.pipeThrough(stream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时发生错误' },
      { status: 500 }
    );
  }
} 