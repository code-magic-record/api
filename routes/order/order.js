const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const service = require('../../services/order/orderService');
const router = express.Router();

/**
 * @swagger
 * /api/order/list:
 *   get:
 *     summary: 获取订单列表
 *     tags:
 *       - Orders
 *     description: 获取订单列表
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: 页码
 *       - in: query
 *         name: pageSize
 *         default: 20
 *         required: true
 *         description: 每页数量
 *       - in: query
 *         name: status
 *         default: 1
 *         description: 订单状态
 *     responses:
 *       200:
 *         description: 成功获取订单列表
 *       400:
 *         description: 请求参数无效
 */
router.get('/list', authMiddleware, service.getOrderList); // 获取订单列表

/**
 * @swagger
 * /api/order/purchase:
 *   post:
 *     summary: 购买
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 商品信息
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address_id:
 *               type: number
 *               description: '用户地址id'
 *               default: 15
 *             total_price:
 *               type: number
 *               description: '商品总价'
 *               default: 400
 *             goods_list:
 *               type: array
 *               description: 商品列表
 *               default: '[{ "goods_id": 1, "count": 400}, { "goods_id": 2, "count": 100}]'
 *     responses:
 *       200:
 *         description: 下单成功
 *       500:
 *         description: 系统错误
 */
router.post('/purchase', authMiddleware, service.purchase); // 购买

/**
 * @swagger
 * /api/order/pay:
 *   post:
 *     summary: 用户付款
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 付款订单号
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             order_no:
 *               type: string
 *               description: '用户订单号'
 *               default: '23060400001'
 *     responses:
 *       200:
 *         description: 付款成功
 *       500:
 *         description: 系统错误
 */
router.post('/pay', authMiddleware, service.pay); // 订单付款

/**
 * @swagger
 * /api/order/confirm:
 *   post:
 *     summary: 确认收货
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 订单号信息
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             order_no:
 *               type: string
 *               description: '用户订单号'
 *               default: '23060400001'
 *     responses:
 *       200:
 *         description: 下单成功
 *       500:
 *         description: 系统错误
 */
router.post('/confirm', authMiddleware, service.confirmGoods); //确认收货

// 校验超级管理员， 管理员才能发货
router.post('/deliver', () => {}); // 订单发货 （后台发货）

module.exports = router;
