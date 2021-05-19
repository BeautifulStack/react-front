import React, { useContext, useState, useEffect } from 'react'
import { Logo } from 'utils/Logo'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'
//import { Button, ThemeProvider } from '@material-ui/core'
//import { theme } from 'theme'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {PaymentForm} from 'pages/PaymentForm'
import Fade from 'react-reveal/Fade'

export const Payment = () => {
  const context = useContext(LoginContext)
  const [price, setPrice] = useState(0)
  const { requester } = context
  const stripePromise = loadStripe('pk_test_51IoECAGhzmo20Me7YY9TfXe3cWzECpBBD1hfobRydR8DnnYdWGo50Rs2UMm9Mxbi9fYa339vatoeD28Gr5lcZLOV00lP9Otpka')

  const getPrice = async () => {
    const res = await requester('http://localhost/php-back/Cart/Price', 'GET')
    if (res.price) {
      setPrice(res.price)
    } else if (res.errors) {
      console.error({
        message: res.errors[0],
        time: 3000,
        type: 'failed',
      })
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

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
      <div className="wrapper-middle">
        {price === 0 ? (
            <h1>Empty cart...</h1>
        ) : (
          <Fade bottom>
            <h1>Total : {price} €</h1>
            <div className="wrapper-middle">
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </div>
          </Fade>
        )
        }
      </div>
    </div>
  )
}
