import './App.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'


function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</BrowserRouter>
		</div>
	)
}

export default App
