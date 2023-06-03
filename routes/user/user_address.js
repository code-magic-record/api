const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const service = require('../../services/user/userAddressService');
const { authMiddleware } = require('../../middleware/authMiddleware');
const {
  validationMiddleware,
} = require('../../middleware/validationMiddleware');

// 添加/编辑地址
const addressVaildator = [
  body('address').notEmpty().withMessage('地址不能为空'),
  body('city').notEmpty().withMessage('city不能为空'),
  body('state').notEmpty().withMessage('state不能为空'),
];

const deleteAddressVaildator = [
  body('id').notEmpty().withMessage('id不能为空'),
];

const editAddressVaildator = addressVaildator.concat(deleteAddressVaildator);

// 获取地址
router.get('/address', authMiddleware, service.getUserAddress);
// 新增地址
router.post(
  '/add/address',
  authMiddleware,
  validationMiddleware(addressVaildator),
  service.addUserAddress,
);
// 编辑地址
router.post(
  '/edit/address',
  authMiddleware,
  validationMiddleware(editAddressVaildator),
  service.editUserAddress,
);
// 删除地址
router.post(
  '/del/address',
  authMiddleware,
  validationMiddleware(deleteAddressVaildator),
  service.deleteUserAddress,
);

module.exports = router;
