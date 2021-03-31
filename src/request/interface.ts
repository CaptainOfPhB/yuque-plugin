export interface Response<Data = unknown> {
  data: Data;
  meta?: Record<string, unknown>;
}

export interface ResponseWithError {
  status: number;
  message: string;
}

export const MessageMapping = {
  400: '请求的参数不正确，或缺少必要信息！',
  401: 'Access Token 不存在！',
  403: '缺少对应功能的权限！',
  404: '数据不存在，或未开放',
  500: '语雀服务器异常'
} as { [status: number]: string };
