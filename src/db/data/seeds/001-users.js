/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const crypto = require('crypto');

const userData = [];

const useNameList = [
  'Malenia',
  'Radagon',
  'Gideon',
  'Godrick',
  'Placidusax',
  'Miquella',
  'Astel',
  'Lanssaex',
  'Morgott',
  'Maliketh',
];
const firstNameList = [
  'yuta',
  'mizuki',
  'yukino',
  'hiroshi',
  'ai',
  'rui',
  'rihito',
];
const lastNameList = [
  'sato',
  'tanaka',
  'suzuki',
  'ito',
  'saito',
  'yamada',
  'takahashi',
  'watanabe',
  'yamamoto',
  'kobayashi',
];
const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

function createDummy(n) {
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * useNameList.length);
    const user_name = useNameList[index];
    useNameList.splice(index, 1);

    const first_name =
      firstNameList[Math.floor(Math.random() * firstNameList.length)];

    const last_name =
      lastNameList[Math.floor(Math.random() * lastNameList.length)];

    let salt = '';
    for (let j = 0; j < 10; j++) {
      salt += characters[Math.floor(Math.random() * characters.length)];
    }

    const hash = hashPassword('password', salt);

    userData.push({ user_name, first_name, last_name, salt, hash });
  }
}

createDummy(10);

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex');
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert(userData);
};
