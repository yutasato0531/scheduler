const path = require('path');
const express = require('express');
const db = require('.');
const app = express();
const crypto = require('crypto');
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
  await db('tasks').insert(req.body);
  const response = await db('tasks');
  res.status(200).send(response.at(-1));
});

app.post('/api/login', async (req, res) => {

  function hashPassword(password, salt) {
    return crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');
  }
  
  const dbUser = await db('users').where('user_name', req.body.userName);
  const inputPasswordHash = hashPassword(req.body.password, dbUser[0].salt);

  if(inputPasswordHash == dbUser[0].hash){
    res.status(200).send('successful');
  }else {
    res.status(400).send('failed')
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
