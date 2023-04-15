import { useIntl } from 'react-intl'
import { MessageDescriptor } from 'react-intl'

type TranslationsHook = {
  formatMessage: (
    descriptor: MessageDescriptor,
    values?: Record<string, string | number | boolean | Date | null | undefined>
  ) => string
}

export const useTranslations = (): TranslationsHook => {
  const intl = useIntl()

  const formatMessage = (
    descriptor: MessageDescriptor,
    values?: Record<string, string | number | boolean | Date | null | undefined>
  ): string => {
    return intl.formatMessage(descriptor, values)
  }

  return {
    formatMessage,
  }
}
