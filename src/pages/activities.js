import React, { useContext, useEffect, useState } from 'react'
import { Logo } from 'utils/Logo'

import { Link } from 'react-router-dom'
import { theme } from 'theme'
import { ThemeProvider } from '@material-ui/core'
import { LoginContext } from 'authContext'

export const Activities = () => {
  const context = useContext(LoginContext)
  const [offer, setOffer] = useState([])
  const [models, setModels] = useState([])

  useEffect(async () => {
    const res = await context.requester(
      'http://localhost/php-back/Offer/All',
      'GET'
    )
    if (res.errors) {
      console.error(res.errors)
    } else {
      setOffer(res.content)
    }
  }, [])

  useEffect(async () => {
    const tmp = []
    for (const offers of offer) {
      if (tmp.find((model) => model.idModel === offers.idModel)) continue
      const res = await context.requester(
        'http://localhost/php-back/ProductModel/Read/' + offers.idModel,
        'GET'
      )
      if (res.errors) {
        console.error(res.errors)
      } else {
        tmp.push(res[0])
      }
    }

    setModels(tmp)
  }, [offer])

  return (
    <div className="wrapper">
      <header className="mainPage">
        <Logo />
        <Link to="/products" className="cta-btn simple">
          Home
        </Link>
        <Link to="/seller/sell" className="cta-btn simple">
          Sell a Thing
        </Link>
        <Link to="/account/activities" className="cta-btn ">
          My Activities
        </Link>
        <Link to="/user/account" className="cta-btn simple">
          My accounts
        </Link>
      </header>
      <div className="wrapper-middle" style={{ width: '55%' }}>
        <ThemeProvider theme={theme}>
          <h3>Activities</h3>
          <span>Here are all you past activities</span>
          <div className="cart">
            {offer.map((offer, i) => {
              let nameModel = 'a'
              const model = models.find((model) => {
                return model.idModel === offer.idModel
              })
              nameModel = model ? model.modelName : nameModel

              return (
                <div key={i} className="cart-object">
                  <span>{offer.idOffer}</span>
                  <span>{nameModel}</span>
                  <span>{offer.conditionOffer}</span>
                  <span>Prix: {offer.price}€</span>
                  <span>
                    {offer.isAccepted === 0 ? 'Accepted' : 'Not Accepted'}
                  </span>
                  <span style={{ flex: '2' }}>{offer.dateOffer}</span>

                  <div
                    onClick={() => console.log('a')}
                    id={offer.idProduct}
                    style={{ marginLeft: '.5em', cursor: 'pointer' }}
                  >
                    X
                  </div>
                </div>
              )
            })}
          </div>
        </ThemeProvider>
      </div>
    </div>
  )
}
