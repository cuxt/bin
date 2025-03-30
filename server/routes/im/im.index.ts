import { createRouter } from '#/lib/create-app'
import * as handlers from './im.handlers'
import * as routes from './im.routes'

const router = createRouter()
  .openapi(routes.sse, handlers.sse)
  .openapi(routes.sendMessage, handlers.sendMessage)

export default router
