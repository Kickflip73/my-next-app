import { NextResponse } from 'next/server';

// 定义消息类型
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

/**
 * 处理GET请求以支持EventSource连接
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const stream = url.searchParams.get('stream') === 'true';
  
  if (!stream) {
    return NextResponse.json(
      { error: '无效的请求参数' },
      { status: 400 }
    );
  }
  
  // 创建一个响应头，返回一个保持连接的SSE响应
  return new Response('', {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

/**
 * DeepSeek API处理程序
 * 接收聊天消息并调用DeepSeek API返回回复
 */
export async function POST(req: Request) {
  try {
    // 解析请求体
    const body = await req.json();
    const { messages, stream = false } = body as { messages: Message[], stream?: boolean };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '请求格式无效，缺少messages字段或格式不正确' },
        { status: 400 }
      );
    }

    // DeepSeek API密钥和端点
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const endpoint = 'https://api.deepseek.com/v1/chat/completions';

    if (!apiKey) {
      console.error('缺少DeepSeek API密钥');
      return NextResponse.json(
        { error: '服务器配置错误，缺少API密钥' },
        { status: 500 }
      );
    }

    // 拼接系统提示词，引导模型进行推理
    const systemPrompt = messages.find(msg => msg.role === 'system')?.content || '';
    const enhancedSystemPrompt = `${systemPrompt}
在回答问题时，请先思考问题的各个方面，然后再给出答案。思考过程请使用<think>标签包裹起来，这部分内容用户不会看到。
例如：
<think>
这个问题涉及到...
我需要考虑...
根据...
</think>
最后的答案...`;

    // 替换或添加系统提示词
    const enhancedMessages = messages.map(msg => 
      msg.role === 'system' 
        ? { ...msg, content: enhancedSystemPrompt }
        : msg
    );

    // 如果没有系统提示词，添加一个
    if (!enhancedMessages.some(msg => msg.role === 'system')) {
      enhancedMessages.unshift({
        role: 'system',
        content: enhancedSystemPrompt
      });
    }

    // 非流式输出模式
    if (!stream) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: enhancedMessages,
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('DeepSeek API错误:', response.status, errorData);
        
        return NextResponse.json(
          { error: `DeepSeek API调用失败: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      
      // 提取DeepSeek API的回复内容，移除思考部分
      let aiResponse = data.choices?.[0]?.message?.content || '无法获取回复';
      
      // 移除思考标签中的内容
      aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      
      return NextResponse.json({ response: aiResponse });
    }
    
    // 流式输出模式 - 简化实现
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: enhancedMessages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API调用失败: ${response.status}`);
      }

      // 创建一个简单的直通流
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          // 使用闭包保存状态，而不是全局变量
          let inThinkingMode = false;
          let accumulatedContent = '';
          
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }
              
              const text = new TextDecoder().decode(value);
              const lines = text.split('\n');
              
              for (const line of lines) {
                if (!line.trim() || !line.startsWith('data:')) continue;
                
                if (line === 'data: [DONE]') {
                  controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`));
                  continue;
                }
                
                try {
                  const jsonString = line.replace(/^data: /, '');
                  const data = JSON.parse(jsonString);
                  const content = data.choices?.[0]?.delta?.content || '';
                  
                  if (!content) continue;
                  
                  // 简化思考模式的处理
                  if (content.includes('<think>')) {
                    inThinkingMode = true;
                    accumulatedContent = content;
                    continue;
                  }
                  
                  if (inThinkingMode) {
                    accumulatedContent += content;
                    
                    if (content.includes('</think>')) {
                      inThinkingMode = false;
                      
                      // 提取思考后的内容
                      const parts = accumulatedContent.split('</think>');
                      if (parts.length > 1 && parts[1].trim()) {
                        controller.enqueue(new TextEncoder().encode(`data: {"content": ${JSON.stringify(parts[1].trim())}}\n\n`));
                      }
                      accumulatedContent = '';
                    }
                    continue;
                  }
                  
                  // 普通内容直接发送
                  controller.enqueue(new TextEncoder().encode(`data: {"content": ${JSON.stringify(content)}}\n\n`));
                } catch (error) {
                  console.error('处理流数据出错:', error);
                  // 发生错误时，直接传递原始行，确保流不会中断
                  controller.enqueue(value);
                }
              }
            }
          } catch (error) {
            console.error('流处理出错:', error);
            controller.enqueue(new TextEncoder().encode(`data: {"error": "流处理出错"}\n\n`));
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } catch (error) {
      console.error('创建流出错:', error);
      return NextResponse.json(
        { error: '流处理出错' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('处理DeepSeek API请求时出错:', error);
    
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 