-- 用户地址表
CREATE TABLE user_address (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255),
  country VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  create_time DATETIME NOT NULL,
  update_time DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
