const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../../services/user/userService');
const { authMiddleware } = require('../../middleware/authMiddleware'); // 鉴权信息中间件
const {
  validationMiddleware,
} = require('../../middleware/validationMiddleware');

// 登录/注册校验
const userVaildator = [
  body('username').isString().withMessage('用户名字段异常'),
  body('password').isString().withMessage('密码'),
];

router.post('/register', validationMiddleware(userVaildator), service.register);
router.post('/login', validationMiddleware(userVaildator), service.login);
router.post('/logout', authMiddleware, service.logout);
router.get('/userInfo', authMiddleware, service.userInfo);

module.exports = router;
