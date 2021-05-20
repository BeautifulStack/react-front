/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { Logo } from 'utils/Logo'
import { Link, useHistory } from 'react-router-dom'
import {
  TextField,
  ThemeProvider,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { LoginContext } from 'authContext'
import { theme } from 'theme'

export const Sell = () => {
  const history = useHistory()
  const context = useContext(LoginContext)

  const [listModels, setListModels] = useState([])
  const [proposedPrice, setProposedPrice] = useState(-1)
  const [brand, setBrand] = useState('None')
  const [condition, setCondition] = useState(0)
  const [box, setBox] = useState(0)
  const [model, setModel] = useState('None')
  const [files, setFiles] = useState([])

  useEffect(async () => {
    if (brand !== 'None' && model !== 'None') {
      const params = {
        modelId: model,
        accessories: box,
        state: condition,
      }
      const estimation = await context.requester(
        'http://localhost/php-back/estimate/',
        'POST',
        params
      )
      if (estimation.estimation) {
        setProposedPrice(estimation.estimation)
      }
    }
  }, [model, box, condition])

  useEffect(async () => {
    const modelsXbrand = await context.requester(
      'http://localhost/php-back/ProductModel/ReadAll'
    )
    if (modelsXbrand.errors) {
      console.error(modelsXbrand.errors)
    } else {
      const total = []
      modelsXbrand.forEach((model) => {
        if (!total.includes(model.brandbrandName))
          total.push(model.brandbrandName)
      })

      const model = {}
      total.forEach((brand) => {
        model[brand] = []
      })

      modelsXbrand.forEach((singleModel) => {
        model[singleModel.brandbrandName].push({
          id: singleModel.idModel,
          name: singleModel.modelName,
          price: singleModel.officialPrice,
          category: singleModel.categorycategoryName,
          brand: singleModel.brandbrandName,
        })
      })
      setListModels(model)
    }
  }, [])

  const createOffer = async () => {
    let state
    if (condition === 0) {
      state = 'Good'
    } else if (condition === 1) {
      state = 'Usé modérément'
    } else if (condition === 2) {
      state = 'Usé'
    } else if (condition === 3) {
      state = 'Abimé'
    }

    const params = {
      price: proposedPrice,
      conditionOffer: state,
      idModel: model,
    }

    const response = await context.requester(
      'http://localhost/php-back/Offer/Create',
      'POST',
      params,
      files
    )

    if (response.error) {
      console.log(response)
    } else {
      history.push('/account/activities')
    }
  }

  return (
    <div className="wrapper">
      <header className="mainPage">
        <Logo />
        <Link to="/products" className="cta-btn simple">
          Home
        </Link>
        <Link to="/seller/sell" className="cta-btn">
          Sell a Thing
        </Link>
        <Link to="/account/activities" className="cta-btn simple">
          My Activities
        </Link>
        <Link to="/user/account" className="cta-btn simple">
          My accounts
        </Link>
      </header>
      <div className="sell-all">
        <ThemeProvider theme={theme}>
          <div className="loginForm">
            <span className="textWrapper">
              <InputLabel id="brand-selector">Brand</InputLabel>
              <Select
                labelId="brand-selector"
                value={brand}
                onChange={(x) => setBrand(x.target.value)}
              >
                {Object.keys(listModels).map((brand, i) => (
                  <MenuItem key={i} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </span>

            <span className="textWrapper">
              <InputLabel id="model-selector">Model</InputLabel>
              <Select
                labelId="model-selector"
                value={model}
                onChange={(x) => setModel(x.target.value)}
              >
                {brand !== 'None' ? (
                  listModels[brand].map((model, i) => {
                    return (
                      <MenuItem key={i} value={model.id}>
                        {model.name}
                      </MenuItem>
                    )
                  })
                ) : (
                  <></>
                )}
              </Select>
            </span>

            {model !== 'None' ? (
              <span className="textWrapper">
                <InputLabel id="model-selector">Etat</InputLabel>
                <Select
                  labelId="model-selector"
                  value={condition}
                  onChange={(x) => setCondition(x.target.value)}
                >
                  <MenuItem value={0}>Neuf</MenuItem>
                  <MenuItem value={1}>Usé modérément</MenuItem>
                  <MenuItem value={2}>Usé</MenuItem>
                  <MenuItem value={3}>Abimé par le temps</MenuItem>
                </Select>
              </span>
            ) : null}

            {model !== 'None' ? (
              <span className="textWrapper">
                <InputLabel id="model-selector">Box and charger</InputLabel>
                <Select
                  labelId="model-selector"
                  value={box}
                  onChange={(x) => setBox(x.target.value)}
                >
                  <MenuItem value={0}>I have Box</MenuItem>
                  <MenuItem value={1}>I have charger</MenuItem>
                  <MenuItem value={2}>I have Box and Charger</MenuItem>
                  <MenuItem value={3}>
                    {'I don\'t have box and charger'}
                  </MenuItem>
                </Select>
              </span>
            ) : null}
            <div style={{ marginTop: '1em' }}>
              <input
                onChange={(x) => setFiles(x.target.files)}
                type="file"
                multiple
              />
            </div>
            <span className="textWrapper">
              <TextField
                id="outlined-required"
                variant="outlined"
                type="text"
                label="Tell us more about the product"
              />
            </span>
            <span className="priceDiv">
              {proposedPrice !== -1 ? (
                <>
                  For this product, we can propose you:{' '}
                  <strong>{proposedPrice}</strong>!
                </>
              ) : (
                <>To Estimate your product, please fill all the fields</>
              )}
            </span>
            <span className="submitBtn">
              <Button variant="contained" color="primary" onClick={createOffer}>
                Propose Product
              </Button>
            </span>
          </div>
        </ThemeProvider>
      </div>
    </div>
  )
}
