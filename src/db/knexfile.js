require('dotenv').config({path: '/Users/user/BTC8/scheduler/.env'});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};