const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.use("/api", userRouter); // 注入用户模块

module.exports = router;
