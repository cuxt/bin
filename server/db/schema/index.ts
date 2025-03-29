import * as tasks from './tasks.sql'
import * as user from './user.sql'

export * from './tasks.sql'
export * from './user.sql'
export default {
  ...tasks,
  ...user
}