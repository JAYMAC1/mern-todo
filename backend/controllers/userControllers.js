const registerUser = (req, res) => {
  res.status(200).json({ message: 'register user controller' })
}
const loginUser = (req, res) => {
  res.status(200).json({ message: 'login user controller' })
}
const getUser = (req, res) => {
  res.status(200).json({ message: 'get user controler' })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}
