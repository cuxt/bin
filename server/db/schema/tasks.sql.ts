import { text, pgTable, boolean, timestamp, serial } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = pgTable('tasks', {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
})

export const selectTasksSchema = createSelectSchema(tasks)
export const insertTasksSchema = createInsertSchema(tasks, {
  name: schema => schema.min(1).max(500)
})
  .required({
    done: true
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

export const patchTasksSchema = insertTasksSchema.partial()
