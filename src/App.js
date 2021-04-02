import './App.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				{/* <Route path="/about" component={About} />
				<Route path="/topics" component={Topics} /> */}
			</BrowserRouter>
		</div>
	)
}

export default App
