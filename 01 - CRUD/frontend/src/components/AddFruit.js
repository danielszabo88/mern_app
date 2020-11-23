import React, { useState } from 'react'
import axios from 'axios'

const AddFruit = () => {
    const[fruit, setFruit] = useState({
        name: "",
        amount: 0,
        info: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFruit = {
            name: fruit.name,
            amount: fruit.amount,
            info: fruit.info
        }

        axios.post('/api/fruits', newFruit)
        .then(res => console.log(res.data))

        setFruit({
            name: "",
            amount: 0,
            info: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFruit(oldFruit => {
            return {
                ...oldFruit,
                [name]: value
            }
        })
    }

    return (
        <div>
            <h1>Add Fruits Here!</h1>
            <form onSubmit={handleSubmit}>
                <label>Fruit Name: </label>
                <input type="text" name="name" value={fruit.name} required 
                    onChange={handleChange}/><br/>
                <label>Amount: </label>
                <input type="text" name="amount" value={fruit.amount}
                    onChange={handleChange}/><br/>
                <label>Info: </label>
                <input type="text" name="info" value={fruit.info}
                    onChange={handleChange}/><br/>
                <input type="submit" value="Add Fruit!" />
            </form>
        </div>
    )
}

export default AddFruit
