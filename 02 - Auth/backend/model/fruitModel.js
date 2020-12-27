const mongoose = require('mongoose')

const fruitSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 30
    },
    amount:{
        type: Number,
        default: 0
    },
    info:{
        type: String,
        maxlength: 100
    },
    addedBy:{
        type: String,
        default: "unknown"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Fruit', fruitSchema)