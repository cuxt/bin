import { AppOpenApi } from './types'
import { version } from '../../package.json'
import { apiReference } from '@scalar/hono-api-reference'
export function configureOpenApi (app: AppOpenApi) {
  app.doc('/api/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Bin API',
      version: version
    }
  })

  app.get(
    '/api/reference',
    apiReference({
      pageTitle: 'Bin API Reference',
      theme: 'solarized',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch'
      },
      url: '/api/doc'
    })
  )
}
