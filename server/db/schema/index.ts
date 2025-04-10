import * as settings from './settings.sql'
import * as tasks from './tasks.sql'
import * as user from './user.sql'

export * from './tasks.sql'
export * from './user.sql'
export * from './settings.sql'

const schema = {
  ...settings,
  ...tasks,
  ...user
}

export default schema
