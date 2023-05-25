const { validationResult } = require("express-validator"); // 字段校验插件
const dayjs = require("dayjs");
const knex = require("../db/index");
const { logger } = require("../middleware/log");

/**
 * 查询地址
 * @param {*} userId
 * @returns
 */
async function queryUserAddress(userId) {
  try {
    const address = await knex("user_address")
      .select("*")
      .where("user_id", userId);
    return address;
  } catch (e) {
    logger.error(e);
  }
}

async function insertUserAddress(options) {
  const { state, city, address, user_id } = options;
  try {
    const user_address = {
      state,
      city,
      address,
      user_id,
      create_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    const id = await knex("user_address").insert(user_address).returning("id");
    return id;
  } catch (error) {
    logger.info(error);
    throw new Error("Error adding a new user");
  }
}

/**
 * 获取地址
 * @param {*} req
 * @param {*} res
 */
async function getUserAddress(req, res) {
  const { user } = req;
  const { id } = user;
  const address = await queryUserAddress(id);
  res.send({
    code: 200,
    address,
  });
}

/**
 * 添加地址
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function addUserAddress(req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg: message }] = err.errors;
    return res.send({
      code: 400,
      message,
    });
  }

  const { address, state, city } = req.body;
  const { user } = req;
  const user_address = {
    address,
    state,
    city,
    user_id: user.id,
  };
  try {
    const result = await insertUserAddress(user_address);
    if (result.length > 0) {
      return res.send({
        code: 200,
        message: "插入成功",
      });
    }
  } catch (e) {
    logger.error(e);
    return res.send({
      code: 500,
      message: "数据插入失败",
    });
  }
}

module.exports = {
  getUserAddress,
  addUserAddress,
};
