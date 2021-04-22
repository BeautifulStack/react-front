import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

export const Modal = ({ time, message, type}) => {
	const ref = useRef()

	useEffect(() => {
		setTimeout(() => {
			ref.current.classList.remove('hidden')
		}, 10)

		
		setTimeout(() => {
			if (ref.current)
				console.log(ref.current.classList.add('hidden'))
		}, time)
	}, [])
	console.log(type)
	return (
		<div className='model-wrapper'>
			<div ref={ref} className={type + ' modal hidden'}>
				<span>{message}</span>
			</div>
		</div>
	)
}

Modal.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
}