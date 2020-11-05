//Component to add new users by sending POST request

import React, { useState } from 'react'
import axios from 'axios'

const AddUser = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(oldUser => {
            return {
                ...oldUser,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName
        }
        
        axios.post('/api/users', newUser)
        .then(response => console.log(response.data))

        setUser({
            firstName: "",
            lastName: ""
        })
    }

    return (
        <div>
            <h1>Add Users Here</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <input type="text" required name="firstName" value={user.firstName} onChange={handleChange}/><br/>
                <label>Last Name: </label>
                <input type="text" required name="lastName" value={user.lastName} onChange={handleChange}/><br/>
                <input type="submit" value="AddUser!" />
            </form>
        </div>
    )
}

export default AddUser
