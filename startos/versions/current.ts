import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.14.3:1',
  releaseNotes: {
    en_US: 'Fix Stirling PDF health check.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
