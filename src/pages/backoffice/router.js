import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { Products } from './pages/products'
import { Users } from './pages/users'
import { Associations } from './pages/associations'
import { Categories } from './pages/category'
import { Brand } from './pages/brands'

export const MainOffice = () => {
	return (
		<div className='backoffice-wrapper'>
			<div className='navigator'>
				<div className='navigator-centerer'>
					<Link to='/backoffice/users' className='backoffice-nav'><span>Users</span></Link>
					<Link to='/backoffice/brands' className='backoffice-nav'><span>Brands</span></Link>
					<Link to='/backoffice/categories' className='backoffice-nav'><span>Categories</span></Link>
					<Link to='/backoffice/product' className='backoffice-nav'><span>Model</span></Link>
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
					<Route path='/backoffice/categories' component={Categories}/>
					<Route path='/backoffice/brands' component={Brand}/>

					<Route exact path="/backoffice">
						<Redirect to='/backoffice/users' />
					</Route>
				</Switch>
			</div>
		</div>
	)
} 