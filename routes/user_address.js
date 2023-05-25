const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const service = require("../services/userAddressService");

const { authMiddleware } = require("../middleware/auth/index");

// 登录/注册校验
const addressVaildator = [
  body("address").notEmpty().withMessage("地址不能为空"),
  body("city").notEmpty().withMessage("city不能为空"),
  body("state").notEmpty().withMessage("state不能为空"),
];

router.get("/address", authMiddleware, service.getUserAddress);
router.post("/address", authMiddleware, addressVaildator, service.addUserAddress);
module.exports = router;
