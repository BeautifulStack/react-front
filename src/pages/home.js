import React, { useContext } from 'react'
import { Logo } from 'utils/Logo'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'

export const Home = () => {
    const context = useContext(LoginContext)

    return (
        <div className='wrapper'>
            <header className='mainPage'>
                <Logo />
                <span className='siteName'>FairRepack</span>
                {context.logged ? (
                    <button
                        className='cta-btn'
                        onClick={() => context.logout()}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to='/login' className='cta-btn'>
                        Sign In
                    </Link>
                )}
            </header>
            <div className='divAnim'></div>
            <div className='Left paragraphe'>
                Go to{' '}
                <Link className='link' to='/products'>
                    Products
                </Link>
            </div>
            <div className='Left paragraphe'>
                <p>
                    ontrary to popular belofessoections 1.10.32 and 1.10.33 of
                    de Finibus Bonorum et Malorum (The Extremes of Good and
                    Evil) by Cicero, written in 45 BC. This book is a treatise
                    on the theory of ethics, very popular during the
                    Renaissance. The first line of Lorem Ipsum, Lorem ipsum
                    dolor sit amet.., comes from a line in section 1.10.32.
                </p>
            </div>
            <div className='Right paragraphe'>
                <p>
                    ontrary to popular belief, Lorem Ipsum is not simply .33 of
                    de Finibus Bonorum et Malorum (The.33 of de Finibus Bonorum
                    et Malorum (Therandom text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2t
                    amet.., comes from a line in section 1.10.32.
                </p>
            </div>
        </div>
    )
}
