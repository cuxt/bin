import { AppRouteHandler } from '#/lib/types'
import type { SseRoute, SendMessageRoute } from './im.routes'
import { stream, streamText, streamSSE } from 'hono/streaming'

// 消息ID计数器
let id = 0

// 存储所有连接的客户端
type MessageStream = ReturnType<typeof streamSSE> extends Promise<infer T> ? T extends { [key: string]: any } ? T : never : never;
type ClientStream = Parameters<Parameters<typeof streamSSE>[1]>[0];
const connectedClients: Set<ClientStream> = new Set();

// 广播消息给所有连接的客户端
const broadcastMessage = async (message: string, username: string) => {
  const messageId = String(id++);
  const payload = JSON.stringify({
    message,
    username,
    timestamp: new Date().toISOString()
  });
  
  for (const client of connectedClients) {
    await client.writeSSE({
      data: payload,
      event: 'chat-message',
      id: messageId,
    });
  }
};

// SSE连接处理
export const sse: AppRouteHandler<SseRoute> = async c => {
  return streamSSE(c, async (stream) => {
    // 添加到连接集合
    connectedClients.add(stream);
    
    // 发送系统消息通知新用户连接
    const systemMessageId = String(id++);
    await broadcastMessage("新用户已连接", "系统");
    
    try {
      // 保持连接直到客户端断开
      while (true) {
        await stream.sleep(30000); // 每30秒发送一次心跳保持连接
        await stream.writeSSE({
          data: "ping",
          event: 'heartbeat',
          id: String(id++),
        });
      }
    } finally {
      // 客户端断开连接时清理
      connectedClients.delete(stream);
      await broadcastMessage("用户已断开连接", "系统");
    }
  });
};

// 发送消息处理
export const sendMessage: AppRouteHandler<SendMessageRoute> = async c => {
  const { message, username } = await c.req.json();
  
  // 广播消息给所有连接的客户端
  await broadcastMessage(message, username);
  
  return c.json({ success: true });
};