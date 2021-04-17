import React from 'react'
import logo from './../android-chrome-512x512.png'
import { Link } from 'react-router-dom'

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
	const objects = [{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	},{
		photo: 'http',
		brand: 'Apple',
		model: 'Iphone 14',
		originalPrice: 1120,
		price: 650
	}]


	return (
		<div className='products'>
			{objects.map((object, index) => 
				<div key={index} className='product'>
					<div className='product-image'>
						<img width='120' src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021661000' alt={object.model}/>
						<div className='product-prices'>
							<span>{object.originalPrice}</span>
							<span>{object.price}</span>
						</div>
					</div>
					<div className='product-buy'>
						<div className='product-info'>
							<span>{object.brand}</span>
							<span className='product-model'>{object.model}</span>
						</div>
						<Link className='cta-btn'>Buy</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export const Products = () => {
	return (
		<div className='wrapper' >
			<header className='mainPage'>
				<img src={logo} className='siteLogo'/>
				<Link to='/products' className='cta-btn'>Home</Link>
				<Link to='/seller/sell' className='cta-btn simple'>Sell a Thing</Link>
				<Link to='/login' className='cta-btn simple'>My orders</Link>
				<Link to='/login' className='cta-btn simple'>My accounts</Link>
			</header>
			<div className='menu-all'>
				<Menu />
				<Product />
			</div>
		</div>
	)
}