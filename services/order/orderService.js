const { logger } = require('../../middleware/loggerMiddleware');
const knex = require('../../db/index');
const { generateOrderNumber } = require('../../utils/index');
const dayjs = require('dayjs');
const Decimal = require('decimal.js');

/**
 * 查询当天订单号，没有的话生成一个新的
 * @returns
 */
async function queryOrderNO() {
  // 查询当天最大的订单号
  try {
    const maxOrderNumber = await knex('orders')
      .max('order_no', { as: 'maxOrderNo' })
      .where('create_time', '>=', dayjs().startOf('day').toDate())
      .where('create_time', '<', dayjs().endOf('day').toDate())
      .first();
    let nextOrderNumber = 1;
    if (maxOrderNumber && maxOrderNumber.maxOrderNo) {
      nextOrderNumber = parseInt(maxOrderNumber.maxOrderNo) + 1;
      return nextOrderNumber.toString();
    }
    return generateOrderNumber() + nextOrderNumber.toString().padStart(5, '0');
  } catch (e) {
    logger.error(e);
  }
}

/**
 * 查询商品价格
 * @param {*} goodsId
 * @returns
 */
async function fetchPrice(goodsId) {
  const result = await knex('goods')
    .select('price')
    .where('id', goodsId)
    .first();

  if (result && result.price) {
    return result.price;
  } else {
    logger.error(`找不到商品ID为 ${goodsId} 的价格`);
    throw new Error(`找不到商品ID为 ${goodsId} 的价格`);
  }
}

/**
 * 获取订单列表
 * @param {*} req
 * @param {*} res
 */
async function getOrderList(req, res) {
  const { id } = req.user;
  const { status = '', page = 1, pageSize = 20 } = req.query;
  try {
    // 根据用户状态，分页查询订单列表
    const total = await knex('orders')
      .count('id', { as: 'total' })
      .where('user_id', id)
      .where('status', status)
      .first();
    const result = await knex('orders')
      .select('*')
      .where('user_id', id)
      .where('status', status)
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    res.send({
      code: 200,
      data: result,
      total: total.total,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({
      code: 0,
      message: '系统错误',
    });
  }
}

/**
 * 用户下单
 * @param {*} req
 * @param {*} res
 */
async function purchase(req, res) {
  const { id: user_id } = req.user;
  const { goods_list, address_id } = req.body;
  let total_price = new Decimal(0);
  let newGoods = [];
  try {
    for (const goods of goods_list) {
      const price = await fetchPrice(goods.goods_id);
      total_price = total_price.plus(price * goods.count);
      newGoods.push({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...goods,
        price,
      });
    }
  } catch (e) {
    return res.status(400).send({
      code: 400,
      message: e.message,
    });
  }
  const order_no = await queryOrderNO();
  const order = {
    address_id,
    order_no,
    user_id,
    total_price: total_price.toString(),
    status: 1,
    pay_time: null,
    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };
  try {
    const orderId = await knex('orders').insert(order);
    for (const goods of newGoods) {
      const orderGoods = {
        order_id: orderId[0],
        goods_id: goods.goods_id,
        quantity: goods.count,
        price: goods.price,
      };
      await knex('order_items').insert(orderGoods);
    }
    res.send({
      code: 0,
      message: '下单成功',
      order_no,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({
      code: 0,
      message: '系统错误',
    });
  }
}

/**
 * 用户付款
 * @param {*} req
 * @param {*} res
 */
async function pay(req, res) {
  // TODO 需要校验用户是否存在这个订单？
  // TODO 简单的模拟付款
  const { order_no } = req.body;
  try {
    await knex('orders')
      .update({
        status: 2,
        pay_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
      .where('order_no', order_no);
    res.send({
      code: 200,
      message: '付款成功',
    });
  } catch (e) {
    res.status(500).send({
      code: 0,
      message: '系统异常',
    });
  }
}

/**
 * 确认收货
 * @param {*} req
 * @param {*} res
 */
async function confirmGoods(req, res) {
  // TODO: 模拟
  const { order_no } = req.body;

  try {
    await knex('orders')
      .update({
        status: 8,
      })
      .where('order_no', order_no);
    res.send({
      code: 200,
      message: '确认收货成功',
    });
  } catch (e) {
    res.send({
      code: 0,
      message: '系统错误',
    });
  }
}
module.exports = {
  getOrderList,
  purchase,
  pay,
  confirmGoods,
};
