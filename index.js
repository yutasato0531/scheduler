require('dotenv').config();

const environment = process.env.NODE_ENV;

const knex = require("knex");
const knexConfig = require("./knexfile")[environment];

module.exports = knex(knexConfig);
