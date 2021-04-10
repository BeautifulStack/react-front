import React from 'react'
import logo from './../android-chrome-512x512.png'
import { Link } from 'react-router-dom'
import { TextField, ThemeProvider, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { theme } from './../theme'


export const Login = () => {
    
	return (
		<div className='wrapper' >
			<header className='mainPage'>
				<img src={logo} className='siteLogo'/>
				<span className='siteName'>FairRepack</span>
				<Link to='/register' className='cta-btn'>Register</Link>
			</header>
			<ThemeProvider theme={theme}>
				<div className='loginForm'>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Login' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" type="password" label='password' />
					</span>
					<span className='checkbox'>
						<FormControlLabel
							control={<Checkbox onChange={(x) => console.log(x)} name="jason" />}
							label='Remember Connection'
						/>
					</span>
					<span className='submitBtn' >
						<Button variant="contained" color="primary">Login</Button>
					</span>
				</div>
			</ThemeProvider>
		</div>
	)
}