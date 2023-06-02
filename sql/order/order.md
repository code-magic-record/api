### status

| 状态值 | 说明   |
| ------ | ------ |
| 1      | 未付款 |
| 2      | 已付款 |
| 3      | 待发货 |
| 4      | 已发货 |
| 5      | 已送达 |
| 6      | 已取消 |
| 7      | 已退款 |

### 订单表（orders）

| 字段名称    | 类型                                    | 说明                                 |
| ----------- | --------------------------------------- | ------------------------------------ |
| id          | int                                     | 主键，自增                           |
| order_no    | varchar(255)                            | 订单唯一编号                         |
| user_id     | int                                     | 用户 ID，外键引用 `user` 表中的 `id` |
| create_date | datetime                                | 订单日期                             |
| pay_date    | datetime                                | 付款日期                             |
| status      | ENUM('1', '2', '3', '4', '5', '6', '7') | 订单状态                             |
| total_price | decimal(12,2)                           | 订单总价格                           |

### 订单商品表（order_items）

| 字段名称 | 类型           | 说明                                   |
| -------- | -------------- | -------------------------------------- |
| id       | int            | 主键，自增                             |
| order_id | int            | 订单 ID，外键引用 `orders` 表中的 `id` |
| goods_id | int            | 商品 ID，外键引用 `goods` 表中的 `id`  |
| quantity | int            | 商品数量                               |
| price    | decimal(12, 2) | 商品的单价                             |