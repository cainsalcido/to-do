import React, { useState, useEffect } from 'react';
import data from '../data.json';
import firebase from '../firebase';

const TodoList = () => {
  const user = firebase.auth().currentUser;
  const [tasks, setTasks] = useState(data.tasks);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: '',
  });

  useEffect(() => {
    if (user) {
      // Fetch data from API or database here
      // For now, we'll just use the local data.json file
      setTasks(data.tasks);
    }
  }, [user]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      dueDate: '',
      priority: '',
    });
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
    <div className="todo-list">
      <h1>To-Do List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask({
            id: Math.random(),
            title: newTask.title,
            dueDate: newTask.dueDate,
            priority: newTask.priority,
            completed: false,
          });
        }}
      >
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Add new task"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          placeholder="Due Date"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black',
              }}
            >
              {task.title}
            </span>
            <span>
              Due: {task.dueDate} ({task.priority})
            </span>
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
    </div>
  );
};

export default TodoList;