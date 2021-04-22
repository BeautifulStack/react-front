import './App.css'
import './backoffice.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Products } from './pages/products'
import { MainOffice } from './pages/backoffice/router'
import { Sell } from './pages/seller/sell'


function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/products" component={Products} />
				<Route path="/backoffice" component={MainOffice} />
				<Route exact path="/seller/sell" component={Sell} />
			</BrowserRouter>
		</div>
	)
}

export default App
