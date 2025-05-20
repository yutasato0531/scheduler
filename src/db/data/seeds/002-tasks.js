/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const taskData = [];

const taskList = ['breakfast', 'lunch', 'dinner', 'running', 'study', 'meeting', 'hospital', 'cooking', 'game', 'training', 'skiing',]

function createDummy(n) {
  for(let i = 0; i < n; i ++) {
    const user_id = Math.floor(Math.random() * 10 +1);

    const year = 2025;
    const month = 5;

    const date = Math.floor(Math.random() * 31 +1);

    const hour = Math.floor(Math.random() * 24 +1);

    const minute = Math.floor(Math.random() * 59 +1);

    const task = taskList[Math.floor(Math.random() * taskList.length)];

    taskData.push({user_id, year, month, date, hour, minute, task})
  }
}

createDummy(500);

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert(taskData);
};
