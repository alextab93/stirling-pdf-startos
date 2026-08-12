import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  const store = await storeJson.read((value) => value).const(effects)
  if (!store) throw new Error('Admin credentials have not been initialized')

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'stirling' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: 'configs',
        mountpoint: '/configs',
        readonly: false,
      })
      .mountVolume({
        volumeId: 'main',
        subpath: 'tessdata',
        mountpoint: '/usr/share/tessdata',
        readonly: false,
      })
      .mountVolume({
        volumeId: 'main',
        subpath: 'pipeline',
        mountpoint: '/pipeline',
        readonly: false,
      })
      .mountVolume({
        volumeId: 'main',
        subpath: 'logs',
        mountpoint: '/logs',
        readonly: false,
      }),
    'stirling-pdf',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: ['tini', '--', '/scripts/init.sh'],
      env: {
        DISABLE_ADDITIONAL_FEATURES: 'false',
        SECURITY_ENABLELOGIN: 'true',
        SECURITY_INITIALLOGIN_USERNAME: store.initialAdminUsername,
        SECURITY_INITIALLOGIN_PASSWORD: store.initialAdminPassword,
        SYSTEM_GOOGLEVISIBILITY: 'false',
        SYSTEM_ENABLEANALYTICS: 'false',
        SHOW_SURVEY: 'false',
        METRICS_ENABLED: 'true',
        SPRINGDOC_API_DOCS_ENABLED: 'false',
        SPRINGDOC_SWAGGER_UI_ENABLED: 'false',
        MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE: 'health',
        MANAGEMENT_ENDPOINT_HEALTH_SHOW_DETAILS: 'never',
      },
    },
    ready: {
      display: i18n('Stirling PDF'),
      fn: () =>
        sdk.healthCheck.runHealthScript(
          [
            'sh',
            '-c',
            "curl -fsS http://localhost:8080/api/v1/info/status | grep -q 'UP'",
          ],
          subcontainer,
          {
            errorMessage: i18n('Stirling PDF is not ready'),
            message: () => i18n('Stirling PDF is ready'),
          },
        ),
    },
    requires: [],
  })
})
