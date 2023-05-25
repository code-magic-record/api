const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const userAddressRouter = require("./user_address");

router.use("/", userRouter); // 注入用户模块, 用户地址模块
router.use("/", userAddressRouter);

module.exports = router;
