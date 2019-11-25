const express = require('express')

const router = express.Router()

router.post('/login', (req, res) => {
  console.log('Hello')
})

module.exports = router
