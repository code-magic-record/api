-- 创建用户表，用于存储系统中的用户信息
CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,  -- 用户 ID，自动增长
  `username` VARCHAR(255) NOT NULL,  -- 用户名，不能为 NULL
  `password` VARCHAR(255) NOT NULL,  -- 密码，不能为 NULL
  `email` VARCHAR(255) DEFAULT NULL,  -- 邮箱，可以为 NULL
  `nickname` VARCHAR(255) DEFAULT NULL,  -- 昵称，可以为 NULL
  `avatar` VARCHAR(255) DEFAULT NULL,  -- 头像链接，可以为 NULL
  `create_time` DATETIME NOT NULL,  -- 创建时间，不能为 NULL
  `update_time` DATETIME NOT NULL,  -- 更新时间，不能为 NULL
  PRIMARY KEY (`id`),  -- 设置主键
  UNIQUE KEY `username` (`username`)  -- 设置唯一索引
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  -- 设置存储引擎和字符集