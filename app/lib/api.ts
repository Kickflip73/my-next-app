/**
 * API客户端基础
 * 封装API请求方法，处理错误和认证
 */

type FetchOptions = RequestInit & {
  token?: string;
  params?: Record<string, string>;
};

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * 获取认证令牌
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * 创建完整URL（包含查询参数）
 */
const createUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  if (!params) return url;
  
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};

/**
 * 处理API响应
 */
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();
  
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message || response.statusText,
      data
    );
  }
  
  return data;
};

/**
 * 执行API请求
 */
export const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { params, token, ...fetchOptions } = options;
  
  // 设置默认headers
  const headers = new Headers(fetchOptions.headers);
  
  // 设置内容类型
  if (!headers.has('Content-Type') && !fetchOptions.body) {
    headers.set('Content-Type', 'application/json');
  }
  
  // 添加认证令牌
  const authToken = token || getAuthToken();
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  
  // 创建URL
  const url = createUrl(endpoint, params);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });
    
    return handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'Unknown error occurred',
      error
    );
  }
};

/**
 * API请求方法
 */
export const api = {
  get: <T>(endpoint: string, options?: FetchOptions): Promise<T> => 
    fetchApi(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data: any, options?: FetchOptions): Promise<T> =>
    fetchApi(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: <T>(endpoint: string, data: any, options?: FetchOptions): Promise<T> =>
    fetchApi(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  patch: <T>(endpoint: string, data: any, options?: FetchOptions): Promise<T> =>
    fetchApi(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    
  delete: <T>(endpoint: string, options?: FetchOptions): Promise<T> =>
    fetchApi(endpoint, { ...options, method: 'DELETE' }),
}; 