const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enu: ['pending', 'complete'],
      required: true,
      default: 'pending',
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('todo', todoSchema)
