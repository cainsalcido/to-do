import React, { useState, useEffect } from 'react';
import data from '../data.json';

function TodoList() {
  const [tasks, setTasks] = useState(data.tasks);

  useEffect(() => {
    // Fetch data from API or database here
  }, []);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form>
        <input type="text" placeholder="Add new task" />
        <button onClick={(e) => handleAddTask({ id: tasks.length + 1, title: e.target.value })}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TodoList;