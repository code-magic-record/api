const knex = require('knex');
const dotenv = require('dotenv');
const { logger } = require('../middleware/loggerMiddleware');
dotenv.config();

const { MYSQL_HOST, MYSQL_POST, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD } =
  process.env;

const db = knex({
  client: 'mysql2',
  connection: {
    host: MYSQL_HOST,
    port: MYSQL_POST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
  debug: true,
  log: {
    warn(message) {
      const { sql } = message;
      logger.warn(sql);
      console.log(sql);
    },
    error(message) {
      const { sql } = message;
      logger.error(sql);
      console.log(sql);
    },
    deprecate(message) {
      const { sql } = message;
      logger.info(sql);
      console.log(sql);
    },
    debug(message) {
      const { sql } = message;
      logger.debug(sql);
      console.log(sql);
    },
  },
});

module.exports = db;
