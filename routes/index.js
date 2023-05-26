const express = require("express");
const router = express.Router();
const userRouter = require("./user/user");
const userAddressRouter = require("./user/user_address");

router.use("/user", [userRouter, userAddressRouter]); // 注入用户模块, 用户地址模块

module.exports = router;
