### 用户表（user）

| 字段名称    | 类型         | 说明         |
| ----------- | ------------ | ------------ |
| id          | int          | 主键，自增   |
| username    | varchar(255) | 用户名       |
| password    | varchar(255) | 密码，已加密 |
| email       | varchar(255) | 电子邮箱     |
| nickname    | varchar(255) | 昵称         |
| avatar      | varchar(255) | 用户头像     |
| create_time | datetime     | 创建时间     |
| update_time | datetime     | 更新时间     |

### 用户地址表（user_address）

| 字段名称    | 类型         | 说明                                  |
| ----------- | ------------ | ------------------------------------- |
| id          | int          | 主键，自增                            |
| user_id     | int          | 用户 ID（外键，关联用户表的 id 字段） |
| address     | varchar(255) | 地址                                  |
| city        | varchar(255) | 城市                                  |
| state       | varchar(255) | 州/省                                 |
| country     | varchar(255) | 国家                                  |
| postal_code | varchar(255) | 邮政编码                              |
| create_time | datetime     | 创建时间                              |
| update_time | datetime     | 更新时间                              |




