CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '分类主键',
    name VARCHAR(255) NOT NULL COMMENT '分类名称',
    description TEXT COMMENT '分类描述',
    icon_url VARCHAR(255) COMMENT '分类图片 URL'
) COMMENT = '商品分类表';