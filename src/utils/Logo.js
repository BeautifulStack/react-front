import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../android-chrome-512x512.png'

export const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} alt='logo' className='siteLogo'/>
        </Link>
    )
}