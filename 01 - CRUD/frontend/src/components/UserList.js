//Component for fetching all the users in the DB

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserList = () => {
    const [users, setUsers] = useState([ ])

    useEffect(() => {
        axios.get('/api/users')
        .then(response => setUsers(response.data))
    }, [])

    return (
        <div>
            <h1>List of Users Here</h1>
            <ul style={{listStyleType: "none"}}>
                {users.map(user => {
                    return(
                        <li key={user._id}>
                            <Link to={`/user/${user._id}`}>{user.firstName} {user.lastName}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserList
