### 商品表（goods）

|    字段名称    |      类型      |                      说明                      |
| :------------: | :------------: | :--------------------------------------------: |
|       id       |      int       |                   主键，自增                   |
|  category_id   |      int       | 商品分类 ID，外键引用 `categories` 表中的 `id` |
|    good_id     |  varchar(255)  |  商品唯一标识符，例如：G123 或 Product-XYZ-01  |
|      name      |  varchar(255)  |                    商品名称                    |
|     price      | decimal(12, 2) |                    商品单价                    |
|  description   |      text      |                    商品描述                    |
| main_image_url |  varchar(255)  |                商品主要图片 URL                |
|  create_time   |    datetime    |                    创建时间                    |
|  update_time   |    datetime    |                    更新时间                    |

### 商品图片表（goods_images）

| 字段名称  | 类型         | 说明                                  |
| --------- | ------------ | ------------------------------------- |
| id        | int          | 主键，自增                            |
| goods_id  | int          | 商品 ID，外键引用 `goods` 表中的 `id` |
| image_url | varchar(255) | 商品图片 URL                          |

您可以根据需求，为分类和商品分别添加单张或多张图片。在此，我们将修改分类表以包含单张图片（分类图标），并向商品表添加多张商品图片。我们将创建一个新表 `product_images` 以存储多张商品图片的关系。

### 分类表（categories）

| 字段名称    | 类型         | 说明         |
| ----------- | ------------ | ------------ |
| id          | int          | 主键，自增   |
| name        | varchar(255) | 分类名称     |
| description | text         | 分类描述     |
| icon_url    | varchar(255) | 分类图片 URL |
