import type { BiliBiliRoute } from './rss.routes'
import { AppRouteHandler } from '#/lib/types'

export const bilibili: AppRouteHandler<BiliBiliRoute> = async c => {
  return c.json({ message: 'Hello BiliBili' })
}
