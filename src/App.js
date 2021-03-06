import './App.css'
import './backoffice.css'
import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Products } from './pages/products'
import { MainOffice } from './pages/backoffice/router'
import { Sell } from './pages/seller/sell'
import { Account } from './pages/account'
import { Validation } from './pages/waitingValidation'
import { Cart } from './pages/Cart'
import { Activities, ActivitiesById } from './pages/activities'
import { LoginContext } from './authContext'
import { requester, logout } from 'utils/requester'
import { Payment } from './pages/Payment'
import { LanguageModal } from './utils/languageModal'

function App() {
  const [logged, setLogged] = useState(false)

  useEffect(async () => {
    const result = await context.requester(
      'http://localhost/php-back/login/',
      'POST'
    )
    if (result.id) {
      setLogged(true)
    }
  }, [])

  const context = {
    logged,
    setLogged,
    requester: requester.bind(this, setLogged),
    logout: logout.bind(this, setLogged),
  }

  return (
    <Suspense fallback="loading">
      <LoginContext.Provider value={context}>
        <div className="App">
          <BrowserRouter>
            <LanguageModal />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/account/validation" component={Validation} />

              {!logged ? (
                <Route path="/" component={Login} />
              ) : (
                <>
                  <Route exact path="/user/account" component={Account} />
                  <Route
                    exact
                    path="/account/activities"
                    component={Activities}
                  />

                  <Route
                    exact
                    path="/account/activities/offer/:id"
                    component={ActivitiesById}
                  />

                  <Route exact path="/account/cart" component={Cart} />
                  <Route exact path="/account/checkout" component={Payment} />
                  <Route exact path="/products" component={Products} />
                  <Route path="/backoffice" component={MainOffice} />
                  <Route exact path="/seller/sell" component={Sell} />
                </>
              )}
            </Switch>
          </BrowserRouter>
        </div>
      </LoginContext.Provider>
    </Suspense>
  )
}

export default App
