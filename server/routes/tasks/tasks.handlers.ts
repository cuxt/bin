import db from '#/db'
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute
} from './tasks.routes'
import { AppRouteHandler } from '#/lib/types'
import { tasks } from '#/db/schema/tasks.sql'
import { eq } from 'drizzle-orm'

export const list: AppRouteHandler<ListRoute> = async c => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async c => {
  const task = c.req.valid('json')
  const [inserted] = await db.insert(tasks).values(task).returning()
  return c.json(inserted)
}

export const getOne: AppRouteHandler<GetOneRoute> = async c => {
  const { id } = c.req.valid('param')
  const task = await db.query.tasks.findFirst({
    where (field, operators) {
      return operators.eq(field.id, id)
    }
  })

  if (!task) {
    return c.json({ message: 'Not Found' }, 404)
  }

  return c.json(task, 200)
}

export const patch: AppRouteHandler<PatchRoute> = async c => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')
  const [updated] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning()

  if (!updated) {
    return c.json({ message: 'Not Found' }, 404)
  }

  return c.json(updated, 200)
}

export const remove: AppRouteHandler<RemoveRoute> = async c => {
  const { id } = c.req.valid('param')
  const result = await db
    .delete(tasks)
    .where(eq(tasks.id, id))

  if (result.rowCount === 0) {
    return c.json({ message: 'Not Found' }, 404)
  }

  return c.body(null, 204)
}
