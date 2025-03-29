import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import env from '#/env'
import * as schema from './schema/index'

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production'
  },
  schema: {
    ...schema
  }
});
export default db
