import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ThemeProvider, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import { theme } from './../../theme'

const Table = ({ objects }) => {
	const labels = Object.keys(objects[0])
	return(
		<table className='TableCustom'>
			<thead>
				<tr>
					{labels.map((name, i) => 
						<th key={i}>{name}</th>
					)}
				</tr>
			</thead>
			<tbody>
				{objects.map((object, i) => {
					return (<tr className='table-line' key={i}>{labels.map((label,i) => {
						if (typeof object[label] === 'object') {
							return (<td key={i} title={Object.entries(object[label]).reduce((acc, [key, value]) => {
								acc += `${key}: ${value}\n`
								return acc
							}, '')}>Hover Me</td>)
						} else {
							return (<td key={i}>{
								object[label]
							}</td>)
						}

						
					})
					}</tr>)
				})}
			</tbody>
		</table>
	)
}

Table.propTypes = {
	objects: PropTypes.array.isRequired,
}

const Modal = ({ time, message, type}) => {
	const ref = useRef()

	useEffect(() => {
		ref.current.classList.remove('hidden')
		setTimeout(() => {
			console.log(ref.current.classList.add('hidden'))
		}, time)
	}, [])
	console.log(type)
	return (
		<div className='model-wrapper'>
			<div ref={ref} className={type + ' modal'}>
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

const Products = () => {
	// eslint-disable-next-line no-unused-vars
	const [ category, setCategory ] = useState('')
	const [ brand, setBrand ] = useState('')
	const [ editing, setEditing ] = useState(false)

	const models = [{
		model: 'Iphone X',
		brand: 'Apple',
		originalPrice : 1000,
		additionalInfos: {
			charge: '24h',
			attribute: 'Hello'
		}
	}, {
		model: 'Iphone X',
		brand: 'Apple',
		originalPrice : 1000,
		additionalInfos: {
			charge: '24h',
			attribute: 'Hello'
		}
	}]

	return (
		<div className='backoffice-page-wrapper'>
			<Modal time={2500} message={'Your model has been submited!'} type={'success'}/>
			<div className='backoffice-title'>Produits</div>
			{ !editing 
				? <span onClick={() => setEditing(true)}className='cta-btn tiny'>Add Product</span> 
				: <ThemeProvider theme={theme}>
					<div className='editing-line'>
						<div className='input-wrapper'>
							<InputLabel id="demo-simple-select-label">Category</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={category}
								onChange={(event) => {setCategory(event.target.value)}}
							>
								<MenuItem value=""><em>None</em></MenuItem>
								<MenuItem value='smartphone'>Smartphone</MenuItem>
								<MenuItem value='chantier'>Outils de chantier</MenuItem>
								<MenuItem value='tracteur'>Tracteur</MenuItem>
							</Select>
						</div>

						<div className='input-wrapper'>
							<InputLabel id="demo-simple-select-label">Brand</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={brand}
								onChange={(event) => {setBrand(event.target.value)}}
							>   
								<MenuItem value=""><em>None</em></MenuItem>
								<MenuItem value={'Apple'}>Apple</MenuItem>
								<MenuItem value={'Huawei'}>Huawei</MenuItem>
								<MenuItem value={'Sony'}>Sony</MenuItem>
							</Select>
						</div>
						<div>
							<TextField id="outlined-required" variant="outlined" type="text" label='Product Name'/>
						</div>
						<div>
							<TextField id="outlined-required" variant="outlined" type="number" label='Original Price'/>
						</div>
						<span  onClick={() => setEditing(false)}className='cta-btn tiny'>Submit</span>
						<span  onClick={() => setEditing(false)}className='cta-btn tiny'>Cancel</span>
					</div>
				</ThemeProvider>}
			
			<span className='backoffice-description'>Produits Disponibles</span>
			<Table objects={models}/>
		</div>)
}

export const MainOffice = () => {
	return (
		<div className='backoffice-wrapper'>
			<div className='navigator'>
				<div className='navigator-centerer'>
					<span>Utilisateurs</span>	
					<span>Produits</span>
					<span>Projets</span>
				</div>
			</div>
			<div className='backoffice-page'>
				<Switch>
					<Route path='/backoffice/main' component={Products}/>
				</Switch>
			</div>
		</div>
	)
} 