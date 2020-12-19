import React, { useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const { userData, setUserData } = useContext(UserContext)

    return (
        <div>
            <h1>User Profile</h1><br/>
            <h4><b>User ID: </b>{userData.user.id}</h4><br/>
            <h4><b>User Name: </b>{userData.user.name}</h4><br/>
            <h4><b>Register Date: </b>{userData.user.date}</h4><br/>
        </div>
    )
}

export default Profile
