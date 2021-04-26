import React,  { useEffect, useState, useContext } from 'react'
import { Modal } from 'utils/modal'
import { Table } from 'utils/table'
import { LoginContext } from 'authContext'

export const Users = () => {
	const context = useContext(LoginContext)
    const { requester } = context
    
    const [ modal, setModal ] = useState(null)
    const [ users, setUsers ] = useState([])

    const changeModal = (args) => {
		setModal(null)
		setTimeout(() => {
			setModal(args)
		}, 1)
		
	}
    
    useEffect(async () => {
        const users = await requester('http://localhost/php-back/User/ReadAll', 'GET')
        if (users.errors) {
			changeModal({message: users.errors[0], time: 3000, type:'failed'})
		} else {
			setUsers(users)
		}
    }, [])


    return(
        <div className='backoffice-page-wrapper'>
            {modal ? <Modal time={modal.time} message={modal.message} type={modal.type}/> : null }
            <div className='backoffice-title'>Users</div>
            <span className='backoffice-description'>Users</span>
            <Table objects={users}/>
            
        </div>
    )
}