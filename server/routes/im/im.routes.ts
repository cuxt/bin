import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['IM']

// IM 消息路由
export const sse = createRoute({
  path: '/api/im/sse',
  method: 'get',
  tags,
  responses: {
    200: {
      content: {
        'text/event-stream': {
          schema: z.object({
            id: z.string().optional(),
            event: z.string().optional(),
            data: z.string()
          })
        }
      },
      description: 'SSE stream for IM messages'
    }
  }
})

// 发送消息路由
export const sendMessage = createRoute({
  path: '/api/im/send',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().min(1, "消息不能为空"),
            username: z.string().min(1, "用户名不能为空")
          })
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean()
          })
        }
      },
      description: '消息发送状态'
    }
  }
})

export type SseRoute = typeof sse
export type SendMessageRoute = typeof sendMessage