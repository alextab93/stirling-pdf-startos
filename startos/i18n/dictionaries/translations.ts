import { LangDict } from './default'

const en: LangDict = {
  0: 'Stirling PDF',
  1: 'Stirling PDF is ready',
  2: 'Stirling PDF is not ready',
  3: 'The Stirling PDF web interface',
  4: 'Get Admin Credentials',
  5: 'Retrieve the generated Stirling PDF admin credentials',
  6: 'Admin Credentials',
  7: 'Use these credentials to sign in to Stirling PDF.',
  8: 'Username',
  9: 'Password',
}

export default {
  es_ES: en,
  de_DE: en,
  pl_PL: en,
  fr_FR: en,
} satisfies Record<string, LangDict>
