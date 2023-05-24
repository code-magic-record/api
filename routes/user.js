const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const service = require("../services/userService");
const { authMiddleware } = require("../middleware/auth"); // 鉴权信息中间件

// 登录/注册校验
const vaildator = [
  body("username").isString().withMessage("用户名字段异常"),
  body("password").isString().withMessage("密码"),
];

router.post("/register", vaildator, service.register);
router.post("/login", vaildator, service.login);
router.post("/logout", authMiddleware, service.logout);
router.get("/userInfo", authMiddleware, service.userInfo);


module.exports = router;
