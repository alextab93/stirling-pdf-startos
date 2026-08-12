import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const getAdminCredentials = sdk.Action.withoutInput(
  'get-admin-credentials',
  async () => ({
    name: i18n('Get Admin Credentials'),
    description: i18n('Retrieve the generated Stirling PDF admin credentials'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async () => {
    const store = await storeJson.read((value) => value).once()

    if (!store) throw new Error('Admin credentials have not been initialized')

    return {
      version: '1' as const,
      title: i18n('Admin Credentials'),
      message: i18n('Use these credentials to sign in to Stirling PDF.'),
      result: {
        type: 'group' as const,
        value: [
          {
            type: 'single' as const,
            name: i18n('Username'),
            description: null,
            value: store.initialAdminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single' as const,
            name: i18n('Password'),
            description: null,
            value: store.initialAdminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
