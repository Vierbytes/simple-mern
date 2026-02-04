// TaskList component - displays all tasks and handles task actions
// I learned that components can receive data through "props" -
// tasks is the array of task objects, updateTasks is a function to refresh the list

import React from 'react';

// Get API URL from environment variable (set during build for production)
const API_URL = process.env.REACT_APP_API_URL || '';

const TaskList = ({ tasks, updateTasks }) => {
  // Handler for deleting a task when user clicks the X button
  const clickDeleteTask = (event, task) => {
    event.preventDefault();

    // Send DELETE request to backend with the task's MongoDB _id
    fetch(`${API_URL}/api/tasks/delete/${task._id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(() => updateTasks()); // Refresh the list after deletion
  };

  // Handler for toggling task completion status
  // Flips the 'done' boolean when user clicks the checkbox
  const toggleDone = task => {
    fetch(`${API_URL}/api/tasks/update/${task._id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done }), // Toggle the done status
    }).then(() => updateTasks());
  };

  return (
    <ul className="tasks">
      {tasks.map(task => (
        <li key={task._id}>
          <label className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task)}
            />{' '}
            {task.title}
            <svg
              onClick={event => clickDeleteTask(event, task)}
              className="delete-button"
              width="16"
              height="16"
              viewBox="0 0 12 16"
            >
              <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
            </svg>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
