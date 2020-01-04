var express = require('express')
var router = express.Router()
var userServices = require('../services/userServices.js')

/**
 * Login the user and give him a session
 * @param login
 * @param password
 */
router.post('/login', async function (req, res) {
  const pseudo = req.body.login
  const password = req.body.password

  res.type('json')

  if (typeof pseudo === 'undefined' || typeof password === 'undefined') {
    res.status(400).end(formatErrorMessage('login or password not found in request.'))
  } else {
    try {
      if (await userServices.verifyPseudo(pseudo, password)) {
        req.session.pseudo = pseudo // Initialising user session
        res.status(200).end(formatSuccessMessage('pseudo', pseudo))
      } else {
        res.status(401).end(formatErrorMessage('Incorrect credentials.'))
      }
    } catch (e) {
      res.status(500).end(formatErrorMessage('Database error'))
    }
  }
})

/**
 * Register a user and give him a session
 * @param login
 * @param password
 */
router.post('/signIn', async function (req, res) {
  const pseudo = req.body.login
  const password = req.body.password

  res.type('json')

  if (typeof pseudo === 'undefined' || typeof password === 'undefined') {
    res.status(400).end(formatErrorMessage('pseudo or password not found.'))
  } else {
    try {
      if (await userServices.addUser(pseudo, password)) {
        req.session.pseudo = pseudo // Initialising user session
        res.status(201).end(formatSuccessMessage('pseudo', pseudo))
      } else {
        res.status(409).end(formatErrorMessage('Pseudo already exists'))
      }
    } catch (e) {
      res.status(500).end(formatErrorMessage('Database error'))
    }
  }
})

/**
 * Change the password of the connected user with a new one
 * @param oldPassword
 * @param newPassword
 */
router.put('/password', async function (req, res) {
  if (req.session.pseudo) {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    res.type('json')
    if (typeof oldPassword === 'undefined' || typeof newPassword === 'undefined') {
      res.status(400).end(formatErrorMessage('OldPassword or newPassword not found.'))
    } else {
      try {
        if (await userServices.updatePassword(req.session.pseudo, oldPassword, newPassword)) {
          res.status(202).end('{message: "Password has been changed !"}')
        } else {
          res.status(409).end(formatErrorMessage('Old password does not match'))
          try {
            if (await userServices.updatePassword(req.session.pseudo, oldPassword, newPassword)) {
              res.status(202).end(formatSuccessMessage('message', 'Password has been changed !'))
            } else {
              res.status(409).end(formatErrorMessage('Old password does not match'))
            }
          } catch (e) {
            res.status(500).end(formatErrorMessage('Database error. The password has not been changed'))
          }
        }
      } catch (e) {
        res.status(500).end(formatErrorMessage('Database error. The password has not been changed'))
      }
    }
  } else {
    res.status(401).end(formatErrorMessage('User not connected !'))
  }
})

/**
 * Format errors to JSON format
 * @param message
 * @returns {string}
 */
function formatErrorMessage (message) {
  console.log(message)
  return '{"error" : "' + message + '"}'
}

/**
 * Format message to JSON format
 * @param key
 * @param value
 * @returns {string}
 */
function formatSuccessMessage (key, value) {
  console.log(value)
  return '{"' + key + '": "' + value + '"}'
}
module.exports = router
