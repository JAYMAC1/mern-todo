const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

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

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await User.create({ email, password: hash })
  res.status(200).json({ created: user })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(200).json({ error: 'All fields required' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(200).json({ error: 'Invalid credentials' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
  const token = createToken(user._id)
  res.status(200).json({ email, token })
}

const getUser = (req, res) => {
  res.status(200).json({ message: 'get user controler' })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}
