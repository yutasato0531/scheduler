/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const taskData = [];

const taskList = [
  '破砕戦争に出陣',
  'エルデの王となる',
  '狭間の地の褪せ人となる',
  '影の地にて約束の王に見える',
  'マレニアに挑む。心が折れそうだ。',
  '運命の死を盗む',
  '大壺で善き人を作り出す',
  '黄金律の時代の始まり',
  'おそらく犬',
  '祝福で休む',
  '生まれ直す',
  'モーグウィン王朝',
  'エビを茹でる',
  'ご照覧する',
  'エルデンリングを砕く',
  'ミケラの足跡を追う',
  '大ルーンを壊す',
];

function createDummy(n) {
  for (let i = 0; i < n; i++) {
    const user_id = Math.floor(Math.random() * 10 + 1);

    const year = 2025;
    const month = 5;

    const date = Math.floor(Math.random() * 31 + 1);

    const hour = Math.floor(Math.random() * 24 + 1);

    const minute = Math.floor(Math.floor(Math.random() * 59 + 1) / 15) * 15;

    const task = taskList[Math.floor(Math.random() * taskList.length)];

    taskData.push({ user_id, year, month, date, hour, minute, task });
  }
}

createDummy(500);

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('tasks').insert(taskData);
};
