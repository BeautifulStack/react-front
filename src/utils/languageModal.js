import React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageModal = () => {
  const [t, i18n] = useTranslation('common')

  return (
    <div className="modalLanguage">
      <span>{t('language')}</span>
      <button onClick={() => i18n.changeLanguage('fr')}>Francais</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  )
}
