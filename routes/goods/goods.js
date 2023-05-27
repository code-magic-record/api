const express = require("express");
const service = require("../../services/goods/goodsService");
const { query, body } = require("express-validator");
const {
  validationMiddleware,
} = require("../../middleware/validationMiddleware");

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

const getGoodsDetailVaildator = [
  query("id").notEmpty().withMessage("商品id不能为空"),
];

const goodsVaildtor = [
  body("name").notEmpty().withMessage("商品名称不能为空"),
  body("price")
    .notEmpty()
    .withMessage("商品价格不能为空")
    .isNumeric()
    .withMessage("商品价格必须是number"),
];

const goodsIdVaildtor = [body("id").notEmpty().withMessage("商品id不能为空")];
const editGoodsVaildtor = goodsIdVaildtor.concat(goodsVaildtor);

router.get(
  "/list",
  validationMiddleware(getGoodsValidator),
  service.getGoodsList
); // 获取商品列表

router.get(
  "/detail",
  validationMiddleware(getGoodsDetailVaildator),
  service.getGoodsDetail
); // 获取商品详情

// TODO: 先不做新增鉴权，后期超管才能新增
router.post("/add", validationMiddleware(goodsVaildtor), service.addGoods); // 添加商品
router.post(
  "/edit",
  validationMiddleware(editGoodsVaildtor),
  service.editGoods
); // 编辑商品
router.post(
  "/delete",
  validationMiddleware(goodsIdVaildtor),
  service.delteGoods
); // 删除商品

module.exports = router;
