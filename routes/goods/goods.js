const express = require("express");
const service = require("../../services/goods/goodsService");
const { query } = require("express-validator");

const router = express.Router();

const getGoodsValidator = [
  query("page")
    .notEmpty()
    .withMessage("page不能为空")
    .isInt({ gt: 0 })
    .withMessage("page必须是大于0的整数"),
  query("pageSize")
    .notEmpty()
    .withMessage("pageSize不能为空")
    .isInt({ gt: 0 })
    .withMessage("pageSize必须是大于0的整数"),
];

router.get("/get", getGoodsValidator, service.getGoodsList); // 获取商品列表

module.exports = router;
