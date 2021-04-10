import './App.css'
import './backoffice.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Products } from './pages/products'
import { MainOffice } from './pages/backoffice/index'

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/products" component={Products} />
				<Route path="/backoffice" component={MainOffice} />
			</BrowserRouter>
		</div>
	)
}

export default App
