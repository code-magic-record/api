const bcrypt = require("bcrypt"); // 加密算法
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env

const saltRounds = 10;

const md5 = {
  hash: function (myPlaintextPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  },
  compare: function (myPlaintextPassword, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  // jwt 生成token
  createToken: function(payload, options = {}) {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(payload, JWT_SECRET, { ...options });
      resolve(token);
    });
  }
};

module.exports = md5;
