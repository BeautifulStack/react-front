import React, { useState } from 'react'
import logo from './../android-chrome-512x512.png'
import { Link } from 'react-router-dom'
import { TextField, ThemeProvider, createMuiTheme, Button } from '@material-ui/core'


const theme = createMuiTheme({
	palette: {
		primary:{
			main: '#E6BC17'
		},
		secondary:{
			main: '#E6BC17'
		},
		type: 'dark'
	}
})


export const Register = () => {
	const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
	const [ password, setPassword ] = useState('')
    
	return (
		<div className='wrapper' >
			<header className='mainPage'>
				<img src={logo} className='siteLogo'/>
				<span className='siteName'>FairRepack</span>
				<Link to='/login' className='cta-btn'>Login</Link>
			</header>
			<ThemeProvider theme={theme}>
				<div className='loginForm'>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Username' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Name' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Lastname' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Email' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" label='Phone Number' color="yellow"/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" type="Password" label='Password' onChange={(x) => setPassword(x.target.value)}/>
					</span>
					<span className='textWrapper'>
						{ password !== passwordConfirmation && passwordConfirmation.length > 0 
							? <TextField error id="outlined-required" variant="outlined" type="Password" label='Password confirmation' onChange={(x) => setPasswordConfirmation(x.target.value)}/> 
							: <TextField id="outlined-required" variant="outlined" type="Password" label='Password confirmation' onChange={(x) => setPasswordConfirmation(x.target.value)}/> }
					</span>
					<span className='submitBtn' >
						<Button variant="contained" color="primary">Register</Button>
					</span>
				</div>
			</ThemeProvider>
		</div>
	)
}