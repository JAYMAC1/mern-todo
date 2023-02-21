import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Complete', label: 'Complete' },
]

const TodoForm = () => {
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('Pending')
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const todo = { task, status: status, startDate, dueDate }
    console.log(todo)

    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setDueDate('')
      setStartDate('')
      setStatus('')
      setTask('')
      setError(null)
      console.log('new todo created', json)
    }
  }
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
      <label>Task:</label>
      <input
        type='text'
        onChange={(e) => setTask(e.target.value)}
        value={task}
        required
      />
      <label>Status:</label>
      <Select
        className='select-options'
        options={statusOptions}
        defaultValue={statusOptions}
        onChange={(option) => setStatus(option.value)}
        isRequired
      />
      <label>Start Date:</label>
      <input
        type='date'
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
        required
      />
      <label>Due Date:</label>
      <input
        type='date'
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
        required
      />
      <button type='submit'>Add Task</button>
    </form>
  )
}

export default TodoForm
