import React, { useEffect, useState, useContext } from 'react'
import { Modal } from 'utils/modal'
import { theme } from 'theme'
import { ThemeProvider } from '@material-ui/core'
import { Table } from 'utils/table'
import { LoginContext } from 'authContext'

export const Offers = () => {
  const context = useContext(LoginContext)
  const { requester } = context
  const [modal, setModal] = useState(null)
  const [offers, setOffers] = useState([])

  const changeModal = (args) => {
    setModal(null)
    setTimeout(() => {
      setModal(args)
    }, 1)
  }

  useEffect(async () => {
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
  }, [])

  console.log(offers)

  return (
    <div className="backoffice-page-wrapper">
      {modal ? (
        <Modal time={modal.time} message={modal.message} type={modal.type} />
      ) : null}
      <div className="backoffice-title">Offers</div>
      <ThemeProvider theme={theme}></ThemeProvider>
      <span className="backoffice-description">Offers</span>
      <Table objects={offers} />
    </div>
  )
}
