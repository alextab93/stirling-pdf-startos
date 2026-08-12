import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  initialAdminUsername: z.string(),
  initialAdminPassword: z.string(),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'startos/store.json' },
  shape,
)
