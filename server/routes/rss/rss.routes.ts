import { notFoundSchema } from '#/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['RSS']

export type BiliBiliRoute = typeof bilibili
export const bilibili = createRoute({
  path: '/api/rss/bilibili/dynamic/{uid}',
  method: 'get',
  tags,
  request: {
    params: z.object({
      uid: z.string().describe('The user id')
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.any()
        }
      },
      description: 'List tasks'
    }
  }
})
