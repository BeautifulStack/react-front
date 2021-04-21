import React,  { useEffect, useState } from 'react'
import { Modal } from './../../../utils/modal'
import { theme } from './../../../theme'
import { ThemeProvider, Button, TextField } from '@material-ui/core'
import { Table } from './../../../utils/table'
import { requester } from '../../../utils/requester'

export const Associations = () => {
    const [ modal, setModal ] = useState(null)
    const [ associations, setAssociations ] = useState([])

    const [ editing, setEditing ] = useState(false)

    const [ assoName, setAssoName ] = useState('')
    const [ assoDesc, setAssoDesc ] = useState('')
	const [ files, setFiles ] = useState(null)

    console.log(files)

    const changeModal = (args) => {
		setModal(null)
		setTimeout(() => {
			setModal(args)
		}, 1)
		
	}

    const createAssociation = async () => {
        const params = {
            name: assoName,
            description: assoDesc
        }
        const response = await requester('http://localhost/php-back/Association/Create', 'POST', params, files)
		if (response.errors) {
			changeModal({message: response.errors[0], time: 3000, type:'failed'})
		} else {
			changeModal({message: 'Your model has been submited!', time: 3000, type:'success'})
			setEditing(false)
		}
    }

    
    useEffect(async () => {
        const users = await requester('http://localhost/php-back/Association/ReadAll', 'GET')
        if (users.errors) {
			changeModal({message: users.errors[0], time: 3000, type:'failed'})
		} else {
			setAssociations(users)
		}
    }, [editing])


    return(
        <div className='backoffice-page-wrapper'>
            {modal ? <Modal time={modal.time} message={modal.message} type={modal.type}/> : null }
            <div className='backoffice-title'>Associations</div>
            <ThemeProvider theme={theme}>
                { !editing 
                ? <span className='submitBtn' onClick={() => setEditing(true)}><Button variant="contained" color="primary">Add Product</Button></span> 
                : <div className='editing-line'>
                        <div>
                            <TextField id="outlined-required" variant="outlined" value={assoName} onChange={(x) => setAssoName(x.target.value)} type="text" label="Association's name"/>
                        </div>
                        <div>
                            <TextField id="outlined-required" variant="outlined" value={assoDesc} onChange={(x) => setAssoDesc(x.target.value)} type="text" label="Association's description"/>
                        </div>
                        <div>
							<input onChange={(x) => setFiles(x.target.files)} type="file"/>
						</div>
                        <span className='submitBtn' onClick={createAssociation}><Button variant="contained" color="primary">Submit</Button></span> 
                        <span className='submitBtn' onClick={() => { changeModal({message: 'Model creation aborted', time: 2000, type:'failed'}); setEditing(false) }}><Button variant="contained" color="primary">Cancel</Button></span> 
                    </div>}
            </ThemeProvider>
            <span className='backoffice-description'>Associations</span>
                <Table objects={associations}/>
            
        </div>
    )
}