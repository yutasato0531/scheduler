require('dotenv').config({path: '/Users/user/BTC8/scheduler/.env'});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './db/data/migrations',
    },
    seeds: { directory: './db/data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/data/migrations',
    },
    seeds: { directory: './db/data/seeds' },
  },
};