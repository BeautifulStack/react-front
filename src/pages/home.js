import React, { useContext } from 'react'
import { Logo } from 'utils/Logo'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'
import { useTranslation } from 'react-i18next'

export const Home = () => {
  const context = useContext(LoginContext)
  const { t } = useTranslation('common')

  return (
    <div className="wrapper">
      <header className="mainPage">
        <Logo />
        <span className="siteName">FairRepack</span>
        {context.logged ? (
          <button className="cta-btn" onClick={() => context.logout()}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="cta-btn">
            Sign In
          </Link>
        )}
      </header>
      <div className="divAnim"></div>
      <div className="Left paragraphe">
        <Link className="link" to="/products">
          {t('button.products')}
        </Link>
      </div>
      <div className="Left paragraphe">
        <p>{t('home.par1')}</p>
      </div>
      <div className="Right paragraphe">
        <p>{t('home.par2')}</p>
      </div>
    </div>
  )
}
