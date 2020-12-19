import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FruitList = () => {
    const [fruits, setFruits] = useState([ ])

    useEffect(() => {
        axios.get('/api/fruits')
        .then(response => setFruits(response.data))
    }, [])

    return (
        <div>
            <h1>List of Fruits</h1>
            <ul style={{listStyleType:"none"}}>
                {fruits.map(fruit => {
                    return (<li key={fruit._id}><Link to={`/fruit/${fruit._id}`}>{fruit.name}</Link> ({fruit.amount}) - {fruit.info}</li>)
                })}
            </ul>
        </div>
    )
}

export default FruitList
