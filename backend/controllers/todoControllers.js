const mongoose = require('mongoose')
const Todo = require('../models/todoModel')

// Get all workouts
const getAllTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 })
    res.status(200).json(todos)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a workout
const getSingleTodoController = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: `Invalid id: ${id}` })
  }
  try {
    const todo = await Todo.findById({ _id: id })
    if (!todo) {
      return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(todo)
  } catch (error) {
    return res.status(404).json({ error: `No record fount with id: ${id}` })
  }
}
// Add a workout
const createTodoController = async (req, res) => {
  const { task, status, startDate, dueDate } = req.body
  let emptyFields = []

  if (!task) {
    emptyFields.push('task')
  }

  if (!status) {
    emptyFields.push('status')
  }
  if (!startDate) {
    emptyFields.push('startDate')
  }
  if (!dueDate) {
    emptyFields.push('dueDate')
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Ensure all fields are complete.', emptyFields })
  }

  try {
    const todo = await Todo.create({
      task,
      status,
      startDate,
      dueDate,
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update a workout
const updateTodoController = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Invalid ID' })
  }

  const todo = await Todo.findByIdAndUpdate({ _id: id }, { ...req.body })

  if (!todo) {
    return res.status(404).json({ error: 'No such todo' })
  }

  res.status(200).json({ updated: todo })
}

// delete a todo
const deleteTodoController = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Invaild ID' })
  }

  const todo = await Todo.findByIdAndDelete({ _id: id })

  if (!todo) {
    return res.status(404).json({ error: 'No todo found' })
  }

  res.status(200).json({ deleted: todo })
}

module.exports = {
  getAllTodosController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
  createTodoController,
}
