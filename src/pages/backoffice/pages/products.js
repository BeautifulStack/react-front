import {
  ThemeProvider,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core'
import { theme } from 'theme'
import { Table } from 'utils/table'
import { Modal } from 'utils/modal'
import { useState } from 'react'
import React, { useEffect, useContext } from 'react'
import { LoginContext } from 'authContext'

export const Products = () => {
  const context = useContext(LoginContext)
  const { requester } = context
  const [category, setCategory] = useState(-1)
  const [brand, setBrand] = useState(-1)
  const [editing, setEditing] = useState(false)

  const [modal, setModal] = useState(null)

  const [files, setFiles] = useState(null)

  const [modelName, setModelName] = useState('')
  const [modelPrice, setModelPrice] = useState(0)

  const [models, setModels] = useState(null)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  console.log(brands, categories)

  const changeModal = (args) => {
    setModal(null)
    setTimeout(() => {
      setModal(args)
    }, 1)
  }

  useEffect(async () => {
    const brands = await requester(
      'http://localhost/php-back/Brand/ReadAll',
      'GET'
    )
    if (brands.errors) {
      changeModal({ message: brands.errors[0], time: 3000, type: 'failed' })
    } else {
      setBrands(brands)
    }
    const categories = await requester(
      'http://localhost/php-back/Category/ReadAll',
      'GET'
    )
    if (categories.errors) {
      changeModal({ message: categories.errors[0], time: 3000, type: 'failed' })
    } else {
      setCategories(categories)
    }
  }, [])

  useEffect(async () => {
    const models = await requester(
      'http://localhost/php-back/ProductModel/ReadAll',
      'GET'
    )
    if (models.errors) {
      changeModal({ message: models.errors[0], time: 3000, type: 'failed' })
    } else {
      setModels(models)
    }
  }, [editing])

  const createProductModel = async () => {
    const params = {
      modelName: modelName,
      officialPrice: modelPrice,
      idBrand: brand,
      idCategory: category,
    }
    const response = await requester(
      'http://localhost/php-back/ProductModel/Create',
      'POST',
      params,
      files
    )
    if (response.errors) {
      changeModal({ message: response.errors[0], time: 3000, type: 'failed' })
    } else {
      changeModal({
        message: 'Your model has been submited!',
        time: 3000,
        type: 'success',
      })
      setEditing(false)
    }
  }

  return (
    <div className="backoffice-page-wrapper">
      {modal ? (
        <Modal time={modal.time} message={modal.message} type={modal.type} />
      ) : null}

      <div className="backoffice-title">Model</div>
      <ThemeProvider theme={theme}>
        {!editing ? (
          <span className="submitBtn" onClick={() => setEditing(true)}>
            <Button variant="contained" color="primary">
              Add Model
            </Button>
          </span>
        ) : (
          <div className="editing-line">
            <div className="input-wrapper">
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value)
                }}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                {categories.length !== 0
                  ? categories.map((category, i) => (
                      <MenuItem key={i} value={category.idCategory}>
                        {category.categoryName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </div>

            <div className="input-wrapper">
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value)
                }}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                {brands.length !== 0
                  ? brands.map((brand, i) => (
                      <MenuItem key={i} value={brand.idBrand}>
                        {brand.brandName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </div>
            <div>
              <input
                onChange={(x) => setFiles(x.target.files)}
                type="file"
                multiple
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                variant="outlined"
                value={modelName}
                onChange={(x) => setModelName(x.target.value)}
                type="text"
                label="Product Name"
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                variant="outlined"
                type="number"
                onChange={(x) => setModelPrice(x.target.value)}
                label="Original Price"
              />
            </div>
            <div>
              <span className="submitBtn" onClick={createProductModel}>
                <Button
                  style={{ color: 'black' }}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </span>
              <span
                className="submitBtn"
                onClick={() => {
                  changeModal({
                    message: 'Model creation aborted',
                    time: 2000,
                    type: 'failed',
                  })
                  setEditing(false)
                }}
              >
                <Button
                  style={{ color: 'black' }}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </span>
            </div>
          </div>
        )}
      </ThemeProvider>
      <span className="backoffice-description">Model Disponibles</span>
      <Table objects={models} />
    </div>
  )
}
