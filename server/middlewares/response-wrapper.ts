import { MiddlewareHandler } from 'hono'
import { AppBindings } from '#/lib/types'
import packageJson from '../../package.json'

const { version } = packageJson

export const responseWrapper = (): MiddlewareHandler<AppBindings> => {
  return async (c, next) => {
    await next()

    // 获取当前请求路径
    const path = c.req.path

    // 跳过API文档相关路由
    if (
      path === '/api/reference' ||
      path === '/api/doc' ||
      path.startsWith('/api/reference/')
    ) {
      return
    }

    // 获取响应状态和内容
    const response = c.res

    // 如果响应不是JSON格式，不进行处理
    const contentType = response.headers.get('Content-Type')
    if (!contentType?.includes('application/json')) {
      return
    }

    // 解析原始JSON响应
    const originalBody = await response.json()

    // 避免重复包装
    if (
      originalBody &&
      typeof originalBody === 'object' &&
      originalBody.hasOwnProperty('data') &&
      originalBody.hasOwnProperty('timestamp')
    ) {
      return
    }

    // 获取上海时区的日期并格式化为YYYY/MM/DD HH:MM:SS
    const date = new Date()
    const shanghaiDate = new Date(
      date.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })
    )

    const year = shanghaiDate.getFullYear()
    const month = String(shanghaiDate.getMonth() + 1).padStart(2, '0')
    const day = String(shanghaiDate.getDate()).padStart(2, '0')
    const hours = String(shanghaiDate.getHours()).padStart(2, '0')
    const minutes = String(shanghaiDate.getMinutes()).padStart(2, '0')
    const seconds = String(shanghaiDate.getSeconds()).padStart(2, '0')

    const formattedTimestamp = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

    // 创建标准响应格式
    const wrappedResponse = {
      data: originalBody,
      timestamp: formattedTimestamp,
      code: response.status,
      status: response.status === 200 ? 'success' : response.statusText,
      version
    }

    // 替换响应
    c.res = new Response(JSON.stringify(wrappedResponse), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
