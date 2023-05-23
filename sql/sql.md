### 用户表（user）

| 字段名称    | 类型         | 说明         |
|-------------|--------------|--------------|
| id          | int          | 主键，自增   |
| username    | varchar(255) | 用户名       |
| password    | varchar(255) | 密码，已加密 |
| email       | varchar(255) | 电子邮箱     |
| nickname    | varchar(255) | 昵称         |
| avatar      | varchar(255) | 用户头像     |
| create_time | datetime     | 创建时间     |
| update_time | datetime     | 更新时间     |

### 订单表（order）

| 字段名称     | 类型          | 说明                                                              |
|--------------|---------------|-------------------------------------------------------------------|
| id           | int           | 主键，自增                                                        |
| user_id      | int           | 用户ID                                                            |
| total_amount | decimal(12,2) | 订单总金额                                                        |
| status       | int           | 订单状态（0：已下单，1：已付款，2：已发货，3：已完成，4：已取消） |
| create_time  | datetime      | 创建时间                                                          |
| update_time  | datetime      | 更新时间                                                          |

### 商品表（product）

| 字段名称    | 类型          | 说明       |
|-------------|---------------|------------|
| id          | int           | 主键，自增 |
| name        | varchar(255)  | 商品名称   |
| price       | decimal(12,2) | 商品单价   |
| description | text          | 商品描述   |
| create_time | datetime      | 创建时间   |
| update_time | datetime      | 更新时间   |

### 订单商品表（order_items）

| 字段名称    | 类型          | 说明                     |
|-------------|---------------|--------------------------|
| id          | int           | 主键，自增               |
| order_id    | int           | 订单ID                   |
| product_id  | int           | 商品ID                   |
| quantity    | int           | 购买数量                 |
| price       | decimal(12,2) | 商品单价，方便查询时使用 |
| create_time | datetime      | 创建时间                 |
| update_time | datetime      | 更新时间                 |



### 用户地址表（user_address）

| 字段名称    | 类型         | 说明                               |
|-------------|--------------|------------------------------------|
| id          | int          | 主键，自增                         |
| user_id     | int          | 用户ID（外键，关联用户表的id字段） |
| address     | varchar(255) | 地址                               |
| city        | varchar(255) | 城市                               |
| state       | varchar(255) | 州/省                              |
| country     | varchar(255) | 国家                               |
| postal_code | varchar(255) | 邮政编码                           |
| create_time | datetime     | 创建时间                           |
| update_time | datetime     | 更新时间                           |
