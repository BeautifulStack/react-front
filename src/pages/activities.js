import React, { useContext, useEffect, useState } from 'react'
import { Logo } from 'utils/Logo'
import PropTypes from 'prop-types'
import { Link, useHistory, useParams } from 'react-router-dom'
import { theme } from 'theme'
import { ThemeProvider, Button } from '@material-ui/core'
import { LoginContext } from 'authContext'

export const Activities = () => {
  const context = useContext(LoginContext)
  const [offer, setOffer] = useState([])
  const [models, setModels] = useState([])

  const history = useHistory()

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

  const clickHandler = (id) => {
    history.push('/account/activities/offer/' + id)
  }

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
              let status = ''
              if (offer.isAccepted === '1') status = 'Accepted'
              if (offer.isAccepted === '0') status = 'No Response'
              if (offer.isAccepted === '2') status = 'Refused'
              if (offer.isAccepted === '2' && !offer.counterOffer)
                status = 'Closed'

              let newOffer = false
              if (offer.counterOffer) {
                offer.counterOffer.forEach((suboffer) => {
                  if (suboffer.isAccepted === '0') {
                    newOffer = true
                  }

                  if (suboffer.isAccepted === '2' && !suboffer.counterOffer)
                    status = 'Closed'
                })
              }

              return (
                <div
                  onClick={clickHandler.bind(this, offer.idOffer)}
                  key={i}
                  style={{
                    borderBottom: '1px dashed #E6BC17',
                    paddingBottom: '.5em',
                  }}
                >
                  <div className="cart-object" style={{ borderBottom: 'none' }}>
                    <span>{offer.idOffer}</span>
                    <span>{nameModel}</span>
                    <span>{offer.conditionOffer}</span>
                    <span>Prix: {offer.price}€</span>
                    <span>{status}</span>
                    <span style={{ flex: '2' }}>{offer.dateOffer}</span>
                  </div>
                  {newOffer ? (
                    <div>
                      <span style={{ color: '#E6BC17' }}>
                        A New Offer is available
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )
            })}
          </div>
        </ThemeProvider>
      </div>
    </div>
  )
}

export const ActivitiesById = () => {
  const context = useContext(LoginContext)
  const { requester } = context
  const { id } = useParams()

  const [offers, setOffers] = useState([])

  const getHistory = async () => {
    const resp = await requester(
      'http://localhost/php-back/Offer/History?id=' + id
    )
    if (resp.errors) {
      console.log(resp.errors)
    } else {
      setOffers(resp)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  const acceptOffer = async (offer) => {
    await requester('http://localhost/php-back/Offer/Update', 'POST', {
      id: offer.idOffer,
      isAccepted: 1,
    })
    getHistory()
  }

  const denyOffer = async (offer) => {
    await requester('http://localhost/php-back/Offer/Update', 'POST', {
      id: offer.idOffer,
      isAccepted: 2,
    })
    getHistory()
  }

  const counterOffer = async (newPrice, reason, offer) => {
    const res = await requester(
      'http://localhost/php-back/Offer/CounterOffer',
      'POST',
      {
        id: offer.idOffer,
        price: newPrice,
        conditionOffer: reason,
        idModel: offer.idModel,
      }
    )
    if (!res.id) {
      console.log(res)
    } else {
      getHistory()
    }
  }

  const onClickHandler = (type, offer) => {
    if (type === 'DENY') {
      const accept = confirm(
        'You want to deny our offer, if so, we will return you your product'
      )
      if (accept) denyOffer(offer)
    }
    if (type === 'ACCEPT') {
      const accept = confirm('You want to accept our offer ?')
      if (accept) acceptOffer(offer)
    }
    if (type === 'COUNTER') {
      const newPrice = prompt('Enter yout new price')
      if (newPrice === null) return
      const reason = prompt('Enter the reason')
      if (reason === null) return
      counterOffer(newPrice, reason, offer)
    }
  }

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
          <h3>Your offer N°{id + "'"}s history</h3>
          {offers.map((offer, i) => (
            <OfferLine
              onClick={onClickHandler}
              key={i}
              idOffer={offer.idOffer}
              price={offer.price}
              date={offer.dateOffer}
              isAccepted={offer.isAccepted}
              user={offer.idUser}
              counterOffer={offer.counterOffer}
              offer={offer}
            />
          ))}
        </ThemeProvider>
      </div>
    </div>
  )
}

const OfferLine = ({
  date,
  user,
  price,
  isAccepted,
  idOffer,
  counterOffer,
  onClick,
  offer,
}) => {
  console.log(user, isAccepted)
  let status
  if (isAccepted === '1') status = 'accepted-offer'
  if (isAccepted === '0') status = 'no-response-offer'
  if (isAccepted === '2') status = 'refused-offer'
  if (isAccepted === '2' && !counterOffer) status = 'closed-offer'

  return (
    <div className={'offer-line'}>
      <div className={'offer-line-inner ' + status}>
        <span>Offer: {idOffer}</span>
        <span>Proposed price: {price}</span>
        <span>Date: {date}</span>
      </div>
      {user === 'Us' && isAccepted === '0' ? (
        <div className="offer-btn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onClick('ACCEPT', offer)
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onClick('COUNTER', offer)
            }}
          >
            Counter Offer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onClick('DENY', offer)
            }}
          >
            Deny
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

OfferLine.propTypes = {
  isAccepted: PropTypes.number,
  counterOffer: PropTypes.number,
  idOffer: PropTypes.number,
  price: PropTypes.float,
  date: PropTypes.string,
  user: PropTypes.string,
  onClick: PropTypes.func,
  offer: PropTypes.object,
}
