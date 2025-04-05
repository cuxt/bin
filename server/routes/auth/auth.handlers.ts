import db from '#/db'
import type { RegisterRoute, LoginRoute, UserInfoRoute } from './auth.routes'
import { AppRouteHandler } from '#/lib/types'
import { user } from '#/db/schema/user.sql'
import { count } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import env from '#/env'

export const register: AppRouteHandler<RegisterRoute> = async c => {
  const { name, password, email } = c.req.valid('json')

  // 加密
  const hashedPassword = await bcrypt.hash(password, 10)

  // 如果是第一个注册的用户，设置为管理员
  const userCount = await db
    .select({ count: count() })
    .from(user)
    .then(result => result[0].count)
  const isFirstUser = userCount === 0

  const [inserted] = await db
    .insert(user)
    .values({
      id: crypto.randomUUID(),
      name,
      password: hashedPassword,
      nickName: name,
      role: isFirstUser ? 'super_admin' : 'user',
      email,
      affCode: crypto.randomUUID()
    })
    .returning()
  return c.json({ id: inserted.id, name: inserted.name })
}

export const login: AppRouteHandler<LoginRoute> = async c => {
  const { email, password } = c.req.valid('json')

  const userInfo = await db.query.user.findFirst({
    where(field, operators) {
      return operators.eq(field.email, email)
    }
  })

  if (!userInfo) {
    return c.json({ message: 'Not Found' }, 404)
  }

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, userInfo.password)

  if (!isPasswordValid) {
    return c.json({ message: 'Invalid Password' }, 401)
  }

  return c.json(
    {
      id: userInfo.id,
      name: userInfo.name,
      accessToken: userInfo.accessToken!
    },
    200
  )
}

export const userInfo: AppRouteHandler<UserInfoRoute> = async c => {
  const { Authorization } = c.req.valid('header')
  const accessToken = Authorization.split(' ')[1]

  if (!accessToken) {
    return c.json({ message: 'Invalid Token' }, 401)
  }

  const userInfo = await db.query.user.findFirst({
    where(field, operators) {
      return operators.eq(field.accessToken, accessToken)
    }
  })

  if (!userInfo) {
    return c.json({ message: 'Not Found' }, 404)
  }

  console.log(userInfo.group)

  return c.json(
    {
      id: userInfo.id,
      name: userInfo.name,
      nickName: userInfo.nickName,
      role: userInfo.role,
      userStatus: userInfo.userStatus,
      email: userInfo.email,
      githubId: userInfo.githubId,
      wechatId: userInfo.wechatId,
      larkId: userInfo.larkId,
      group: userInfo.group,
      affCode: userInfo.affCode,
      inviterId: userInfo.inviterId,
      createdAt: userInfo.createdAt!,
      updatedAt: userInfo.updatedAt!,
      avatar: `${env.API_URL}/api/ugly_avatar?id=${userInfo.id}&opacity=0`
    },
    200
  )
}
