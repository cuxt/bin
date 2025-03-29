import {
  insertTasksSchema,
  patchTasksSchema,
  selectTasksSchema
} from '#/db/schema/tasks.sql'
import { notFoundSchema } from '#/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const tags = ['Tasks']

export const list = createRoute({
  path: '/api/tasks',
  method: 'get',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectTasksSchema)
        }
      },
      description: 'List tasks'
    }
  }
})

export const create = createRoute({
  path: '/api/tasks',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertTasksSchema
        }
      },
      description: 'The task to create'
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema
        }
      },
      description: 'The created task'
    }
  }
})

export const getOne = createRoute({
  path: '/api/tasks/{id}',
  method: 'get',
  request: {
    params: z.object({
      id: z.preprocess(val => parseInt(val as string, 10), z.number().int())
    })
  },
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema
        }
      },
      description: 'The task'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    }
  }
})

export const patch = createRoute({
  path: '/api/tasks/{id}',
  method: 'patch',
  request: {
    params: z.object({
      id: z.preprocess(val => parseInt(val as string, 10), z.number().int())
    }),
    body: {
      content: {
        'application/json': {
          schema: patchTasksSchema
        }
      },
      description: 'The task updates'
    }
  },
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema
        }
      },
      description: 'The updates task'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    }
  }
})

export const remove = createRoute({
  path: '/api/tasks/{id}',
  method: 'delete',
  request: {
    params: z.object({
      id: z.preprocess(val => parseInt(val as string, 10), z.number().int())
    })
  },
  tags,
  responses: {
    204: {
      description: 'Task removed'
    },
    404: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    }
  }
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove