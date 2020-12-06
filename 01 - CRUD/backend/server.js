const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const fruitsRouter = require('./routes/fruits')
const path = require('path')

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.once('open', () => console.log('Connected to DB!'))

app.use(express.json())

app.use('/api/fruits', fruitsRouter)

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})