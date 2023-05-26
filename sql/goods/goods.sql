CREATE TABLE goods (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品主键',
    category_id INT COMMENT '商品分类ID，外键引用 categories 表中的 id',
    good_id VARCHAR(255) UNIQUE NOT NULL COMMENT '商品唯一标识符',
    name VARCHAR(255) NOT NULL COMMENT '商品名称',
    price DECIMAL(12, 2) NOT NULL COMMENT '商品单价',
    description TEXT COMMENT '商品描述',
    main_image_url VARCHAR(255) COMMENT '商品主要图片 URL',
    create_time DATETIME COMMENT '创建时间',
    update_time DATETIME COMMENT '更新时间',
    FOREIGN KEY (category_id) REFERENCES categories(id)
) COMMENT = '商品表';