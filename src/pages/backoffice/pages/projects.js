import React,  { useEffect, useState } from 'react'
import { Modal } from '../../../utils/modal'
import { theme } from '../../../theme'
import { ThemeProvider, Button, TextField, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Table } from '../../../utils/table'
import { requester } from '../../../utils/requester'

export const Project = () => {
    const [ modal, setModal ] = useState(null)
    const [ projects, setProjectd ] = useState([])
    const [ projectDescription, setProjectDescription ] = useState([])

    const [ associations, setAssociations ] = useState([])
    const [ selectedAssociations, setSelectedAssociations ] = useState(null)

    const [ editing, setEditing ] = useState(false)

    const [ projectName, setProjectName ] = useState('')

    const changeModal = (args) => {
		setModal(null)
		setTimeout(() => {
			setModal(args)
		}, 1)
		
	}

    const createProject = async () => {
        const params = {
            name: projectName,
            description: projectDescription,
            idAssociation: 1
        }

        const response = await requester('http://localhost/php-back/Project/Create', 'POST', params)

        if (response.errors) {
			changeModal({message: response.errors[0], time: 3000, type:'failed'})
		} else {
			changeModal({message: 'Your project has been submited!', time: 3000, type:'success'})
			setEditing(false)
		}
    }

    
    useEffect(async () => {

        const associations = await requester('http://localhost/php-back/Association/ReadAll', 'GET')
        if (associations.errors) {
			changeModal({message: associations.errors[0], time: 3000, type:'failed'})
		} else {
			setAssociations(associations)
		}

        const users = await requester('http://localhost/php-back/Project/ReadAll', 'GET')
        if (users.errors) {
			changeModal({message: users.errors[0], time: 3000, type:'failed'})
		} else {
			setProjectd(users)
		}
    }, [editing])

    console.log(associations)
    return(
        <div className='backoffice-page-wrapper'>
            {modal ? <Modal time={modal.time} message={modal.message} type={modal.type}/> : null }
            <div className='backoffice-title'>Projects</div>
            <ThemeProvider theme={theme}>
                { !editing 
                ? <span className='submitBtn' onClick={() => setEditing(true)}><Button variant="contained" color="primary">Add Projects</Button></span> 
                : <div className='editing-line'>
                    <div className='input-wrapper'>
							<InputLabel id="demo-simple-select-label">Model</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedAssociations}
								onChange={(event) => {setSelectedAssociations(event.target.value)}}
							>
								<MenuItem value={-1}><em>None</em></MenuItem>
								{associations.length !== 0 
									? associations.map((association, i) => <MenuItem key={i} value={association.idAssociation}>{association.name}</MenuItem>)
									: null }
							
							</Select>
						</div>
                        <div>
                            <TextField id="outlined-required" variant="outlined" value={projectName} onChange={(x) => setProjectName(x.target.value)} type="text" label="Project's name" />
                        </div>
                        <div>
                            <TextField id="outlined-required" variant="outlined" value={projectDescription} onChange={(x) => setProjectDescription(x.target.value)} type="text" label="Project's description" />
                        </div>
                        <span className='submitBtn' onClick={createProject}><Button variant="contained" color="primary">Submit</Button></span> 
                        <span className='submitBtn' onClick={() => { changeModal({message: 'Project creation aborted', time: 2000, type:'failed'}); setEditing(false) }}><Button variant="contained" color="primary">Cancel</Button></span> 
                    </div>}
            </ThemeProvider>
            <span className='backoffice-description'>Projects available</span>
                <Table objects={projects}/>
            
        </div>
    )
}