// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },

};
