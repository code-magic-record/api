CREATE TABLE duowan.order_items (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '订单商品主键',
    order_id INT COMMENT '订单ID，外键引用 orders 表中的 id',
    goods_id INT COMMENT '商品ID，外键引用 goods 表中的 id',
    quantity INT NOT NULL COMMENT '商品数量',
    price DECIMAL(12, 2) NOT NULL COMMENT '商品单价',
    FOREIGN KEY (order_id) REFERENCES duowan.orders(id) ON DELETE CASCADE,
    FOREIGN KEY (goods_id) REFERENCES duowan.goods(id) ON DELETE CASCADE
) COMMENT = '订单商品表';