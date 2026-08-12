import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.14.3:0-alpha.0',
  releaseNotes: {
    en_US: 'Initial StartOS package release.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
