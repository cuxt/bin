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
    API_URL: z.string().url().default('https://api.xbxin.com'),
    BIN_TOKEN: z.string().optional(),
    KV_STORE_URL: z.string().url().default('https://kv.xbxin.com/api/kv'),
    GITHUB_TOKEN: z.string().optional(),
    PUSH_URL: z.string().url(),
    CLOUDFLARE_ZONE_ID: z.string().optional(),
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    CLOUDFLARE_ACCOUNT_ANALYTICS_TOKEN: z.string().optional()
  })
  .refine(() => {
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
