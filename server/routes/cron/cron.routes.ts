import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['Cron']
// 注册
export type CronRoute = typeof cron
export const cron = createRoute({
  path: '/api/cron',
  method: 'get',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().optional()
          })
        }
      },
      description: 'Cron job'
    }
  }
})

// GitHub订阅路由
export type GithubSubscribeRoute = typeof githubSubscribe
export const githubSubscribe = createRoute({
  path: '/api/cron/github/subscribe/:username',
  method: 'get',
  tags: [...tags, 'GitHub'],
  request: {
    params: z.object({
      username: z.string().describe('GitHub 用户名')
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            count: z.number().optional()
          })
        }
      },
      description: 'GitHub 事件订阅'
    },
    500: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string()
          })
        }
      },
      description: '服务器错误'
    }
  }
})
