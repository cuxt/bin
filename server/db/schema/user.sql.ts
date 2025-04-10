import { sql } from 'drizzle-orm'
import {
  text,
  pgTable,
  boolean,
  timestamp,
  pgEnum,
  uuid
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['super_admin', 'admin', 'user'])
export const groupEnum = pgEnum('group', ['default', 'vip', 'svip'])

export const user = pgTable('user', {
  id: uuid().primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  nickName: text('nick_name').notNull(),
  role: roleEnum('role').notNull().default('user'),
  userStatus: boolean('user_status').notNull().default(true),
  email: text('email').notNull().unique(),
  githubId: text('github_id').unique(),
  wechatId: text('wechat_id').unique(),
  larkId: text('lark_id').unique(),
  accessToken: uuid().defaultRandom(),
  group: text('group')
    .array()
    .notNull()
    .default(sql`ARRAY['default']`),
  affCode: text('aff_code').notNull(),
  inviterId: uuid('inviter_id'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
})
