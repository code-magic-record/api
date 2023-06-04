const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../../services/user/userService');
const { authMiddleware } = require('../../middleware/authMiddleware'); // 鉴权信息中间件
const {
  validationMiddleware,
} = require('../../middleware/validationMiddleware');

// 登录/注册校验
const userValidator = [
  body('username').isString().withMessage('用户名字段异常'),
  body('password').isString().withMessage('密码'),
];

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: 用户注册
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 用户名和密码
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               default: 'admin'
 *               description: 用户名
 *             password:
 *               type: string
 *               default: '123456'
 *               description: 密码
 *     responses:
 *       200:
 *         description: 注册成功
 *       0:
 *         description: 注册失败
 */
router.post('/register', validationMiddleware(userValidator), service.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 用户登录
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: 用户名和密码
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: 用户名
 *               default: 'admin'
 *             password:
 *               type: string
 *               default: '123456'
 *               description: 密码
 *     responses:
 *       200:
 *         description: 登录成功
 *       400:
 *         description: 登录失败
 */
router.post('/login', validationMiddleware(userValidator), service.login);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: 用户登出
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 登出成功
 *       401:
 *         description: 未授权访问
 */
router.post('/logout', authMiddleware, service.logout);

/**
 * @swagger
 * /api/user/userInfo:
 *   get:
 *     summary: 获取用户信息
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 *       401:
 *         description: 未授权访问
 */
router.get('/userInfo', authMiddleware, service.userInfo);

module.exports = router;
