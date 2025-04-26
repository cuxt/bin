import createApp from '#/lib/create-app'
import { configureOpenApi } from '#/lib/configure-open-api'
import { responseWrapper } from '#/middlewares/response-wrapper'
import { cors } from 'hono/cors'
import index from '#/routes/index.route'
import tasks from '#/routes/tasks/tasks.index'
import auth from '#/routes/auth/auth.index'
import im from '#/routes/im/im.index'
import cron from '#/routes/cron/cron.index'
import uglyAvatar from '#/routes/ugly_avator/ugly_avatar.index'
import cloudflare from '#/routes/cloudflare/cloudflare.index'
const app = createApp()

app.use(cors())
app.use(responseWrapper())

const routes = [index, tasks, auth, im, cron, uglyAvatar, cloudflare]

routes.forEach(route => {
  app.route('/', route)
})

configureOpenApi(app)

export default app
