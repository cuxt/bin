import createApp from '#/lib/create-app'
import index from '#/routes/index.route'
import tasks from '#/routes/tasks/tasks.index'
import auth from '#/routes/auth/auth.index'
import im from '#/routes/im/im.index'
import { configureOpenApi } from '#/lib/configure-open-api'
import { responseWrapper } from '#/middlewares/response-wrapper'
import { cors } from 'hono/cors'
const app = createApp()

app.use(cors())
app.use(responseWrapper())

const routes = [index, tasks, auth, im]

routes.forEach(route => {
  app.route('/', route)
})

configureOpenApi(app)

export default app
