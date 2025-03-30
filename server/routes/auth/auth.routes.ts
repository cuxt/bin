import { notFoundSchema } from '#/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['Auth']

// 注册
export type RegisterRoute = typeof register
export const register = createRoute({
  path: '/api/auth/register',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string(),
            password: z.string(),
            email: z.string().email(),
          })
        }
      },
      description: 'The user to register'
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string()
          })
        }
      },
      description: 'The registered user'
    }
  }
})

// 登录
export type LoginRoute = typeof login
export const login = createRoute({
  path: '/api/auth/login',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string()
          })
        }
      },
      description: 'The user to login'
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string(),
            accessToken: z.string().uuid()
          })
        }
      },
      description: 'The logged in user'
    },
    401: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Invalid password'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'User not found'
    }
  }
})

// 用户信息
export type UserInfoRoute = typeof userInfo
export const userInfo = createRoute({
  path: '/api/auth/info',
  method: 'get',
  tags,
  request: {
    headers: z.object({
      Authorization: z.string()
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string(),
            nickName: z.string(),
            role: z.enum(['super_admin', 'admin', 'user']),
            userStatus: z.boolean(),
            email: z.string().email(),
            githubId: z.string().nullable(),
            wechatId: z.string().nullable(),
            larkId: z.string().nullable(),
            group: z.array(z.string()),
            affCode: z.string(),
            inviterId: z.string().uuid().nullable(),
            createdAt: z.string(),
            updatedAt: z.string()
          })
        }
      },
      description: 'The user info'
    },
    401: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Invalid token'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'User not found'
    }
  }
})