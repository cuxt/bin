import { text, pgTable, timestamp, serial } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const settings = pgTable('settings', {
  id: serial().primaryKey(),
  key: text('key'),
  value: text('value'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
})

export const selectSettingsSchema = createSelectSchema(settings)
export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
export const patchSettingsSchema = insertSettingsSchema.partial()
