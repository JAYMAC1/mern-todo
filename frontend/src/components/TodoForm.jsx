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
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Task Name:', task)
    console.log('Status:', status)
    console.log('Due Date:', dueDate)
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
        options={statusOptions}
        value={status}
        onChange={(e) => setStatus(e.target)}
      />
      <label>Due Date:</label>
      <input
        type='date'
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
        required
      />
      {/* <DatePicker
        selected={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
      /> */}
      <button type='submit'>Add Task</button>
    </form>
  )
}

export default TodoForm
