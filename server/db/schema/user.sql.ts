import {
  text,
  pgTable,
  boolean,
  timestamp,
  pgEnum,
  uuid
} from 'drizzle-orm/pg-core'

export const rolesEnum = pgEnum('roles', ['super', 'admin', 'user'])
export const groupEnum = pgEnum('group', ['default', 'vip', 'svip'])

export const user = pgTable('user', {
  id: uuid().primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  nickName: text('nick_name').notNull(),
  roles: text('roles').array().notNull().default(['user']),
  userStatus: boolean('user_status').notNull().default(true),
  email: text('email').notNull().unique(),
  githubId: text('github_id').unique(),
  wechatId: text('wechat_id').unique(),
  larkId: text('lark_id').unique(),
  accessToken: uuid().defaultRandom(),
  group: text('group').array().notNull().default(['default']),
  affCode: text('aff_code').notNull(),
  inviterId: uuid('inviter_id'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
})
