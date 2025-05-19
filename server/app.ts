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
import rss from '#/routes/rss/rss.index'
const app = createApp()

app.use(
  cors({
    origin: origin => {
      if (origin && origin.endsWith('xbxin.com')) {
        return origin
      }
      return '*'
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 3600,
    credentials: true
  })
)
app.use(responseWrapper())

const routes = [index, tasks, auth, im, cron, uglyAvatar, cloudflare, rss]

routes.forEach(route => {
  app.route('/', route)
})

configureOpenApi(app)

export default app
