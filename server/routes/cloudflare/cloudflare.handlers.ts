import { AppRouteHandler } from '#/lib/types'
import { GraphqlRoute } from './cloudflare.routes'
import env from '#/env'
import axios from 'axios'
import { query } from './graphql/query'

export const graphql: AppRouteHandler<GraphqlRoute> = async c => {
  const { operation } = c.req.valid('param')
  const baseUrl = 'https://api.cloudflare.com/client/v4/graphql'

  const headers = {
    Authorization: `Bearer ${env.CLOUDFLARE_ACCOUNT_ANALYTICS_TOKEN}`,
    'Content-Type': 'application/json'
  }

  // 当前时间 2025-04-19T10:59:00Z格式
  const now = new Date()
  const variables = {
    accountTag: env.CLOUDFLARE_ACCOUNT_ID,
    filter: {
      // 前7天
      datetime_gep: new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      datetime_lep: now.toISOString()
    },
    previousPeriodFilter: {
      datetime_gep: new Date(
        now.getTime() - 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      datetime_lep: new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString()
    },
    encryptedFilter: {
      clientSSLProtocol_neq: 'none'
    },
    fourxxFilter: {
      edgeResponseStatus_geq: 400,
      edgeResponseStatus_leq: 499
    },
    fivexxFilter: {
      edgeResponseStatus_geq: 500,
      edgeResponseStatus_leq: 599
    }
  }

  const queryString = query[operation as keyof typeof query]
  if (!queryString) {
    return c.json({ message: 'Not Found' }, 404)
  }
  const response = await axios.post(
    baseUrl,
    {
      operationName: operation,
      query: queryString,
      variables
    },
    { headers }
  )

  if (response.status !== 200) {
    return c.json({ message: 'Not Found' }, 404)
  }

  const data = response.data

  return c.json(data)
}
