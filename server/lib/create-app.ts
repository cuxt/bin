import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from '#/middlewares/pino-logger'
import { AppBindings } from './types'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(logger())

  app.get('/favicon.ico', c => {
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text y="80" font-size="80">🫵</text>
    </svg>`

    return c.body(svgIcon, 200, {
      'Content-Type': 'image/svg+xml'
    })
  })

  app.notFound(c => {
    return c.json(
      {
        message: `Not Found - ${c.req.path}`
      },
      404
    )
  })

  app.onError((err, c) => {
    c.var.logger.debug('Error Bin！')
    return c.json(
      {
        message: err.message
      },
      500
    )
  })

  return app
}
