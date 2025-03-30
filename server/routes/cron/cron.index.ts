import { createRouter } from '#/lib/create-app'
import * as handlers from './cron.handlers'
import * as routes from './cron.routes'

const router = createRouter()
  .openapi(routes.cron, handlers.cron)

export default router