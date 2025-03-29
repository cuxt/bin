import { createRouter } from '#/lib/create-app'
import { createRoute, z } from '@hono/zod-openapi'

const router = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/api/index',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              message: z.string()
            })
          }
        },
        description: 'Bin API Root'
      }
    }
  }),
  c => {
    return c.json({
      message: 'Bin API'
    })
  }
)

export default router
