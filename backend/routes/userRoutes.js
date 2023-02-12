const express = require('express')

const router = express.Router()

router.post('/register', (req, res) => {
  res.status(200).json({ message: 'register user' })
})
router.post('/login', (req, res) => {
  res.status(200).json({ message: 'login user' })
})
router.post('/me', (req, res) => {
  res.status(200).json({ message: 'get user' })
})
module.exports = router
