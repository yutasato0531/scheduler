const path = require('path');
const express = require('express');
const db = require('.');
const app = express();
require('dotenv').config({ path: '/Users/user/BTC8/scheduler/.env' });

let PORT;
if (process.env.NODE_ENV === 'development') {
  PORT = 8080;
} else if (process.env.NODE_ENV === 'production') {
  PORT = 443;
}

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', async (req, res) => {
  const userList = await db('users').select('id', 'user_name');
  res.status(200).send(userList);
});

app.get('/api/:userName', async (req, res) => {
  const taskList = await db('tasks')
    .innerJoin('users', 'tasks.user_id', 'users.id')
    .orderBy('hour', 'asc')
    .orderBy('minute', 'asc')
    .where('user_name', req.params.userName);
    
    res.status(200).send(taskList);
  });
  
  app.post('/api', async (req, res) => {
    console.log(req.body);
    await db('tasks').insert(req.body);
    const response = await db('tasks');
  res.status(200).send(response.at(-1));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
