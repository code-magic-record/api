const { validationResult, cookie } = require("express-validator"); // 字段校验插件
const dayjs = require("dayjs");
const md5 = require("../utils/md5");

const knex = require("../db/index");
const { logger } = require("../middleware/log");

/**
 * 判断用户是否存在
 * @param {* 用户名 } username
 * @returns
 */
async function checkUserExists(username) {
  try {
    const result = await knex("user").select("id").where("username", username);
    return result.length > 0;
  } catch (error) {
    logger.info(error);
  }
}

/**
 * 添加用户到数据库中
 * @param {*} options
 * @returns
 */
async function addUser(options) {
  const { username, password, email, nickname, avatar } = options;
  try {
    const newUser = {
      username: username,
      email: email,
      password: password,
      nickname,
      avatar,
      create_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    const id = await knex("user").insert(newUser).returning("id");
    return id;
  } catch (error) {
    logger.info(error);
    throw new Error("Error adding a new user");
  }
}

// 用户注册
async function register(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    res.send({
      code: 400,
      msg,
    });
  }
  const { username, password, email, nickname, avatar } = req.body;
  try {
    const newPassword = await md5.hash(password); // 密码加密
    const flag = await checkUserExists(username); // 判断是否存在
    if (flag) {
      res.send({
        code: 400,
        msg: "该用户已存在",
      });
      return;
    }
    const id = await addUser({
      username,
      password: newPassword,
      email,
      nickname,
      avatar,
    });
    if (id) {
      res.send({
        code: 200,
        msg: "注册成功",
      });
    }
  } catch (e) {
    logger.info(e);
  }
}

module.exports = {
  register,
};
