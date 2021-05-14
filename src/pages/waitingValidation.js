import React, { useContext } from 'react'
import logo from './../android-chrome-512x512.png'
import { theme } from './../theme'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'
import { TextField, ThemeProvider, Button } from '@material-ui/core'

export const Validation = () => {
  const context = useContext(LoginContext)

  return (
    <div className="wrapper">
      <header className="mainPage">
        <img src={logo} className="siteLogo" />
        <span className="siteName">FairRepack</span>
        {context.logged ? (
          <button className="cta-btn" onClick={() => context.logout()}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="cta-btn">
            Sign In
          </Link>
        )}
      </header>
      <div className="wrapper-middle">
        <ThemeProvider theme={theme}>
          <div>
            We just sent a email to you account with a <b>code</b>, Please click
            on the link in the mail or enter the code on this page
            <span className="textWrapper">
              <TextField
                id="outlined-required"
                variant="outlined"
                label="Code"
                color="yellow"
                onChange={(x) => console.log(x.target.value)}
              />
              <span className="submitBtn">
                <Button variant="contained" color="primary">
                  Confirm
                </Button>
              </span>
            </span>
          </div>
        </ThemeProvider>
      </div>
    </div>
  )
}
