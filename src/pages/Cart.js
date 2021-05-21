import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Logo } from 'utils/Logo'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'
import { Button, ThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { useTranslation } from 'react-i18next'

export const Cart = () => {
  const { t } = useTranslation('common')

  const context = useContext(LoginContext)
  const { requester } = context
  const [products, setProducts] = useState([])
  const history = useHistory()

  const updateCart = async () => {
    const res = await requester('http://localhost/php-back/Cart/Content', 'GET')
    if (res.content) {
      setProducts(res.content)
    } else if (res.errors) {
      console.error({
        message: res.errors[0],
        time: 3000,
        type: 'failed',
      })
    }
  }

  const goCheckout = () => {
    history.push('/account/checkout')
  }

  const removeArticle = async (e) => {
    const res = await requester(
      'http://localhost/php-back/Product/RemoveFromCart',
      'POST',
      { id: e.target.id }
    )
    if (res.id) {
      updateCart()
    }
  }

  useEffect(() => {
    updateCart()
  }, [])

  console.log(products)
  return (
    <div className="wrapper">
      <header className="mainPage">
        <Logo />
        <span className="siteName">FairRepack</span>
        {context.logged ? (
          <button className="cta-btn" onClick={() => context.logout()}>
            {t('navbar.logout')}
          </button>
        ) : (
          <Link to="/login" className="cta-btn">
            Sign In
          </Link>
        )}
      </header>
      <div className="show-cart">
        <div className="wrapper-middle">
          <h3>{t('cart')}</h3>
          <span>{t('checkout.tobuy')}</span>
          <div className="cart">
            {products.map((product, i) => {
              return (
                <div key={i} className="cart-object">
                  <span>{product.product_modelmodelName}</span>
                  <span>
                    {t('condition')}: {product.conditionProduct}
                  </span>
                  <span>
                    {t('from')}: {product.warehouselocation}
                  </span>
                  <div
                    onClick={removeArticle}
                    id={product.idProduct}
                    style={{ marginLeft: '.5em', cursor: 'pointer' }}
                  >
                    X
                  </div>
                </div>
              )
            })}
            <ThemeProvider theme={theme}>
              <div style={{ alignSelf: 'flex-end', marginTop: '1em' }}>
                <Button
                  variant="contained"
                  color="primary"
                  role="link"
                  onClick={goCheckout}
                >
                  {t('checkout.checkout')}
                </Button>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
