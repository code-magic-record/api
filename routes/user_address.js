const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const service = require("../services/userAddressService");

const { authMiddleware } = require("../middleware/auth/index");

// 添加/编辑地址
const addressVaildator = [
  body("address").notEmpty().withMessage("地址不能为空"),
  body("city").notEmpty().withMessage("city不能为空"),
  body("state").notEmpty().withMessage("state不能为空"),
];

const deleteAddressVaildator = [
  body("id").notEmpty().withMessage("id不能为空"),
];

const editAddressVaildator = addressVaildator.concat(deleteAddressVaildator);

// 获取地址
router.get("/address", authMiddleware, service.getUserAddress);
// 新增地址
router.post(
  "/add/address",
  authMiddleware,
  addressVaildator,
  service.addUserAddress
);
// 编辑地址
router.post(
  "/edit/address",
  authMiddleware,
  editAddressVaildator,
  service.editUserAddress
);
// 删除地址
router.post(
  "/del/address",
  authMiddleware,
  deleteAddressVaildator,
  service.deleteUserAddress
);

module.exports = router;
