const dayjs = require("dayjs");
const knex = require("../../db/index");
const { logger } = require("../../middleware/loggerMiddleware");

/**
 * 查询地址根据userId
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

/**
 * 根据address 查询地址
 * @param {*} addressId
 */
async function queryUserAddressById(addressId) {
  try {
    const address = await knex("user_address")
      .select("*")
      .where("id", addressId);
    return address;
  } catch (e) {
    logger.error(e);
  }
}

/**
 * 插入地址
 * @param {*} options
 * @returns
 */
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
 * 删除地址
 * @param {addressId}
 */
async function updateUserAddress(addressId) {
  try {
    const deletedRows = await knex("user_address").where("id", addressId).del();
    if (deletedRows !== 0) {
      return true;
    }
    return false;
  } catch (e) {
    logger.error(e);
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

/**
 * 检测是否存在 存在返回ture, 不存在返回fasle
 * @param {*} addressId
 * @returns
 */
async function checkUserAddrssExist(addressId) {
  try {
    const addressRow = await queryUserAddressById(addressId);
    if (addressRow.length === 0) {
      return false;
    }
    return true;
  } catch (e) {
    logger.error(e);
  }
}

/**
 * 编辑地址
 * @param {*} req
 * @param {*} res
 */
async function editUserAddress(req, res) {
  const { user } = req;
  const { id, state, address, city } = req.body;
  const user_address = {
    address,
    state,
    city,
    user_id: user.id,
  };
  try {
    const exit = await checkUserAddrssExist(id); // 检查地址是否存在
    if (!exit) {
      return res.send({
        code: 0,
        message: "地址id错误",
      });
    }
    await updateUserAddress(id); // 删除地址
    const result = await insertUserAddress(user_address);
    if (result.length > 0) {
      return res.send({
        code: 200,
        message: "修改成功",
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

/**
 * 删除地址
 * @param {*} req
 * @param {*} res
 */
async function deleteUserAddress(req, res) {
  try {
    const { id } = req.body;
    const exit = await checkUserAddrssExist(id); // 检查地址是否存在
    if (!exit) {
      return res.send({
        code: 0,
        message: "地址不存在",
      });
    }
    const flag = await updateUserAddress(id); // 删除地址
    if (flag) {
      return res.send({
        code: 200,
        message: "删除成功",
      });
    }
  } catch (e) {
    logger.error(e);
  }
}

module.exports = {
  getUserAddress,
  addUserAddress,
  editUserAddress,
  deleteUserAddress,
};
