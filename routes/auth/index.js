const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login } = require('../../services/auth/authService');
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
 * /api/auth/login:
 *   post:
 *     summary: 管理员登录
 *     tags:
 *       - Admin
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
router.post('/login', validationMiddleware(userValidator), login);

module.exports = router;
