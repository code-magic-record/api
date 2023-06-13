const Cos = require('cos-nodejs-sdk-v5');
const dotenv = require('dotenv');
dotenv.config();
const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env;

const cosClient = new Cos({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY,
});

module.exports = cosClient;
