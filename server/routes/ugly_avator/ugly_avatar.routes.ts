import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['Ugly Avatar']

export type UglyAvatarRoute = typeof uglyAvatar
export const uglyAvatar = createRoute({
  path: '/api/ugly_avatar',
  method: 'get',
  tags,
  request: {
    params: z.object({
      id: z.string().optional(), // 设置后固定返回值
      name: z.string().optional(), // 设置后固定返回值
      bgColor: z.string().optional(), // rgb
      width: z.string().optional(),
      height: z.string().optional(),
      opacity: z.string().optional(), // 清晰度 0-1
      format: z.string().optional() // 图片格式 png, jpg, webp
    }),
    description: 'The ugly avatar to create'
  },
  responses: {
    200: {
      content: {
        'image/svg+xml': {
          schema: z.any().openapi({ type: 'string', format: 'binary' })
        },
        'image/png': {
          schema: z.any().openapi({ type: 'string', format: 'binary' })
        },
        'image/webp': {
          schema: z.any().openapi({ type: 'string', format: 'binary' })
        },
        'image/jpeg': {
          schema: z.any().openapi({ type: 'string', format: 'binary' })
        }
      },
      description: 'Ugly avatar image'
    }
  }
})
