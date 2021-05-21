import React, { useContext, useEffect, useState } from 'react'

import { Logo } from 'utils/Logo'
import { Link, useHistory } from 'react-router-dom'
import { LoginContext } from 'authContext'
import { ThemeProvider, Button } from '@material-ui/core'

import PropTypes from 'prop-types'
import { theme } from '../theme'
import { useTranslation } from 'react-i18next'

/*const brands = new Set()
const models = new Set()
const categories = new Set()*/

/*const Menu = () => {
  const { t } = useTranslation('common')

  const sorts = [
    {
      name: t('Brand'),
      values: [...brands],
    },
    {
      name: t('Model'),
      values: [...models],
    },
    {
      name: t('Category'),
      values: [...categories],
    },
  ]

  return (
    <div className="menu">
      {sorts.map((sort, i) => (
        <div className="sort-section" key={i}>
          <span className="category-name">{sort.name}</span>
          <div className="category-values-list">
            {sort.values.map((value, y) => (
              <span key={y}>
                <Checkbox defaultChecked color="primary" />
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}*/

//const updateFilter = (filterSet) => {
//}

const Product = ({ updater }) => {
  const { t } = useTranslation('common')
  const context = useContext(LoginContext)
  const { requester } = context

  const [products, setProducts] = useState([])
  //const [brands, setBrands] = useState(null)
  //const [models, setModels] = useState(null)

  useEffect(async () => {
    const modelProducts = await requester(
      'http://localhost/php-back/Product/ReadAll',
      'GET'
    )
    if (modelProducts.errors) {
      console.error({
        message: modelProducts.errors[0],
        time: 3000,
        type: 'failed',
      })
    } else {
      setProducts(modelProducts)
    }

    /*brands.clear()
    models.clear()
    categories.clear()

    for (const modelProductsKey in modelProducts) {
      brands.add(modelProducts[modelProductsKey].brandName)
      models.add(modelProducts[modelProductsKey].modelName)
      categories.add(modelProducts[modelProductsKey].categoryName)
    }*/
  }, [])

  const buyProduct = async (e) => {
    console.log(e)
    await requester('http://localhost/php-back/Product/AddToCart', 'POST', {
      id: e,
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
              <span>
                <del>{object.officialPrice}</del> €
              </span>
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
              <Button
                variant="contained"
                color="primary"
                onClick={buyProduct.bind(this, object.idProduct)}
              >
                {t('buy')}
              </Button>
            </ThemeProvider>
          </div>
        </div>
      ))}
    </div>
  )
}

const Cart = ({ products }) => {
  const { t } = useTranslation('common')
  const history = useHistory()
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        history.push('/account/cart')
      }}
      className="cart-logo"
    >
      {t('cart')}: {products}
    </div>
  )
}

export const Products = () => {
  const { t } = useTranslation('common')
  const context = useContext(LoginContext)
  const { requester } = context

  const [productCart, setProductCart] = useState(0)
  //const [brands, setBrands] = useState(new Set())
  //const [models, setModels] = useState(new Set())
  //const [categories, setCategories] = useState(new Set())

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
          {t('navbar.sell')}
        </Link>
        <Link to="/account/activities" className="cta-btn simple">
          {t('navbar.activities')}
        </Link>
        {context.logged ? (
          <Link to="/user/account" className="cta-btn simple">
            {t('navbar.account')}
          </Link>
        ) : (
          <Link to="/login" className="cta-btn">
            {t('navbar.signin')}
          </Link>
        )}
      </header>
      <div className="menu-all">
        {/* <Menu brands={brands} /> */}
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
