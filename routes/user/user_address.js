const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const service = require('../../services/user/userAddressService');
const { authMiddleware } = require('../../middleware/authMiddleware');
const {
  validationMiddleware,
} = require('../../middleware/validationMiddleware');

// 添加/编辑地址
const addressValidator = [
  body('address').notEmpty().withMessage('地址不能为空'),
  body('city').notEmpty().withMessage('city不能为空'),
  body('state').notEmpty().withMessage('state不能为空'),
];

const deleteAddressValidator = [
  body('id').notEmpty().withMessage('id不能为空'),
];

const editAddressValidator = addressValidator.concat(deleteAddressValidator);
/**
 * @swagger
 * /api/user/address:
 *   get:
 *     summary: 获取用户地址
 *     tags:
 *       - User-Address
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 *       500:
 *         description: 系统错误
 */
router.get('/address', authMiddleware, service.getUserAddress);
/**
 * @swagger
 * /api/user/add/address:
 *   post:
 *     summary: 添加用户地址
 *     tags:
 *       - User-Address
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 用户登录态
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             state:
 *               type: string
 *               default: '湖北省'
 *               description: ‘省份’
 *             city:
 *               type: string
 *               default: '武汉市'
 *               description: '城市'
 *             address:
 *               type: string
 *               default: '伟鹏硅谷小镇'
 *               description: '详细地址'
 *     responses:
 *       200:
 *         description: 添加成功
 *       500:
 *         description: 添加失败
 */
router.post(
  '/add/address',
  authMiddleware,
  validationMiddleware(addressValidator),
  service.addUserAddress,
);

/**
 * @swagger
 * /api/user/edit/address:
 *   post:
 *     summary: 编辑用户地址
 *     tags:
 *       - User-Address
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 用户登录态
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               default: '13'
 *               description: ‘地址id’
 *             state:
 *               type: string
 *               default: '湖北省'
 *               description: ‘省份’
 *             city:
 *               type: string
 *               default: '武汉市'
 *               description: '城市'
 *             address:
 *               type: string
 *               default: '东湖高新伟鹏硅谷小镇'
 *               description: '详细地址'
 *     responses:
 *       200:
 *         description: 修改成功
 *       500:
 *         description: 修改失败
 */
router.post(
  '/edit/address',
  authMiddleware,
  validationMiddleware(editAddressValidator),
  service.editUserAddress,
);

/**
 * @swagger
 * /api/user/del/address:
 *   post:
 *     summary: 删除用户地址
 *     tags:
 *       - User-Address
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 用户登录态
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               default: '13'
 *               description: ‘地址id’
 *     responses:
 *       200:
 *         description: 删除成功
 *       500:
 *         description: 删除失败
 */
router.post(
  '/del/address',
  authMiddleware,
  validationMiddleware(deleteAddressValidator),
  service.deleteUserAddress,
);

module.exports = router;
