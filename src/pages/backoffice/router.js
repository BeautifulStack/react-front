import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { Products } from './pages/products'
import { Users } from './pages/users'
import { Associations } from './pages/associations'
import { Categories } from './pages/category'
import { Brand } from './pages/brands'
import { Project } from './pages/projects'
import { Offers } from './pages/offers'

import user from 'images/user.svg'
import brand from 'images/brand-codepen.svg'
import category from 'images/category-alt.svg'
import products from 'images/barcode.svg'
import project from 'images/project.svg'
import associations from 'images/building.svg'
import website from 'images/website.svg'

export const MainOffice = () => {
  return (
    <div className="backoffice-wrapper">
      <div className="navigator">
        <div className="navigator-centerer">
          <Link to="/backoffice/users" className="backoffice-nav">
            <img className="nav-img" src={user} />
          </Link>
          <Link to="/backoffice/brands" className="backoffice-nav">
            <img className="nav-img" src={brand} />
          </Link>
          <Link to="/backoffice/categories" className="backoffice-nav">
            <img className="nav-img" src={category} />
          </Link>
          <Link to="/backoffice/product" className="backoffice-nav">
            <img className="nav-img" src={products} />
          </Link>
          <Link to="/backoffice/associations" className="backoffice-nav">
            <img className="nav-img" src={associations} />
          </Link>
          <Link to="/backoffice/projets" className="backoffice-nav">
            <img className="nav-img" src={project} />
          </Link>
          <Link to="/backoffice/offers" className="backoffice-nav">
            <img className="nav-img" src={project} />
          </Link>
          <Link to="/products" className="backoffice-nav">
            <img className="nav-img" src={website} />
          </Link>
        </div>
      </div>
      <div className="backoffice-page">
        <Switch>
          <Route path="/backoffice/users" component={Users} />
          <Route path="/backoffice/projets" component={Project} />
          <Route path="/backoffice/associations" component={Associations} />
          <Route path="/backoffice/product" component={Products} />
          <Route path="/backoffice/categories" component={Categories} />
          <Route path="/backoffice/brands" component={Brand} />
          <Route path="/backoffice/offers" component={Offers} />

          <Route exact path="/backoffice">
            <Redirect to="/backoffice/users" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
