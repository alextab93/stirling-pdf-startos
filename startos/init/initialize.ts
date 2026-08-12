import { mkdir } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { getAdminCredentials } from '../actions/getAdminCredentials'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const initialize = sdk.setupOnInit(async (effects) => {
  await Promise.all(
    ['configs', 'tessdata', 'pipeline', 'logs', 'startos'].map((subpath) =>
      mkdir(sdk.volumes.main.subpath(subpath), { recursive: true }),
    ),
  )

  const store = await storeJson.read((value) => value).once()
  if (store) return

  await storeJson.write(effects, {
    initialAdminUsername: 'admin',
    initialAdminPassword: randomBytes(18).toString('base64url'),
  })
  await sdk.action.createOwnTask(effects, getAdminCredentials, 'critical', {
    reason: 'Retrieve the generated Stirling PDF admin credentials.',
  })
})
