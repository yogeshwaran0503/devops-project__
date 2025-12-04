const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (for demo purposes)
let tasks = [];
let taskId = 1;

// Routes
app.get('/api/tasks', (req, res) => {
  console.log('GET /api/tasks - returning:', tasks);
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  console.log('POST /api/tasks - received:', req.body);
  const task = {
    _id: taskId++,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  console.log('Task created:', task);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('DELETE /api/tasks/' + id);
  tasks = tasks.filter(task => task._id !== id);
  res.json({ message: 'Task deleted' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Using in-memory storage (no MongoDB required)');
});