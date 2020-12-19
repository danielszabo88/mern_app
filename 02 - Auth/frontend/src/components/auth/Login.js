import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'

const Login = () => {
    const { userData, setUserData } = useContext(UserContext)

    const[user, setUser] = useState({
        name: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name: user.name,
            password: user.password
        }

        const loginResponse = await axios.post('/api/users/login', newUser)
        //console.log(loginResponse.data)
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        })
        localStorage.setItem("auth-token", loginResponse.data.token)

        setUser({
            name: "",
            password: "",
        })
        
        window.location='/fruitlist'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(oldUser => {
            return {
                ...oldUser,
                [name]: value
            }
        })
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>User Name: </label>
                <input type="text" name="name" value={user.name} required 
                    onChange={handleChange}/><br/>
                <label>Password: </label>
                <input type="password" name="password" value={user.password}
                    onChange={handleChange}/><br/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default Login
