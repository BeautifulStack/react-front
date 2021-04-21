import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Products } from './pages/products'
import { Users } from './pages/users'
import { Associations } from './pages/associations'

export const MainOffice = () => {
	return (
		<div className='backoffice-wrapper'>
			<div className='navigator'>
				<div className='navigator-centerer'>
					<Link to='/backoffice/users' className='backoffice-nav'><span>Users</span></Link>	
					<Link to='/backoffice/product' className='backoffice-nav'><span>Products</span></Link>
					<Link to='/backoffice/associations' className='backoffice-nav'><span>Associations</span></Link>
					<Link to='/backoffice/projets' className='backoffice-nav'><span>Projets</span></Link>
				</div>
			</div>
			<div className='backoffice-page'>
				<Switch>
					<Route path='/backoffice/users' component={Users}/>
					<Route path='/backoffice/projets' component={Products}/>
					<Route path='/backoffice/associations' component={Associations}/>
					<Route path='/backoffice/product' component={Products}/>
				</Switch>
			</div>
		</div>
	)
} 