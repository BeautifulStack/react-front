import React,  { useEffect, useState, useContext } from 'react'
import { Modal } from 'utils/modal'
import { theme } from 'theme'
import { ThemeProvider, Button, TextField } from '@material-ui/core'
import { Table } from 'utils/table'
import { LoginContext } from 'authContext'

export const Brand = () => {
    const context = useContext(LoginContext)
    const { requester } = context
    const [ modal, setModal ] = useState(null)
    const [ brand, setBrand ] = useState([])

    const [ editing, setEditing ] = useState(false)

    const [ brandName, setBrandName ] = useState('')
    const [ files, setFiles ] = useState([])

    const changeModal = (args) => {
		setModal(null)
		setTimeout(() => {
			setModal(args)
		}, 1)
		
	}

    const createCategory = async () => {
        const params = {
            brandName
        }

        const response = await requester('http://localhost/php-back/Brand/Create', 'POST', params, files)

        if (response.errors) {
			changeModal({message: response.errors[0], time: 3000, type:'failed'})
		} else {
			changeModal({message: 'Your category has been submited!', time: 3000, type:'success'})
			setEditing(false)
		}
    }

    
    useEffect(async () => {
        const users = await requester('http://localhost/php-back/Brand/ReadAll', 'GET')
        if (users.errors) {
			changeModal({message: users.errors[0], time: 3000, type:'failed'})
		} else {
			setBrand(users)
		}
    }, [editing])


    return(
        <div className='backoffice-page-wrapper'>
            {modal ? <Modal time={modal.time} message={modal.message} type={modal.type}/> : null }
            <div className='backoffice-title'>Brands</div>
            <ThemeProvider theme={theme}>
                { !editing 
                ? <span className='submitBtn' onClick={() => setEditing(true)}><Button variant="contained" color="primary">Add Brands</Button></span> 
                : <div className='editing-line'>
                        <div>
                            <TextField id="outlined-required" variant="outlined" value={brandName} onChange={(x) => setBrandName(x.target.value)} type="text" label="Brand's name" />
                        </div>
                        <div>
							<input onChange={(x) => setFiles(x.target.files)} type="file" multiple/>
						</div>
                        <span className='submitBtn' onClick={createCategory}><Button variant="contained" color="primary">Submit</Button></span> 
                        <span className='submitBtn' onClick={() => { changeModal({message: 'Brand creation aborted', time: 2000, type:'failed'}); setEditing(false) }}><Button variant="contained" color="primary">Cancel</Button></span> 
                    </div>}
            </ThemeProvider>
            <span className='backoffice-description'>Brands available</span>
                <Table objects={brand}/>
            
        </div>
    )
}