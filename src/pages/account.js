import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from 'authContext'
import { Link } from 'react-router-dom'
import user from 'images/user-white.svg'
import { useTranslation } from 'react-i18next'

export const Account = () => {
  const context = useContext(LoginContext)
  const [infos, setInfos] = useState({})

  useEffect(async () => {
    const result = await context.requester(
      'http://localhost/php-back/userInfo/'
    )
    if (result.errors) {
      console.log(result.errors)
    } else {
      setInfos(result.infos)
    }
  }, [])

  const { t } = useTranslation('common')

  return (
    <div className="wrapper">
      <div className="center middle">
        <div className="tiny-nav-bar">
          <Link to="/products" className="cta-btn">
            {t('navbar.gosite')}
          </Link>
          <button className="cta-btn" onClick={() => context.logout()}>
            {t('navbar.logout')}
          </button>
          {infos.isAdmin !== '0' ? (
            <Link to="/backoffice" className="cta-btn">
              {t('navbar.goback')}
            </Link>
          ) : (
            <></>
          )}
        </div>
        <img
          style={{ marginTop: '1em' }}
          fill="white"
          src={user}
          width="50"
          height=""
        />
        <h1>{t('account.account')}</h1>
        <h3>
          {t('account.hello')} {infos.firstName}
        </h3>
        <span>{t('account.infos')}: </span>
        <div className="column">
          {infos.isValidated ? (
            <span className="important">You account is Not Validated</span>
          ) : (
            <></>
          )}
          <span>Email: {infos.email}</span>
          <span>
            {t('account.phone')}: {infos.phoneNumber}
          </span>
          <span>You are {!infos.isAdmin ? 'not' : ''} an admin</span>
          <span>
            {t('account.balance', { coins: infos.greenCoinsBalance })}
          </span>
          <span>
            You are {!infos.isAdmin ? 'not' : ''} an admin and register since{' '}
            {infos.inscriptionDate}
          </span>
        </div>
      </div>
    </div>
  )
}
