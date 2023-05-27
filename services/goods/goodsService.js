const dayjs = require("dayjs");
const knex = require("../../db/index");
const { logger } = require("../../middleware/loggerMiddleware");

/**
 * 查询商品列表
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
    throw new Error("获取列表失败");
  }
}

/**
 * 查询商品详情根据id
 * @param {*} id
 */
async function getGoodsWithId(id) {
  try {
    const goodsDetail = await knex("goods")
      .select("id", "name", "price", "description")
      .where("id", id);
    const goodsImgs = await knex("goods_images")
      .select("image_url")
      .where("goods_id", id);
    return {
      ...goodsDetail,
      imgs: goodsImgs,
    };
  } catch (e) {
    logger.error(e);
    throw new Error("查询失败");
  }
}

/**
 * 插入商品
 * @param {*} options
 */
async function insertGoods(options) {
  const { categoryId, name, price, description, imgUrl } = options;
  try {
    // 获取当前最大的 goods_id
    const maxGoodsIdResult = await knex("goods")
      .max("goods_id as maxGoodsId")
      .first();
    const newGoodsId = (maxGoodsIdResult.maxGoodsId || 0) + 1;
    const newGoods = {
      goods_id: newGoodsId,
      category_id: categoryId,
      name,
      price,
      description,
      main_image_url: imgUrl,
      create_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    const result = await knex("goods").insert(newGoods);
    return result;
  } catch (error) {
    logger.error(error);
    throw new Error("插入失败");
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

/**
 * 获取商品详情
 * @param {*} req
 * @param {*} res
 */
async function getGoodsDetail(req, res) {
  const { id } = req.query;
  try {
    const data = await getGoodsWithId(id);
    if (!data.id) {
      return res.status(400).send({
        code: 0,
        message: "商品不存在",
      });
    }
    res.send({
      code: 200,
      data,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({
      code: 500,
      message: e,
    });
  }
}

/**
 * 添加商品
 * @param {*} req
 * @param {*} res
 */
async function addGoods(req, res) {
  const { categoryId, name, price, description = "", imgUrl = "" } = req.body;
  const newGoods = {
    categoryId,
    name,
    price,
    description,
    imgUrl,
  };
  try {
    const result = await insertGoods(newGoods);
    console.log(result);
    res.send({
      code: 200,
      message: "新增成功",
    });
  } catch (e) {
    res.status(500).send({
      code: 0,
      message: e,
    });
  }
}

module.exports = {
  getGoodsList,
  getGoodsDetail,
  addGoods,
};
