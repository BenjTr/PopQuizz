const path = require('path')
const express = require('express')

const userRoutes = require('./routes/user')

const app = express()

// DO CONNECTION TO THE DATABASE HERE

app.use('/', express.static(path.join(__dirname, 'angular')))

app.use('/api/user', userRoutes)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
})

module.exports = app
