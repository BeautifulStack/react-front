import './App.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/home'

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				{/* <Route path="/about" component={About} />
				<Route path="/topics" component={Topics} /> */}
			</BrowserRouter>
		</div>
	)
}

export default App
