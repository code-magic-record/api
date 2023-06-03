const knex = require('knex');
const dotenv = require('dotenv');
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
});

module.exports = db;
