-- 用户地址表
CREATE TABLE user_address (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- 地址条目 ID，自动增长
  user_id INT NOT NULL,  -- 关联的用户 ID，外键
  address VARCHAR(255) NOT NULL,  -- 街道地址，不能为空
  city VARCHAR(255) NOT NULL,  -- 城市，不能为空
  state VARCHAR(255) NOT NULL,  -- 州/省份，不能为空
  country VARCHAR(255) NULL,  -- 国家，可以为空
  postal_code VARCHAR(255) NULL,  -- 邮递编码，可以为空
  create_time DATETIME NOT NULL,  -- 创建时间，不能为空
  update_time DATETIME NOT NULL,  -- 更新时间，不能为空
  FOREIGN KEY (user_id) REFERENCES user(id)  -- 设置外键关系，与用户表连接
);