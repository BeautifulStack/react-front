import React, {useContext, useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { Button, ThemeProvider } from '@material-ui/core'
import { theme } from 'theme'
import { LoginContext } from 'authContext'
import { Modal } from 'utils/modal'

export const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [disabled, setDisabled] = useState(true)
    const context = useContext(LoginContext)
    const { requester } = context
    const [modal, setModal] = useState(null)

    const cardStyle = {
        style: {
            base: {
                color: '#E6E6E6',
                fontFamily: 'Ubuntu, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: 'grey'
                },
                iconColor: '#E6E6E6'
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    }

    const changeModal = (args) => {
        setModal(null)
        setTimeout(() => {
            setModal(args)
        }, 1)
    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement)

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        })

        if (error) {
            console.log('[error]', error)
            changeModal({ message: error.message, time: 3000, type: 'failed' })
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            const res = await requester('http://localhost/php-back/Payment/Create', 'POST', {payment_method: paymentMethod})
            console.log(res)

        }

    }

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty)
    }

    return (

        <form onSubmit={handleSubmit} className="payment-form">
            {modal ? (
                <Modal time={modal.time} message={modal.message} type={modal.type} />
            ) : null}
            <CardElement onChange={handleChange} options={cardStyle}/>
            <ThemeProvider theme={theme}>
                <div style={{ alignSelf: 'flex-end', marginTop: '1em' }}>
                    <Button type="submit" variant="contained" color="primary" role="link" disabled={!stripe || disabled}
                    style={{width: '100%'}}>
                        Pay
                    </Button>
                </div>
            </ThemeProvider>
        </form>
    )
}