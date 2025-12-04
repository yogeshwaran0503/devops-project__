const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Mock tasks data
let tasks = [
  { _id: '1', title: 'Sample Task 1' },
  { _id: '2', title: 'Sample Task 2' }
];

// Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { _id: Date.now().toString(), title: req.body.title };
  tasks.push(task);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task._id !== req.params.id);
  res.json({ message: 'Task deleted' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});