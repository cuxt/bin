import type { CronRoute } from './cron.routes'
import { AppRouteHandler } from '#/lib/types'

export const cron: AppRouteHandler<CronRoute> = async c => {
  // 日志
  c.var.logger.info('Cron job executed')
  return c.json({ message: 'ok' })
}