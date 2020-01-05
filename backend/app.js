const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const usersRouter = require('./routes/user')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'angular')))
app.use(session({
  secret: process.env.SESSION_SECRET || 'AD3FoLtP4Szw0rD',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.use('/api/users', usersRouter)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
})

module.exports = app
