import { createRouter } from '#/lib/create-app'
import * as handlers from './rss.handlers'
import * as routes from './rss.routes'

const router = createRouter().openapi(routes.bilibili, handlers.bilibili)

export default router
