const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')));

// MongoDB
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Objet Tâche (task)
const taskSchema = new mongoose.Schema({
  title: String,
  isDone: Boolean,
  createdAt: Date,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
  });

// Création de tâche
app.post('/tasks', async (req, res) => {
  const newTask = new Task({ title: req.body.title, isDone: false });
  try {
    const savedTask = await newTask.save();
    res.status(201).send(savedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
  
      task.isDone = req.body.isDone;
      await task.save();
  
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Suppression de tâche
  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
  });