import { createIntl, createIntlCache, IntlShape } from 'react-intl'
import enMessages from './locales/en.json'
import plMessages from './locales/pl.json'

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  pl: plMessages,
}

const cache = createIntlCache()

export let intl: IntlShape = createIntl(
  {
    locale: 'pl',
    messages: messages['pl'],
  },
  cache
)

export const changeLanguage = (language: string): IntlShape => {
  if (messages[language]) {
    intl = createIntl(
      {
        locale: language,
        messages: messages[language],
      },
      cache
    )
  }
  return intl
}
