import type { UglyAvatarRoute } from './ugly_avatar.routes'
import { AppRouteHandler } from '#/lib/types'
import seedrandom from 'seedrandom'
import { getSvg } from './services/image'
import sharp from 'sharp'

export const uglyAvatar: AppRouteHandler<UglyAvatarRoute> = async c => {
  const defaultSize = 200
  const { id, name, bgColor, width, height, opacity, format } = c.req.query()

  const seed = id || name || Math.random().toString()
  const rng = seedrandom(seed)
  const avatarWidth = width
    ? parseInt(width)
    : height
    ? parseInt(height)
    : defaultSize
  const avatarHeight = height
    ? parseInt(height)
    : width
    ? parseInt(width)
    : defaultSize
  const avatorOpacity = opacity ? parseFloat(opacity) : 1

  // 获取SVG源数据
  const svgData = await getSvg({
    rng,
    bgColor,
    width: avatarWidth,
    height: avatarHeight,
    opacity: avatorOpacity
  })

  // 处理格式转换
  if (format && ['png', 'webp', 'jpeg', 'jpg'].includes(format.toLowerCase())) {
    const imageFormat =
      format.toLowerCase() === 'jpg' ? 'jpeg' : format.toLowerCase()
    const supportedFormat = imageFormat as 'png' | 'webp' | 'jpeg'

    const buffer = await sharp(Buffer.from(svgData))
      [supportedFormat]()
      .toBuffer()

    c.header('Content-Type', `image/${supportedFormat}`)
    return c.body(buffer)
  }

  // 默认返回SVG格式
  c.header('Content-Type', 'image/svg+xml')
  return c.body(svgData)
}
