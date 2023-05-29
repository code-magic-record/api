const { logger } = require("../../middleware/loggerMiddleware");
const knex = require("../../db/index");

/**
 * 获取订单列表
 * @param {*} req
 * @param {*} res
 */
async function getOrderList(req, res) {
  const { id } = req.user;
  try {
    const result = await knex("orders").select("*").where("id", id);
    res.send({
      code: 200,
      data: result,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({
      code: 0,
      message: "系统错误",
    });
  }
}

module.exports = {
  getOrderList,
};
