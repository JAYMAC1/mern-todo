const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()

const todoRoutes = require('./routes/todoRoutes')

const app = express()
const PORT = process.env.PORT

// middleware
app.use(express.json())

// route handler
app.use('/api/todos/', todoRoutes)

// connect to DB
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Conneted to DB & listening on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
