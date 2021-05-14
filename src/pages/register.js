import { theme } from '../theme'
import { Logo } from 'utils/Logo'
import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TextField, ThemeProvider, Button } from '@material-ui/core'
import { LoginContext } from 'authContext'
import { Modal } from 'utils/modal'

export const Register = () => {
  const history = useHistory()
  const context = useContext(LoginContext)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [password, setPassword] = useState('')

  const [modal, setModal] = useState(null)

  const changeModal = (args) => {
    setModal(null)
    setTimeout(() => {
      setModal(args)
    }, 1)
  }

  const register = async () => {
    const result = await context.requester(
      'http://localhost/php-back/User/Create',
      'POST',
      { email, password, phoneNumber, firstName: name, lastName: lastname }
    )
    if (result.id) {
      history.push('/account/validating')
    } else {
      changeModal({ message: result.errors[0], time: 3000, type: 'failed' })
    }
  }

  return (
    <div className="wrapper">
      {modal ? (
        <Modal time={modal.time} message={modal.message} type={modal.type} />
      ) : null}
      <header className="mainPage">
        <Logo />
        <span className="siteName">FairRepack</span>
        <Link to="/login" className="cta-btn">
          Login
        </Link>
      </header>
      <ThemeProvider theme={theme}>
        <div className="loginForm">
          <span className="textWrapper">
            <TextField
              id="outlined-required"
              variant="outlined"
              label="Name"
              color="yellow"
              onChange={(x) => setName(x.target.value)}
            />
          </span>
          <span className="textWrapper">
            <TextField
              id="outlined-required"
              variant="outlined"
              label="Lastname"
              color="yellow"
              onChange={(x) => setLastname(x.target.value)}
            />
          </span>
          <span className="textWrapper">
            <TextField
              type="email"
              id="outlined-required"
              variant="outlined"
              label="Email"
              color="yellow"
              onChange={(x) => setEmail(x.target.value)}
            />
          </span>
          <span className="textWrapper">
            <TextField
              id="outlined-required"
              variant="outlined"
              label="Phone Number"
              color="yellow"
              onChange={(x) => setPhoneNumber(x.target.value)}
            />
          </span>
          <span className="textWrapper">
            <TextField
              id="outlined-required"
              variant="outlined"
              type="Password"
              label="Password"
              onChange={(x) => setPassword(x.target.value)}
            />
          </span>
          <span className="textWrapper">
            {password !== passwordConfirmation &&
            passwordConfirmation.length > 0 ? (
              <TextField
                error
                id="outlined-required"
                variant="outlined"
                type="Password"
                label="Password confirmation"
                onChange={(x) => setPasswordConfirmation(x.target.value)}
              />
            ) : (
              <TextField
                id="outlined-required"
                variant="outlined"
                type="Password"
                label="Password confirmation"
                onChange={(x) => setPasswordConfirmation(x.target.value)}
              />
            )}
          </span>
          <span className="submitBtn">
            <Button variant="contained" color="primary" onClick={register}>
              Register
            </Button>
          </span>
        </div>
      </ThemeProvider>
    </div>
  )
}
