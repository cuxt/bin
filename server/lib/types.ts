import { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type AppOpenApi = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>

export interface ApiResponse<T> {
  data: T
  timestamp: number
  code: number
  message: string
}

export interface GithubEvent {
  id: string
  type: string
  actor: {
    id: number
    login: string
    display_login: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
  repo: {
    id: number
    name: string
    url: string
  }
  payload: {
    action?: string
    commits?: {
      sha: string
      message: string
      url: string
    }[]
  }
  public: boolean
  created_at: string
}
