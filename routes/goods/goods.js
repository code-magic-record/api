const express = require('express');
const service = require('../../services/goods/goodsService');
const { query, body } = require('express-validator');
const {
  validationMiddleware,
} = require('../../middleware/validationMiddleware');

const router = express.Router();

const getGoodsValidator = [
  query('page')
    .notEmpty()
    .withMessage('page不能为空')
    .isInt({ gt: 0 })
    .withMessage('page必须是大于0的整数'),
  query('pageSize')
    .notEmpty()
    .withMessage('pageSize不能为空')
    .isInt({ gt: 0 })
    .withMessage('pageSize必须是大于0的整数'),
];

const getGoodsDetailValidator = [
  query('id').notEmpty().withMessage('商品id不能为空'),
];

const goodsValidator = [
  body('name').notEmpty().withMessage('商品名称不能为空'),
  body('price')
    .notEmpty()
    .withMessage('商品价格不能为空')
    .isNumeric()
    .withMessage('商品价格必须是number'),
];

const goodsIdValidator = [body('id').notEmpty().withMessage('商品id不能为空')];
const editGoodsValidator = goodsIdValidator.concat(goodsValidator);

/**
 * @swagger
 * /api/goods/list:
 *   get:
 *     summary: 获取商品列表
 *     tags:
 *       - Goods
 *     description: 用于获取商品列表
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
 *     responses:
 *       200:
 *         description: 成功获取商品列表
 *       400:
 *         description: 请求参数无效
 */
router.get(
  '/list',
  validationMiddleware(getGoodsValidator),
  service.getGoodsList,
); // 获取商品列表

/**
 * @swagger
 * /api/goods/detail:
 *   get:
 *     summary: 获取商品详情
 *     tags:
 *       - Goods
 *     description: 获取商品详情
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         default: 1
 *         description: 商品id
 *     responses:
 *       200:
 *         description: 成功获取商品列表
 *       400:
 *         description: 请求参数无效
 */
router.get(
  '/detail',
  validationMiddleware(getGoodsDetailValidator),
  service.getGoodsDetail,
); // 获取商品详情

// TODO: 先不做新增鉴权，后期超管才能新增
/**
 * @swagger
 * /api/goods/add:
 *   post:
 *     summary: 添加商品
 *     tags:
 *       - Goods
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 商品名字、价格
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: 商品名字
 *               default: '葡萄'
 *             price:
 *               type: Number
 *               description: 商品名字
 *               default: 4.5
 *     responses:
 *       200:
 *         description: 登录成功
 *       400:
 *         description: 登录失败
 */
router.post('/add', validationMiddleware(goodsValidator), service.addGoods); // 添加商品

/**
 * @swagger
 * /api/goods/edit:
 *   post:
 *     summary: 编辑商品
 *     tags:
 *       - Goods
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 商品名字、价格
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: 商品id
 *               default: 1
 *             name:
 *               type: string
 *               description: 商品名字
 *               default: '葡萄'
 *             price:
 *               type: Number
 *               description: 商品名字
 *               default: 4.5
 *     responses:
 *       200:
 *         description: 编辑成功
 *       500:
 *         description: 系统错误
 */
router.post(
  '/edit',
  validationMiddleware(editGoodsValidator),
  service.editGoods,
); // 编辑商品

/**
 * @swagger
 * /api/goods/delete:
 *   post:
 *     summary: 删除商品
 *     tags:
 *       - Goods
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 商品id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: 商品id
 *               default: '1'
 *     responses:
 *       200:
 *         description: 删除成功
 *       500:
 *         description: 系统异常
 */
router.post(
  '/delete',
  validationMiddleware(goodsIdValidator),
  service.deleteGoods,
);

module.exports = router;
