//Starting a server (backend entry point)

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.once('open', () => console.log('Connected to DB'))

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})