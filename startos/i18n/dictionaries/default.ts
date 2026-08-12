export const DEFAULT_LANG = 'en_US'

const dict = {
  'Stirling PDF': 0,
  'Stirling PDF is ready': 1,
  'Stirling PDF is not ready': 2,
  'The Stirling PDF web interface': 3,
  'Get Admin Credentials': 4,
  'Retrieve the generated Stirling PDF admin credentials': 5,
  'Admin Credentials': 6,
  'Use these credentials to sign in to Stirling PDF.': 7,
  Username: 8,
  Password: 9,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
