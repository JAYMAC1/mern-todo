const express = require('express')
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userControllers')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/me', getUser)
module.exports = router
