const knex = require("../../db/index");
const { logger } = require("../../middleware/loggerMiddleware");

/**
 * 查询商品
 * @param {*} options
 * @returns
 */
async function getGoodsWithPagination(options) {
  const { page, pageSize } = options;
  try {
    const goods = await knex("goods")
      .select("*")
      .offset((page - 1) * pageSize)
      .limit(pageSize);

    return goods;
  } catch (error) {
    logger.error(error);
    throw new Error("Error fetching goods with pagination");
  }
}

/**
 * 获取商品列表
 * @param {*} req
 * @param {*} res
 */
async function getGoodsList(req, res) {
  const { page = 1, pageSize = 20 } = req.query;
  const result = await getGoodsWithPagination({ page, pageSize });
  res.send({
    code: 200,
    data: result,
  });
  try {
  } catch (e) {
    res.send({
      code: 500,
      message: "获取列表失败",
    });
  }
}

module.exports = {
  getGoodsList,
};
