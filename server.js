const path = require('path');
const express = require('express');
const db = require('.');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', async (req, res) => {
  const taskList = await db('tasks')
    .innerJoin('users', 'tasks.user_id', 'users.id')
    .orderBy('hour', 'asc')
    .orderBy('minute', 'asc');
  res.status(200).send(taskList);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
