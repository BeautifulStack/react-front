import React, { useEffect, useState } from 'react'
import logo from './../../android-chrome-512x512.png'
import { Link } from 'react-router-dom'
import { TextField, ThemeProvider, createMuiTheme, Button, Select, InputLabel, MenuItem } from '@material-ui/core'

// import { TextField, ThemeProvider, createMuiTheme, Button, Checkbox, FormControlLabel, Select, InputLabel, MenuItem } from '@material-ui/core'

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

export const Sell = () => {

    const modelXBrand = [{
        brand: 'Apple',
        models: [{
            name: 'Iphone X',
            originalPrice: 150
        },
        {
            name: 'Iphone XI',
            originalPrice: 200
        },
        {
            name: 'Iphone XII',
            originalPrice: 450
        }]
    },
    {
        brand: 'Xiaomi',
        models: [{
            name: 'Redmi 1',
            originalPrice: 25
        },
        {
            name: 'Redmi 2',
            originalPrice: 50
        },
        {
            name: 'Redmi 3',
            originalPrice: 100
        }]
    }]

    const [ proposedPrice, setProposedPrice ] = useState(250)
    const [ brand, setBrand ] = useState(modelXBrand[0].brand)

    const [ condition, setCondition ] = useState(0)
    const [ box, setBox ] = useState(0)

    const [ model, setModel ] = useState('None')

    useEffect(() => {
        setModel('None')
        setProposedPrice(-1)
    }, [brand])

    useEffect(() => {
        if (model === 'None') return
        const selectedBrand = modelXBrand.find(model => model.brand === brand)
        const selectedModel = selectedBrand.models.find(models => models.name === model)
        setProposedPrice(Math.round(selectedModel.originalPrice / 2))
    }, [model])

    const models = modelXBrand.find(model => model.brand === brand)

    return (		
    <div className='wrapper' >
        <header className='mainPage'>
            <img src={logo} className='siteLogo'/>
            <Link to='/products' className='cta-btn simple'>Home</Link>
            <Link to='/seller/sell' className='cta-btn'>Sell a Thing</Link>
            <Link to='/login' className='cta-btn simple'>My orders</Link>
            <Link to='/login' className='cta-btn simple'>My accounts</Link>
        </header>
        <div className='sell-all'>
            <ThemeProvider theme={theme}>
				<div className='loginForm'>
                    <span className='textWrapper'>
                    <InputLabel id="brand-selector">Brand</InputLabel>
                        <Select
                        labelId="brand-selector"
                        value={brand}
                        onChange={(x) => setBrand(x.target.value)}
                        >
                            {modelXBrand.map((brand, i) => 
                                <MenuItem key={i} value={brand.brand}>{brand.brand}</MenuItem>
                            )}
                        </Select>
                        </span>

                        <span className='textWrapper'>
                        <InputLabel id="model-selector">Model</InputLabel>
                            <Select
                            labelId="model-selector"
                            value={model}
                            onChange={(x) => setModel(x.target.value)}
                            >
                                {models.models.map((model, i) => {
                                    return <MenuItem key={i} value={model.name}>{model.name}</MenuItem>
                                })}

                            </Select>
                        </span>

                        {model !== 'None' ? 
                                                <span className='textWrapper'>
                                                <InputLabel id="model-selector">Etat</InputLabel>
                                                    <Select
                                                    labelId="model-selector"
                                                    value={condition}
                                                    onChange={(x) => setCondition(x.target.value)}
                                                    >
                                                        <MenuItem value={0}>Neuf</MenuItem>
                                                        <MenuItem value={1}>Usé modérément</MenuItem>
                                                        <MenuItem value={2}>Usé</MenuItem>
                                                        <MenuItem value={3}>Abimé par le temps</MenuItem>
                        
                        
                                                    </Select>
                                                </span>
                                                : null }

                    {model !== 'None' ?
                        <span className='textWrapper'>
                        <InputLabel id="model-selector">Box and charger</InputLabel>
                            <Select
                            labelId="model-selector"
                            value={box}
                            onChange={(x) => setBox(x.target.value)}
                            >
                                <MenuItem value={0}>I have Box</MenuItem>
                                <MenuItem value={1}>I have charger</MenuItem>
                                <MenuItem value={2}>I have Box and Charger</MenuItem>
                                <MenuItem value={3}>{'I don\'t have box and charger'}</MenuItem>


                            </Select>
                        </span> : null }
                    <span className='textWrapper'>
						<TextField id="outlined-required" variant="outlined" type="text" label='Tell us more about the product' />
					</span>
{/* 
                    <span className='checkbox'>
						<FormControlLabel
							control={<Checkbox onChange={(x) => console.log(x)} name="jason" />}
							label='Remember Connection'
						/>
					</span> */}
                    <span className='priceDiv'>
                        For this product, we can propose you: <strong>{proposedPrice}</strong>!
                    </span>
					<span className='submitBtn' >
						<Button variant="contained" color="primary">Propose Product</Button>
					</span>
				</div>
			</ThemeProvider>
        </div>
    </div>
    )
} 