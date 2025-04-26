import { notFoundSchema } from '#/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['Cloudflare']

export type GraphqlRoute = typeof graphql
export const graphql = createRoute({
  path: '/api/cloudflare/graphql/{operation}',
  method: 'get',
  tags,
  request: {
    params: z.object({
      operation: z.string().describe('GraphQL operation name')
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            data: z
              .object({
                stats: z.array(z.unknown())
              })
              .optional()
          })
        }
      },
      description: 'Cloudflare GraphQL API operation results'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Resource not found'
    }
  }
})
