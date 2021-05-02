import React, { useContext, useState } from 'react'
import logo from './../android-chrome-512x512.png'
import { Link, Redirect } from 'react-router-dom'
import { TextField, ThemeProvider, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { theme } from './../theme'
import { LoginContext } from 'authContext'

export const Login = () => {
	const context = useContext(LoginContext)

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	const login = async () => {
		const result = await context.requester('http://localhost/php-back/login/', 'POST', {email, password})
		if (result.id) {
			context.setLogged(true)
		}
	}

	if (context.logged) return <Redirect to="/"/>
    
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
						<TextField id="outlined-required" variant="outlined" value={email} onChange={(x) => setEmail(x.target.value)} label='Login'/>
					</span>
					<span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" type="password" value={password} onChange={(x) => setPassword(x.target.value)} label='password' />
					</span>
					<span className='checkbox'>
						<FormControlLabel
							control={<Checkbox onChange={(x) => console.log(x)} name="jason" />}
							label='Remember Connection'
						/>
					</span>
					<span className='submitBtn' >
						<Button variant="contained" color="primary" onClick={login}>Login</Button>
					</span>
				</div>
			</ThemeProvider>
		</div>
	)
}

