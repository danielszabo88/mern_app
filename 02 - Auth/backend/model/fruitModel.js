const mongoose = require('mongoose')

const fruitSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        default: 0
    },
    info:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Fruit', fruitSchema)