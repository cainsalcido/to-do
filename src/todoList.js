import React, { useState, useEffect } from 'react';
import data from '../data.json';
import firebase from '../firebase';

const TodoList = () => {
  const user = firebase.auth().currentUser;
  const [tasks, setTasks] = useState(data.tasks);

  useEffect(() => {
    if (user) {
      // Fetch data from API or database here
      // For now, we'll just use the local data.json file
      setTasks(data.tasks);
    }
  }, [user]);

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

  const handleUpdateDueDate = (id, dueDate) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, dueDate };
        }
        return task;
      })
    );
  };

  const handleUpdatePriority = (id, priority) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, priority };
        }
        return task;
      })
    );
  };

  if (!user) {
    return <div>You need to login to access your todo list</div>;
  }

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
            <span>Due: {task.dueDate}</span>
            <span>Priority: {task.priority}</span>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
            <button onClick={() => handleUpdateDueDate(task.id, prompt('Enter new due date'))}>
              Update Due Date
            </button>
            <button onClick={() => handleUpdatePriority(task.id, prompt('Enter new priority'))}>
              Update Priority
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const task = {
            id: Math.random(),
            title: e.target.elements.title.value,
            completed: false,
            dueDate: '',
            priority: '',
          };
          handleAddTask(task);
          e.target.elements.title.value = '';
        }}
      >
        <input type="text" name="title" placeholder="Add new task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoList;