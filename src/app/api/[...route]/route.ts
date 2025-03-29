import { handle } from 'hono/vercel'
import app from '#/app'

const handler = handle(app.basePath('/api'))

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS
}