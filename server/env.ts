import { z, ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const envSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    DATABASE_URL: z.string(),
  })
  .refine(input => {
    return true
  })

export type Env = z.infer<typeof envSchema>
let env: Env
try {
  env = envSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  console.error('Environment validation error:')
  console.log(error.flatten().fieldErrors)
  process.exit(1)
}

if (!env) {
  throw new Error('Failed to load environment variables')
}

export default env
