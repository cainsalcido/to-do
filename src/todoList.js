import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const TodoList = () => {
  const user = firebase.auth().currentUser;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: '',
  });

  useEffect(() => {
    if (user) {
      const tasksRef = db.ref('tasks');
      tasksRef.on('value', (snapshot) => {
        const tasks = snapshot.val();
        setTasks(tasks ? Object.values(tasks) : []);
      });
    }
  }, [user]);

  const handleAddTask = (task) => {
    const tasksRef = db.ref('tasks');
    tasksRef.push(task);
    setNewTask({
      title: '',
      dueDate: '',
      priority: '',
    });
  };

  const handleRemoveTask = (id) => {
    const tasksRef = db.ref('tasks');
    tasksRef.child(id).remove();
  };

  const handleToggleCompleted = (id) => {
    const tasksRef = db.ref('tasks');
    tasksRef.child(id).update({ completed: true });
  };

  const handleUpdateDueDate = (id, dueDate) => {
    const tasksRef = db.ref('tasks');
    tasksRef.child(id).update({ dueDate });
  };

  const handleUpdatePriority = (id, priority) => {
    const tasksRef = db.ref('tasks');
    tasksRef.child(id).update({ priority });
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