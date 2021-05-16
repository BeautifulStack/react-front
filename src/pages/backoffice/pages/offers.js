import React, { useEffect, useState, useContext } from 'react'
import { Modal } from 'utils/modal'
import { theme } from 'theme'
import {
  ThemeProvider,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Table } from 'utils/table'
import { LoginContext } from 'authContext'

export const Offers = () => {
  const context = useContext(LoginContext)
  const { requester } = context
  const [modal, setModal] = useState(null)
  const [offers, setOffers] = useState([])
  const [selectedOffer, setSelectedOffer] = useState(-1)
  const [selectedIdModel, setSelectedIdModel] = useState(-1)
  const [newPrice, setNewPrice] = useState(0)
  const [condition, setCondition] = useState(0)
  const [comment, setComment] = useState('')

  const changeModal = (args) => {
    setModal(null)
    setTimeout(() => {
      setModal(args)
    }, 1)
  }

  const selectOffer = (x) => {
    setSelectedOffer(x.idOffer)
    setSelectedIdModel(x.idModel)
  }

  const updateOffer = async () => {
    const offers = await requester(
      'http://localhost/php-back/Offer/ReadAll',
      'GET'
    )
    if (offers.errors) {
      changeModal({ message: offers.errors[0], time: 3000, type: 'failed' })
    } else {
      const { content } = offers
      content.forEach(
        (con) =>
          (con['isAccepted'] =
            con['isAccepted'] === '1' ? 'Accepted' : 'Not Accepted')
      )
      setOffers(content)
    }
  }

  useEffect(() => {
    updateOffer()
  }, [])

  const acceptOffer = async () => {
    await requester('http://localhost/php-back/Offer/Update', 'POST', {
      id: selectedOffer,
      isAccepted: 1,
    })
    updateOffer()
  }

  const counterOffer = async () => {
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
    console.log(state)
    const res = await requester(
      'http://localhost/php-back/Offer/CounterOffer',
      'POST',
      {
        id: selectedOffer,
        price: newPrice,
        conditionOffer: state,
        idModel: selectedIdModel,
      }
    )
    if (!res.id) {
      console.log(res)
    } else {
      updateOffer()
    }
  }

  console.log(offers)

  return (
    <div className="backoffice-page-wrapper">
      {modal ? (
        <Modal time={modal.time} message={modal.message} type={modal.type} />
      ) : null}
      <div className="backoffice-title">Offers</div>
      <ThemeProvider theme={theme}>
        {selectedOffer === -1 ? (
          <></>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ minWidth: '150px' }}>
              Selected Offer: {selectedOffer}
            </span>
            <span
              className="textWrapper"
              style={{ marginLeft: '1em', maxWidth: '10%' }}
            >
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
            <div>
              <TextField
                style={{ marginLeft: '1em' }}
                id="outlined-required"
                variant="outlined"
                value={newPrice}
                onChange={(x) => setNewPrice(x.target.value)}
                type="number"
                label="New Price"
              />
            </div>
            <div>
              <TextField
                style={{ marginLeft: '1em' }}
                id="outlined-required"
                variant="outlined"
                value={comment}
                onChange={(x) => setComment(x.target.value)}
                type="text"
                label="Comment"
              />
            </div>
            <span className="submitBtn">
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '1em' }}
                onClick={acceptOffer}
              >
                Accept
              </Button>
            </span>
            <span className="submitBtn">
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '1em' }}
                onClick={counterOffer}
              >
                New Proposition
              </Button>
            </span>
          </div>
        )}
      </ThemeProvider>

      <span className="backoffice-description">Offers</span>
      <Table objects={offers} callback={selectOffer} />
    </div>
  )
}
