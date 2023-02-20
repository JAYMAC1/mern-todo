import React from 'react'

const todoDetails = ({ todo }) => {
  return (
    <div className='todo-details'>
      <h4>{todo.task}</h4>
      <p>
        <strong>Status: </strong>
        {todo.status}
      </p>
      <p>
        <strong>Start Date: </strong>
        {todo.startDate}
      </p>
      <p>
        <strong>Due Date: </strong>
        {todo.dueDate}
      </p>
      <p>{todo.createdAt}</p>
      <span>delete</span>
    </div>
  )
}

export default todoDetails
