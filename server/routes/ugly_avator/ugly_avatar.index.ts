import { createRouter } from '#/lib/create-app'
import * as handlers from './ugly_avatar.handlers'
import * as routes from './ugly_avatar.routes'

const router = createRouter().openapi(routes.uglyAvatar, handlers.uglyAvatar)

export default router
