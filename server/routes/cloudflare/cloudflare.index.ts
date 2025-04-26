import { createRouter } from '#/lib/create-app'
import * as handlers from './cloudflare.handlers'
import * as routes from './cloudflare.routes'
const router = createRouter().openapi(routes.graphql, handlers.graphql)

export default router
