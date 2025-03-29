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
  data: T;
  timestamp: number;
  code: number;
  message: string;
}
