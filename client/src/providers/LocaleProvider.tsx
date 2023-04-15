// src/LocaleProvider.tsx
import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import { intl, changeLanguage } from '../language'

interface LocaleProviderProps {
  children: React.ReactNode
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [currentIntl, setCurrentIntl] = useState(intl)

  const handleLanguageChange = (language: string) => {
    setCurrentIntl(changeLanguage(language))
  }

  return (
    <IntlProvider {...currentIntl}>
      {React.cloneElement(children as React.ReactElement, {
        onLanguageChange: handleLanguageChange,
      })}
    </IntlProvider>
  )
}

export default LocaleProvider
