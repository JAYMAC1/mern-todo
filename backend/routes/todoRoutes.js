const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
  getAllTodosController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
  createTodoController,
} = require('../controllers/todoControllers')

const router = express.Router()

// check for authorization
router.use(requireAuth)

// get all workouts
router.get('/', getAllTodosController)

// get a specific workout based on id
router.get('/:id', getSingleTodoController)

// Add a workout
router.post('/', createTodoController)

// update a workout
router.put('/:id', updateTodoController)

// delete a workout
router.delete('/:id', deleteTodoController)

module.exports = router
