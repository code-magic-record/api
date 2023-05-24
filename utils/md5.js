const bcrypt = require("bcrypt"); // 加密算法

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
};

module.exports = md5;
