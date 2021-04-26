import './App.css'
import './backoffice.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Products } from './pages/products'
import { MainOffice } from './pages/backoffice/router'
import { Sell } from './pages/seller/sell'
import { LoginContext } from './authContext'
import { requester } from 'utils/requester'

function App() {
	const [ logged, setLogged ] = useState(false)

	useEffect(async () => {
		const result = await context.requester('http://localhost/php-back/login/', 'POST')
		if (result.id) {
			setLogged(true)
		}
	}, [])

	const context = {logged, setLogged, requester: requester.bind(this, setLogged)}

	return (
		<LoginContext.Provider value={context}>
			<div className="App">
				<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login"component={Login} />
					<Route exact path="/register" component={Register} />
				{ !logged ? 
				<Route path="/" component={Login} />
				: <>
					<Route exact path="/products" component={Products} />
					<Route path="/backoffice" component={MainOffice} />
					<Route exact path="/seller/sell" component={Sell} />
					</>}
					</Switch>
				</BrowserRouter>
			</div>
		</LoginContext.Provider>
	)
}

export default App
