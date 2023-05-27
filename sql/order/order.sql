CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '订单主键',
    order_no VARCHAR(255) NOT NULL UNIQUE COMMENT '订单唯一编号',
    address_id int COMMENT '用户地址id, 外键饮用 user_address 表中的id',
    user_id INT COMMENT '用户ID，外键引用 user 表中的 id',
    create_time DATETIME NOT NULL COMMENT '订单创建日期',
    pay_time DATETIME NOT NULL COMMENT '订单付款日期',
    status INT NOT NULL COMMENT '订单状态：1 - 未付款, 2 - 已付款, 3 - 待发货, 4 - 已发货, 5 - 已送达, 6 - 已取消, 7 - 已退款',
    total_price DECIMAL(12, 2) NOT NULL COMMENT '订单总价',
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (address_id) REFERENCES user_address(id)
) COMMENT = '订单表';