import React, { useContext, useEffect, useState } from 'react'

import logo from './../android-chrome-512x512.png'
import { Link } from 'react-router-dom'
import { LoginContext } from 'authContext'

const Menu = () => {

	const sorts = [{
		name: 'Brand',
		values: ['Apple', 'Samsung', 'Xiaomi']
	},
	{
		name: 'Model',
		values: ['Iphone XR', 'Samsung Galaxy S7', 'Xiaomi']
	}]


	return (
		<div className='menu'>
			{sorts.map((sort, i) => 
				<div className='sort-section' key={i}>
					<span className='category-name'>{sort.name}</span>
					<div className='category-values-list'>
						{sort.values.map((value,y) => <span key={y}>{value}</span>)}
					</div>
				</div>
			)}
		</div>
	)
}

const Product = () => {
	const context = useContext(LoginContext)
	const { requester } = context

	const [ products, setProducts ] = useState([])

	useEffect(async () => {
		const modelProducts = await requester('http://localhost/php-back/Product/ReadAll', 'GET')
		if (modelProducts.errors) {
			console.error({message: modelProducts.errors[0], time: 3000, type:'failed'})
		} else {
			setProducts(modelProducts)
		}
	}, [])

	// const objects = [{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// },{
	// 	photo: 'http',
	// 	brand: 'Apple',
	// 	model: 'Iphone 14',
	// 	originalPrice: 1120,
	// 	price: 650
	// }]

	console.log(products)
	return (
		<div className='products'>
			{products.map((object, index) => 
				<div key={index} className='product'>
					<div className='product-image'>
						<img width='120' src={'http://localhost/php-back/'+object.path}  alt={object.product_modelmodelName}/>
						<div className='product-prices'>
							<span>{object.officialPrice}</span>
							<span>{Math.round(object.officialPrice * 0.66)}</span>
						</div>
					</div>
					<div className='product-buy'>
						<div className='product-info'>
							<span>{object.brandName}</span>
							<span className='product-model'>{object.product_modelmodelName}</span>
						</div>
						<Link to={'/products/model/'+object.idProduct} className='cta-btn'>Buy</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export const Products = () => {
	const context = useContext(LoginContext)

	return (
		<div className='wrapper' >
			<header className='mainPage'>
				<img src={logo} className='siteLogo'/>
				<Link to='/products' className='cta-btn'>Home</Link>
				<Link to='/seller/sell' className='cta-btn simple'>Sell a Thing</Link>
				<Link to='/login' className='cta-btn simple'>My orders</Link>
				{context.logged 
				? <Link to='/user/account' className='cta-btn simple'>My accounts</Link>
				: <Link to='/login' className='cta-btn'>Sign In</Link> }
				
			</header>
			<div className='menu-all'>
				<Menu />
				<Product />
			</div>
		</div>
	)
}