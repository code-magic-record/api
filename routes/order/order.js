const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const service = require('../../services/order/orderService');
const router = express.Router();

router.get('/list', authMiddleware, service.getOrderList); // 获取订单列表
router.post('/purchase', authMiddleware, service.purchase); // 购买
router.post('/pay', authMiddleware, service.pay); // 订单付款
router.post('/confirm', authMiddleware, service.confirmGoods); //确认收货

// 校验超级管理员， 管理员才能发货
router.post('/deliver', () => {}); // 订单发货 （后台发货）

module.exports = router;
