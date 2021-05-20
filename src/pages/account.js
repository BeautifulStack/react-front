import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from 'authContext'
import { Link } from 'react-router-dom'
import user from 'images/user-white.svg'

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

  return (
    <div className="wrapper">
      <div className="center middle">
        <div className="tiny-nav-bar">
          <Link to="/products" className="cta-btn">
            Back to Site
          </Link>
          <button className="cta-btn" onClick={() => context.logout()}>
            Logout
          </button>
          {infos.isAdmin !== '0' ? (
            <Link to="/backoffice" className="cta-btn">
              Go to Backoffice
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
        <h1>Your Account</h1>
        <h3>Hello {infos.firstName}</h3>
        <span>Here are the informations we have on you: </span>
        <div className="column">
          {infos.isValidated ? (
            <span className="important">You account is Not Validated</span>
          ) : (
            <></>
          )}
          <span>Email: {infos.email}</span>
          <span>Phone Number: {infos.phoneNumber}</span>
          <span>You are {!infos.isAdmin ? 'not' : ''} an admin</span>
          <span>
            You GreenCoins balance is of {infos.greenCoinsBalance} coins
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
