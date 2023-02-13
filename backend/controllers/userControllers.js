const mongoose = require('mongoose')

const User = require('../models/userModel')

const registerUser = async (req, res) => {
  const { email, password, confirmPwd } = req.body

  let emptyFields = []

  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (!confirmPwd) {
    emptyFields.push('confirmPwd')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'email and password required' })
  }
  if (password !== confirmPwd) {
    return res.status(400).json({ error: 'password do not match' })
  }

  // check if already exists
  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(400).json({ error: 'users exists' })
  }

  const user = await User.create({ email, password })
  res.status(200).json({ created: user })
}

const loginUser = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(200).json({ error: 'Invalid credentials' })
  }

  const user = res.status(200).json({ message: 'login user controller' })
}

const getUser = (req, res) => {
  res.status(200).json({ message: 'get user controler' })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}
