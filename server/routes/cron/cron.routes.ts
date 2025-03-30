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
            message: z.string().optional(),
          })
        }
      },
      description: 'Cron job'
    }
  }
})
