const express = require('express');
const router = express.Router();
const db = require('./firebase');

router.get('/tasks', async (req, res) => {
  const tasksRef = db.ref('tasks');
  const tasks = await tasksRef.once('value');
  res.json(tasks.val());
});

router.post('/tasks', async (req, res) => {
  const tasksRef = db.ref('tasks');
  const newTask = req.body;
  const newTaskRef = tasksRef.push();
  newTaskRef.set(newTask);
  res.json(newTask);
});

router.put('/tasks/:id', async (req, res) => {
  const tasksRef = db.ref('tasks');
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasksRef.child(taskId).update(updatedTask);
  res.json(updatedTask);
});

router.delete('/tasks/:id', async (req, res) => {
  const tasksRef = db.ref('tasks');
  const taskId = req.params.id;
  tasksRef.child(taskId).remove();
  res.json({ message: 'Task deleted' });
});

module.exports = router;