//Component for updating (PUT) or deleting (DELETE) an existing user

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

const EditUser = ({match}) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        axios.get('/api/users/'+match.params.id)
        .then(response => setUser(response.data))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(oldUser => {
            return {
                ...oldUser,
                [name]: value
            }
        })
    }

    const userUpdate = () => {
        axios.put('/api/users/'+match.params.id, user)
        .then((user) => console.log(user))
        window.location = '/userlist'
    }

    const userDelete = () => {
        axios.delete('/api/users/'+match.params.id)
        .then((response) => console.log(response.status))
        window.location = '/userlist'
    }

    return (
        <div>
            <h1>Editing {user.firstName}</h1>
            <p><b>ID: {user._id}</b></p>
            <label>First Name: </label>
            <input type="text" required name="firstName" value={user.firstName} onChange={handleChange}/><br/>
            <label>Last Name: </label>
            <input type="text" required name="lastName" value={user.lastName} onChange={handleChange}/><br/>
            <Button className="btn btn-warning" onClick={userUpdate}>Update User</Button>
            <Button className="btn btn-danger" onClick={userDelete}>Delete User</Button>
        </div>
    )
}

export default EditUser
