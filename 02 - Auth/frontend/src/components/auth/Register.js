import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'

const Register = () => {
    const { userData, setUserData } = useContext(UserContext)

    const[user, setUser] = useState({
        name: "",
        password: "",
        passwordAgain: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name: user.name,
            password: user.password
        }

        //axios.post('/api/fruits', newFruit)
        //.then(res => console.log(res.data))
        if(user.password !== user.passwordAgain){
            console.log("Not sure about the password")
        } else {
            console.log(newUser)
        }
        await axios.post('/api/users/register', newUser)

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
            passwordAgain: ""
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
            <h1>Register Here</h1>
            <form onSubmit={handleSubmit}>
                <label>User Name: </label>
                <input type="text" name="name" value={user.name} required 
                    onChange={handleChange}/><br/>
                <label>Password: </label>
                <input type="password" name="password" value={user.password}
                    onChange={handleChange}/><br/>
                <label>Password Again: </label>
                <input type="password" name="passwordAgain" value={user.passwordAgain}
                    onChange={handleChange}/><br/>
                <input type="submit" value="Register User!" />
            </form>
        </div>
    )
}

export default Register
