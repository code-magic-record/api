
CREATE TABLE goods_images (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品图片主键',
    goods_id INT COMMENT '商品ID，外键引用 goods 表中的 id',
    image_url VARCHAR(255) NOT NULL COMMENT '商品图片 URL',
    FOREIGN KEY (goods_id) REFERENCES goods(id)
) COMMENT = '商品图片表';