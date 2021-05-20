import React, { useContext, useEffect, useState } from 'react'

import { Logo } from 'utils/Logo'
import { Link, useHistory } from 'react-router-dom'
import { LoginContext } from 'authContext'
import { ThemeProvider, Button, Checkbox } from '@material-ui/core'

import PropTypes from 'prop-types'
import {theme} from '../theme'

const brands = new Set()
const models = new Set()
const categories = new Set()

const Menu = () => {
  const sorts = [
    {
      name: 'Brand',
      values: [...brands],
    },
    {
      name: 'Model',
      values: [...models],
    },
    {
      name: 'Category',
      values: [...categories],
    }
  ]

  return (
      <div className="menu">
        {sorts.map((sort, i) => (
            <div className="sort-section" key={i}>
              <span className="category-name">{sort.name}</span>
              <div className="category-values-list">
                {sort.values.map((value, y) => (
                    <span key={y}>
                      <Checkbox defaultChecked color="primary"/>
                      {value}
                    </span>
                ))}
              </div>
            </div>
        ))}
      </div>
  )
}

//const updateFilter = (filterSet) => {
//}

const Product = ({ updater }) => {
  const context = useContext(LoginContext)
  const { requester } = context

  const [products, setProducts] = useState([])
  //const [brands, setBrands] = useState(null)
  //const [models, setModels] = useState(null)

  useEffect(async () => {
    const modelProducts = await requester('http://localhost/php-back/Product/ReadAll', 'GET')
    if (modelProducts.errors) {
      console.error({
        message: modelProducts.errors[0],
        time: 3000,
        type: 'failed',
      })
    } else {
      setProducts(modelProducts)
    }

    brands.clear()
    for (const modelProductsKey in modelProducts) {
      brands.add(modelProducts[modelProductsKey].brandName)
      models.add(modelProducts[modelProductsKey].modelName)
      categories.add(modelProducts[modelProductsKey].categoryName)
    }

  }, [])

  const buyProduct = async (e) => {
    await requester('http://localhost/php-back/Product/AddToCart', 'POST', {
      id: e.target.id,
    })
    updater()
  }

  return (
      <div className="products">
        {products.map((object, index) => (
            <div key={index} className="product">
              <div className="product-image">
                <img
                    width="120"
                    src={'http://localhost/php-back/' + object.path}
                    alt={object.product_modelmodelName}
                />
                <div className="product-prices">
                  <span><del>{object.officialPrice}</del> €</span>
                  <span>{Math.round(object.officialPrice * 0.66)} €</span>
                </div>
              </div>
              <div className="product-buy">
                <div className="product-info">
                  <span>{object.brandName}</span>
                  <span className="product-model">
                    {object.product_modelmodelName}
                  </span>
                </div>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" color="primary" id={object.idProduct} onClick={buyProduct}>
                    Buy
                  </Button>
                </ThemeProvider>
              </div>
            </div>
        ))}
      </div>
  )
}

const Cart = ({ products }) => {
  const history = useHistory()
  return (
      <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
        history.push('/account/cart')
          }}
          className="cart-logo"
      >
        Cart: {products}
      </div>
  )
}

export const Products = () => {
  const context = useContext(LoginContext)
  const { requester } = context

  const [productCart, setProductCart] = useState(0)

  const updateCart = async () => {
    const res = await requester('http://localhost/php-back/Cart/Content', 'GET')
    if (res.content) {
      setProductCart(res.content.length)
    } else if (res.errors) {
      console.error({
        message: res.errors[0],
        time: 3000,
        type: 'failed',
      })
    }
  }

  useEffect(() => {
    updateCart()
  }, [])

  return (
      <div className="wrapper">
        <header className="mainPage">
          <Logo />
          <Link to="/products" className="cta-btn">
            Home
          </Link>
          <Link to="/seller/sell" className="cta-btn simple">
            Sell a Thing
          </Link>
          <Link to="/account/activities" className="cta-btn simple">
            My Activities
          </Link>
          {context.logged ? (
              <Link to="/user/account" className="cta-btn simple">
                My accounts
              </Link>
          ) : (
              <Link to="/login" className="cta-btn">
                Sign In
              </Link>
          )}
        </header>
        <div className="menu-all">
          <Menu brands={brands} />
          <Product updater={updateCart} />
          <Cart products={productCart} />
        </div>
      </div>
  )
}

Cart.propTypes = {
  products: PropTypes.number,
}

Product.propTypes = {
  updater: PropTypes.func,
}
