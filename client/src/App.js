// Main App component for the TaskMaster application
// This handles displaying tasks and adding new ones
// I learned that React uses components to organize UI into reusable pieces

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import TasksList from './components/TaskList';

// Get the API URL from environment variable, or use empty string for relative paths
// When deployed, REACT_APP_API_URL will point to our backend on Render
// In development, the proxy in package.json handles routing to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || '';

const App = () => {
  // useState hooks to manage component state
  // tasks array holds all the tasks from the database
  // newTaskTitle holds what the user is typing in the input field
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Function to fetch all tasks from the backend API
  // useCallback helps prevent unnecessary re-renders
  const getTasks = useCallback(() => {
    fetch(`${API_URL}/api/tasks`)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  // useEffect runs when the component first loads
  // Empty dependency array means it only runs once on mount
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // Handle form submission when user clicks Add button
  const clickAddTask = event => {
    event.preventDefault(); // Prevent page refresh on form submit

    // POST request to add a new task to the database
    fetch(`${API_URL}/api/tasks/add`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    }).then(() => {
      setNewTaskTitle(''); // Clear the input field
      getTasks(); // Refresh the task list
    });
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>

      <TasksList tasks={tasks} updateTasks={getTasks} />

      <form onSubmit={clickAddTask}>
        <input
          type="text"
          size="30"
          placeholder="New Task"
          value={newTaskTitle}
          onChange={event => setNewTaskTitle(event.target.value)}
        />
        <input className="btn-primary" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default App;
